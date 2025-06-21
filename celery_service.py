from main_service.tasks import celery_app

# This script allows you to run the celery worker using this command:
# celery -A celery_worker.celery_app worker --loglevel=info

# No extra code needed here — it's just an import shortcut