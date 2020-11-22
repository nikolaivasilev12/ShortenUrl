
const express = require('express')
const Url = require('../models/url')

var getAllUrls = express.Router()

getAllUrls.get('/', async (req, res) => {
  var url = await Url.find()
  if (url) {
    return res.status(200).json(url)
  }
})

module.exports = getAllUrls
