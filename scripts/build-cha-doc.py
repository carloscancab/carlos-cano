#!/usr/bin/env python3
"""Build a print-faithful DOCX of the Chain Abstraction case study."""

from __future__ import annotations

import os
from io import BytesIO

from PIL import Image
from docx import Document
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.oxml import OxmlElement
from docx.oxml.ns import qn, nsmap
from docx.shared import Emu, Inches, Pt, RGBColor, Twips
from docx.table import Table, _Cell
from docx.text.paragraph import Paragraph

INK = "161412"
PAPER = "FBFBF9"
MUTED = "5A564E"
FAINT = "8A857C"
INVERT_MUTED = "A8A49C"
RULE = "E6E2D9"
GEORGIA = "Georgia"

IMG = "/workspace/public/images/cases/particle"
COVER = "/workspace/public/images/chain-abstraction.jpg"
UX_COVER = "/workspace/public/images/universal-x.jpg"
PORTRAIT = "/workspace/public/images/portrait.jpg"
PUB = "/workspace/public/images"
OUT = "/workspace/artifacts/chain-abstraction-page.docx"
OUT2 = "/workspace/artifacts/chain-abstraction-page.docx"

PAGE_W = Inches(8.5)
MARGIN = Inches(0.85)
CONTENT_W = PAGE_W - MARGIN * 2  # 6.8"
BAND_PAD = 280  # twips ~0.19"


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
    tblW.set(qn("w:w"), str(int(width_emu / 635)))  # EMU to twips? 914400 EMU = 1 inch = 1440 twips, so 1 twip = 635 EMU
    tblW.set(qn("w:type"), "dxa")
    tblPr.append(tblW)
    tblPr_jc = OxmlElement("w:jc")
    tblPr_jc.set(qn("w:val"), "center")
    tblPr.append(tblPr_jc)


def set_col_widths(table: Table, widths):
    for row in table.rows:
        for i, w in enumerate(widths):
            row.cells[i].width = w


def add_nested_table(cell: _Cell, rows: int, cols: int) -> Table:
    inner = cell.add_table(rows, cols) if hasattr(cell, "add_table") else None
    if inner is not None:
        return inner
    # python-docx: create in document body, then move
    # We attach raw tbl XML to the cell.
    from docx.oxml import parse_xml

    grid = "".join(f'<w:gridCol w:w="2000"/>' for _ in range(cols))
    trs = ""
    for _ in range(rows):
        tcs = "".join("<w:tc><w:tcPr><w:tcW w:w='2000' w:type='dxa'/></w:tcPr><w:p/></w:tc>" for _ in range(cols))
        trs += f"<w:tr>{tcs}</w:tr>"
    xml = (
        f'<w:tbl xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
        f"<w:tblPr><w:tblW w:w='0' w:type='auto'/></w:tblPr>"
        f"<w:tblGrid>{grid}</w:tblGrid>{trs}</w:tbl>"
    )
    tbl = parse_xml(xml)
    cell._tc.append(tbl)
    return Table(tbl, cell)


def hyperlink(paragraph: Paragraph, text: str, url: str, *, size=11, color=INK, bold=False, italic=False):
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
    if bold:
        b = OxmlElement("w:b")
        rPr.append(b)
    if italic:
        i = OxmlElement("w:i")
        rPr.append(i)
    new_run.append(rPr)
    t = OxmlElement("w:t")
    t.set("{http://www.w3.org/XML/1998/namespace}space", "preserve")
    t.text = text
    new_run.append(t)
    hyperlink_el.append(new_run)
    paragraph._p.append(hyperlink_el)


def p_text(
    container,
    text: str,
    *,
    size=11,
    color=INK,
    bold=False,
    italic=False,
    all_caps=False,
    tracking=None,
    before=0,
    after=8,
    line=1.45,
    align="left",
    first=False,
):
    if isinstance(container, _Cell):
        if first or (len(container.paragraphs) == 1 and container.paragraphs[0].text == "" and not container.paragraphs[0].runs):
            p = container.paragraphs[0]
        else:
            p = container.add_paragraph()
    else:
        p = container.add_paragraph()
    align_map = {
        "left": WD_ALIGN_PARAGRAPH.LEFT,
        "center": WD_ALIGN_PARAGRAPH.CENTER,
        "right": WD_ALIGN_PARAGRAPH.RIGHT,
    }
    p.alignment = align_map.get(align, WD_ALIGN_PARAGRAPH.LEFT)
    set_p_spacing(p, before=before, after=after, line=line)
    run = p.add_run(text)
    set_run_font(
        run,
        size=size,
        color=color,
        bold=bold,
        italic=italic,
        all_caps=all_caps,
        tracking=tracking,
    )
    return p


def kicker(container, text, *, color=FAINT, first=False, before=0, after=4):
    return p_text(
        container,
        text,
        size=9,
        color=color,
        all_caps=True,
        tracking=80,
        before=before,
        after=after,
        line=1.2,
        first=first,
    )


def chapter_title(doc, n: str, title: str):
    kicker(doc, n, before=28, after=2)
    p = doc.add_paragraph()
    set_p_spacing(p, before=2, after=14, line=1.15)
    run = p.add_run(title)
    set_run_font(run, size=28, color=INK, bold=False)
    return p


def body(doc_or_cell, text, *, color=INK, size=12, first=False, after=10, before=0):
    return p_text(
        doc_or_cell,
        text,
        size=size,
        color=color,
        before=before,
        after=after,
        line=1.55,
        first=first,
    )


def caption(container, text, *, color=MUTED, first=False, align="left"):
    return p_text(
        container,
        text,
        size=9,
        color=color,
        italic=False,
        before=2,
        after=10,
        line=1.4,
        first=first,
        align=align,
    )


