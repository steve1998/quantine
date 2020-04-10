# Quantine Api
Providing all the needs for running the Quantine app succefully

## Installation

If you don't have the repository, you can clone it.
```bash
$ git clone https://gitlab.com/clabe45/quantine.git
```
Make sure you are on the project's root directory and follow the instructions:
```bash
$ cd api
$ npm install
```
Start the backend server at localhost:8081
```bash
$ npm start
```

## Use
All api calls are at localhost:8081/api and are in JSON format.

### Sign up
POST localhost:8081/api/auth/signup
#### Request Example:
```
{
	"email": "admin@admin2.com",
	"fullName": "Admin Admin",
	"password": "admin",
	"profilePicUrl": "https://cdn.pixabay.com/photo/2019/07/13/23/53/spring-equinox-4335941_960_720.jpg"
}
```
#### Response Example:
```
{
    "email": "admin@admin2.com",
    "fullName": "Admin Admin",
    "profilePicUrl": "https://cdn.pixabay.com/photo/2019/07/13/23/53/spring-equinox-4335941_960_720.jpg",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluMi5jb20iLCJmdWxsTmFtZSI6IkFkbWluIEFkbWluIiwicHJvZmlsZVBpY1VybCI6Imh0dHBzOi8vY2RuLnBpeGFiYXkuY29tL3Bob3RvLzIwMTkvMDcvMTMvMjMvNTMvc3ByaW5nLWVxdWlub3gtNDMzNTk0MV85NjBfNzIwLmpwZyIsImlhdCI6MTU4NTY4OTIyM30.28jTwTufsaJsqLqCWIsD27aTRePrv7iLtpBdfp1jWas"
}
```


### Sign in
POST localhost:8081/api/auth/signin

#### Request Example:
```
{
	"email": "admin@admin2.com",
	"password": "admin"
}
```
#### Response Example:
```
{
    "email": "admin@admin2.com",
    "fullName": "Admin Admin",
    "profilePicUrl": "https://cdn.pixabay.com/photo/2019/07/13/23/53/spring-equinox-4335941_960_720.jpg",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluMi5jb20iLCJmdWxsTmFtZSI6IkFkbWluIEFkbWluIiwicHJvZmlsZVBpY1VybCI6Imh0dHBzOi8vY2RuLnBpeGFiYXkuY29tL3Bob3RvLzIwMTkvMDcvMTMvMjMvNTMvc3ByaW5nLWVxdWlub3gtNDMzNTk0MV85NjBfNzIwLmpwZyIsImlhdCI6MTU4NTY4OTM2MX0.J_Wz3TgkDqjCU6LtqmzLFxEyiHxs6blwYaZ0peVNduo"
}
```


