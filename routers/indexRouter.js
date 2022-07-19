const router = require('express').Router();
const bcrypt = require('bcrypt');

const { Product, User, Comment } = require('../db/models');
const checkAuth = require('../middlewares/checkAuth');
const uploadMiddle = require('../middlewares/upload');

let productId = 0;

router.route('/')
  .get(async (req, res) => {
    res.render('index');
  });

router.route('/register')
  .get(checkAuth, async (req, res) => {
    res.render('register');
  })
  .post(checkAuth, async (req, res) => {
    try {
      const { nickname, email, password } = req.body;
      if (nickname && email && password) {
        const hashPass = await bcrypt.hash(password, Number(process.env.SALTROUNDS));
        const user = await User.create({
          nickname, email, password: hashPass, role_id: 2,
        });
        req.session.userId = user.id;
        req.session.userNickname = user.nickname;
        res.redirect('/');
      }
    } catch (err) {
      console.log(err);
      res.redirect('/register');
    }
  });

router.route('/login')
  .get(async (req, res) => {
    res.render('login');
  })
  .post(async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await User.findOne({ where: { email } });
        const passCheck = await bcrypt.compare(password, user.password);
        if (user && passCheck) {
          if (user.id !== 1) {
            req.session.userAdmin = false;
            req.session.userId = user.id;
            req.session.userNickname = user.nickname;
          } else {
            req.session.userAdmin = true;
            req.session.userId = user.id;
            req.session.userNickname = user.nickname;
          }
          console.log(req.session.userAdmin);
          res.redirect('/');
        } else { res.redirect('/login'); }
      }
    } catch (err) {
      console.log(err);
      res.redirect('/login');
    }
  });

router.route('/logout')
  .get((req, res) => {
    req.session.destroy((error) => {
      if (error) {
        console.error(error);
        return res.sendStatus(500);
      }
      res.clearCookie('auth').redirect('/');
    });
  });

router.route('/lk')
  .get(async (req, res) => {
    const products = await Product.findAll();
    const comments = await Comment.findAll({ limit: 5, include: { model: User }, order: [['createdAt', 'DESC']] });
    res.render('lk', { products, comments });
  });

router.route('/lk/:id')
  .delete(async (req, res) => {
    await Product.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
  });


router.route('/new')
  .post(uploadMiddle.single('image'), async (req, res) => {
    if (req.file) {
      await Product.create({ ...req.body, image: req.file.path.replace('public', '') });
    } else {
      await Product.create({ ...req.body });
    }
    res.sendStatus(200);
  });

router.route('/addtea')
  .post(async (req, res) => {
    try {
      const { name, location } = req.body;
      if (name && location) {
        await Product.create({ name, location });
      }
    } catch (err) {
      console.log(err);
      res.redirect('/');
    }
  });

router.route('/card/:id')
  .get(async (req, res) => {
    try {
      const product = await Product.findOne({
        where: { id: req.params.id },
      });
      productId = req.params.id;
      const comments = await Comment.findAll({
        where: { product_id: req.params.id },
        include: [{ model: User }],
        raw: true,
      });
      for (let i = 0; i < comments.length; i += 1) {
        comments[i].nickname = comments[i]['User.nickname'];
      }
      res.render('card', { product, comments });
    } catch (err) {
      console.log(err);
      res.redirect('/');
    }
  });

router.route('/map')
  .get(async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (err) {
      console.log(err);
      res.redirect('/');
    }
  });

router.post('/upload', uploadMiddle.single('imageTea'), (req, res) => {
  try {
    if (req.file) {
      res.json(req.file);
    }
  } catch (err) {
    console.log(err);
  }
});

router.route('/comments')
  .post(async (req, res) => {
    try {
      const data = await Comment.create({
        user_id: res.locals.userId,
        product_id: productId,
        text: req.body.text,
      });
      const user = await User.findOne({ where: { id: res.locals.userId } });
      res.json({ data, nickname: user.nickname });
    } catch (err) {
      console.log(err);
      res.redirect('/');
    }
  });

module.exports = router;
