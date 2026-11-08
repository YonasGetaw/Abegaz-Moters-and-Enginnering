import urllib.request
import os

os.makedirs('scratch', exist_ok=True)

# Test downloading thumbnail of DZAdVY9kKbc
url = 'https://img.youtube.com/vi/DZAdVY9kKbc/maxresdefault.jpg'
try:
    urllib.request.urlretrieve(url, 'scratch/DZAdVY9kKbc.jpg')
    print('Downloaded thumbnail for DZAdVY9kKbc')
except Exception as e:
    print('Failed:', e)
