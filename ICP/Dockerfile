# Use a base image with the desired OS (e.g., Ubuntu, Debian, etc.)
FROM ubuntu:24.10 AS build

ARG passphrase
ENV PASSPHRASE=${passphrase}

WORKDIR /pki/data

# Build and Copy passphrase
RUN echo ${PASSPHRASE} > .passphrase && echo ${PASSPHRASE} >> .passphrase && pwd && ls -la && cat .passphrase

# Install SSH server
RUN apt-get update && apt-get install -y openssh-server && apt-get clean

RUN apt-get install nano tree
COPY . .
#RUN ls -la

# Run script
RUN ./deploy.sh

# Permissions for ACX/ca/private
#RUN chmod -R 740 AC*/ca/private

FROM ubuntu:24.10

ARG causerpsswd
ENV causerpsswd=${causerpsswd}

# Install SSH server
RUN apt-get update && apt-get install -y openssh-server nano tree && apt-get clean

# Create an SSH group
RUN groupadd cagroup    
# Create an SSH user
RUN useradd -rm -d /home/causer -s /bin/bash -g cagroup -G sudo -u 1001 causer
# Set the SSH user's password (replace "password" with your desired password)
RUN echo 'causer:'${causerpsswd} | chpasswd

WORKDIR /icpGouv

# Copy pki-cqen files
RUN ls -la
COPY --from=build /icpGouv .

# Permissions for SSH user
RUN chown -R causer:cagroup /icpGouv

# Allow SSH access
# RUN mkdir /var/run/sshd
# RUN pwd && whoami && ls -la && ls -la /pki/data/ACIntermediaire/ca && ls -la /pki/data/ACIntermediaire/ca/private

VOLUME /icpGouv

# Start the bash shell
RUN /bin/bash

# Expose the SSH port
EXPOSE 22
# Start SSH server on container startup
CMD ["/usr/sbin/sshd", "-D"]

