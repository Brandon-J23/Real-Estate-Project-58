# Use official Python base image
FROM python:3.11-slim

# Set working directory inside container
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files into container
COPY . .

# Default command for FastAPI (for web container)
CMD ["uvicorn", "main_service.main:app", "--host", "0.0.0.0", "--port", "8000"]
