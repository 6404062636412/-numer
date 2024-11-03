# ใช้ Node.js base image
FROM node:16

# กำหนด directory ภายใน container
WORKDIR /usr/src/app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์ทั้งหมดไปที่ container
COPY . .

# เปิด port ที่แอปพลิเคชันใช้
EXPOSE 3000

# คำสั่งสำหรับรันแอปพลิเคชัน
CMD ["npm", "start"]
