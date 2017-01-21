FROM node

RUN useradd -ms /bin/bash app
RUN mkdir /app && chown app:app app

EXPOSE 8080

USER app
WORKDIR /app

VOLUME ['/app']

ENTRYPOINT ["node", "index.js"]