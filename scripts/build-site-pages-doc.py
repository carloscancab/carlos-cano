#!/usr/bin/env python3
"""Print-faithful Google Doc of every public page on carlos-cano.site."""

from __future__ import annotations

import json
from io import BytesIO
from pathlib import Path

from PIL import Image
from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor, Emu
from docx.table import Table, _Cell
from docx.text.paragraph import Paragraph

INK = "161412"
PAPER = "FBFBF9"
MUTED = "5A564E"
FAINT = "8A857C"
INVERT = "161412"
INVERT_FG = "FBFBF9"
RULE = "E6E2D9"
GEORGIA = "Georgia"
PUB = Path("/workspace/public")
DUMP = Path("/tmp/site-dump.json")
OUT = Path("/workspace/artifacts/carlos-cano-site-pages.docx")

PAGE_W = Inches(8.5)
MARGIN = Inches(0.85)
CONTENT_W = PAGE_W - MARGIN * 2


def rgb(hex6: str) -> RGBColor:
    return RGBColor(int(hex6[0:2], 16), int(hex6[2:4], 16), int(hex6[4:6], 16))


def set_run_font(run, *, size=11, color=INK, bold=False, italic=False, all_caps=False, tracking=None):
    run.font.name = GEORGIA
    run.font.size = Pt(size)
    run.font.color.rgb = rgb(color)
    run.bold = bold
    run.italic = italic
    run.font.all_caps = all_caps
    rPr = run._r.get_or_add_rPr()
    rFonts = rPr.find(qn("w:rFonts"))
    if rFonts is None:
        rFonts = OxmlElement("w:rFonts")
        rPr.append(rFonts)
    for attr in ("w:ascii", "w:hAnsi", "w:cs", "w:eastAsia"):
        rFonts.set(qn(attr), GEORGIA)
    if tracking is not None:
        sp = OxmlElement("w:spacing")
        sp.set(qn("w:val"), str(tracking))
        rPr.append(sp)


def set_p_spacing(p: Paragraph, before=0, after=8, line=None):
    pf = p.paragraph_format
    pf.space_before = Pt(before)
    pf.space_after = Pt(after)
    if line:
        pf.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
        pf.line_spacing = line


def shade(cell: _Cell, color: str):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    for old in tcPr.findall(qn("w:shd")):
        tcPr.remove(old)
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), color)
    tcPr.append(shd)


def cell_margins(cell: _Cell, top=80, bottom=80, left=80, right=80):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    for old in tcPr.findall(qn("w:tcMar")):
        tcPr.remove(old)
    mar = OxmlElement("w:tcMar")
    for edge, val in (("top", top), ("left", left), ("bottom", bottom), ("right", right)):
        el = OxmlElement(f"w:{edge}")
        el.set(qn("w:w"), str(val))
        el.set(qn("w:type"), "dxa")
        mar.append(el)
    tcPr.append(mar)


def no_borders(table: Table):
    tbl = table._tbl
    tblPr = tbl.tblPr
    for old in tblPr.findall(qn("w:tblBorders")):
        tblPr.remove(old)
    borders = OxmlElement("w:tblBorders")
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        el = OxmlElement(f"w:{edge}")
        el.set(qn("w:val"), "nil")
        el.set(qn("w:sz"), "0")
        el.set(qn("w:space"), "0")
        el.set(qn("w:color"), "auto")
        borders.append(el)
    tblPr.append(borders)


def table_width(table: Table, width_emu: int):
    tbl = table._tbl
    tblPr = tbl.tblPr
    for old in tblPr.findall(qn("w:tblW")):
        tblPr.remove(old)
    tblW = OxmlElement("w:tblW")
    tblW.set(qn("w:w"), str(int(width_emu / 635)))
    tblW.set(qn("w:type"), "dxa")
    tblPr.append(tblW)


