import urllib.request
import json

# Check public high quality car footage from open CDNs
test_urls = [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
]

for u in test_urls:
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as res:
            print(f"Status {res.status} for {u}, size={res.headers.get('content-length')}")
    except Exception as e:
        print(f"Failed {u}: {e}")
