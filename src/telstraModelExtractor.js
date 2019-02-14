var groupByUtil = require('./util/groupByUtil.js')

var _ = require('lodash')
//const MonkeyLearn = require('monkeylearn')

// Use the API key from your account
//const ml = new MonkeyLearn('f7d0623f855bf1d023a7b6d18289b8902dced6a3')

// Classify some texts
//let model_id = 'ex_iwn4Wvy3'
// the full options are described in the docs: https://monkeylearn.com/api/v3/#classify

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
];

let mockExtractorResponse =[{"text":"I dont do recommendations but your process tries to trick people into an upgrade","external_id":null,"error":false,"extractions":[{"tag_name":"User Friendly","extracted_text":"but your process tries to trick people","parsed_value":"but your process tries to trick people","offset_span":[26,63]}]},{"text":"Quick, easy to rechartge, great service coverage","external_id":null,"error":false,"extractions":[{"tag_name":"User Friendly","extracted_text":"Quick","parsed_value":"Quick","offset_span":[0,4]},{"tag_name":"User Friendly","extracted_text":"easy","parsed_value":"easy","offset_span":[7,10]},{"tag_name":"Coverage","extracted_text":"great service","parsed_value":"great service","offset_span":[26,38]}]},{"text":"convenient","external_id":null,"error":false,"extractions":[{"tag_name":"User Friendly","extracted_text":"convenient","parsed_value":"convenient","offset_span":[0,9]}]},{"text":"Battled to put information to pay with my iphone","external_id":null,"error":false,"extractions":[{"tag_name":"Complexity","extracted_text":"Battled to put information","parsed_value":"Battled to put information","offset_span":[0,25]},{"tag_name":"Cost","extracted_text":"pay with my iphone","parsed_value":"pay with my iphone","offset_span":[30,47]}]},{"text":"Successfully recharge","external_id":null,"error":false,"extractions":[{"tag_name":"Recharge","extracted_text":"Successfully recharge","parsed_value":"Successfully recharge","offset_span":[0,20]}]},{"text":"Not user friendly. Not clear. Had to do trial and error","external_id":null,"error":false,"extractions":[{"tag_name":"Complexity","extracted_text":"Had to do trial and error","parsed_value":"Had to do trial and error","offset_span":[30,54]}]},{"text":"The cost is way too high!!! U only did it as a backup!","external_id":null,"error":false,"extractions":[{"tag_name":"Cost","extracted_text":"The cost is way too high","parsed_value":"The cost is way too high","offset_span":[0,23]}]},{"text":"Very difficult but Telstra store at albany WA is even worse","external_id":null,"error":false,"extractions":[{"tag_name":"Complexity","extracted_text":"Very difficult","parsed_value":"Very difficult","offset_span":[0,13]}]},{"text":"Its pretty straight forward and it saves me having to go into store to do so    ","external_id":null,"error":false,"extractions":[{"tag_name":"User Friendly","extracted_text":"pretty straight forward","parsed_value":"pretty straight forward","offset_span":[4,26]}]},{"text":"I always got trouble to recharge, you raise your price dramatically with no possibility to pay less than 30 dollars, the only possibility to use the credit bank is to pay for 1 new month, even when you still have plenty of data  ","external_id":null,"error":false,"extractions":[{"tag_name":"Recharge","extracted_text":"always got trouble to recharge","parsed_value":"always got trouble to recharge","offset_span":[2,31]},{"tag_name":"Cost","extracted_text":"raise your price","parsed_value":"raise your price","offset_span":[38,53]}]},{"text":"I had $70.00 in my prepaid account being sick I forgot to pre paid my $30.00 I day over and lost my money not fair Telstra I am a pensioner","external_id":null,"error":false,"extractions":[{"tag_name":"Cost","extracted_text":"lost my money","parsed_value":"lost my money","offset_span":[92,104]}]}]

async function prepartChartForExtractor(classifyResponse) {
  return new Promise(resolve => {
    let classifiedResponse = _.filter(classifyResponse, function(o) {
      return o.extractions.length > 0
    })

    let classifications = _.map(classifiedResponse, 'extractions')
    let combineclassifications = _.flatten(classifications)
    let groupByExtractedWords = _.groupBy(combineclassifications, 'tag_name')
    //var chartdata= (groupByUtil(combineclassifications, 'tag_name'));
    var resultArr = []
    _.forEach(groupByExtractedWords, function(value, key) {
      resultArr.push({
        tag_name: key,
        count: value.length
      })
    })

    resolve(resultArr)
  })
}

async function monkeylearnApi() {
  return new Promise(resolve => {
    /*ml.classifiers.classify(model_id, data).then(response => {
            console.log('success');
            console.log(response.body);
            resolve(response.body);
        }).catch(error => {
            console.log(error);
            resolve(mockExtractorResponse);
        });*/
    resolve(mockExtractorResponse)
  })
}

var telstraModelExtractor = async function() {
  return new Promise(resolve => {
    monkeylearnApi().then(function(result) {
      resolve(prepartChartForExtractor(result))
      //resolve(result);
    })
  })
}

module.exports = telstraModelExtractor
