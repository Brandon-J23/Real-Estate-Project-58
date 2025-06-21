

from celery import Celery
import os
from dotenv import load_dotenv

load_dotenv()

REDIS_BROKER_URL = os.getenv("REDIS_BROKER_URL", "redis://localhost:6379/0")

celery_app = Celery(
    "tasks",
    broker=REDIS_BROKER_URL,
    backend=REDIS_BROKER_URL,
)

@celery_app.task
def fetch_property_data(address):
    # Call the second service (or import logic) to fetch and store the data
    from secondary_service.fetcher import gather_property_info
    gather_property_info(address)
