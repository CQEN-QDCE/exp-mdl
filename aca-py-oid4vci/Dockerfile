FROM ghcr.io/hyperledger/aries-cloudagent-python:py3.12-nightly-2024-10-09

USER root

# install plugins as binaries
RUN pip install git+https://github.com/hyperledger/aries-acapy-plugins@main#subdirectory=basicmessage_storage
RUN pip install git+https://github.com/hyperledger/aries-acapy-plugins@main#subdirectory=connection_update
RUN pip install git+https://github.com/CQEN-QDCE/aries-acapy-plugins@main#subdirectory=mso_mdoc
RUN pip install git+https://github.com/CQEN-QDCE/aries-acapy-plugins@main#subdirectory=oid4vci

USER $user
COPY ./configs configs

#CMD ["aca-py"]
