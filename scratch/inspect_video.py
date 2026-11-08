import urllib.request
import json
import re

url = "https://www.pexels.com/video/red-car-driving-on-suburban-street-30088042/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})

try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        mp4s = re.findall(r'https://[^\s"\']+\.mp4[^\s"\']*', html)
        print("MP4s on page:", mp4s[:5])
except Exception as e:
    print("Error:", e)
