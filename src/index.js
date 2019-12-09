var simpleclassifier = require('./simpleclassifier.js')
var sentimentAnalysis = require('./sentimentAnalysis.js')
var telstraModelExtractor = require('./telstraModelExtractor.js')

var express = require('express')
var app = express()

app.listen(3300, () => {
  console.log('Server running on port 3300')
})

app.get('/classifier', async (req, res, next) => {
  res.json(await simpleclassifier())
})

app.get('/sentiment', async (req, res, next) => {
  res.json(await sentimentAnalysis())
})

app.get('/telstraModelExtractor', async (req, res, next) => {
  res.json(await telstraModelExtractor())
})

app.get('/sample', (req, res, next) => {
  res.send('Welcome to Call Analysis sample')
})

app.get('/', (req, res, next) => {
  res.send('Welcome to Call Analysis')
})
