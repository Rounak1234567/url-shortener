
const express = require("express");
const router = express.Router();
const shortid = require('shortid');
var validate = require('url-validator12'); 

const Url = require('../models/url');

router.post("/", async (req, res)=>{
    const urlCode = shortid.generate();
    const { longUrl } = req.body;

    let isValid = validate.verify(longUrl);

    if(!isValid){
      return res.status(401).json({
        success:false,
        message:"Please provide a valid URL"
      })
    }

    try {
        let url = await Url.findOne({ longUrl });
  
        if (url) {
          return res.json(url);
        } else {
          const shortUrl = "https://urlshortner-cv4s.onrender.com/" + urlCode;
  
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
        res.status(500).json({
          success:false,
          message:"Something went wrong"
        });
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