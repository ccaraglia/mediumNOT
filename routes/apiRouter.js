let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
let Post = require('../db/schema.js').Post


apiRouter.get('/posts', function(req, res){
    Post.find(req.query, function(err, results){
      if(err) return res.json(err)
      res.json(results)
    })
  })

  //read mmine
  apiRouter.get('/myPosts',function(request,response) {
  //first argument gives the criteria (WHICH msgs do i want)
  //
  console.log(request)
  if (request.user) { // if there is currently a logged-in user
    Post.find({by:request.user.email}, function(err,records) {
      if (err) {
        response.json({
          error: err
        })
      }
      else {
        response.json(records)
      }
    })
  }
  else {
    response.status(404).json({
      error: 'no one is logged in'
    })
  }
})
  //create one
  .post('/posts', function(req, res){
    let newPost = new Post(req.body)
    newPost.save(function(err){
      if(err) return res.json(err)

      res.json(newPost)
    })
  })

apiRouter
  //fetch one
  .get('/posts/:_id', function(req, res){
    Post.findById(req.params._id, function(err, record){
      if(err || !record) return res.json(err)
      res.json(record)
    })
  })
  //edit one
  .put('/posts/:_id', function(req, res) {
    Post.findById(req.params._id, function(err,record) {
      let recordWithUpdates = helpers.updateFields(record,req.body)
      recordWithUpdates.save(function(err){
        if(err || !record) return res.json(err)
        res.json(record)
      })
    })
  })
  //delete one
  .delete('/posts/:_id', (req, res) => {
    Post.remove({ _id: req.params._id}, (err) => {
      if(err) return res.json(err)
      res.json({
        msg: `record ${req.params._id} successfully deleted`,
        _id: req.params._id
      })
    })
  })

  apiRouter
    .get('/users', function(req, res){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err)
        res.json(results)
      })
    })

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err)
        res.json(record)
      })
    })
    .put('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password",function(err, record){
        if(err || !record) return res.json(err)
        let recordWithUpdates = helpers.updateFields(record, req.body)
        recordWithUpdates.save(function(err){
          if(err) return res.json(err)
          res.json(recordWithUpdates)
        })
      })
    })
    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })
    })

module.exports = apiRouter