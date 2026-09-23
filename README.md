## User Authentication Module made in NestJS

## Description

A user authentication module powered by NestJS, Prisma, and Swagger OpenApi with basic SAAS logic.

## Setting up the project

1. Clone the repository

2. Install dependencies

```bash
$ pnpm i
```

3. Configure the environment variables.
     You can use the .env.example for this.

    Env variables:
    [POSTGRES_USER] / Your PostgreSQL database user.

    [POSTGRES_PASSWORD] / Your PostgreSQL database password.

    [PGADMIN_DEFAULT_EMAIL] / Your PgAdmin email.

    [PGADMIN_DEFAULT_PASSWORD] / Your PgAdmin password.

    [SECRET] / Your OpenSSL secret token.

    [REFRESH_SECRET] / Your OpenSSL refresh secret token. 

    [DATABASE_URL] / Your database URL

4. Configure your database server (Docker or local environment).
     You can use the docker-compose.yml.example if you want :).

5. Run your database and generate your Prisma client.
```bash
$ pnpm run db:push
$ pnpm run db:migrate
$ pnpm run db:db:generate
$ pnpm run db:seed 
```
---What are we doing here? First, we synchronize our Prisma schema with our database.

---Second, we make migrations to generate tables in our database.

---Third, we generate our Prisma client so we can use its instance in the project.

---Fourth, and finally, we seed our database with some dummy data.


6. Run the project in dev mode.
```bash
$ pnpm run start:dev
```

## API documentation.
---To get access to the Swagger OpenApi Interface add "/apidoc" to the root link of the project.

### Users Module

- **GET** `/users`
- **Description:** Returns an array with all the users.
- **Authentication Level:** Private; you need to log in to get an access token.
- **Example Response**

```json
{
    "success": true,
    "data": [
        {
            "user_id": "8de7ce94-e765-4bc1-993e-7e8f6b365332",
            "userName": "john",
            "email": "johndoe@gmail.com",
            "createdAt": "2026-09-12T23:01:26.162Z",
            "updatedAt": "2026-09-12T23:01:26.162Z",
            "type": "USER"
        },
        {
            "user_id": "c2908b44-f8af-4368-a140-b87390495a1f",
            "userName": "jane",
            "email": "janedoe@gmail.com",
            "createdAt": "2026-09-12T23:07:32.485Z",
            "updatedAt": "2026-09-12T23:07:32.485Z",
            "type": "USER"
        },
    ]
}
```

- **POST** `/users`
- **Description:** Post an user.
- **Authentication Level:** Public, anyone can get access.
- **Example Response**

```json
{
    "success": true,
    "data": [
        {
            "user_id": "a83ff286-7c5e-4db5-951-d0df0ac1b012",
            "userName": "user123",
            "email": "johndoe@gmail.com",
            "createdAt": "2026-09-18T06:30:57.249Z",
            "updatedAt": "2026-09-18T06:30:57.249Z",
            "type": "USER"
            }
  ]
}
```
-**Example Body**
```json
    {
    "userName": "JohnDoe",
    "email": "johndoe@gmail.com",
    "password": "1234124"
    }
```

- **GET** `/users/{id}`
- **Description:** Get a user by ID.
- **Authentication Level:** Private; you need to log in to get an access token.
- **Example Response**

```json
{
    "success": true,
    "data": [
        {
            "user_id": "a83ff286-7c5e-4db5-951-d0df0ac1b012",
            "userName": "user123",
            "email": "johndoe@gmail.com",
            "createdAt": "2026-09-18T06:30:57.249Z",
            "updatedAt": "2026-09-18T06:30:57.249Z",
            "type": "USER"
        }
    ]
}
```

- **PATCH** `/users/{id}`
- **Description:** Partial information update of one user.
- **Authentication Level:** Private; you need to log in to get an access token.
- **Example Response**

```json
{
    "success": true,
    "data": [
        {
            "user_id": "a83ff286-7c5e-4db5-951-d0df0ac1b012",
            "userName": "user123",
            "email": "johndoe@gmail.com",
            "createdAt": "2026-09-18T06:30:57.249Z",
            "updatedAt": "2026-09-18T06:30:57.249Z",
            "type": "USER"
        }
    ]
}
```

-**Example Body**
```json
    {
    "userName": "John Doe",
    "email": "johndoe@gmail.com",
    "password": "passwordsex",
    "type": "USER | ADMIN"
    }
    //Note: I allow you to change your user type like this to make things easier, this is a bad practice.
```

- **DELETE** `/users/{id}`
- **Description:** Delete an user.
- **Authentication Level:** Private, needs JWT verification; also your usertype has to be admin.
- **Example Response**

```json
{
    "success": true,
    "data": [
        {
            "user_id": "a83ff286-7c5e-4db5-951-d0df0ac1b012",
            "userName": "user123",
            "email": "johndoe@gmail.com",
            "createdAt": "2026-09-18T06:30:57.249Z",
            "updatedAt": "2026-09-18T06:30:57.249Z",
            "type": "USER"
        }
    ]
}
```

### Auth Module

