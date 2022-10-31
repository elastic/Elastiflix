FROM python:3.8.0

COPY tmdb-data /opt/tmdb-data
COPY config /opt/tmdb-config
COPY analytics-data /opt/analytics-data
COPY pip-requirements.txt /tmp/pip-requirements.txt
COPY docker-entrypoint.sh /etc/docker-entrypoint.sh
WORKDIR /etc
RUN chmod +x /etc/docker-entrypoint.sh
RUN apt-get update --allow-releaseinfo-change
RUN apt-get -y install vim
RUN pip3 install -r /tmp/pip-requirements.txt
COPY index-data.py /etc/index-data.py
COPY generate-analytics-input.py /etc/generate-analytics-input.py
ENTRYPOINT [ "/etc/docker-entrypoint.sh" ]
