FROM python

# Create app directory
WORKDIR /app

# Install app dependencies
COPY requirements.txt .

RUN pip install -r requirements.txt

# Bundle app source
COPY . .

EXPOSE 8004
CMD ["python","server.py"]