FROM debian:stable-slim

WORKDIR /var/www/html

ENV SHELL /bin/bash

RUN apt-get -qq update \
  && apt-get -qq -y install curl zip unzip \
  && curl -fsSL https://deno.land/x/install/install.sh | sh

RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
RUN apt-get -qq -y install gcc

RUN apt-get -qq remove curl zip unzip \
  && apt-get -qq remove --purge -y curl zip unzip \
  && apt-get -qq -y autoremove \
  && apt-get -qq clean \
  && echo 'export DENO_INSTALL="/root/.deno"' >> ~/.bash_profile \
  && echo 'export PATH="$DENO_INSTALL/bin:$PATH"' >> ~/.bash_profile

CMD ["/bin/bash", "-c", "source ~/.bash_profile && source $HOME/.cargo/env && bash"]
