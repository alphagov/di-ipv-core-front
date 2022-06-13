const express = require('express')
const session = require('express-session')
const AWS = require('aws-sdk')
const DynamoDBStore = require('connect-dynamodb')(session)

require("express-async-errors");

const app = express()

AWS.config.update({
  region: 'eu-west-2',
  endpoint: 'http://localhost:8000'
})
const dynamodb = new AWS.DynamoDB()

const { PORT } = require("./lib/config");
const { setup } = require("hmpo-app");

const loggerConfig = {
  console: true,
  consoleJSON: true,
  app: false,
};


const { router } = setup({
  config: { APP_ROOT: __dirname },
  port: PORT,
  logs: loggerConfig,
  session: false,
  redis: false,
  urls: {
    public: "/public",
  },
  publicDirs: ["../dist/public"],
  dev: true,
});

app.use(session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: false,
  store: new DynamoDBStore({
    client: dynamodb,
    table: 'session'
  })
}));

app.use((req, res, next) => {
  if (!req.session.views) {
    req.session.views = 0
  }
  next()
});

app.get('/private', (req, res) => {
  const numberOfViews = ++req.session.views
  res.send(`The /private page has been visited ${ numberOfViews } times.`)
});



router.use("/oauth2", require("./app/oauth2/router"));
router.use("/credential-issuer", require("./app/credential-issuer/router"));
router.use("/debug", require("./app/debug/router"));
router.use("/ipv", require("./app/ipv/router"));
