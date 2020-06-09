const express = require('express');
const db = require('./userDb.js');

const router = express.Router();

//------------------------------------------------------------------------
//                     CREATE  (new user)
//------------------------------------------------------------------------
// /api/users
router.post('/', validateUser, (req, res) => {
  // console.log(req.body);
  db.insert(req.body)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error adding the User',
    });
  });
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

//------------------------------------------------------------------------
//                     READ
//------------------------------------------------------------------------
router.get('/', (req, res) => {
  db.get()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the users',
    });
  });
});

// /api/users/:id
//=====================================================
//    READ              USER BY ID
//=====================================================
router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  db.getUserPosts(req.user)
  .then(posts => {
    res.status(200).json(posts)
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id
  db.getById(id)
  .then(user => {
    if(user){
      req.user = user;
      next();
    }else{
      res.status(404).json({message: "cannot find user"})
    }
  })
  .catch(err => {
    res.status(500).json({message: "failed", err})
  })
}

function validateUser(req, res, next) {
  if(req.body && req.body.name){
    next()
  }else{
    res.status(400).json({ message: "missing user data" })
  }
}

function validatePost(req, res, next) {
  
}

module.exports = router;
