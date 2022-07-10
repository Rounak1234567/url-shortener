const { Router } = require("express");
const express = require("express");
const router = express.Router();
const shortid = require('shortid');

const Url = require('../models/url');

router.post("/", async (req, res)=>{
    const urlCode = shortid.generate();
    const { longUrl } = req.body;

    try {
        let url = await Url.findOne({ longUrl });
  
        if (url) {
          return res.json(url);
        } else {
          const shortUrl = "http://alturl.herokuapp.com/short" + '/' + urlCode;
  
          url = new Url({
            longUrl,
            shortUrl,
            urlCode,
            date: new Date()
          });
  
          await url.save();
  
          return res.json(url);
        }
    }catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
})


router.get('/:code', async (req, res) => {
    try {
      const url = await Url.findOne({ urlCode: req.params.code });
  
      if (url) {
        return res.redirect(url.longUrl);
      } else {
        return res.status(404).json('No url found');
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  });


module.exports = router;