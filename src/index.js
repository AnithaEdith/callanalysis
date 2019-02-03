var _ = require('lodash');
// const MonkeyLearn = require('monkeylearn')

// Use the API key from your account
// const ml = new MonkeyLearn('d55d5e52befb1cf6c20cf1c21ad2ea11b14dc4b0')

// Classify some texts
// let model_id = 'cl_sGdE8hD9'
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

]

let classifyResponse = [{"text":"I dont do recommendations but your process tries to trick people into an upgrade","external_id":null,"error":false,"classifications":[]},{"text":"Quick, easy to rechartge, great service coverage","external_id":null,"error":false,"classifications":[{"tag_name":"Customer Support","tag_id":83702517,"confidence":0.918},{"tag_name":"Ease of Use","tag_id":83702516,"confidence":0.569}]},{"text":"convenient","external_id":null,"error":false,"classifications":[]},{"text":"Battled to put information to pay with my iphone","external_id":null,"error":false,"classifications":[]},{"text":"Successfully recharge","external_id":null,"error":false,"classifications":[]},{"text":"Not user friendly. Not clear. Had to do trial and error","external_id":null,"error":false,"classifications":[{"tag_name":"Ease of Use","tag_id":83702516,"confidence":0.861}]},{"text":"The cost is way too high!!! U only did it as a backup!","external_id":null,"error":false,"classifications":[{"tag_name":"Pricing","tag_id":83702519,"confidence":0.94}]},{"text":"Very difficult but Telstra store at albany WA is even worse","external_id":null,"error":false,"classifications":[{"tag_name":"Ease of Use","tag_id":83702516,"confidence":0.67},{"tag_name":"Pricing","tag_id":83702519,"confidence":0.62}]},{"text":"Its pretty straight forward and it saves me having to go into store to do so    ","external_id":null,"error":false,"classifications":[{"tag_name":"Ease of Use","tag_id":83702516,"confidence":0.66}]},{"text":"I always got trouble to recharge, you raise your price dramatically with no possibility to pay less than 30 dollars, the only possibility to use the credit bank is to pay for 1 new month, even when you still have plenty of data  ","external_id":null,"error":false,"classifications":[{"tag_name":"Pricing","tag_id":83702519,"confidence":0.872}]},{"text":"I had $70.00 in my prepaid account being sick I forgot to pre paid my $30.00 I day over and lost my money not fair Telstra I am a pensioner","external_id":null,"error":false,"classifications":[{"tag_name":"Pricing","tag_id":83702519,"confidence":0.754}]}]
classifyResponse = _.filter(classifyResponse, function(o) {
    return o.classifications.length > 0})

let classifications    = _.map(classifyResponse, 'classifications')
let combineclassifications = _.flatten(classifications)
let groupClassifications  = _.groupBy(combineclassifications, function(n) {
    return n.tag_name
})






// NPS SaaS Feedback Classifier
/*ml.classifiers.classify(model_id, data).then(response => {
        // handle response
        // console.log(response)
        var classifyResponse = response.body;
        console.log(JSON.stringify(_.dropWhile(classifyResponse, function(o) { return 
            _.size(o.classification) === 0 })))
        var users = [
            { 'user': 'barney',  'active': false },
            { 'user': 'fred',    'active': false },
            { 'user': 'pebbles', 'active': true }
          ];
        console.log(          _.size([]))

          //  console.log(JSON.stringify(_.dropWhile(users, function(o) { return o.active; })))
          

        //console.log(JSON.stringify(classifyResponse))
    }).catch(error => {
        // handle error
        console.log(error)
        // if an error is thrown during the request
        // it will also contain the (failure) response
        console.log(error.response)
    })

*/



var groupBy = (arr, pahse, step='') => {

    var pahseArr = [];
    var resultArr = [];
    
    arr.map((item)=>{
     var pushed = false;
     pahseArr.map((ele)=>{
       if(ele===item.tag_name){
         pushed = true;
       }
     })
     if(!pushed){
       pahseArr.push(item.tag_name);
     }     
    })
    
    pahseArr.map((item)=>{
      var sum = 0;
      var count = 0;
      arr.map((ele)=>{
        if(ele.tag_name===item){
          count += 1;  
          sum += parseFloat(ele.confidence)
        }
      })
      resultArr.push({
        tag_name: item,
        confidence: sum/count
      })
    })
    
    return resultArr;
    }
    
var chartdata= (groupBy(combineclassifications, 'tag_name'));
console.log(chartdata);
