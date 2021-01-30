FROM ubuntu:18.04

WORKDIR /var/www/html

RUN apt-get -qq update \
  && apt-get -qq -y install curl zip unzip \
  && curl -fsSL https://deno.land/x/install/install.sh | sh \
  && apt-get -qq remove curl zip unzip \
  && apt-get -qq remove --purge -y curl zip unzip

  RUN echo 'export DENO_INSTALL="/root/.deno"' >> ~/.bash_profile
  RUN echo 'export PATH="$DENO_INSTALL/bin:$PATH"' >> ~/.bash_profile