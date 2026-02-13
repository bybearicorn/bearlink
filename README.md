# BurnLink 

A secure, self-destructing message sharing application with end-to-end encryption.

## Quick Start with Docker Compose

Copy the example environment file
```bash
cp .env.example .env
```

Update the `.env` file if needed (e.g., to change database credentials or app port).

Then, use the following commands to manage the application:

```bash
# Build and start all services (app + PostgreSQL)
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down

# Stop and remove all data
docker compose down -v
```

The application will be available at http://localhost:8080

## Build image locally

```bash
docker build -t burn-link-app .
```

## deps in burn-link-shared

There are deps in shared, that are only used by BE, cause FE only uses classes from api as types.
So I add them as peer dep in burn-link-shared, and devDep in FE, so everything works

## DB

TypeORM migrations automatically handle database table creation and updates on application startup.