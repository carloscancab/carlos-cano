/**
 * Encode a PNG buffer (a Playwright screenshot) to a high-quality JPEG with
 * Pillow: quality 92, 4:4:4 chroma (no subsampling, so thin type and ink
 * edges stay crisp), optimized Huffman tables, progressive. Chrome's own JPEG
 * encoder only drops chroma subsampling at quality 100.
 *
 * Needs Python 3 with Pillow; set OG_PYTHON to pick the interpreter
 * (e.g. a venv: OG_PYTHON=/tmp/ogvenv/bin/python).
 */
import { spawnSync } from "node:child_process";
import { statSync } from "node:fs";

const PY = `
import io, sys
from PIL import Image
im = Image.open(io.BytesIO(sys.stdin.buffer.read())).convert("RGB")
im.save(sys.argv[1], "JPEG", quality=int(sys.argv[2]), subsampling=0, optimize=True, progressive=True)
`;

export const MAX_BYTES = 5 * 1024 * 1024; // LinkedIn / X limit

export function writeJpeg(png, out, quality = 92) {
  const python = process.env.OG_PYTHON || "python3";
  const res = spawnSync(python, ["-c", PY, out, String(quality)], { input: png, maxBuffer: 64 << 20 });
  if (res.status !== 0) {
    throw new Error(`JPEG encode failed (${python}): ${res.stderr?.toString() || res.error}`);
  }
  const bytes = statSync(out).size;
  if (bytes > MAX_BYTES) throw new Error(`${out} is ${bytes} bytes, over the 5 MB share-image limit`);
  return bytes;
}
