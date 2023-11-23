# SiKecil API Documentation

&nbsp;

# 3rd party

- iPaymu (https://ipaymu.com/)
- Google Sheets API (https://developers.google.com/sheets/api/reference/rest#service:-sheets.googleapis.com)

# Link Deploy

- FE : https://ngurah-my-full-stack-project.vercel.app/
- BE :

&nbsp;

## Models :

_Profile_

```
- fullName: string, required
- address: string, required
- password: string, required
- email : string, required
- balance : integer, required
- role : string, required
```

_Bid (data in spreesheet)_

```
- item: string, required
- date_bid: string, required
- amount: string, required
- deadline: date, required
- daysleft: integer, required
- category: string, required
- description: string, required
- img_url : string, required
```

&nbsp;

## Endpoints :

List of available endpoints :

- `GET("/")`
  #Register
- `POST("/register")`
- `POST("/login") `
- `POST("/auth/google") `
  #CRU
- `GET("/bid/:id")`
- `GET("/checkout/:id")`
- `PUT("/bid/:id") `

- `POST("/payment/:id")`

&nbsp;

Request:

- body:

```json
{
  "fullName": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string",
  "fullName": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Full Name is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;
