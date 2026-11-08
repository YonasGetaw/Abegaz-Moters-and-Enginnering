import urllib.request
import json
import re

url = "https://www.youtube.com/watch?v=pqvsgL3QUS4"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as resp:
        text = resp.read().decode('utf-8', errors='ignore')
        lengths = re.findall(r'"lengthSeconds":"(\d+)"', text)
        title = re.findall(r'<title>(.*?)</title>', text)
        print("Title:", title[0] if title else "Unknown")
        print("Length seconds:", lengths[0] if lengths else "Unknown")
except Exception as e:
    print("Error:", e)
