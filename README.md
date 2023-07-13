# Instalasi

Clone repository ini dengan perintah berikut:.\
`git clone https://github.com/JavierZam/apiuser`

Masuk ke dalam direktori repository dengan perintah:.\
`cd apiuser`

Jalankan perintah berikut untuk menginstall dependency:.\
`npm install`

Buat file .env di root directory dan isi dengan variabel firebase sebagai berikut:<br>
<br>
FIREBASE_API_KEY=your-api-key<br>
FIREBASE_AUTH_DOMAIN=your-auth-domain<br>
FIREBASE_PROJECT_ID=your-project-id<br>
FIREBASE_STORAGE_BUCKET=your-storage-bucket<br>
FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id<br>
FIREBASE_APP_ID=your-app-id

Pastikan untuk mengganti your-api-key, your-auth-domain, your-project-id, your-storage-bucket,
your-messaging-sender-id, dan your-app-id dengan nilai yang sesuai dari akun Firebase Anda.

# Endpoints

| Method | Endpoint            | Handler         |
| ------ | ------------------- | --------------- |
| POST   | /register           | registerUser()  |
| POST   | /login              | loginUser()     |
| POST   | /reset-password     | resetPassword() |
| GET    | /user/{uid}         | getUserData()   |
| POST   | /logout             | logoutUser()    |
| PUT    | /edit-profile/{uid} | editProfile()   |

### POST /register

Mendaftarkan user baru ke dalam aplikasi.

Request body:

```json
{
  "email": "emailuser@contoh.com",
  "password": "passworduser"
}
```

Response:

```json
{
  "data": {
    "message": "User registered",
    "uid": "uiduser"
  },
  "message": "",
  "code_respon": 200
}
```

```json
{
  "data": {},
  "message": "error message",
  "code_respon": 400
}
```

### POST /login

Melakukan login user ke dalam aplikasi.

Request body:

```json
{
  "email": "emailuser@contoh.com",
  "password": "passworduser"
}
```

Response:

```json
{
  "data": {
    "uid": "uiduser",
    "email": "emailuser@contoh.com",
    "token": "eyJhsSUH2...."
  },
  "message": "",
  "code_respon": 200
}
```

```json
{
  "data": {},
  "message": "Error logging in user",
  "code_respon": 500
}
```

### POST /reset-password

Meminta reset password user.

Request body:

```json
{
  "email": "emailuser@contoh.com"
}
```

Response:

```json
{
  "data": {},
  "message": "Password reset email sent",
  "code_respon": 200
}
```

```json
{
  "data": {},
  "message": "error message",
  "code_respon": 400
}
```

```json
{
  "data": {},
  "message": "Error resetting password",
  "code_respon": 500
}
```

### GET /user/{uid}

Mengambil informasi user berdasarkan uid.

Request parameter:

uid: uid user

Response:

```json
{
  "data": {
    "email": "emailuser@contoh.com",
    "phone": "081234567890"
  },
  "message": "",
  "code_respon": 200
}
```

```json
{
  "data": {
    "email": "emailuser@contoh.com",
    "phone": "081234567890"
  },
  "message": "",
  "code_respon": 200
}
```

```json
{
  "data": {},
  "message": "Error fetching user data",
  "code_respon": 500
}
```

### POST /logout

Melakukan logout user dari aplikasi.

Response:
```json
{
"data": {},
"message": "User logged out successfully",
"code_respon": 200
}
```
### PUT /edit-profile/{uid}

Mengubah informasi profil user berdasarkan uid.

Request parameter:

uid: uid user
Request body:

```json
{
  "email": "emailuserbaru@contoh.com",
  "password": "passworduserbaru",
  "phone": "081234567891",
  "currentEmail": "emailuserlama@contoh.com",
  "currentPassword": "passworduserlama"
}
```

Response:

```json
{
  "data": {},
  "message": "Profile updated successfully",
  "code_respon": 200
}
```

```json
{
  "data": {},
  "message": "User not authorized to edit this profile",
  "code_respon": 403
}
```

```json
{
  "data": {},
  "message": "Error updating profile",
  "code_respon": 500
}
```
