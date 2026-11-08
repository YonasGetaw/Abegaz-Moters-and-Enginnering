import imageio.v3 as iio
from PIL import Image
import os

video_path = "public/red-car-bg.mp4"
try:
    frames = []
    # Read frames at interval
    for idx, frame in enumerate(iio.imiter(video_path)):
        if idx in [10, 60, 150, 300, 500, 700]:
            img = Image.fromarray(frame)
            out_name = f"scratch/frame_{idx}.jpg"
            img.save(out_name)
            frames.append((idx, img.size))
    print("Extracted frames:", frames)
except Exception as e:
    print("Error reading frames:", e)
