# This_Project_Aims_To_Develop_A_Backend_Api_For_The_Hotel_Booking_Application_User_Interface_System_Using_Fastapi_And_Sqlalchemy. Backend API

Complete FastAPI backend with authentication, database models, and API endpoints.

## Features

- FastAPI framework with automatic OpenAPI documentation
- JWT authentication with user registration/login
- SQLAlchemy ORM with database models
- Pydantic schemas for request/response validation
- CORS middleware for frontend integration
- Comprehensive error handling
- Database migrations with Alembic

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Run the application:
```bash
python main.py
```

Or with uvicorn:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### Authentication
- POST `/auth/register` - Register new user
- POST `/auth/login` - Login user

### Core Endpoints
- GET `/api/items` - Get all items
- POST `/api/items` - Create new item
- PUT `/api/items/<built-in function id>` - Update item
- DELETE `/api/items/<built-in function id>` - Delete item

## Database

The application uses SQLite by default. To use PostgreSQL:

1. Install PostgreSQL
2. Update DATABASE_URL in .env:
```
DATABASE_URL=postgresql://user:password@localhost/dbname
```

## Testing

Run tests with:
```bash
pytest
```
