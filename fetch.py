import requests
import json

def fetch_places(api_key, text_query, field_mask, latitude, longitude, radius):
    url = "https://places.googleapis.com/v1/places:searchText"
    headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': api_key,
        'X-Goog-FieldMask': field_mask
    }
    data = {
        'textQuery': text_query,
        'locationBias': {
            "circle": {
                "center": {
                    "latitude": latitude,
                    "longitude": longitude
                },
                "radius": radius
            }
        }
    }
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return response.json()  # Return the JSON response
    else:
        return None

def save_data(data, filename='data.json'):
    # Save the data in JSON format
    with open(filename, 'w') as f:
        f.write("")
        json.dump(data, f)
    print("Data saved to", filename)


def main(username):
        # Replace 'YOUR_API_KEY' with your actual Google API key
    with open("apikey.txt", "r") as t:
        API_KEY = t.read()

    # Text query example, adjust it as per your needs
    TEXT_QUERY = "toilets"
    FIELD_MASK = "*"
    with open("locations.json", "r") as t:
        LOCATION = json.load(t)
        tab = LOCATION["locations"]
        for user in tab:
            if user["user_id"] == username:
                CENTER = (user["latitude"], user["longitude"])
        CENTER = (48.8 , 2.3)
    RADIUS = 2000  # Radius in meters

    # Fetch the data using Text Search
    data = fetch_places(API_KEY, TEXT_QUERY, FIELD_MASK, CENTER[0], CENTER[1], RADIUS)

    # Save the data if the request was successful
    if data:
        save_data(data)
    else:
        print("Failed to fetch data")

if __name__ == "__main__":
    u = 'alexandre'
    main(username=u)


