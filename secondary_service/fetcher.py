
def gather_property_info(address):
    # Simulated API calls (you'll replace these with actual requests)
    import random
    from main_service.database import Property, SessionLocal

    db = SessionLocal()

    # Check if property exists, else create
    prop = db.query(Property).filter(Property.address == address).first()
    if not prop:
        prop = Property(address=address)

    # Fake data for example
    prop.type = "Single Family"
    prop.size = 2000
    prop.year_built = 1995
    prop.listing_price = 350000
    prop.last_sold_price = 300000
    prop.rent_estimate = 2200
    prop.days_on_market = 35
    prop.price_per_sqft = prop.listing_price / prop.size
    prop.estimated_value_zillow = 355000
    prop.estimated_value_redfin = 360000
    prop.photos = "url1,url2,url3"
    prop.description = "Beautiful home in great location..."
    prop.gross_yield = (prop.rent_estimate * 12) / prop.listing_price
    prop.cap_rate = 0.065
    prop.historical_prices = '{"2020": 250000, "2022": 300000}'
    prop.tax_history = '{"2022": 3500, "2023": 3600}'
    prop.hoa_fees = 200
    prop.hoa_rules = "No RVs, No short-term rentals"
    prop.roi_inputs = '{"down_payment": 70000, "mortgage_rate": 0.06}'

    db.add(prop)
    db.commit()
    db.close()
