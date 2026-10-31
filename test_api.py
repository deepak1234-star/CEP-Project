import base64
import json
import urllib.request
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

def test_image(img_path):
    print(f"\n==========================================")
    print(f"Testing image: {img_path}")
    print(f"==========================================")
    with open(img_path, "rb") as f:
        b64 = "data:image/jpeg;base64," + base64.b64encode(f.read()).decode("utf-8")

    payload = json.dumps({"imageBase64": b64}).encode("utf-8")
    req = urllib.request.Request(
        "http://localhost:3000/api/classify",
        data=payload,
        headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req, timeout=45) as res:
            data = json.loads(res.read().decode("utf-8"))
            item = data.get("result", {})
            print("ITEM NAME           :", item.get("itemName"))
            print("CATEGORY            :", item.get("category"))
            print("BIN TYPE            :", item.get("binType"))
            print("BIN COLOR           :", item.get("binColor"))
            print("CONFIDENCE          :", item.get("confidence"), "%")
            print("PREPARATION ACTION  :", item.get("preparationAction"))
            print("RECYCLABILITY RATING:", item.get("recyclabilityRating"))
            print("DECOMPOSITION TIME  :", item.get("decompositionTime"))
            print("CO2 SAVED PER KG    :", item.get("co2SavedPerKg"))
            print("COMMON MISTAKE      :", item.get("commonMistake"))
            print("EXPLANATION         :", item.get("explanation"))
            print("DOs                 :", item.get("dos"))
            print("DONTs               :", item.get("donts"))
            print("CLASSIFICATION NOTE :", item.get("classificationNote"))
            return item
    except Exception as e:
        print("Error during request:", e)
        return None

if __name__ == "__main__":
    test_image("test_images/ewaste.jpg")
    test_image("test_images/food_packaging.jpg")