def quote(doc, text, *, size=22, color=INK, before=16, after=12):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    set_p_spacing(p, before=before, after=after, line=1.2)
    run = p.add_run(text)
    set_run_font(run, size=size, color=color)
    return p


def hairline(doc):
    table = doc.add_table(1, 1)
    no_borders(table)
    table_width(table, int(CONTENT_W))
    cell = table.cell(0, 0)
    shade(cell, RULE)
    cell_margins(cell, 0, 0, 0, 0)
    p = cell.paragraphs[0]
    set_p_spacing(p, before=0, after=0, line=1)
    run = p.add_run(" ")
    set_run_font(run, size=1, color=RULE)
    # force a 1pt row height
    tr = table.rows[0]._tr
    trPr = tr.get_or_add_trPr()
    trH = OxmlElement("w:trHeight")
    trH.set(qn("w:val"), "24")
    trH.set(qn("w:hRule"), "exact")
    trPr.append(trH)
    spacer(doc, 10)


def spacer(doc, pt=12):
    p = doc.add_paragraph()
    set_p_spacing(p, before=0, after=pt, line=1)
    run = p.add_run("")
    set_run_font(run, size=6)


def prepare_image(path: str, max_w=1400, ratio=None, quality=82) -> BytesIO:
    im = Image.open(path)
    if im.mode in ("RGBA", "P"):
        bg = Image.new("RGB", im.size, (251, 251, 249))
        if im.mode == "P":
            im = im.convert("RGBA")
        bg.paste(im, mask=im.split()[-1] if im.mode == "RGBA" else None)
        im = bg
    elif im.mode != "RGB":
        im = im.convert("RGB")
    if ratio:
        w, h = im.size
        target_h = int(w / ratio)
        if target_h <= h:
            y = (h - target_h) // 2
            im = im.crop((0, y, w, y + target_h))
        else:
            target_w = int(h * ratio)
            x = (w - target_w) // 2
            im = im.crop((x, 0, x + target_w, h))
    w, h = im.size
    if w > max_w:
        h = int(h * max_w / w)
        im = im.resize((max_w, h), Image.Resampling.LANCZOS)
    buf = BytesIO()
    im.save(buf, format="JPEG", quality=quality, optimize=True)
    buf.seek(0)
    return buf


def add_picture(paragraph: Paragraph, path: str, width: int, *, ratio=None, max_px=1400):
    buf = prepare_image(path, max_w=max_px, ratio=ratio)
    run = paragraph.add_run()
    run.add_picture(buf, width=width)


def fig(doc, path: str, width, caption_text: str, *, ratio=None, align="center", max_px=1400):
    p = doc.add_paragraph()
    p.alignment = (
        WD_ALIGN_PARAGRAPH.CENTER if align == "center" else WD_ALIGN_PARAGRAPH.LEFT
    )
    set_p_spacing(p, before=8, after=2, line=1)
    add_picture(p, path, width, ratio=ratio, max_px=max_px)
    caption(doc, caption_text, align="center" if align == "center" else "left")


def fig_in_cell(cell: _Cell, path: str, width, caption_text: str, *, ratio=None, color=INVERT_MUTED, first=True, max_px=1400):
    p = cell.paragraphs[0] if first else cell.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    set_p_spacing(p, before=6, after=2, line=1)
    if first:
        # clear leftover
        pass
    add_picture(p, path, width, ratio=ratio, max_px=max_px)
    caption(cell, caption_text, color=color, first=False)


def dark_band(doc) -> _Cell:
    spacer(doc, 18)
    table = doc.add_table(1, 1)
    no_borders(table)
    table_width(table, int(CONTENT_W))
    cell = table.cell(0, 0)
    shade(cell, INK)
    cell_margins(cell, 260, 260, 260, 260)
    cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.TOP
    spacer(doc, 8)
    return cell


def article_head(cell: _Cell, thumb: str, kicker_t: str, title: str, dek: str, url: str):
    inner = add_nested_table(cell, 1, 2)
    no_borders(inner)
    thumb_w = Inches(1.55)
    text_w = CONTENT_W - Inches(0.5) - thumb_w
    set_col_widths(inner, (thumb_w, text_w))
    c0, c1 = inner.cell(0, 0), inner.cell(0, 1)
    shade(c0, INK)
    shade(c1, INK)
    cell_margins(c0, 0, 0, 0, 80)
    cell_margins(c1, 0, 0, 40, 0)
    p = c0.paragraphs[0]
    set_p_spacing(p, 0, 0, 1)
    add_picture(p, thumb, thumb_w, ratio=16 / 9, max_px=600)
    kicker(c1, kicker_t, color=INVERT_MUTED, first=True, after=2)
    tp = c1.add_paragraph()
    set_p_spacing(tp, before=1, after=4, line=1.2)
    hyperlink(tp, title, url, size=16, color=PAPER, bold=False)
    p_text(c1, dek, size=10, color=INVERT_MUTED, after=0, line=1.4)


def two_col(parent_cell: _Cell, left_fn, right_fn, gap=80):
    inner = add_nested_table(parent_cell, 1, 2)
    no_borders(inner)
    half = int((CONTENT_W - Inches(0.55)) / 2)
    set_col_widths(inner, (half, half))
    l, r = inner.cell(0, 0), inner.cell(0, 1)
    shade(l, INK)
    shade(r, INK)
    cell_margins(l, 0, 0, 0, gap)
    cell_margins(r, 0, 0, gap, 0)
    left_fn(l)
    right_fn(r)
    return l, r


