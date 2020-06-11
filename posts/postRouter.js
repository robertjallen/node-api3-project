const express = require('express');
const db = require('./postDb');
const router = express.Router();

router.get('/', (req, res) => {
  db.get()
  .then(posts =>{
    if(posts){
    return  res.status(200).json(posts)
    }
  })
  .catch( err => {
    res.status(500).json({message: "error retrieving posts"})
  })
});

router.get('/:id', validatePostId(), (req, res) => {
  db.getById(req.params.id)
  .then(posts => {
    if(posts){
      return res.status(200).json(posts)
    }
  })
  .catch(err => {
    res.status(500).json({message: "Error retrieving post"})
  })
});

router.delete('/:id', validatePostId(), (req, res) => {
  db.remove(req.params.id)
  .then(post => {
    res.status(200).json({message: req.params.id }, post)
  })
  .catch(err => {
    res.status(500).json({message: "Error retrieving post"})
  })
});

router.put('/:id', (req, res) => {
  db.update(req.params.id, req.body)
  .then(post => {
    if(post){
      return res.status(200).json(post)
    }
  })
  .catch(err => {
    res.status(500).json({message: "Error retrieving post"})
  })
});

// custom middleware

function validatePostId(req, res, next) {
  return (req, res, next) => {
		db.getById(req.params.id)
			.then(post => {
				if (post) {
					req.post = post;
					next();
				} else {
					res.status(404).json({ message: `Post with id ${req.params.id} does not exist` });
				}
			})
			.catch(err => {
				next(err);
			});
	};
}

module.exports = router;