- **POST** `/auth/login
`
- **Description:** log in as a user.
- **Authentication Level:** Public, anyone can get access.
- **Example Response**

```json
{
    "success": true,
    "data": [
        {
            "id": "a83ff286-7c5e-4db5-951-d0df0ac1b012",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
        }
  ]
}
```
-**Example Body**
```json
    {
    "email": "johndoe@gmail.com",
    "password": "passwordsex"
    }
```

- **POST** `/auth/refresh
`
- **Description:** Refresh your access token.
- **Authentication Level:** Private; you have to pass your refreshToken to the authentication header.
- **Example Response**

```json
{
    "success": true,
    "data": [
        {
            "id": "a83ff286-7c5e-4db5-951-d0df0ac1b012",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
        }
  ]
}
```

- **POST** `/auth/logout
`
- **Description:** Refresh your access token.
- **Authentication Level:** Private; you have to pass your access token to the authentication header.
- **Example Response**

```json
{
    "success": true,
    "data": [
        {
        "id": "a83ff286-7c5e-4db5-951-d0df0ac1b012",
        "userName": "John Doe",
        "updateAt": "2005-09-10T20:05:29.689Z"
    }
  ]
}
```

### Organizations Module

- **GET** `/organizations`
- **Description:** Returns an array with all the organizations.
- **Authentication Level:** Private; you need to log in to get an access token.
- **Example Response**

```json
{
    "success": true,
    "data": [
        {
            "organizationId": "a83ff286-7c5e-4db5-951-d0df0ac1b012",
            "organizationName": "Happy dogs Org",
            "organizationNumber": 123,
            "createdAt": "2026-09-18T06:30:57.249Z"
        }
    ]
}
```

- **POST** `/organizations`
- **Description:** Post an organization.
- **Authentication Level:** Private, needs JWT verification; also your usertype has to be admin.
- **Example Response**

```json
{
    "success": true,
    "data": [
        {
            "organizationId": "a83ff286-7c5e-4db5-951-d0df0ac1b012",
            "organizationName": "Happy dogs Org",
            "organizationNumber": 123,
            "createdAt": "2026-09-18T06:30:57.249Z"
        }
    ]
}
```
-**Example Body**
```json
    {
        "organizationName": "Los happpydogs",
        "organizationNumber": "1/2/3 etc"
    }
```

- **GET** `/organizations/{id}`
- **Description:** Get an organization.
- **Authentication Level:** Private; you need to log in to get an access token.
- **Example Response**

```json
{
    "success": true,
    "data": [
        {
            "organizationId": "a83ff286-7c5e-4db5-951-d0df0ac1b012",
            "organizationName": "Happy dogs Org",
            "organizationNumber": 123,
            "createdAt": "2026-09-18T06:30:57.249Z"
        }
    ]
}
```

- **PATCH** `/organizations/{id}`
- **Description:** Update partial information of an organization.
- **Authentication Level:** Private, needs JWT verification; also your usertype has to be admin.
- **Example Response**

```json
{
    "success": true,
    "data": [
        {
            "organizationId": "a83ff286-7c5e-4db5-951-d0df0ac1b012",
            "organizationName": "Happy dogs Org",
            "organizationNumber": 123,
            "createdAt": "2026-09-18T06:30:57.249Z"
        }
    ]
}
```
-**Example Body**
```json
    {
        "organizationName": "Los happpydogs",
        "organizationNumber": "1/2/3 etc"
    }
```

- **DELETE** `/organizations/{id}`
- **Description:** Delete an organization.
- **Authentication Level:** Private, needs JWT verification; also your usertype has to be admin.
- **Example Response**

```json
{
    "success": true,
    "data": [
        {
            "organizationId": "a83ff286-7c5e-4db5-951-d0df0ac1b012",
            "organizationName": "Happy dogs Org",
            "organizationNumber": 123,
            "createdAt": "2026-09-18T06:30:57.249Z"
        }
    ]
}
```

### Memberships Module

- **POST** `/memberships`
- **Description:** Creates a membership.
- **Authentication Level:** Private, needs JWT verification; also your usertype has to be admin.
- **Example Response**

```json
{
    "success": true,
    "data": [
        {
            "organizationId": "a83ff286-7c5e-4db5-951-d0df0ac1b012",
            "userId": "a83ff286-7c5e-4db5-951-d0df0ac1b012",
            "Role": "MEMBER | MANAGER"
        }
    ]
}
```
-**Example Body**
```json
    {
        "organizationId": "8be4df61-93ca-11d2-aa0d-00e098032b8c",
        "userId": "8be4df61-93ca-11d2-aa0d-00e098032b8c",
        "role": "MEMBER | MANAGER"
    }
```

- **DELETE** `/memberships/{id}`
- **Description:** Deletes a membership.
- **Authentication Level:** Private, needs JWT verification; also your usertype has to be admin.
- **Example Response**

```json
{
    "success": true,
    "data": [
        {
            "organizationId": "a83ff286-7c5e-4db5-951-d0df0ac1b012",
            "userId": "a83ff286-7c5e-4db5-951-d0df0ac1b012",
            "Role": "MEMBER | MANAGER"
        }
    ]
}
```