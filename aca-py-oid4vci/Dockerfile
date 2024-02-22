FROM ghcr.io/hyperledger/aries-cloudagent-python:py3.9-0.11.0

USER root

# install plugins as binaries
RUN pip install git+https://github.com/hyperledger/aries-acapy-plugins@main#subdirectory=basicmessage_storage
RUN pip install git+https://github.com/hyperledger/aries-acapy-plugins@main#subdirectory=connection_update

USER $user
COPY ./configs configs

CMD ["aca-py"]