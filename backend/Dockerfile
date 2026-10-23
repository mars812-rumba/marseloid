FROM python:3.12-slim
WORKDIR /app
COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt && useradd --uid 10001 --create-home app
COPY backend ./backend
USER app
EXPOSE 8102
CMD ["uvicorn", "backend.app:app", "--host", "0.0.0.0", "--port", "8102", "--no-access-log"]
