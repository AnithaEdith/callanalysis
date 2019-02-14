var groupByUtil = (arr, pahse, step='') => {

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
        confidence: (sum/count).toFixed(2)
      })
    })
    
    return resultArr;
    }

module.exports = groupByUtil;
