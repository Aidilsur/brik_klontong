# Brik Test Project

## Deskripsi Singkat

Aplikasi ini adalah proyek kecil untuk keperluan pengujian, yang terdiri dari dua bagian utama:

- **brik-frontend**: Bagian frontend aplikasi.
- **brik-backend**: Bagian backend aplikasi.

Aplikasi ini memiliki fitur dasar seperti registrasi, login, dan pengelolaan data tertentu.

## Tech Stack

### Frontend

- Vue.js
- Vite
- TypeScript
- Tailwind CSS
- Axios
- Vue Router
- Pinia

### Backend

- NestJS
- TypeORM
- PostgreSQL
- Bcrypt
- Passport.js

## Cara Instalasi dan Menjalankan Proyek di Lokal

### Prasyarat

- Node.js dan npm sudah terinstal.
- PostgreSQL sudah terinstal dan berjalan.

### Langkah-langkah

1. Clone repository ini:
2. Masuk ke direktori proyek: cd brik_test
3. Instal dependensi untuk backend:

```bash
cd brik_backend
npm install
```

4. Instal dependensi untuk frontend:

```bash
cd ../brik_frontend
npm install
```

5. Jalankan backend:

```bash
cd ../brik_backend
npm run start:dev
```

6. Jalankan frontend:

```bash
cd ../brik_frontend
npm run dev
```

7. Akses aplikasi di browser:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Daftar API Endpoint

### Auth

- POST /auth/register : Registrasi pengguna baru.
- POST /auth/login : Login pengguna.

### User

- GET /user : Mendapatkan daftar pengguna.
- GET /user/:id : Mendapatkan detail pengguna berdasarkan ID.

### Product

- GET /product : Mendapatkan daftar produk.
- POST /product : Menambahkan produk baru.

## Cara Melakukan Seeding Data

1. Masuk ke direktori backend:

```bash
cd brik_backend
npm seed
```

## Catatan Penting

- Pengguna diharapkan untuk registrasi terlebih dahulu sebelum bisa mengakses fitur lain.
- Categories di hardcoded untuk kesederhanaan karena dataset yang kecil dan keterbatasan proyek pengujian.
