FROM debian:stretch

# unzip, zip, python, build-essential (make, gcc and more) ...
RUN apt-get update && \
    apt-get -y --fix-missing install ca-certificates apt-utils curl rsync unzip zip python3 python-pip groff openssh-client git-core build-essential jq && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# terraform
ENV TERRAFORM_VERSION 1.0.11
ENV TERRAFORM_CHECKSUM eeb46091a42dc303c3a3c300640c7774ab25cbee5083dafa5fd83b54c8aca664
RUN curl -fsSL https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip -o terraform.zip  && \
    echo "${TERRAFORM_CHECKSUM} terraform.zip" | sha256sum -c - && \
    unzip terraform.zip -d /usr/local/bin && chmod +x /usr/local/bin/terraform ; rm terraform.zip

RUN curl https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip -o awscliv2.zip && \
    unzip awscliv2.zip && \
    aws/install -i /usr/local/aws -b /usr/local/bin && \
    rm awscliv2.zip && rm -rf ./aws

WORKDIR /build
ENTRYPOINT [ "/usr/bin/make" ]