def paper_two_col(doc, left_fn, right_fn):
    table = doc.add_table(1, 2)
    no_borders(table)
    table_width(table, int(CONTENT_W))
    half = int(CONTENT_W / 2)
    set_col_widths(table, (half, half))
    l, r = table.cell(0, 0), table.cell(0, 1)
    shade(l, PAPER)
    shade(r, PAPER)
    cell_margins(l, 40, 40, 0, 140)
    cell_margins(r, 40, 40, 140, 0)
    left_fn(l)
    right_fn(r)


def image_grid(parent, paths_captions, cols=2, width_each=None, *, dark=True, ratio=3 / 2):
    rows = (len(paths_captions) + cols - 1) // cols
    inner = add_nested_table(parent, rows, cols)
    no_borders(inner)
    bg = INK if dark else PAPER
    cap_c = INVERT_MUTED if dark else MUTED
    w = width_each or Inches(2.9)
    for i, (path, cap) in enumerate(paths_captions):
        rr, cc = divmod(i, cols)
        cell = inner.cell(rr, cc)
        shade(cell, bg)
        cell_margins(cell, 40, 80, 40, 40)
        p = cell.paragraphs[0]
        set_p_spacing(p, 0, 2, 1)
        add_picture(p, path, w, ratio=ratio, max_px=900)
        caption(cell, cap, color=cap_c, first=False)


def paper_image_grid(doc, paths_captions, cols=2, width_each=None, ratio=3 / 2):
    rows = (len(paths_captions) + cols - 1) // cols
    table = doc.add_table(rows, cols)
    no_borders(table)
    table_width(table, int(CONTENT_W))
    w = width_each or Inches(3.2)
    col_w = int(CONTENT_W / cols)
    set_col_widths(table, tuple(col_w for _ in range(cols)))
    for i, (path, cap) in enumerate(paths_captions):
        rr, cc = divmod(i, cols)
        cell = table.cell(rr, cc)
        shade(cell, PAPER)
        cell_margins(cell, 40, 80, 60, 60)
        p = cell.paragraphs[0]
        set_p_spacing(p, 0, 2, 1)
        add_picture(p, path, w, ratio=ratio, max_px=900)
        caption(cell, cap, color=MUTED, first=False)


def finding(cell, number, text, *, first=True):
    p_text(cell, number, size=26, color=PAPER, first=first, after=4, before=4, line=1.05)
    p_text(cell, text, size=10, color=INVERT_MUTED, after=8, line=1.4)


def metric(cell, number, text, *, color_n=INK, color_t=MUTED):
    p_text(cell, number, size=28, color=color_n, first=False, after=4, before=10, line=1.05)
    p_text(cell, text, size=10, color=color_t, after=6, line=1.4)


