Here's a concise **README.md** with setup instructions and the requested `.env` file:

---

# Candidates Management System

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/pushpark/candidatesManager.git
cd candidatesManager
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=3004
DB_URL="mongodb+srv://pushpark:dheeran1@cluster0.ulcxz3f.mongodb.net/candidatesdb?retryWrites=true&w=majority&appName=Cluster0"
```

Start server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Start React app:
```bash
npm start
```

---

## .env Files

### Backend (save in `/backend/.env`)
```env
PORT=3004
DB_URL="mongodb+srv://pushpark:dheeran1@cluster0.ulcxz3f.mongodb.net/candidatesdb?retryWrites=true&w=majority&appName=Cluster0"
```

---

## Access the App
- Backend: `http://localhost:3004`
- Frontend: `http://localhost:3000`

---

**Important**: Change the MongoDB credentials immediately after testing as they are exposed in this README. For production, use environment-secured variables.
