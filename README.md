<<<<<<< HEAD
![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) 17: Bearer Auth
===

## Submission Instructions
  * fork this repository & create a new branch for your work
  * write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-susan`
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas

## Learning Objectives  
* students will be able to create bearer authentication middleware
* students will be able to utilize their bearer authentication middleware in their route structures
* students will be able to test against authenticated routes

## Requirements
#### Configuration
* `package.json`
* `.eslintrc`
* `.gitignore`
* `.env`
* `README.md`

## Description
* create a new branch and use the same forked repository from lab 15
* create a bearer auth middleware module (feel free to use the one from lecture as a reference point)
* create a new resource that has at least three properties
  * this resource must have a property of `userID` that references the `_id` of the user that created the resource
  * the `userID` property can only be set from an `_id` found using your bearer auth middleware module
* as always, use the **npm** `debug` module to log function calls that are used within your application
* using the express `Router`, create routes for doing **RESTFUL CRUD** operations against your resource

## Server Endpoints
### `/api/resource-name`
* `POST` request
* pass data as stringifed JSON in the body of a post request to create a new resource

### `/api/resource-name/:id`
* `GET` request
* pass the id of a resource though the url endpoint to `req.params` to fetch a resource   
* `PUT` request
* pass data as stringifed JSON in the body of a put request to update a resource
* `DELETE` request
* pass the id of a resource though the url endpoint *(using `req.params`)* to delete a resource   

## Tests
* create a test to ensure that your API returns a status code of 404 for routes that have not been registered
* create a series of tests to ensure that your `/api/resource-name` endpoint responds as described for each condition below:
* `GET` - test **200**, for a request made with a valid id
* `GET` - test **401**, if no token was provided
* `GET` - test **404**, for a valid request with an id that was not found
* `PUT` - test **200**, for a post request with a valid body
* `PUT` - test **401**, if no token was provided
* `PUT` - test **400**, if the body was invalid
* `PUT` - test **404**, for a valid request made with an id that was not found
* `POST` - test **200**, for a post request with a valid body
* `POST` - test **401**, if no token was provided
* `POST` - test **400**, if no body was provided or if the body was invalid

## Bonus
* **1pt:** a `GET` request to `/api/resource-name` should return an array of all of the ids for that resource
* **1pt:** create a series of tests for a `DELETE` request
=======
![cf](https://i.imgur.com/7v5ASc8.png) 36: OAuth
======

## Submission Instructions
* fork this repository & create a new branch for your work
* write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-susan`
* push to your repository
* submit a pull request to this repository
* submit a link to your PR in canvas
* write a question and observation on canvas

## Learning Objectives
* students will be able to add Google OAuth to a MERN stack application

## Requirements
#### Feature Tasks
* following along with today's lecture and create:
  * a simple `index.html` file that builds a dynamic google signin url
  * a `handleOAuth` static `User` method that checks the profile data provided by Google Open ID
  * a `get` route to your custom redirect URI (ex: /google/oauth/code) that contains all subsequent "handshake" requests
    * this should provide a token that can be used to get profile details from Google Open ID
    * if a profile does not exist through Google, your final request should create a guest user

#### Optional - React Frontend
* create a token reducer for managing a token
* create an auth action's file for:
  * making signup and login requests
  * storing and clearing the token in the app state
  * **remember:** remove the cookie when the token is removed from the app state
* create the following frontend route/component:
  * `/landing` - display a "login with google" anchor
  * this google anchor should work as described above in the "Feature Tasks" section
  * after the auth handshake is completed, the user should be redirected to another part of the app (since a token is now saved to their browser cookies)
>>>>>>> 2af41b29f01c8c68270a8734f849702d551fcec0