def add_home(doc):
    kicker(doc, "Home", first=False, before=0, after=8)

    hero = doc.add_table(1, 2)
    no_borders(hero)
    table_width(hero, int(CONTENT_W))
    text_w = Inches(4.55)
    pic_w = Inches(2.15)
    set_col_widths(hero, (text_w, pic_w))
    left, right = hero.cell(0, 0), hero.cell(0, 1)
    shade(left, PAPER)
    shade(right, PAPER)
    cell_margins(left, 0, 40, 0, 140)
    cell_margins(right, 20, 0, 40, 0)

    p_text(left, "Carlos Cano", size=32, color=INK, first=True, after=6, line=1.08)
    kicker(left, "Product marketing, branding & research", after=10)
    p_text(left, "Everybody wants to be", size=20, color=INK, after=0, line=1.15)
    p = left.add_paragraph()
    set_p_spacing(p, before=0, after=10, line=1.15)
    run = p.add_run("understood.")
    set_run_font(run, size=20, color=INK, italic=True)
    run = p.add_run("  /  believed.  /  useful.")
    set_run_font(run, size=12, color=FAINT, italic=True)

    p_text(
        left,
        "I build brands, narratives, and content in Web3. For people, not “users.”",
        size=12,
        color=MUTED,
        after=10,
        line=1.5,
    )
    kicker(left, "I have", after=6)
    results = [
        "Four years of content: narrative, research, promotional, multimedia, technical.",
        "Repositioned Particle Network from wallet provider to chain abstraction L1. Brand and investor materials for a $25M raise — Alibaba, Binance Labs, Avalanche.",
        "Made chain abstraction the category story of 2024–25.",
        "Product marketing for UniversalX, concept to $1B in volume. A top-10 spot terminal.",
        "Panther Protocol: content and positioning for a $22M public sale. Launches, the DAO, the 2022 privacy crackdown.",
    ]
    for line in results:
        p = left.add_paragraph(style=None)
        p.paragraph_format.left_indent = Inches(0.18)
        set_p_spacing(p, before=0, after=5, line=1.4)
        run = p.add_run("•  " + line)
        set_run_font(run, size=10, color=MUTED)

    p = right.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    set_p_spacing(p, 8, 0, 1)
    add_picture(p, PORTRAIT, Inches(1.95), ratio=3 / 4, max_px=800)
    caption(right, "Carlos Cano", color=FAINT, align="center")

    spacer(doc, 18)
    hairline(doc)

    kicker(doc, "Audiences", before=8, after=4)
    p_text(
        doc,
        "Examples of my work, segmented by their intended readers.",
        size=22,
        color=INK,
        after=12,
        line=1.15,
    )
    audiences = [
        (
            f"{PUB}/retail.jpg",
            "Consumers",
            "Retail",
            "Apps, campaigns, and brands for people who will actually hold the product, tap it, and tell someone else.",
        ),
        (
            f"{PUB}/institutional.jpg",
            "Desks & funds",
            "Institutional",
            "Identities and research that can sit in a due-diligence pack — and still be believed on-chain.",
        ),
        (
            f"{PUB}/b2b.jpg",
            "Teams",
            "B2B",
            "Positioning, sales narrative, and GTM for products sold to other teams — the sentence a founder can say on a call.",
        ),
    ]
    at = doc.add_table(1, 3)
    no_borders(at)
    table_width(at, int(CONTENT_W))
    third = int(CONTENT_W / 3)
    set_col_widths(at, (third, third, third))
    for i, (path, short, name, story) in enumerate(audiences):
        cell = at.cell(0, i)
        shade(cell, PAPER)
        cell_margins(cell, 40, 80, 60, 60)
        p = cell.paragraphs[0]
        set_p_spacing(p, 0, 4, 1)
        add_picture(p, path, Inches(2.05), ratio=3 / 2, max_px=800)
        kicker(cell, short, after=2)
        p_text(cell, name, size=16, color=INK, after=4, line=1.15)
        p_text(cell, story, size=9, color=MUTED, after=0, line=1.4)

    spacer(doc, 16)
    kicker(doc, "Case studies", before=8, after=4)
    p_text(doc, "Brands and narratives.", size=22, color=INK, after=12, line=1.15)
    add_cases_grid(doc)

    spacer(doc, 4)
    kicker(doc, "Contents", before=14, after=4)
    p_text(doc, "Content.", size=22, color=INK, after=6, line=1.15)
    p_text(
        doc,
        "Archive in progress. The categories stand. The pieces are not up yet.",
        size=11,
        color=MUTED,
        after=12,
        line=1.45,
    )
    cats = [
        (
            f"{PUB}/narrative.jpg",
            "Argument",
            "Narrative",
            "Long pieces that decide what a product is for — and what it is willing to be.",
        ),
        (
            f"{PUB}/research.jpg",
            "Evidence",
            "Research",
            "Interviews, maps, and studies. What is true before the brand has to say it.",
        ),
        (
            f"{PUB}/promotional.jpg",
            "In market",
            "Promotional",
            "Campaign writing. Launch weeks, seasons, the sentence that has to work in a feed.",
        ),
        (
            f"{PUB}/multimedia.jpg",
            "Recorded",
            "Multimedia",
            "Films, cuts, conversations. The work that is not a page — and still has to argue.",
        ),
        (
            f"{PUB}/technical.jpg",
            "Mechanism",
            "Technical",
            "How a product actually works, said so a non-engineer can carry it. Tokens, incentives, the join.",
        ),
    ]
    ct = doc.add_table(3, 2)
    no_borders(ct)
    table_width(ct, int(CONTENT_W))
    half = int(CONTENT_W / 2)
    set_col_widths(ct, (half, half))
    for i, (path, short, name, story) in enumerate(cats):
        r, c = divmod(i, 2)
        if i == 4:
            # last item: use row 2 col 0; leave col 1 empty
            cell = ct.cell(2, 0)
        else:
            cell = ct.cell(r, c)
        shade(cell, PAPER)
        cell_margins(cell, 40, 100, 60, 60)
        p = cell.paragraphs[0]
        set_p_spacing(p, 0, 4, 1)
        add_picture(p, path, Inches(3.05), ratio=3 / 2, max_px=900)
        kicker(cell, short, after=2)
        p_text(cell, name, size=16, color=INK, after=4, line=1.15)
        p_text(cell, story, size=10, color=MUTED, after=0, line=1.4)
    shade(ct.cell(2, 1), PAPER)

    doc.add_page_break()


def add_cases_grid(doc):
    cases = [
        (
            UX_COVER,
            "Particle Network · Retail",
            "Universal X",
            "The most competitive market of 2025-2026, and how we managed to stand out.",
        ),
        (
            COVER,
            "Particle Network · B2B",
            "Chain Abstraction",
            "How we crafted a narrative that dominated Web3 infra conversations in 2024-2025.",
        ),
        (
            f"{PUB}/panther-protocol.jpg",
            "Panther Protocol · Institutional",
            "Panther Protocol",
            "From raising $22M to surviving the most complex panorama in crypto’s history.",
        ),
    ]
    table = doc.add_table(2, 2)
    no_borders(table)
    table_width(table, int(CONTENT_W))
    half = int(CONTENT_W / 2)
    set_col_widths(table, (half, half))
    for i, (path, meta, name, dek) in enumerate(cases):
        r, c = divmod(i, 2)
        cell = table.cell(r, c)
        shade(cell, PAPER)
        cell_margins(cell, 40, 120, 60, 80)
        p = cell.paragraphs[0]
        set_p_spacing(p, 0, 4, 1)
        add_picture(p, path, Inches(3.1), ratio=3 / 2, max_px=900)
        kicker(cell, meta, after=2)
        p_text(cell, name, size=16, color=INK, after=4, line=1.15)
        p_text(cell, dek, size=10, color=MUTED, after=0, line=1.4)
    shade(table.cell(1, 1), PAPER)


