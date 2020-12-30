const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const apis = {}

fs.readdirSync(resolve('./apis'))
  .forEach(fileName => {
    const api = require('./apis/' + fileName)
    const key = fileName.replace(/\.js$/, '')
    apis[key] = api
  })

module.exports = function (app) {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))
  Object.keys(apis).forEach(key => {
    const api = apis[key]
    app.use(`/api/${key}`, api)
  })
}