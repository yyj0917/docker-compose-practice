# frontend/Dockerfile

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# Next.js 개발 서버 실행
CMD ["npm", "run", "dev"]