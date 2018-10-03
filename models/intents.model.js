const mongoose = require('mongoose');

var intentSchema = new mongoose.Schema({
  intentName: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  sentences: {
    type: Array,
    unique: true,
    trim: true,
    default: []
  }
}, {
  timestamps: true,
}, {
  strict: false,
  collection: 'intents'
}, {
  versionKey: false
})
//> db.intents.update({intentName: "no"}, {$push: {sentences: { $each: ["no", "not done", "not yet", "Iam not done"]}}}, {upsert: true})

intentSchema.statics.getAllIntentsWithSentences = (records, callback) => {
  Intents.find({}).exec((err, records) => {
    if (err) {
      return callback(err)
    } else if (records) {
      return callback(null, records)
    }
  })
}

intentSchema.statics.getAllIntents = (records, callback) => {
  Intents.find({}).exec((err, records) => {
    if (err) {
      return callback(err)
    } else if (records) {
      return callback(null, records);
    }
  })
}


intentSchema.statics.getSentencesByIntent = (intent, callback) => {
  Intents.findOne({
    intentName: intent
  }).exec((err, records) => {
    if (err) {
      return callback(err)
    } else if (records) {
      return callback(null, records)
    }
  })
}

intentSchema.statics.getSentencesByIntentAndUpdate = (intent, sentence, callback) => {
  Intents.findOneAndUpdate({
    intentName: intent
  }, {
    $addToSet: {
      sentences: sentence
    }
  }, {
    safe: true,
    upsert: true
  }, (err, records) => {
    if (err) {
      return callback(err)
    } else if (records) {
      return callback(null, records)
    }
  })
}

intentSchema.statics.getSentencesByIntentAndRemove = (intent, sentence, callback) => {
  Intents.findOneAndUpdate({
    intentName: intent
  }, {
    $pull: {
      sentences: sentence
    }
  }, (err, records) => {
    if (err) {
      return callback(err)
    } else if (records) {
      console.log(records)
      return callback(null, records)
    }
  })
}



var Intents = mongoose.model('Intents', intentSchema);
module.exports = Intents;
