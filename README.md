# FemtoGooDaKi

folders are according to package

## Frontend

## Backend
#### ENDPOINTS
**User Service**
  - detail
  - register
  - login

Run locally with docker:
```
docker build -t femtogoodaki-backend-course backend/course
docker run -p PORT:PORT -it femtogoodaki-backend-course PORT
```
replace `PORT` with your custom port

**Course Service**
  - detail
  - addCourse
  - search

**Enrollment Service**
  - enroll

#### Environment Variables
  - **USER_ENDPOINT_URL** - eg. http://127.0.0.1
  - **ENROLL_ENDPOINT_URL** - eg. http://127.0.0.1
  - **COURSE_ENDPOINT_URL** - eg. http://127.0.0.1
  - **USER_ENDPOINT_PORT** - eg. 5000
  - **ENROLL_ENDPOINT_PORT** - eg. 5001
  - **COURSE_ENDPOINT_PORT** - eg.5002