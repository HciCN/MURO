import json
import os
import io
import html
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from PIL import Image

def process_game(game):
    idx = game['id']
    slug = game['slug']
    raw_thumb = game['rawThumb']
    clean_url = html.unescape(raw_thumb)
    
    out_dir = os.path.join(os.path.dirname(__file__), 'games', 'thumbs')
    os.makedirs(out_dir, exist_ok=True)
    
    filename = f"{str(idx).zfill(3)}-{slug}.webp"
    dest_path = os.path.join(out_dir, filename)
    
    # 1. Check if local high-res cover exists first
    games_dir = os.path.join(os.path.dirname(__file__), 'games')
    matched_cover = None
    for folder in os.listdir(games_dir):
        if folder.endswith(slug) and os.path.isdir(os.path.join(games_dir, folder)):
            for candidate in ['cover.webp', 'cover.jpg']:
                c_path = os.path.join(games_dir, folder, candidate)
                if os.path.exists(c_path):
                    matched_cover = c_path
                    break
        if matched_cover:
            break
            
    if matched_cover:
        try:
            im = Image.open(matched_cover)
            im = im.convert('RGB')
            im.thumbnail((300, 400), Image.Resampling.LANCZOS)
            im.save(dest_path, 'WEBP', quality=82)
            return f"[{idx}/150] OK local cover: {filename} ({os.path.getsize(dest_path)} bytes)"
        except Exception:
            pass

    # 2. Download from clean_url
    req = urllib.request.Request(
        clean_url,
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    )
    
    try:
        with urllib.request.urlopen(req, timeout=12) as response:
            data = response.read()
            im = Image.open(io.BytesIO(data))
            im = im.convert('RGB')
            im.thumbnail((300, 400), Image.Resampling.LANCZOS)
            im.save(dest_path, 'WEBP', quality=82)
            return f"[{idx}/150] OK downloaded: {filename} ({os.path.getsize(dest_path)} bytes)"
    except Exception as e:
        # Fallback placeholder only if nothing exists
        if not os.path.exists(dest_path) or os.path.getsize(dest_path) < 500:
            try:
                from PIL import ImageDraw
                img = Image.new('RGB', (240, 320), color=(20, 20, 24))
                draw = ImageDraw.Draw(img)
                draw.rectangle([2, 2, 237, 317], outline=(60, 60, 70), width=2)
                draw.text((20, 140), game['cnTitle'][:8], fill=(220, 220, 220))
                draw.text((20, 170), game['category'], fill=(140, 140, 140))
                img.save(dest_path, 'WEBP', quality=80)
                return f"[{idx}/150] Fallback placeholder: {filename}"
            except Exception:
                pass
        return f"[{idx}/150] Kept/Error: {e}"

def main():
    with open('games_150_fitgirl.json', 'r', encoding='utf-8') as f:
        games = json.load(f)
        
    print(f"Starting unescaped download and WebP conversion for {len(games)} games...")
    with ThreadPoolExecutor(max_workers=10) as executor:
        results = list(executor.map(process_game, games))
        
    ok_count = sum(1 for r in results if 'OK' in r)
    print(f"\nDone! {ok_count}/{len(games)} downloaded and converted to WebP successfully.")

if __name__ == '__main__':
    main()
