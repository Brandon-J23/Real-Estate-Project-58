import requests
from dotenv import load_dotenv
import os
import pandas as pd
import time

# Load environment variables from .env.local
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env.local"))

def get_bbl(house_number, street, zip_code):
    url = "https://api.nyc.gov/geoclient/v2/address.json"
    
    # Debug: Check if the API key is loaded
    api_key = os.getenv("NYC_GEOCLIENT_APP_KEY")
    print(f"API Key loaded: {api_key[:10]}..." if api_key else "API Key not found!")
    
    params = {
        "houseNumber": house_number,
        "street": street,
        "zip": zip_code
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

def process_csv_with_bbl(csv_file_path):
    """
    Read CSV file, get BBL for each address, and update the CSV with BBL data
    """
    try:
        # Read the CSV file
        df = pd.read_csv(csv_file_path)
        print(f"Loaded {len(df)} properties from CSV")
        
        # Add an ACRIS link column if it doesn't exist
        if 'acris_link' not in df.columns:
            df['acris_link'] = None
        
        # Process each row
        for index, row in df.iterrows():
            address = str(row['address'])
            zip_code = str(row['zip_code'])
            
            print(f"Processing property {index + 1}/{len(df)}: {address}, {zip_code}")
            
            # Parse the address to extract house number and street
            parts = address.strip().split()
            if len(parts) >= 2:
                house_number = parts[0]
                street = ' '.join(parts[1:])  # Everything after house number is street
                
                # Get BBL from API
                bbl = get_bbl(house_number, street, zip_code)
                
                if bbl:
                    # Create the link to the property information portal
                    bbl_link = f"https://propertyinformationportal.nyc.gov/parcels/parcel/{bbl}"
                    df.at[index, 'acris_link'] = bbl_link
                    print(f"BBL found: {bbl}")
                    print(f"Link created: {bbl_link}")
                else:
                    print("No BBL found")
            else:
                print(f"Could not parse address: {address}")
            
            # Add delay to respect API rate limits
            time.sleep(0.5)  # Wait 0.5 seconds between requests
        
        # Save the updated CSV
        df.to_csv(csv_file_path, index=False)
        print(f"Updated CSV saved to {csv_file_path}")
        
    except Exception as e:
        print(f"Error processing CSV: {e}")

# Main execution
if __name__ == "__main__":
    # Path to the CSV file
    csv_path = r"C:\Users\jacky\S25Proj\mock_properties.csv"
    
    print("Starting BBL processing for mock_properties.csv...")
    process_csv_with_bbl(csv_path)