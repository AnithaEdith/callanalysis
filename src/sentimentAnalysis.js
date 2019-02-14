var groupByUtil = require('./util/groupByUtil.js')

var _ = require('lodash')
require('dotenv').config()

let data = [
  'I dont do recommendations but your process tries to trick people into an upgrade',
  'Quick, easy to rechartge, great service coverage',
  'convenient',
  'Battled to put information to pay with my iphone',
  'Successfully recharge',
  'Not user friendly. Not clear. Had to do trial and error',
  'The cost is way too high!!! U only did it as a backup!',
  'Very difficult but Telstra store at albany WA is even worse',
  'Its pretty straight forward and it saves me having to go into store to do so    ',
  'I always got trouble to recharge, you raise your price dramatically with no possibility to pay less than 30 dollars, the only possibility to use the credit bank is to pay for 1 new month, even when you still have plenty of data  ',
  'I had $70.00 in my prepaid account being sick I forgot to pre paid my $30.00 I day over and lost my money not fair Telstra I am a pensioner'
]

let mockClassifyResponse = [{"text":"I dont do recommendations but your process tries to trick people into an upgrade","external_id":null,"error":false,"classifications":[{"tag_name":"Negative","tag_id":60333049,"confidence":0.802}]},{"text":"Quick, easy to rechartge, great service coverage","external_id":null,"error":false,"classifications":[{"tag_name":"Positive","tag_id":60333048,"confidence":0.983}]},{"text":"convenient","external_id":null,"error":false,"classifications":[{"tag_name":"Positive","tag_id":60333048,"confidence":0.851}]},{"text":"Battled to put information to pay with my iphone","external_id":null,"error":false,"classifications":[{"tag_name":"Neutral","tag_id":60333050,"confidence":0.856}]},{"text":"Successfully recharge","external_id":null,"error":false,"classifications":[{"tag_name":"Neutral","tag_id":60333050,"confidence":0.652}]},{"text":"Not user friendly. Not clear. Had to do trial and error","external_id":null,"error":false,"classifications":[{"tag_name":"Negative","tag_id":60333049,"confidence":0.987}]},{"text":"The cost is way too high!!! U only did it as a backup!","external_id":null,"error":false,"classifications":[{"tag_name":"Negative","tag_id":60333049,"confidence":0.894}]},{"text":"Very difficult but Telstra store at albany WA is even worse","external_id":null,"error":false,"classifications":[{"tag_name":"Negative","tag_id":60333049,"confidence":0.991}]},{"text":"Its pretty straight forward and it saves me having to go into store to do so    ","external_id":null,"error":false,"classifications":[{"tag_name":"Positive","tag_id":60333048,"confidence":0.954}]},{"text":"I always got trouble to recharge, you raise your price dramatically with no possibility to pay less than 30 dollars, the only possibility to use the credit bank is to pay for 1 new month, even when you still have plenty of data  ","external_id":null,"error":false,"classifications":[{"tag_name":"Negative","tag_id":60333049,"confidence":0.652}]},{"text":"I had $70.00 in my prepaid account being sick I forgot to pre paid my $30.00 I day over and lost my money not fair Telstra I am a pensioner","external_id":null,"error":false,"classifications":[{"tag_name":"Negative","tag_id":60333049,"confidence":0.992}]}]

async function prepareChartData(classifyResponse) {
  return new Promise(resolve => {
    let classifiedResponse = _.filter(classifyResponse, function(o) {
      return o.classifications.length > 0
    })

    let classifications = _.map(classifiedResponse, 'classifications')
    let combineclassifications = _.flatten(classifications)

    var chartdata = groupByUtil(combineclassifications, 'tag_name')
    resolve(chartdata)
  })
}

async function monkeylearnApi() {
  return new Promise(resolve => {
    const monkeyenabled = process.env.MONKEY_LEARN_ENABLE === '1' ?  true : false;
    console.log(`monkey learn enabled? ${monkeyenabled}`);
    if(monkeyenabled) {
        console.log('monkey flag enabled');
        const MonkeyLearn = require('monkeylearn')

          // Use the API key from your account
          const ml = new MonkeyLearn(process.env.MONKEY_SENTIMENT_LICENSE_KEY)
        
          // Classify some texts
          let model_id = process.env.MONKEY_SENTIMENT_MODEL_ID
          // the full options are described in the docs: https://monkeylearn.com/api/v3/#classify
          ml.classifiers.classify(model_id, data).then(response => {
                console.log(`success ${response.body}`);
                resolve(response.body);
        }).catch(error => {
                resolve(mockClassifyResponse);
        });
    }
      else {
        console.log('monkey call disabled');
        resolve(mockClassifyResponse)
      }
  })
}

var sentimentAnalysis = async function() {
  return new Promise(resolve => {
    monkeylearnApi().then(function(result) {
      resolve(prepareChartData(result))
    })
  })
}

module.exports = sentimentAnalysis
