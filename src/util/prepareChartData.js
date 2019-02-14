var groupByUtil = require('./groupByUtil.js')
var _ = require('lodash')

var prepareChartData = function(classifyResponse) {
  let classifiedResponse = _.filter(classifyResponse, function(o) {
    return o.classifications.length > 0
  })

  let classifications = _.map(classifiedResponse, 'classifications')
  let combineclassifications = _.flatten(classifications)

  var chartdata = groupByUtil(combineclassifications, 'tag_name')

  return chartdata
}

module.exports = prepareChartData
