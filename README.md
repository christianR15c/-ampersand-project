# ampersand-project

#### In this project I have used javascript framework, React on frontend and NodeJs on backend, I have used geolocation API for tracking the movement to capture differendt datas required

## How to test

##### clone this repository
##### install dependencies using `npm install`
##### start the server by running `npm run dev` in the root directory, then open new terminal and navigate to frontend and run `npm start`
##### create `.env` file in the root directory to store your sercet variables 
`DB_DEV_URL=postgres://{user}:{password}@localhost:5432/{databasename}`
`secretKey='your random secret key'`
`adminSecretKey= 'your random admin secret key'`

##### create an admin user using postman `
    "name":"chris", 
    "email":"chris@gmail.com", 
    "phone":"0782400445", 
    "nationalId":"123456789", 
    "batteryId": null, 
    "isAdmin":true,
    "password":"123456" 
    `
##### login on the homepage of the app using created user with admin credentials above
##### after that navigate to the dashbaord `localhost:3000/dashboard` 
##### from there you can perform most of the tasks as registre user, add batteries, assign battery to a user, and start motor movement where you can monitor motor usage includes: speed, distance, energy consuption and price