def hyperlink(paragraph: Paragraph, text: str, url: str, *, size=11, color=INK):
    part = paragraph.part
    r_id = part.relate_to(
        url,
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
        is_external=True,
    )
    hyperlink_el = OxmlElement("w:hyperlink")
    hyperlink_el.set(qn("r:id"), r_id)
    new_run = OxmlElement("w:r")
    rPr = OxmlElement("w:rPr")
    rFonts = OxmlElement("w:rFonts")
    for attr in ("w:ascii", "w:hAnsi", "w:cs", "w:eastAsia"):
        rFonts.set(qn(attr), GEORGIA)
    rPr.append(rFonts)
    sz = OxmlElement("w:sz")
    sz.set(qn("w:val"), str(int(size * 2)))
    rPr.append(sz)
    color_el = OxmlElement("w:color")
    color_el.set(qn("w:val"), color)
    rPr.append(color_el)
    u = OxmlElement("w:u")
    u.set(qn("w:val"), "single")
    rPr.append(u)
    new_run.append(rPr)
    t = OxmlElement("w:t")
    t.set("{http://www.w3.org/XML/1998/namespace}space", "preserve")
    t.text = text
    new_run.append(t)
    hyperlink_el.append(new_run)
    paragraph._p.append(hyperlink_el)


def p_text(container, text, *, size=11, color=INK, bold=False, italic=False,
           all_caps=False, tracking=None, before=0, after=8, line=1.45,
           align="left", first=False):
    if isinstance(container, _Cell):
        if first or (len(container.paragraphs) == 1 and container.paragraphs[0].text == ""):
            p = container.paragraphs[0]
        else:
            p = container.add_paragraph()
    else:
        p = container.add_paragraph()
    p.alignment = {
        "left": WD_ALIGN_PARAGRAPH.LEFT,
        "center": WD_ALIGN_PARAGRAPH.CENTER,
        "right": WD_ALIGN_PARAGRAPH.RIGHT,
    }.get(align, WD_ALIGN_PARAGRAPH.LEFT)
    set_p_spacing(p, before=before, after=after, line=line)
    run = p.add_run(text)
    set_run_font(run, size=size, color=color, bold=bold, italic=italic,
                 all_caps=all_caps, tracking=tracking)
    return p


def kicker(container, text, *, color=FAINT, first=False, before=0, after=4):
    return p_text(container, text, size=9, color=color, all_caps=True,
                  tracking=80, before=before, after=after, line=1.2, first=first)


def spacer(doc, pt=12):
    p = doc.add_paragraph()
    set_p_spacing(p, before=0, after=pt, line=1)
    p.add_run("")


def page_break(doc):
    p = doc.add_paragraph()
    run = p.add_run()
    br = OxmlElement("w:br")
    br.set(qn("w:type"), "page")
    run._r.append(br)


def invert_band(doc, kicker_text: str, title: str, dek: str):
    table = doc.add_table(1, 1)
    no_borders(table)
    table_width(table, int(CONTENT_W))
    cell = table.cell(0, 0)
    shade(cell, INVERT)
    cell_margins(cell, 220, 220, 240, 240)
    kicker(cell, kicker_text, color="A8A49C", first=True, after=6)
    p_text(cell, title, size=26, color=INVERT_FG, after=8, line=1.15)
    p_text(cell, dek, size=12, color="C8C4BC", after=0, line=1.45)
    spacer(doc, 16)


def add_image(doc, rel: str, width=None):
    path = PUB / rel.lstrip("/")
    if not path.exists():
        path = Path("/workspace/public") / rel.lstrip("/")
    if not str(path).startswith(str(PUB)) and not path.exists():
        path = Path("/workspace/public") / rel.replace("/images/", "images/")
    # rel like /images/retail.jpg
    cand = Path("/workspace/public") / rel.lstrip("/")
    if not cand.exists():
        return
    im = Image.open(cand)
    if im.mode in ("RGBA", "P"):
        bg = Image.new("RGB", im.size, (251, 251, 249))
        if im.mode == "P":
            im = im.convert("RGBA")
        bg.paste(im, mask=im.split()[-1] if im.mode == "RGBA" else None)
        im = bg
    elif im.mode != "RGB":
        im = im.convert("RGB")
    w, h = im.size
    max_w = 1400
    if w > max_w:
        h = int(h * max_w / w)
        im = im.resize((max_w, h), Image.Resampling.LANCZOS)
    buf = BytesIO()
    im.save(buf, format="JPEG", quality=82)
    buf.seek(0)
    p = doc.add_paragraph()
    set_p_spacing(p, before=4, after=10)
    run = p.add_run()
    run.add_picture(buf, width=width or CONTENT_W)


