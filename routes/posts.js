import { Router } from 'express';

const router = new Router();

const posts = [
  {
    name: "Test",
    showTitle: "popeye the sailor man"
  },
  {
    name: "tom",
    showTitle: "tom and jerry"
  }
]

router.get('/posts', (req, res) => {
  console.log(req.name);

  res.json(posts.filter(post => post.name === req.user.name));
});

module.exports = { router };