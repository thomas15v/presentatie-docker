FROM node

EXPOSE 8080

WORKDIR /app

ENTRYPOINT ["node", "index.js"]