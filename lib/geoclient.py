import requests
from dotenv import load_dotenv
import os

# Load environment variables from .env.local
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env.local"))

def get_bbl(house_number, street, borough):
    url = "https://api.nyc.gov/geoclient/v2/address.json"
    
    # Debug: Check if the API key is loaded
    api_key = os.getenv("NYC_GEOCLIENT_APP_KEY")
    print(f"API Key loaded: {api_key[:10]}..." if api_key else "API Key not found!")
    
    params = {
        "houseNumber": house_number,
        "street": street,
        "borough": borough
    }
    headers = {
        "Ocp-Apim-Subscription-Key": api_key
    }
    response = requests.get(url, params=params, headers=headers)
    if response.status_code == 200:
        data = response.json()
        return data.get("address", {}).get("bbl")
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return None

# Example usage
address_input = input("Enter address (e.g., '123 Broadway Manhattan'): ")
parts = address_input.strip().split()

if len(parts) >= 3:
    # Assume the first part is house number, last part is borough, everything in between is street
    house_number = parts[0]
    borough = parts[-1]
    street = ' '.join(parts[1:-1])  # Join all middle parts as street name
    
    bbl = get_bbl(house_number, street, borough)
else:
    print("Please enter address in the format: house_number street_name borough")
    bbl = None
print("BBL:", bbl)

if bbl:
    print("https://propertyinformationportal.nyc.gov/parcels/parcel/" + str(bbl))