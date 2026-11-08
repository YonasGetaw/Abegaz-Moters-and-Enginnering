import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

req = urllib.request.Request('https://www.farmafrica.org', headers=headers)
try:
    with urllib.request.urlopen(req, timeout=10) as r:
        html = r.read().decode('utf-8', errors='ignore')
        matches = re.findall(r'https?://[^\s\"\'<>]+(?:assets|img|themes|uploads)[^\s\"\'<>]+\.(?:svg|png|webp|jpg)', html, re.I)
        print('=== Farm Africa Assets ===')
        for m in list(set(matches))[:25]:
            print(m)
except Exception as e:
    print('Error:', e)
