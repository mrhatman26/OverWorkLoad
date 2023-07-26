FROM python:3
ADD . /UniCompStack
WORKDIR /UniCompStack
COPY requirements.txt /UniCompStack
RUN pip install -r requirements.txt