const express = require("express");
const router = express.Router();
const Intents = require('./../models/intents.model');

router.get('/', (req, res) => {
  return res.status(200).json({'msg': 'Test Route, Good to Go!'});
});

router.get('/getAll', (req, res, next) => {
  Intents.getAllIntentsWithSentences({}, (err, data) => {
    if (err) {
      return next(err);
    } else {
      return res.status(200).json({data});
    }
  })
})

router.get('/getIntents', (req, res, next) => {
  Intents.getAllIntents({}, (err, result) => {
    if (err) {
      return next(error);
    } else {
        var myIntents = result.map(intents => intents.intentName);
        console.log(myIntents)
        return res.status(200).json(myIntents)
    }
  })
})


router.post('/getByIntentName', (req, res) => {
  let intentName = req.body.intentName
  // intentName = intentName.toLowerCase()
  Intents.getSentencesByIntent(inentName, (err, result) => {
    if (err) {
      return err;
    } else {
      return res.status(200).json(result);
    }
  })
})

router.post('/updateByIntent', (req, res) => {
  let intentName = req.body.intentName;
  let sentence = req.body.sentence;
  Intents.getSentencesByIntentAndUpdate(intentName, sentence, (err, result) => {
    if (err) {
      return err;
    } else {
        return res.status(200).json(result);
    }
  })
})

router.post('/removeByIntent', (req, res) => {
  console.log(req.body);
  let intentName = req.body.intentName;
  let sentence = req.body.sentence;
  Intents.getSentencesByIntentAndRemove(intentName, sentence, (err, result) => {
    if (err) {
      return err;
    } else {
      console.log('result', result)
      return res.status(200).json(result);
    }
  })
})



router.post('/', (req, res) => {

})

module.exports = router;
