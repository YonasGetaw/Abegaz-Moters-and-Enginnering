import urllib.request
import json
import ssl

# Test known high-quality royalty-free automotive video CDNs
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# List of high-quality automotive MP4 video clips (cars driving, luxury vehicles, headlights, sleek road movement)
sources = [
    # Wikimedia Commons 1080p/720p car footage
    "https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c8/Driving_through_the_city_at_night.webm/Driving_through_the_city_at_night.webm.720p.vp9.webm",
    # Mixkit free stock car videos (direct CDN)
    "https://assets.mixkit.co/videos/preview/mixkit-car-driving-through-the-streets-of-a-city-at-night-42861-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-the-front-of-a-modern-car-42862-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-white-luxury-car-parked-in-a-garage-43257-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-headlights-of-a-modern-car-at-night-42863-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-front-part-of-a-red-sports-car-42860-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-car-driving-along-a-mountain-road-42864-large.mp4",
    # Coverr direct car video
    "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
]

for url in sources:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=5, context=ctx) as resp:
            print(f"SUCCESS {resp.status} (length {resp.headers.get('content-length')}) -> {url}")
    except Exception as e:
        print(f"FAILED {url} -> {e}")
