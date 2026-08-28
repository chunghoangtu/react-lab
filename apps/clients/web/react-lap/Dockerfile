FROM node:26-bookworm-slim

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5173

# CMD ["sh", "-c", "npm run dev & npm run stb"]
CMD ["npm", "run", "dev"]