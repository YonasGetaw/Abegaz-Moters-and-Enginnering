import urllib.request
import json
import os
from PIL import Image
import numpy as np

def test_video(vid, title):
    thumb_url = f"https://img.youtube.com/vi/{vid}/hqdefault.jpg"
    out_path = f"scratch/{vid}.jpg"
    try:
        urllib.request.urlretrieve(thumb_url, out_path)
        img = Image.open(out_path).convert('RGB')
        arr = np.array(img)
        r = arr[:,:,0].astype(float)
        g = arr[:,:,1].astype(float)
        b = arr[:,:,2].astype(float)
        brightness = (r + g + b) / 3.0
        avg_brightness = brightness.mean()
        # Redness score: pixels where red is significantly greater than green and blue
        red_mask = (r > 100) & (r > g * 1.25) & (r > b * 1.25)
        red_pct = red_mask.sum() / red_mask.size * 100.0
        print(f"[{vid}] {title[:40]:<40} | Brightness: {avg_brightness:5.1f} | Red%: {red_pct:4.1f}%")
        return avg_brightness, red_pct
    except Exception as e:
        print(f"[{vid}] error: {e}")
        return 0, 0

if __name__ == '__main__':
    videos = [
        ('hDuo7rbMLPk', 'Supra MK4 B Roll Edit'),
        ('n3Kj56Bu1-0', 'GR Supra A90 X 2 Legacy'),
        ('DZAdVY9kKbc', 'Porsche 911 GT3'),
        ('MktCSJmpTI4', 'BMW M4 Competition'),
    ]
    for vid, title in videos:
        test_video(vid, title)
