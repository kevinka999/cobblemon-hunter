import json
import os
import re
import requests
from pathlib import Path

# Path to the JSON file
JSON_PATH = Path(__file__).parent.parent / "data" / "cobblemon-spawns.json"
# Output directory for images
OUTPUT_DIR = Path(__file__).parent.parent.parent / "public" / "images" / "cobblemon"
# Base URL for images
BASE_URL = "https://cobbledex.b-cdn.net/mons/large"

def normalize_pokemon_name(name: str) -> str:
    """
    Normalize Pokémon name by:
    - Converting to lowercase
    - Removing brackets and content inside (e.g., [Roaming], [Alolan])
    - Stripping extra whitespace
    """
    # Remove brackets and everything inside them
    normalized = re.sub(r'\[.*?\]', '', name)
    # Convert to lowercase and strip whitespace
    normalized = normalized.lower().strip()
    return normalized

def download_image(url: str, output_path: Path) -> bool:
    """
    Download image from URL and save to output path.
    Returns True if successful, False otherwise.
    """
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        
        with open(output_path, 'wb') as f:
            f.write(response.content)
        
        return True
    except requests.RequestException as e:
        print(f"Error downloading {url}: {e}")
        return False

def main():
    # Create output directory if it doesn't exist
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    # Read JSON file
    print(f"Reading JSON from: {JSON_PATH}")
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        pokemon_data = json.load(f)
    
    total = len(pokemon_data)
    print(f"Found {total} Pokémon entries")
    
    successful = 0
    failed = 0
    
    # Process each Pokémon
    for idx, pokemon in enumerate(pokemon_data, 1):
        pokemon_name = pokemon.get("Pokémon", "")
        pokemon_id = pokemon.get("s", "")
        
        if not pokemon_name or not pokemon_id:
            print(f"Skipping entry {idx}: missing name or ID")
            failed += 1
            continue
        
        # Normalize the Pokémon name
        normalized_name = normalize_pokemon_name(pokemon_name)
        
        # Construct image URL
        image_url = f"{BASE_URL}/{normalized_name}.webp"
        
        # Output file path using the "s" property
        output_file = OUTPUT_DIR / f"{pokemon_id}.webp"
        
        # Skip if file already exists
        if output_file.exists():
            print(f"[{idx}/{total}] Skipping {pokemon_name} (ID: {pokemon_id}) - file already exists")
            successful += 1
            continue
        
        # Download image
        print(f"[{idx}/{total}] Downloading {pokemon_name} (ID: {pokemon_id}) from {image_url}")
        if download_image(image_url, output_file):
            print(f"  ✓ Saved to {output_file}")
            successful += 1
        else:
            print(f"  ✗ Failed to download")
            failed += 1
    
    # Summary
    print("\n" + "="*50)
    print(f"Download complete!")
    print(f"Successful: {successful}")
    print(f"Failed: {failed}")
    print(f"Total: {total}")

if __name__ == "__main__":
    main()