def piece_row(doc, title, dek, meta, href=None):
    kicker(doc, meta, before=10, after=1)
    p = doc.add_paragraph()
    set_p_spacing(p, before=0, after=2, line=1.2)
    if href:
        hyperlink(p, title, href, size=14, color=INK)
    else:
        run = p.add_run(title)
        set_run_font(run, size=14, color=INK)
    p_text(doc, dek, size=11, color=MUTED, after=6, line=1.4)


def main():
    data = json.loads(DUMP.read_text())
    doc = Document()
    section = doc.sections[0]
    section.page_width = PAGE_W
    section.page_height = Inches(11)
    section.left_margin = MARGIN
    section.right_margin = MARGIN
    section.top_margin = Inches(0.8)
    section.bottom_margin = Inches(0.8)

    # Title
    kicker(doc, "Carlos Cano  ·  Site inventory", before=0)
    p_text(doc, "Every page, as it stands.", size=32, before=4, after=10, line=1.1)
    p_text(
        doc,
        "A print of the public site: home, cases, audiences, the archive. "
        "Not exhaustive of the work — exhaustive of what is currently filed. "
        "Yours truly, Carlos.",
        size=13,
        color=MUTED,
        after=16,
        line=1.5,
    )
    add_image(doc, "/images/portrait.jpg", width=Inches(2.4))

    # TOC
    invert_band(
        doc,
        "Contents",
        "The pages",
        "Home, Now, Cases, three audiences, five shelves, the podcast.",
    )
    toc = [
        ("01", "Home"),
        ("02", "Now"),
        ("03", "Cases — Chain Abstraction, Universal X, Panther Protocol"),
        ("04", "Retail"),
        ("05", "Institutional"),
        ("06", "B2B"),
        ("07", "Contents"),
        ("08", "Narrative"),
        ("09", "Research"),
        ("10", "Promotional"),
        ("11", "Multimedia"),
        ("12", "Technical"),
        ("13", "Podcasts — Real-World Value"),
    ]
    for n, t in toc:
        p = doc.add_paragraph()
        set_p_spacing(p, before=2, after=2, line=1.3)
        run = p.add_run(f"{n}   {t}")
        set_run_font(run, size=13, color=INK)

    # HOME
    page_break(doc)
    invert_band(doc, "01  ·  Home", "Carlos Cano", data["site"]["lede"])
    p_text(doc, data["site"]["role"] + " · " + data["site"]["field"], size=12, color=MUTED, after=12)
    kicker(doc, "Results")
    for r in data["site"]["results"]:
        p_text(doc, "·  " + r, size=12, after=6, line=1.45)
    spacer(doc, 8)
    kicker(doc, "Audiences")
    for a in data["audiences"]:
        piece_row(doc, a["name"], a["story"], a["short"])
    spacer(doc, 8)
    kicker(doc, "Cases")
    for b in data["brands"]:
        piece_row(doc, b["name"], b["dek"], f"{b.get('client') or b['kind']}  ·  {b['year']}")
    spacer(doc, 8)
    kicker(doc, "Content")
    p_text(doc, "A selection of published work. Not exhaustive.", size=12, color=MUTED)
    for c in data["contentCategories"]:
        piece_row(doc, c["name"], c["story"], c["short"])

    # NOW
    page_break(doc)
    invert_band(doc, "02  ·  Now", "From Parral, Chihuahua.", data["now"]["lede"])
    p_text(doc, f"Updated {data['now']['updated']}.", size=11, color=FAINT, after=12)
    for s in data["now"]["sections"]:
        kicker(doc, s["title"], before=12)
        p_text(doc, s["body"], size=12, line=1.5)

    # CASES
    page_break(doc)
    invert_band(
        doc,
        "03  ·  Cases",
        "The longer stories.",
        "Identity, narrative, the work that had to hold a room. Each case still carries an editing banner: live, not finished.",
    )
    for b in data["brands"]:
        piece_row(
            doc,
            b["name"],
            b["dek"],
            f"{b.get('client') or ''}  ·  {b['year']}  ·  {b['audience']}",
        )
        add_image(doc, b["cover"], width=CONTENT_W)

    p_text(
        doc,
        "Chain Abstraction — Crafting a dominating narrative. Product after fragmentation; the map after the edges. "
        "Universal X — From the sentence to a billion. Panther Protocol — Confidential DeFi, for desks that cannot trade in the open.",
        size=12,
        color=MUTED,
        before=8,
        line=1.5,
    )

    # AUDIENCES
    order = [("04", "retail"), ("05", "institutional"), ("06", "b2b")]
    for n, slug in order:
        page_break(doc)
        a = data["byAudience"][slug]
        invert_band(doc, f"{n}  ·  Audience", a["name"], a["story"])
        p_text(
            doc,
            "Samples of work I've published for this audience. Hardly exhaustive.",
            size=12,
            color=MUTED,
            after=12,
        )
        add_image(doc, a["image"], width=CONTENT_W)
        if a["cases"]:
            kicker(doc, "Cases", before=14)
            p_text(doc, ", ".join(a["cases"]), size=12)
        featured = [x for x in a["articles"] if x.get("featured")]
        videos = [x for x in a["articles"] if x.get("video")]
        rest = [x for x in a["articles"] if not x.get("video") and not x.get("featured")]
        if featured:
            kicker(doc, "Featured", before=14)
            for x in featured:
                piece_row(doc, x["title"], x["dek"], f"{x['source']}  ·  {x['category']}  ·  {x['date'][:7]}", x.get("href"))
        if videos:
            kicker(doc, "Videos", before=14)
            for x in videos:
                piece_row(doc, x["title"], x["dek"], f"{x['source']}  ·  playable", x.get("href"))
        if rest:
            kicker(doc, "Also filed", before=14)
            for x in rest:
                piece_row(doc, x["title"], x["dek"], f"{x['source']}  ·  {x['category']}", x.get("href"))

        # collections that apply
        wanted = {
            "retail": ["academy"],
            "institutional": ["7702", "coalition", "messari", "papers", "d-core"],
            "b2b": ["7702", "coalition", "docs", "devs", "papers"],
        }[slug]
        for col in data["collections"]:
            if col["slug"] not in wanted:
                continue
            kicker(doc, col["kicker"], before=18)
            p_text(doc, col["title"], size=18, after=4, line=1.15)
            p_text(doc, col["dek"], size=11, color=MUTED, after=8)
            for it in col["items"]:
                piece_row(doc, it["title"], it["dek"], f"{it['source']}  ·  {it['date'][:7]}", it.get("href"))

    # CONTENTS
    page_break(doc)
    invert_band(doc, "07  ·  Contents", "Content.", "A selection of published work. Not exhaustive.")
    for i, c in enumerate(data["contentCategories"], 8):
        n = f"{i:02d}"
        page_break(doc)
        cat = data["byCategory"][c["slug"]]
        invert_band(doc, f"{n}  ·  {c['name']}", c["name"], c["story"])
        add_image(doc, c["image"], width=CONTENT_W)
        total = sum(len(g["items"]) for g in cat["groups"])
        p_text(doc, f"{total} pieces on this shelf. Grouped by source, so the volume is visible.", size=12, color=MUTED, after=12)
        for g in cat["groups"]:
            kicker(doc, f"{g['source']}  ·  {len(g['items'])}", before=14)
            for it in g["items"]:
                piece_row(doc, it["title"], it["dek"], it["date"][:7], it.get("href"))

    # STUDIO
    page_break(doc)
    invert_band(
        doc,
        "13  ·  Podcasts",
        "Real-World Value",
        "A Particle Network podcast. Hosted by Carlos Cano. Solana first. The rest of the series on the Particle channel.",
    )
    for s in data["studio"]:
        piece_row(doc, s["title"], s["dek"], f"{s.get('duration') or ''}  ·  {s['date'][:7]}", s.get("href"))

    # Members appendix
    page_break(doc)
    invert_band(
        doc,
        "Appendix",
        "The rooms",
        "7702 Collective members, from the site. Chain Abstraction Coalition members, from the announcement — not a tweet.",
    )
    kicker(doc, "The 7702 Collective")
    for m in data["collective"]:
        p_text(doc, f"{m['name']}  —  {m['desc']}", size=11, after=3)
    spacer(doc, 10)
    kicker(doc, "The Chain Abstraction Coalition")
    for m in data["coalition"]:
        p_text(doc, f"{m['name']}  —  {m['desc']}", size=11, after=3)

    spacer(doc, 24)
    p_text(
        doc,
        "This document is a snapshot of the live site. Some case studies are still being edited. Yours truly, Carlos.",
        size=11,
        color=MUTED,
        italic=True,
    )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc.save(OUT)
    print("wrote", OUT, "bytes", OUT.stat().st_size)


if __name__ == "__main__":
    main()
