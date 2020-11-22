const express = require('express')
const Url = require('../models/url')

var deleteUrl = express.Router()

deleteUrl.post('/', async (req, res) => {
  const url = req.body.shortUrl
  var del = await Url.deleteOne({shortUrl: url})
  if (del) {
    return res.status(200).json(del)
  } else {
    return res.status(400)
  }
})

module.exports = deleteUrl
