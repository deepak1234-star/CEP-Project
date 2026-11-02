import os
import sys
from google import genai
import PIL.Image

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

def load_env_file():
    """Loads environment variables from .env.local or .env if present."""
    for env_file in [".env.local", ".env"]:
        env_path = os.path.join(os.path.dirname(__file__), env_file)
        if os.path.exists(env_path):
            with open(env_path, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        k, v = line.split("=", 1)
                        k, v = k.strip(), v.strip()
                        if k and not os.getenv(k):
                            os.environ[k] = v

load_env_file()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    print("Warning: GEMINI_API_KEY is not set. Please define GEMINI_API_KEY in .env.local or your environment.")
client = genai.Client(api_key=GEMINI_API_KEY) if GEMINI_API_KEY else None

def analyze_waste_image(image_path: str = "scanned_image.jpg"):
    """
    Analyzes an image using Google Gemini to classify waste and provide recycling instructions.
    """
    if not client:
        print("Error: Gemini client is not initialized. Please set GEMINI_API_KEY in .env.local.")
        return

    if not os.path.exists(image_path):
        print(f"Error: Image file '{image_path}' not found.")
        print("Please place an image file (e.g. bottle, can, paper) and run again.")
        return

    print(f"Loading image '{image_path}'...")
    scanned_file = PIL.Image.open(image_path)

    prompt = (
        "You are WasteIQ AI, an expert environmental recycling assistant. "
        "Analyze this item and classify it into one of these categories: "
        "Organic, Paper, Plastic, Metal, Glass, E-Waste, or Hazardous. "
        "Identify: 1) Item name, 2) Material category, 3) Resin identification code (#1-7) if plastic, "
        "4) Correct disposal bin color (Green, Blue, Yellow, Purple, or Red), "
        "5) Preparation steps (e.g., rinse, crush, remove cap), "
        "6) Recyclability rating and landfill decomposition lifespan."
    )

    print("Sending image to Gemini (gemini-3.5-flash)...")
    try:
        response = client.models.generate_content(
            model="gemini-3.5-flash",
            contents=[prompt, scanned_file]
        )
        print("\n--- WasteIQ AI Waste Analysis ---")
        print(response.text)
    except Exception as e:
        print(f"Error calling Gemini: {e}")

if __name__ == "__main__":
    target_img = sys.argv[1] if len(sys.argv) > 1 else "scanned_image.jpg"
    analyze_waste_image(target_img)
