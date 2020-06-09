const express = require('express');
const db = require('./userDb.js');
const postDb = require('../posts/postDb');

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
//------------------------------------------------------------------------
//                     CREATE  (post)
//------------------------------------------------------------------------
// /api/users/:id/posts
router.post("/:id/posts", validateUserId(), validatePost(),
	async (req, res) => {
		try {
			const post = req.body;
			console.log("post: ", post);
			res.status(201).json(await postDb.insert(post));
		} catch (error) {
			res.status(500).json({
				error,
				errorMessage: "There was an error while saving the post to the database"
			});
		}
	}
);

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
//    READ   USER BY ID
//=====================================================
router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

// /api/users/:id/posts
//=====================================================
//    READ     posts       BY  USERID
//=====================================================
router.get('/:id/posts', validateUserId, (req, res) => {
  db.getUserPosts(req.params.id)
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

function validateUserId() {
	return (req, res, next) => {
		db
			.getById(req.params.id)
			.then(user => {
				if (user) {
					req.user = user;
					next();
				} else {
					res
						.status(404)
						.json({ message: `User with id ${req.params.id} does not exist` });
				}
			})
			.catch(err => {
				next(err);
			});
	};
}

function validateUser(req, res, next) {
  if(req.body && req.body.name){
    next()
  }else{
    res.status(400).json({ message: "missing user data" })
  }
}

function validatePost() {
	return (req, res, next) => {
		db
			.getUserPosts(req.params.id)
			.then(post => {
				if (post.length < 1) {
					res.status(404).json({ message: "This user does not have a post." });
				} else {
					req.post = post;
					next();
				}
			})
			.catch(err => {
				next(err);
			});
	};
}

module.exports = router;
