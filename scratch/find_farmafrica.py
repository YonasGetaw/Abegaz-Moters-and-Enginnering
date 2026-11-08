import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
req = urllib.request.Request('https://www.farmafrica.org', headers=headers)
with urllib.request.urlopen(req, timeout=10) as r:
    html = r.read().decode('utf-8', errors='ignore')
    svgs = re.findall(r'<svg[^>]*>.*?</svg>', html, re.DOTALL)
    print(f'Total SVGs: {len(svgs)}')
    for i, s in enumerate(svgs[:5]):
        print(f'SVG #{i}: length {len(s)}, snippet: {s[:150]}...')
