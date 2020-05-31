const express = require('express');
const app = express();
const path = require('path');
const createError = require('http-errors');
const multer = require('multer');
// const upload = multer({dest : path.join(__dirname, '/upload')});
require('dotenv').config();

/* Server */
app.listen(process.env.PORT||3000, ()=>{
  console.log('http://127.0.0.1:' + process.env.PORT);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/upload'))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({storage})

/* Setting */
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));
app.locals.pretty = true;

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use('/', express.static(path.join(__dirname, './public')));

/* file upload */
app.post('/save', upload.single('upfile'), (req, res, next)=>{
  res.send('업로드 완료');
});

app.get('/', (req, res, next)=>{
  res.render('test/upload.pug');
});