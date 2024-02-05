# Reptile Tracker

Reptile tracker is a website to manage one's pet reptile's schedules, husbandry, and feedings. I developed the back-end using Express.js and the front-end using React.js.

## Set-up
Make sure you have yarn installed on your machine. 

1. Back-end: Navigate to the Reptile Tracker directory and run the following commands:

- `yarn`
- `yarn db:migrate`
- `yarn dev`

2. Front-end: Navigate to the client directory and run `yarn dev` to set up the front-end server

3. Following this, you will be prompted to navigate to a specific URL. For instance, it may look like `http://localhost:5174/`





## Reptile Tracker - Backend Server

### I should be able to create a user account


 - URL: localhost:8000/users
 - Type: POST
 - firstName, lastName, email, and password parameters are required
 - Body is a json. Example:


        {
            "firstName": "first",
            "lastName": "last",
            "email": "email@email",
            "password": "password"
        }


### I should be able to sign into a user account

 - URL: localhost:8000/sessions
 - Type: POST
 - email and password parameters are required
 - Body is a json. Ex:

        {
            "email": "email@email",
            "password": "password"
        }

### I should be able to create a reptile

- URL: localhost:8000/reptile
- Type: POST
- species (which is of type "corn_snake", "king_snake", "ball_python", "redtail_boa"), name, and sex (which is of type "m" or "f") parameters are required
- Body is a json. Ex:

        {
            "species": "corn_snake",
            "name": "evenlyne",
            "sex": "f"
        }

### I should be able to delete a reptile
-  URL: localhost:8000/reptile/{Insert Reptile Id}
 - Type: DELETE
 - No body 

### I should be able to update a reptile
 - URL: localhost:8000/reptile/{Insert Reptile Id}
 - Type: PUT
 - either a species, name, sex, or a combination of any of these should be passed in
- Body is a json. Ex:

        {
            "species": "corn_snake",
            "name": "evenlyne",
            "sex": "f"
        }
- or you can also update only what you want to update instead of everything. Ex:

        {
            "species": "corn_snake"
        } 

### I should be able to list all of my reptiles
- URL: localhost:8000/reptile/
 - Type: GET
-  No body 

### I should be able to create a feeding for a reptile
- URL: localhost:8000/feeding/{Insert Reptile Id}
 - Type: POST
 - a foodItem parameter is passed in
 - Body is a json. Ex:

        {
            "foodItem":"rat"
        }

### I should be able to list all of the feedings for a reptile
-  URL: localhost:8000/feeding/{Insert Reptile Id}
- Type: GET
 - No body


### I should be able to create a husbandry record for a reptile
 - URL: localhost:8000/husbandry/{Insert Reptile Id}
 - Type: POST
 - length, weight, temperature, and humidity should be passed in
 - Body is a json. Ex:

        {
                "length":10,
                "weight":2,
                "temperature":5,
                "humidity":1
        }

### I should be able to list all of the husbandry records for a reptile
 - URL: localhost:8000/husbandry/{Insert Reptile Id}
 - Type: GET
 - No body 


### I should be able to create a schedule for a reptile
- URL: localhost:8000/schedule/{Insert Reptile Id}
 - Type: POST
 - a type (which should be of type "feed", "record", or "clean"), a description,. and each day of the week (Monday - Sunday)
 - Body is a json. Ex:

        {
            "type": "feed",
            "description": "feed those reptiles",
            "monday": true,
            "tuesday": false,
            "wednesday": false,
            "thursday": false,
            "friday": true,
            "saturday": true,
            "sunday": true
        }

### I should be able to list all of the schedules for a reptile
 - URL: localhost:8000/schedule/{Insert Reptile Id}
 - Type: GET
 - No body 


### I should be able to list all of the schedules for a user
 - URL: localhost:8000/husbandry/
 - Type: GET
 - No body 
