# ProWarranty

### Product Warranty Registration Portal

A full-stack web application for registering products and managing their warranty details with JWT-based authentication.

## Technologies

### Frontend
- React 18
- Vite
- React Router
- Lucide React Icons

### Backend
- Java 17
- Spring Boot 3.3.4
- Spring Security with JWT
- Spring Data JPA
- H2 Database

## Project Structure

```text
ProWarranty/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── backend/
│   ├── src/main/java/com/prowarranty/
│   ├── src/main/resources/
│   └── pom.xml
│
└── README.md
```

## Getting Started

### Prerequisites
- Java 17+
- Maven 3.8+
- Node.js 16+
- npm

### Backend Setup

```bash
cd backend
mvn spring-boot:run
```

The backend will start at `http://localhost:8080`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new user

### Warranties
- `GET /api/warranties` - Get all warranties
- `POST /api/warranties` - Register new product warranty

### Claims
- `POST /api/claims` - Submit warranty claim

### Health
- `GET /api/health` - Health check

## Default Pages

- `/` - Login page
- `/welcome` - Welcome/success page (requires authentication)

## License

MIT
