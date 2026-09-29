"""Gera a prévia em arquivo único (docs/ -> luana-nunes-preview.html).

CSS, JS, favicon e imagens entram dentro do HTML, então o arquivo pode ser
enviado por WhatsApp/e-mail e aberto direto no navegador, sem pasta de assets.
Uso: python3 build_preview.py
"""
import base64
import pathlib
import re

ROOT = pathlib.Path(__file__).parent
SITE = ROOT / "docs"
OUT = ROOT / "luana-nunes-preview.html"
MIME = {".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml"}


def data_uri(rel):
    path = SITE / rel
    b64 = base64.b64encode(path.read_bytes()).decode()
    return f"data:{MIME[path.suffix]};base64,{b64}"


html = (SITE / "index.html").read_text(encoding="utf-8")
css = (SITE / "css/style.css").read_text(encoding="utf-8")
js = (SITE / "js/main.js").read_text(encoding="utf-8")

html = html.replace('<link rel="stylesheet" href="css/style.css">', f"<style>\n{css}</style>")
html = html.replace('<script src="js/main.js"></script>', f"<script>\n{js}</script>")
# og:image precisa de URL absoluta; na prévia ela não serve para nada
html = re.sub(r'\s*<meta property="og:image"[^>]*>', "", html)
html = re.sub(r'"(assets/[^"]+)"', lambda m: '"' + data_uri(m.group(1)) + '"', html)
# imagens embutidas não precisam de lazy load
html = html.replace(' loading="lazy"', "")

OUT.parent.mkdir(exist_ok=True)
OUT.write_text(html, encoding="utf-8")
print(f"{OUT.relative_to(ROOT)}: {OUT.stat().st_size / 1024:.0f} KB")
