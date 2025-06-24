
from sqlalchemy import create_engine, Column, String, Integer, Float, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Load variables from .env
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Neon requires SSL
engine = create_engine(DATABASE_URL, connect_args={"sslmode": "require"})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class Property(Base):
    __tablename__ = "properties"
    id = Column(Integer, primary_key=True, index=True)
    address = Column(String, unique=True, index=True)
    type = Column(String)
    size = Column(Float)
    year_built = Column(Integer)
    listing_price = Column(Float)
    last_sold_price = Column(Float)
    rent_estimate = Column(Float)
    days_on_market = Column(Integer)
    price_per_sqft = Column(Float)
    estimated_value_zillow = Column(Float)
    estimated_value_redfin = Column(Float)
    photos = Column(String)  # could be JSON or comma-separated URLs
    description = Column(String)
    gross_yield = Column(Float)
    cap_rate = Column(Float)
    historical_prices = Column(String)  # JSON string
    tax_history = Column(String)  # JSON string
    hoa_fees = Column(Float)
    hoa_rules = Column(String)
    roi_inputs = Column(String)  # JSON string

    def to_dict(self):
        return {col.name: getattr(self, col.name) for col in self.__table__.columns}

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def check_property_data_complete(property):
    required_fields = [
        "type", "size", "year_built", "listing_price", "last_sold_price",
        "rent_estimate", "days_on_market", "price_per_sqft",
        "estimated_value_zillow", "estimated_value_redfin", "photos", "description",
        "gross_yield", "cap_rate", "historical_prices", "tax_history",
        "hoa_fees", "hoa_rules", "roi_inputs"
    ]
    return all(getattr(property, field) is not None for field in required_fields)
