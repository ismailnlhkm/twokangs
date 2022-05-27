const express = require('express');
const app = express()
const session = require('express-session')
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'rahasia kuli',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true }
}))
app.use(require('./routes'));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
