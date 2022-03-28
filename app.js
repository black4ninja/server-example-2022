// Import the top-level function of express
const express = require('express')
const fs = require('fs')
const http = require('http')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const moment = require('moment')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const CryptoJS = require("crypto-js")
const crypto = require('crypto')
const compression = require('compression')
const cors = require('cors')
const schedule = require('node-schedule')
const _ = require('underscore')
const log = console.log

var app = express()
app.use(cors({origin:"*"}))
app.use(compression({ level: 9 }))
app.use(helmet({
    contentSecurityPolicy: false,
  }))
app.use(helmet.xssFilter())
app.use(helmet.referrerPolicy({ policy: 'no-referrer-when-downgrade' }))
app.use(helmet.hsts({ maxAge: 15768000 }))
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', ['1_global_module/views'])
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(methodOverride())
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.text({ type: 'text/html' }))
app.use(cookieParser())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Cross-Origin-Resource-Policy', 'same-site');
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  res.header('Cross-Origin-Embedder-Policy', 'credentialless');
  //res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-inline' *");
  res.header("Content-Security-Policy", "default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;");

  next();
});


// Routes HTTP GET requests to the specified path "/" with the specified callback function

app.get('/test', function(req, res) {
    res.status(200).send({status:"success",message:"Welcome To Testing API"})
})

app.get('*', function(req, res){
  res.status(404)

  // respond with html page
  if (req.accepts('html')) {
    res.render('project/error/error-page/index', {
      title: "Principal", 
      description:"", 
      content:"Guias",
      error:"0",
      errorType: "warning",
      flash: "",
      error_no: "404",
      error_title: "Sorry! The page you were looking cannot be found!",
      error_msg: "We are sorry, the page you were looking it doesn't exist, it has been modified or deleted.",
      redirect_url: "/"
    })
    return
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' })
    return
  }

  // default to plain-text. send()
  res.type('txt').send('Not found')
    
});

log("Iniciando Server")  

var httpServer = require('http').createServer(app)
const PORT = process.env.PORT
app.set("port", PORT)
httpServer.listen(PORT, function() {
    log('parse-server-example running on port ' + PORT + '.')
})

module.exports = app