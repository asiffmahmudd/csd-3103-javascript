//Name: Asif Mahmud
//ID: c0837117

//importing all necessary libraries
const express = require("express")
const mongo = require("mongodb").MongoClient
const app = express()
require('dotenv').config()
const url = process.env.url
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
const bodyParser = require('body-parser');
let db

//connecting to the mongodb database
mongo.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      if (err) {
        console.error(err)
        return
      }
      db = client.db("javascriptProject") // connecting to the database named javascriptProject
      users = db.collection("users") // using collection users
    }
)

//these are all the middleware used for this project
app.use(express.json())
app.use(cors()); // for handling cors error
app.use(bodyParser.urlencoded({ extended: false })); // for handling form data
app.use(bodyParser.json()); // for handling form data in JSON format

app.listen(2000, () => console.log("Server ready"))

//this API is used for getting all the suers
app.get("/users", (req, res) => {
  users.find().toArray((err, items) => { //finding all the users and converting them to an array
    if (err) { // handling error
        console.error(err)
        res.status(500).json({ err: err }) //sending response status with error
        return
    }
    res.status(200).json({  // sending response with all the users if there is no error
        users: items 
    })
  })
})

// this API is used for creating a new user
app.post('/users', (req,res) => {
  const user = req.body // getting form data from request body
  try{
    users.insertOne({...user}) // inserting into the database
    .then(data => {
        if(data.acknowledged){ // checking if the insertion was done
            res.send({
                message: "User was created successfully!" // sending response message
            });
        }
        else{ // if user was not inserted for some reason this response will be sent
          res.send({
            message: "User was couldn't be created!"
          });
        }
    })
  }
  catch(e){ // handling error for this api
      res.send({
          message: "Sorry! couldn't create user"
      })
  }
})

// this API is used for updating a particular user using his/her id
app.put('/users/:id', (req,res) => {
  const id = req.params.id // getting the id from the url
  try{
    users.updateOne( //updating the user on database
      {_id: ObjectId(id)}, //finding the user using id
      {
          $set:  //setting the updated values to the particular fields
          {
              ...req.body
          }   
      }
    )
    .then(data => { 
      if (!data) { // if the user was not updated sending proper response
        res.status(404).send({
            message: `Cannot update user with id=${id}. Maybe product was not found!`
        });
      } 
      else {
        if(data.modifiedCount > 0){ // if the user was updated sending success response
            res.send({
                message: "User was deleted successfully!",
                modifiedCount: data.modifiedCount
            });
        }
        else{ // if the field was not updated sending proper response
          res.send({
            message: "Sorry! couldn't update user"
          })
        }
      }
    })
  }
  catch(e){ //handling error
      res.send({
          message: "Sorry! couldn't update user"
      })
  }
})

app.delete("/users/:id", (req, res) => {
  users.deleteOne(
      {
          _id : ObjectId(req.params.id) // finding the user using id
      })
      .then(data => {
          if (!data) {
              res.status(404).send({ //if the user was not found
                  message: `Cannot delete user with id=${id}. Maybe product was not found!`
              });
          } 
          else {
            if(data.deletedCount > 0){ // if the user was deleted, sending success response
                res.send({
                    message: "User was deleted successfully!"
                });
            }
            else{ // if the user was not deleted sending proper response 
              res.send({
                message: "Sorry! couldn't delete user"
              })
            }
          }
      })
      .catch(err => { //handling error
          res.status(500).send({
          message: "Could not delete user with id=" + req.params.id
      });
  })
})

 