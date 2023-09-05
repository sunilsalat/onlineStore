FROM python:3.9-slim

ENV PYTHONUNBUFFERED 1
WORKDIR /app
COPY ./requirements.txt /app/
COPY ./mysite /app/
RUN pip install --user -r requirements.txt
#COPY . /code/
# Use this command if you use bind mount
#WINDOWS: docker run --mount src=%cd%,target=/code,type=bind -p 8001:8000 -it --rm django-dev
#LINUX: docker run --mount src="${pwd}",target=/code,type=bind -p 8001:8000 -it --rm django-dev
CMD python manage.py runserver 8003