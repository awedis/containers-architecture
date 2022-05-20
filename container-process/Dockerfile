FROM python:3-slim-buster
WORKDIR /usr/src/app
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8082
CMD ["python", "app.py"]