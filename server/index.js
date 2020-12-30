const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = resolve

let apis = []

fs.readdirSync(resolve('./apis'))
  .forEach(fileName => {
    let api = require('./apis/' + fileName)
    apis.push(api)
  })

module.exports = function (app) {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))
  apis.forEach(api => api(app))
}