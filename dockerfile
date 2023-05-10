# Menggunakan Node.js versi 16 sebagai dasar gambar
FROM node:16

# Menentukan direktori kerja di dalam kontainer
WORKDIR /app

ENV PORT 8080

# Menyalin package.json dan package-lock.json ke dalam kontainer
COPY package*.json ./

# Menginstal dependensi aplikasi
RUN npm install

# Menyalin semua file sumber ke dalam kontainer
COPY . .

EXPOSE 8080

# Menjalankan aplikasi pada port 8080 saat kontainer dijalankan
CMD [ "npm", "run", "start" ]
