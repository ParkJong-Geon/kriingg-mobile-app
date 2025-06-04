# Kriingg Mobile App 📱

Aplikasi mobile sederhana berbasis **React Native (Expo)** untuk manajemen menu, yang mendukung:
- Register pengguna baru
- Login menggunakan Basic Auth
- Melihat daftar menu
- Menambahkan, mengedit, dan menghapus menu

---

##  Instalasi & Menjalankan

### 1. Clone Repository
dad
```
git clone https://github.com/USERNAME/kriingg-mobile-app.git
cd kriingg-mobile-app
```
2. Install Dependency
```
npm install
```
3. Jalankan Aplikasi
```
npx expo start
```
Struktur Proyek
```
📁 assets             # Ikon dan gambar splash
📁 components
│  └── navigation/
│      └── AppNavigator.js
📁 screens            # Halaman utama aplikasi
│  ├── LoginScreen.js
│  ├── RegisterScreen.js
│  ├── MenuListScreen.js
│  ├── MenuFormScreen.js
│  └── MenuDetailScreen.js
📁 services           # Modul auth dan API
│  ├── auth.js
│  └── api.js
├── App.js
├── app.json
├── package.json
└── README.md

```

## 📸 Screenshot Aplikasi

### Register Screen

![Register Screen](assets/screenshot%20app/signup.jpg)

### Login Screen

![Register Screen](assets/screenshot%20app/login.jpg)

### Menu List Screen

![Menu List](assets/screenshot%20app/menulist_1.jpg)

### Menu Form

![Menu List](assets/screenshot%20app/menuform.jpg)

### Menu List 2 Screen

![Menu List](assets/screenshot%20app/menulist_2.jpg)

### Menu Detail Screen

![Menu List](assets/screenshot%20app/menudetail.jpg)

### Menu Edit Form

![Menu List](assets/screenshot%20app/editform.jpg)

