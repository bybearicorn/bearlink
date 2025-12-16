# BurnLink 

## Build image locally

docker build -t burn-link-app .

## deps in burn-link-shared

There are deps in shared, that are only used by BE, cause FE only uses classes from api as types.
So I add them as peer dep in burn-link-shared, and devDep in FE, so everything works

## DB

### Setup

```
CREATE USER app_user WITH PASSWORD app_pass;
CREATE DATABASE burnlink OWNER app_user;

# connect to db, then

CREATE SCHEMA burnlink AUTHORIZATION app_user;
GRANT ALL PRIVILEGES ON SCHEMA burnlink TO app_user;
```
