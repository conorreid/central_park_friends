# Base image will setup python
FROM python:3.7.3-slim-stretch

# Need to add some additional OS packages
# These should make it possible to use postgres
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    libpq-dev \
    locales-all \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Setup locale
# defaults to en_US.UTF-8 locale
ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US:en
ENV LC_ALL=en_US.UTF-8

# TODO: how to build the web app?

# copy requirements

WORKDIR /app
COPY ./requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt
COPY . /app
