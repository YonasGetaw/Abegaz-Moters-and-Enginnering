import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
req = urllib.request.Request('https://www.farmafrica.org', headers=headers)
with urllib.request.urlopen(req, timeout=10) as r:
    html = r.read().decode('utf-8', errors='ignore')
    svgs = re.findall(r'<svg[^>]*>.*?</svg>', html, re.DOTALL)
    for s in svgs:
        if 'logo-green' in s or 'farm' in s.lower():
            with open('public/partners/farm-africa.svg', 'w', encoding='utf-8') as f:
                f.write(s)
            print(f'SAVED Farm Africa SVG ({len(s)} bytes)')
            break
