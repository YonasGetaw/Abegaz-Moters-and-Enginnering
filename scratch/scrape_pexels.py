import urllib.request
import json
import re

# Fetch Pexels red car video page to find direct HD mp4 links
url = "https://www.pexels.com/search/videos/red%20car/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})

try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        # Pexels embeds video links in json or data-attributes
        video_ids = re.findall(r'/video/([a-zA-Z0-9_-]+-\d+)/', html)
        print("Found video IDs:", list(set(video_ids))[:5])
        
        # Also find direct video-files CDN URLs
        cdn_urls = re.findall(r'(https://[^\s"\']+\.mp4[^\s"\']*)', html)
        print("Direct CDN URLs:", cdn_urls[:5])
except Exception as e:
    print("Pexels fetch error:", e)