def build():
    doc = Document()
    section = doc.sections[0]
    section.page_width = PAGE_W
    section.page_height = Inches(11)
    section.left_margin = MARGIN
    section.right_margin = MARGIN
    section.top_margin = Inches(0.7)
    section.bottom_margin = Inches(0.7)

    # page background
    bg = OxmlElement("w:background")
    bg.set(qn("w:color"), PAPER)
    doc.element.insert(0, bg)
    settings = doc.settings.element
    disp = OxmlElement("w:displayBackgroundShape")
    settings.append(disp)

    normal = doc.styles["Normal"]
    normal.font.name = GEORGIA
    normal.font.size = Pt(12)
    normal.font.color.rgb = rgb(INK)

    # page-only: no home

    # COVER
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    set_p_spacing(p, 0, 14, 1)
    add_picture(p, COVER, CONTENT_W, ratio=2.2, max_px=1600)

    kicker(doc, "Case study", first=False, before=6, after=6)
    p = doc.add_paragraph()
    set_p_spacing(p, 2, 2, 1.12)
    run = p.add_run("Chain abstraction:")
    set_run_font(run, size=32, color=INK)
    p = doc.add_paragraph()
    set_p_spacing(p, 0, 8, 1.12)
    run = p.add_run("Crafting a dominating narrative")
    set_run_font(run, size=32, color=INK)

    p_text(doc, "Particle Network", size=16, color=MUTED, after=6, line=1.2)
    p_text(
        doc,
        "How we crafted a narrative that dominated Web3 infra conversations in 2024-2025.",
        size=12,
        color=MUTED,
        after=18,
        line=1.5,
    )

    hairline(doc)

    # TOC
    kicker(doc, "Contents", before=8, after=10)
    toc_items = [
        ("01", "Where we started"),
        ("02", "The problem (or opportunity!)"),
        ("03", "The product"),
        ("04", "The name"),
        ("05", "The edges"),
        ("06", "The map"),
        ("07", "Pioneer"),
        ("08", "The coalition"),
        ("09", "The echo"),
        ("10", "The results"),
    ]
    toc_t = doc.add_table(2, 5)
    no_borders(toc_t)
    table_width(toc_t, int(CONTENT_W))
    colw = int(CONTENT_W / 5)
    set_col_widths(toc_t, tuple(colw for _ in range(5)))
    for i, (n, lab) in enumerate(toc_items):
        r, c = divmod(i, 5)
        cell = toc_t.cell(r, c)
        shade(cell, PAPER)
        cell_margins(cell, 40, 80, 20, 40)
        p = cell.paragraphs[0]
        set_p_spacing(p, 0, 0, 1.3)
        run = p.add_run(n + "  ")
        set_run_font(run, size=10, color=FAINT)
        run = p.add_run(lab)
        set_run_font(run, size=11, color=INK)
    spacer(doc, 8)

    hairline(doc)

    # 01 SIGN IN
    chapter_title(doc, "01", "Where we started")
    body(
        doc,
        "From day one, Particle Network did one thing: try to make Web3 as easy as an app.",
    )
    body(
        doc,
        "The goal was fixing Web3’s user experience. The first product was in-app wallets, launching alongside Privy, Web3Auth, and others. Then came building Smart Accounts into it.",
    )
    body(
        doc,
        "A person could go into a dApp, start using it the way they open Gmail, create a wallet instantly, and deposit assets. Without thinking about seed phrases, the network’s gas token, extensions, or receiving a lecture.",
    )
    p_text(
        doc,
        "This was, of course, before Web3 decided to complicate everything again.",
        size=12,
        color=INK,
        bold=True,
        before=0,
        after=10,
        line=1.55,
    )
    fig(
        doc,
        f"{IMG}/waas-login.png",
        Inches(2.6),
        "Wallet-as-a-Service. Email, Google, Apple, or the wallet they already have. An account, inside the app, just like in FinTech. Believe it or not this was revolutionary.",
        ratio=None,
        max_px=800,
    )

    # 02 THE PROBLEM
    chapter_title(doc, "02", "The problem (or opportunity!)")
    body(
        doc,
        "Right around 2024, Web3 collectively decided to make every app as difficult to use as possible.",
    )
    body(
        doc,
        "From 2023 into 2024, new chains were shipping pretty much daily. L2s, appchains, Bitcoin L2s, modular frameworks, each with their own hype cycle and airdrop. For users, this meant more buttons, new gas tokens, an excess of bridges, and bigger problems tracking their money.",
    )
    quote(
        doc,
        "We had solved onboarding. The new problem was that every user base was disconnected.",
    )
    quote(
        doc,
        "And certainly, the UX company had to find a way to solve it.",
        before=4,
    )

    band = dark_band(doc)
    p_text(
        band,
        "So we began defining the problem, and ringing the alarm.",
        size=22,
        color=PAPER,
        before=4,
        after=14,
        line=1.2,
    )
    article_head(
        band,
        f"{IMG}/frag-hero.jpg",
        "Report  ·  June 2024",
        "State of Web3 fragmentation",
        "Addressing Web3’s biggest problem, and its solution.",
        "https://blog.particle.network/quantifying-the-impact-of-chain-abstraction-exposing-web3s-inefficiencies/",
    )
    kicker(band, "Key findings", color=INVERT_MUTED, before=16, after=8)

    findings = add_nested_table(band, 2, 2)
    no_borders(findings)
    half = int((CONTENT_W - Inches(0.55)) / 2)
    third = int((CONTENT_W - Inches(0.55)) / 3)
    set_col_widths(findings, (half, half))
    data = [
        ("8.29M", "Daily active users in all of Web3. Somehow expected to use 1000+ chains."),
        ("$11B", "Peak quarterly VC into crypto, Q1 2022. Most of it turned into incentives to get new users. Unsustainable."),
        ("$144M+", "Daily bridge volume. About 1/35 of DeFi. Unanimously hated UX."),
        ("75%+", "TVL on most chains sat in the top ten dApps. Ethereum: 85%+. New chains copied; very few profited."),
    ]
    for i, (n, copy) in enumerate(data):
        r, c = divmod(i, 2)
        cell = findings.cell(r, c)
        shade(cell, INK)
        cell_margins(cell, 60, 80, 40, 80)
        finding(cell, n, copy, first=True)

    body(
        band,
        "DeFi TVL was roughly one-twentieth of a $2.1T industry. The (zero-sum) game was forcing users to lock into an ecosystem and never leave.",
        color=PAPER,
        size=13,
        before=12,
    )

    charts = [
        (f"{IMG}/frag-chart-bridge.png", "CEXs still dwarf DEXs. Bridges sit under both."),
        (f"{IMG}/frag-chart-vc.png", "Liquidity piled into the same few rooms, chain after chain."),
        (f"{IMG}/frag-image-2.png", "Activity clustered. Most new networks stayed quiet."),
        (f"{IMG}/frag-image-5.png", "A flood of chains. Almost none of the money moved with them."),
    ]
    image_grid(band, charts, cols=2, width_each=Inches(2.85), dark=True, ratio=None)

    body(
        band,
        "Web3 needed a way to reconcile 1000 chains with the way users really wanted to experience the ecosystem: As an extension of the Internet they already used.",
        color=PAPER,
        size=13,
        before=12,
    )

    # 03 THE PRODUCT
    chapter_title(doc, "03", "The product")
    body(
        doc,
        "A map does not move money. An account does. The sentence needed a product that made it true. Not “please deploy on our L1.” An account that makes the chain disappear, so the user never performs the manual work of living on many networks.",
    )

    band = dark_band(doc)
    article_head(
        band,
        f"{IMG}/ua-hero.png",
        "Product  ·  2024",
        "Universal Accounts",
        "One account. One balance. Any chain. Account-level chain abstraction, shipped.",
        "https://blog.particle.network/universal-accounts/",
    )
    body(
        band,
        "A Universal Account is a smart account that sits across chains. One address. Assets wherever they actually are, treated as one balance. The user does not pick a network, does not bridge, does not hold five gas tokens. They sign. The rest is the product’s problem.",
        color=PAPER,
        size=12,
        before=14,
    )
    body(
        band,
        "Particle’s L1 coordinates. It is not what the user uses. The user uses an account.",
        color=PAPER,
        size=12,
    )

    pillars = add_nested_table(band, 1, 3)
    no_borders(pillars)
    set_col_widths(pillars, (third, third, third))
    pillar_data = [
        ("01", "The account", "One address, ERC-4337, on every chain that matters. The signature is the same. The chain is not the user’s job."),
        ("02", "The liquidity", "Universal Liquidity. Settle, swap, send from the unified balance. The money moves. The user does not."),
        ("03", "The gas", "Universal Gas. Pay the fee in whatever they hold. The destination’s gas token is ours to fetch."),
    ]
    for i, (n, t, d) in enumerate(pillar_data):
        c = pillars.cell(0, i)
        shade(c, INK)
        cell_margins(c, 60, 40, 40, 40)
        kicker(c, n, color=INVERT_MUTED, first=True, after=4)
        p_text(c, t, size=14, color=PAPER, after=4, line=1.2)
        p_text(c, d, size=10, color=INVERT_MUTED, after=4, line=1.4)

    p = band.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    set_p_spacing(p, before=12, after=2, line=1)
    add_picture(p, f"{IMG}/ua-composition.png", Inches(4.6), max_px=1200)
    caption(
        band,
        "How it works. The user sees a balance. Under it: the account, the liquidity layer, the gas layer.",
        color=INVERT_MUTED,
        align="center",
    )
    image_grid(
        band,
        [
            (f"{IMG}/ua-balance.png", "One balance."),
            (f"{IMG}/ua-liquidity.png", "Liquidity, atomic."),
            (f"{IMG}/ua-gas.png", "Gas, in any token."),
        ],
        cols=3,
        width_each=Inches(1.85),
        ratio=None,
    )
    p = band.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    set_p_spacing(p, before=8, after=2, line=1)
    add_picture(p, f"{IMG}/ua-ui.jpeg", Inches(1.55), max_px=500)
    caption(
        band,
        "The interface the definition promised. Tokens on different chains. One number.",
        color=INVERT_MUTED,
        align="center",
    )

    # 04 THE NAME
    chapter_title(doc, "04", "The name")
    body(
        doc,
        "Once the tax had a name, the destination needed one too. A product can live as a spec. A movement needs a sentence other people can pick up and use. “Omnichain smart accounts” is a spec. “Our L1” is a sales pitch. Neither travels. We published a definition so the industry could argue about implementations instead of vocabulary.",
    )

    band = dark_band(doc)
    article_head(
        band,
        f"{IMG}/definition.jpg",
        "Article  ·  June 2024",
        "What is chain abstraction?",
        "The term had grown faster than its meaning. We wrote the definition so other teams could stand in it.",
        "https://blog.particle.network/what-is-chain-abstraction-a-formal-definition/",
    )
    p_text(
        band,
        "Chain abstraction: a user experience exempt from the manual processes required to interact with multiple chains.",
        size=18,
        color=PAPER,
        before=16,
        after=4,
        line=1.25,
    )

    # 05 THE EDGES
    chapter_title(doc, "05", "The edges")
    body(
        doc,
        "The map was the who. Next, what the category is, and what it is not, so other projects could join without becoming us. Three levels: blockchain, account, application. We took account-level on purpose. We already lived where the user sits, where the balance sits, where the signature happens. The other two stayed open so the category was bigger than us.",
    )

    band = dark_band(doc)
    article_head(
        band,
        f"{IMG}/levels-hero.jpg",
        "Article  ·  May 2024",
        "The limits and the core",
        "Blockchain-level, account-level, application-level. A map of what chain abstraction is, and what it is not.",
        "https://blog.particle.network/chain-abstraction-levels-user-experience/",
    )
    p = band.add_paragraph()
    set_p_spacing(p, before=12, after=2, line=1)
    add_picture(p, f"{IMG}/levels.png", Inches(6.1), max_px=1400)
    caption(
        band,
        "Three levels. We took the middle. The other two stayed open.",
        color=INVERT_MUTED,
    )
    image_grid(
        band,
        [
            (f"{IMG}/entering.jpg", "Account-level. Where we already lived, including Bitcoin."),
            (f"{IMG}/intents.jpg", "Application-level. Intents, solvers, the dApp never names a chain."),
        ],
        cols=2,
        width_each=Inches(2.85),
        ratio=16 / 9,
    )
    p = band.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    set_p_spacing(p, before=8, after=2, line=1)
    add_picture(p, f"{IMG}/levels-tweet.jpg", Inches(3.4), max_px=900)
    caption(
        band,
        "The map, published, so other people could stand in a lane.",
        color=INVERT_MUTED,
        align="center",
    )

    # 06 THE MAP
    chapter_title(doc, "06", "The map")
    body(
        doc,
        "A name is not a category until people can see where they stand in it. We mapped which projects mattered most to rally behind the cause: who could play, and how. Not one Particle-shaped hole. A list we could take into a room and ask people to stand in.",
    )

    band = dark_band(doc)
    article_head(
        band,
        f"{IMG}/landscape.jpg",
        "Article  ·  April 2024",
        "Mapping the territory",
        "The projects that had to get behind it. Lanes, so a partner could pick one without becoming a Particle slide.",
        "https://blog.particle.network/chain-abstraction-landscape-report/",
    )
    p_text(
        band,
        "The projects that had to get behind it.",
        size=10,
        color=INVERT_MUTED,
        before=14,
        after=10,
        line=1.4,
    )

    lanes = add_nested_table(band, 1, 3)
    no_borders(lanes)
    third = int((CONTENT_W - Inches(0.55)) / 3)
    set_col_widths(lanes, (third, third, third))
    lane_data = [
        ("Comprehensive", "NEAR\nPolygon AggLayer\nOptimism Superchain\nParticle Network"),
        ("Orchestration", "Agoric\nSocket\nSkip"),
        ("Foundational", "LayerZero\nHyperlane\nAxelar\nZetaChain"),
    ]
    for i, (lab, items) in enumerate(lane_data):
        c = lanes.cell(0, i)
        shade(c, INK)
        cell_margins(c, 40, 40, 40, 40)
        kicker(c, lab, color=INVERT_MUTED, first=True, after=6)
        for line in items.split("\n"):
            p_text(c, line, size=13, color=PAPER, after=2, line=1.25)

    p = band.add_paragraph()
    set_p_spacing(p, before=12, after=2, line=1)
    add_picture(p, f"{IMG}/landscape-map.png", Inches(6.1), max_px=1400)
    caption(
        band,
        "Comprehensive, orchestration, foundational. Lanes, not a single hole.",
        color=INVERT_MUTED,
    )

    # 07 PIONEER
    chapter_title(doc, "07", "Pioneer")
    body(
        doc,
        "Pioneer was the testnet. Co-testnets with partners. People sent, swapped, and held a unified balance while the network was still in rehearsal. It was never the product. It was how we put the account in someone’s hands before it had to be true.",
    )
    paper_image_grid(
        doc,
        [
            (f"{IMG}/cotestnet1.jpg", "Pioneer · co-testnet"),
            (f"{IMG}/cotestnet2.jpg", "Pioneer · rehearsal, not the show"),
        ],
        cols=2,
        width_each=Inches(3.15),
        ratio=3 / 2,
    )

    # 08 THE COALITION
    chapter_title(doc, "08", "The coalition")
    body(
        doc,
        "A definition on a blog does not move an industry. People have to say the problem out loud: on stages, in rooms, on Spaces, with an angle they can use without becoming us. Fragmentation is the tax. Chain abstraction is the destination.",
    )

    band = dark_band(doc)
    article_head(
        band,
        f"{IMG}/coalition.png",
        "Ecosystem  ·  2024",
        "The Chain Abstraction Coalition",
        "An ecosystem initiative. Get projects in the room, talking about the same problem, joining the same category.",
        "https://blog.particle.network/many-blockchains-one-mission-introducing-the-chain-abstraction-coalition/",
    )
    body(
        band,
        "The Coalition was how we expanded the ecosystem. Not a logo wall for a launch week. A list of teams who would talk about fragmentation from their own lane, and, by doing that, make chain abstraction a room other people could enter.",
        color=PAPER,
        size=12,
        before=14,
    )
    body(
        band,
        "Sixty-plus networks signed on. If the category looked like a Particle stunt, it would die in our deck. If other people had a reason to join it, it would travel.",
        color=PAPER,
        size=12,
    )
    kicker(band, "The rooms", color=INVERT_MUTED, before=10, after=8)
    image_grid(
        band,
        [
            (f"{IMG}/ethseoul.jpg", "ETH Seoul · Hong Kong · April 2024"),
            (f"{IMG}/abstract-summit.jpg", "Abstract Summit · TOKEN2049"),
            (f"{IMG}/abstract-coffee.jpg", "Abstract Coffee · pay from any chain"),
            (f"{IMG}/cha-panel.jpg", "Panels, Spaces, the same angle"),
        ],
        cols=2,
        width_each=Inches(2.85),
        ratio=3 / 2,
    )
    p = band.add_paragraph()
    set_p_spacing(p, before=10, after=2, line=1)
    add_picture(p, f"{IMG}/coalition-wall.png", Inches(6.1), max_px=1400)
    caption(
        band,
        "The teams who could stand in the category without becoming us.",
        color=INVERT_MUTED,
    )

    # 09 THE ECHO
    chapter_title(doc, "09", "The echo")
    body(
        doc,
        "The test was whether other people would say it. If the work stayed in our deck, it was a campaign. If it showed up in someone else’s roadmap, it was a category. Polygon built AggLayer so users would not need to know which chain they are on. NEAR called it the next frontier. Arcana named the same primitive: one balance. Messari put it on the 2025 list.",
    )

    echoes = [
        (
            "This is an important kind of chain abstraction: users won’t need to know what chain they’re on.",
            "Polygon · AggLayer",
            "https://polygon.technology/blog/clearing-up-agglayer-misconceptions",
        ),
        (
            "Chain abstraction is the next frontier for web3.",
            "NEAR · Illia Polosukhin",
            "https://pages.near.org/blog/why-chain-abstraction-is-the-next-frontier-for-web3/",
        ),
        (
            "Assets across chains. One balance, one experience.",
            "Arcana · Unified Balance",
            "https://x.com/ArcanaNetwork/status/1926978355049513180",
        ),
        (
            "Chain abstraction is shaping up to be one of the biggest trends to watch in the coming year.",
            "Messari · Crypto Theses 2025",
            "https://messari.io/report/the-crypto-theses-2025",
        ),
    ]
    et = doc.add_table(2, 2)
    no_borders(et)
    table_width(et, int(CONTENT_W))
    half = int(CONTENT_W / 2)
    set_col_widths(et, (half, half))
    for i, (text, who, url) in enumerate(echoes):
        r, c = divmod(i, 2)
        cell = et.cell(r, c)
        shade(cell, PAPER)
        cell_margins(cell, 80, 120, 80, 120)
        # top rule
        hair = cell.paragraphs[0]
        set_p_spacing(hair, 0, 8, 1)
        run = hair.add_run(" ")
        set_run_font(run, size=2, color=RULE)
        # simulate a top border via a 1pt shaded nested table
        p_text(cell, f"“{text}”", size=15, color=INK, after=6, line=1.25)
        hp = cell.add_paragraph()
        set_p_spacing(hp, 0, 4, 1.3)
        hyperlink(hp, who, url, size=10, color=MUTED)

    spacer(doc, 16)
    kicker(doc, "The sentence, elsewhere", before=8, after=6)
    p_text(
        doc,
        "Universal Accounts. One account. One balance. The same line, on pages that were not ours.",
        size=11,
        color=MUTED,
        after=10,
        line=1.45,
    )
    paper_image_grid(
        doc,
        [
            (f"{IMG}/mono-phrase.jpg", "Mono Protocol · one account, one balance, any chain"),
            (f"{IMG}/echo-tria.jpg", "Tria · one app, one balance"),
            (f"{IMG}/echo-onebalance.jpg", "OneBalance · one balance, in the name"),
            (f"{IMG}/echo-arcana.jpg", "Arcana · one balance, one experience"),
            (f"{IMG}/echo-okto.png", "Okto · one wallet, 30+ ecosystems"),
        ],
        cols=2,
        width_each=Inches(3.15),
        ratio=3 / 2,
    )

    # 10 THE NUMBERS
    chapter_title(doc, "10", "The results")
    body(
        doc,
        "The narrative did not only fill rooms. It moved capital. Teams raised on chain abstraction. Analysts wrote it into the year ahead. We used it in public for a $25M raise, so the definition had money behind it, not only a blog.",
    )

    nt = doc.add_table(1, 2)
    no_borders(nt)
    table_width(nt, int(CONTENT_W))
    set_col_widths(nt, (half, half))
    left, right = nt.cell(0, 0), nt.cell(0, 1)
    shade(left, PAPER)
    shade(right, PAPER)
    cell_margins(left, 40, 40, 0, 160)
    cell_margins(right, 40, 40, 160, 0)

    kicker(left, "Particle", first=True, after=6)
    metric(left, "$25M", "Raised to unify all chains. Alibaba Group, Binance Labs, Avalanche, Spartan, and others.")
    metric(left, "110,900", "Universal Accounts, Q1 2025. +557.6% quarter on quarter. Messari.")
    metric(left, "90+", "Teams integrating. 60+ Coalition networks.")

    kicker(right, "The industry", first=True, after=6)
    metric(right, "$2.3B+", "Raised across the chain abstraction and interop map by early 2025. Seventy-two projects.")
    metric(right, "80+", "Projects on the Chain Abstraction Hub. A year earlier the term barely had a definition.")
    metric(right, "$35B+", "Cumulative FDV of live tokens in that map. The category had a fundraising language.")

    spacer(doc, 18)
    body(
        doc,
        "We named the destination, opened the room, and shipped the account that made the definition real. What that account became in the market is the next case.",
    )
    quote(doc, "One account. One balance. Any chain.", size=18, before=8, after=20)

    kicker(doc, "Next", before=8, after=8)
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    set_p_spacing(p, 4, 6, 1)
    add_picture(p, UX_COVER, Inches(5.2), ratio=3 / 2, max_px=1200)
    kicker(doc, "Case study  ·  Retail", after=2)
    p_text(doc, "Universal X", size=20, color=INK, after=4, line=1.15)
    p_text(
        doc,
        "The most competitive market of 2025-2026, and how we managed to stand out.",
        size=11,
        color=MUTED,
        after=24,
        line=1.45,
    )

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    doc.save(OUT)
    os.makedirs(os.path.dirname(OUT2), exist_ok=True)
    doc.save(OUT2)
    print("wrote", OUT, os.path.getsize(OUT))


if __name__ == "__main__":
    build()
