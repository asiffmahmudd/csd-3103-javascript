const express = require("express")
const mongo = require("mongodb").MongoClient
const app = express()
require('dotenv').config()
const url = process.env.url
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
const bodyParser = require('body-parser');
let db

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
      db = client.db("javascriptProject")
      users = db.collection("users")
    }
)
app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(2000, () => console.log("Server ready"))

app.get("/users", (req, res) => {
  users.find().toArray((err, items) => {
    if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
    }
    res.status(200).json({ 
        users: items 
    })
  })
})

app.post('/users', (req,res) => {
  const user = req.body
  try{
    users.insertOne({...user})
    .then(data => {
        if(data.acknowledged){
            res.send({
                message: "User was created successfully!"
            });
        }
        else{
          res.send({
            message: "User was couldn't be created!"
          });
        }
    })
  }
  catch(e){
      res.send({
          message: "Sorry! couldn't create user"
      })
  }
})

app.put('/users/:id', (req,res) => {
  const id = req.params.id
  try{
    users.updateOne(
      {_id: ObjectId(id)}, 
      {
          $set: 
          {
              ...req.body
          }   
      }
    )
    .then(data => {
      if (!data) {
        res.status(404).send({
            message: `Cannot update user with id=${id}. Maybe product was not found!`
        });
      } 
      else {
        if(data.modifiedCount > 0){
            res.send({
                message: "User was deleted successfully!"
            });
        }
        else{
          res.send({
            message: "Sorry! couldn't update user"
          })
        }
      }
    })
  }
  catch(e){
      res.send({
          message: "Sorry! couldn't update user"
      })
  }
})

app.delete("/users/:id", (req, res) => {
  users.deleteOne(
      {
          _id : ObjectId(req.params.id)
      })
      .then(data => {
          if (!data) {
              res.status(404).send({
                  message: `Cannot delete user with id=${id}. Maybe product was not found!`
              });
          } 
          else {
            if(data.deletedCount > 0){
                res.send({
                    message: "User was deleted successfully!"
                });
            }
            else{
              res.send({
                message: "Sorry! couldn't delete user"
              })
            }
          }
      })
      .catch(err => {
          res.status(500).send({
          message: "Could not delete user with id=" + req.params.id
      });
  })
})

