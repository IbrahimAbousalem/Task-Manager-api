# Task-Manager-api

* This API was built for training purpose.
* With Task-Manager-API you can create/delete/update user and the same for tasks.

## What i used:

* Express(for Restful API and manage routers).
* Mongoose(NoSql database).
* validation(validating some data).
* Async-Await (for waitting until the process done!).
* promises(write a cleaner code, instead of callbacks mess).
* JWT(authentication layer).
* multer(image uploading).
* sharp(croping and image formatter).
* sendGrid/email.
* heroku (deployment).


## Getting Started

#### Download npm Modules
```
npm install
```

#### Create User 

```
POST https://abousalem-task-manager-api.herokuapp.com/users
```

#### Login User

```
POST https://abousalem-task-manager-api.herokuapp.com/users/login
```
#### Logout User 

```
POST https://abousalem-task-manager-api.herokuapp.com/users/logout
```
#### Create Task 

```
POST https://abousalem-task-manager-api.herokuapp.com/tasks
```
#### Create Avatar

```
POST https://abousalem-task-manager-api.herokuapp.com/users/me/avatar
```
#### User Profile

```
GET https://abousalem-task-manager-api.herokuapp.com/users/me
```
#### Read Task 

```
GET https://abousalem-task-manager-api.herokuapp.com/tasks
```

and alot more you can find all routes at routers folder.
