

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from main import get_db, Property, check_property_data_complete
from tasks import fetch_property_data
from dotenv import load_dotenv
load_dotenv()  # This looks for .env in the current working directory

app = FastAPI()

class PropertyRequest(BaseModel):
    address: str

@app.post("/property-info")
def get_property_info(request: PropertyRequest, db: Session = get_db()):
    property = db.query(Property).filter(Property.address == request.address).first()

    if property and check_property_data_complete(property):
        return property.to_dict()
    
    # Trigger secondary service via Celery
    fetch_property_data.delay(request.address)
    return {"status": "fetching", "message": "Data is being gathered, check back soon."}
