const SeatingChart = require('../../run.js')

const tables1 = [{
  name: 'Table 1',
	fillOrder: 2
},
{
  name: 'Table 2',
  fillOrder: 1,
},
{
  name: 'Table 3',
  fillOrder: 3,
}]
const expect1 = [
  {
    name: 'Table 2',
    fillOrder: 1,
  },
  {
    name: 'Table 1',
    fillOrder: 2
  },
  {
    name: 'Table 3',
    fillOrder: 3,
  }
]

const actual1 = SeatingChart.sortTableByFillOrder(tables1)
if (JSON.stringify(actual1) == JSON.stringify(expect1)){
  console.log('TEST1: PASS')
} else {
  console.log('TEST1: FAIL')
  console.log(JSON.stringify(actual1))
  console.log(JSON.stringify(expect1))
}

//----------------------------

const tables2 = [{
  name: 'Table 1',
	fillOrder: 1
},
{
  name: 'Table 2',
  fillOrder: 2,
},
{
  name: 'Table 3',
  fillOrder: 3,
}]
const expect2 = [{
  name: 'Table 1',
	fillOrder: 1
},
{
  name: 'Table 2',
  fillOrder: 2,
},
{
  name: 'Table 3',
  fillOrder: 3,
}]

const actual2 = SeatingChart.sortTableByFillOrder(tables2)
if (JSON.stringify(actual2) == JSON.stringify(expect2)){
  console.log('TEST1: PASS')
} else {
  console.log('TEST1: FAIL')
  console.log(JSON.stringify(actual2))
  console.log(JSON.stringify(expect2))
}

//----------------------------

const tables3 = [{
  name: 'Table 1',
	fillOrder: 3
},
{
  name: 'Table 2',
  fillOrder: 1,
},
{
  name: 'Table 3',
  fillOrder: 1,
}]
const expect3 = [{
  name: 'Table 2',
	fillOrder: 1
},
{
  name: 'Table 3',
  fillOrder: 1,
},
{
  name: 'Table 1',
  fillOrder: 3,
}]

const actual3 = SeatingChart.sortTableByFillOrder(tables3)
if (JSON.stringify(actual3) == JSON.stringify(expect3)){
  console.log('TEST1: PASS')
} else {
  console.log('TEST1: FAIL')
  console.log(JSON.stringify(actual3))
  console.log(JSON.stringify(expect3))
}

//----------------------------