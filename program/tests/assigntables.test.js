const SeatingChart = require('../../run.js')

const students1 = ['jane', 'john', 'julia']
const tables1 = [{
  name: 'Table 1',
	capacity: 2,
	students: []
},
{
  name: 'Table 2',
	capacity: 2,
	students: []
}]
const expect1 = {
  tables: [{
    name: 'Table 1',
    capacity: 2,
    students: ['jane', 'julia']
  },
  {
    name: 'Table 2',
    capacity: 2,
    students: ['john']
  }],
  unassigned: []
}

const actual1 = SeatingChart.assignTables(students1,tables1)
if (JSON.stringify(actual1) == JSON.stringify(expect1)){
  console.log('TEST1: PASS')
} else {
  console.log('TEST1: FAIL')
  console.log(JSON.stringify(actual1))
  console.log(JSON.stringify(expect1))
}

//----------------------------

const students2 = ['jane', 'john', 'julia', 'jared', 'julian', 'jamie']
const tables2 = [{
  name: 'Table 1',
	capacity: 2,
	students: []
},
{
  name: 'Table 2',
	capacity: 2,
	students: []
}]
const expect2 = {
  tables: [{
      name: 'Table 1',
      capacity: 2,
      students: ['jane', 'julia']
    },
    {
      name: 'Table 2',
      capacity: 2,
      students: ['john', 'jared']
    }],
  unassigned: ['julian', 'jamie']
}

const actual2 = SeatingChart.assignTables(students2,tables2)
if (JSON.stringify(actual2) == JSON.stringify(expect2)){
  console.log('TEST2: PASS')
} else {
  console.log('TEST2: FAIL')
  console.log(JSON.stringify(actual2))
  console.log(JSON.stringify(expect2))
}
//----------------------------

const students3 = ['jane', 'john', 'julia', 'jared', 'julian', 'jamie']
const tables3 = [{
  name: 'Table 1',
	capacity: 2,
	students: []
},
{
  name: 'Table 2',
	capacity: 3,
	students: []
},
{
  name: 'Table 3',
	capacity: 2,
	students: []
}]
const expect3 = {
  tables: [{
      name: 'Table 1',
      capacity: 2,
      students: ['jane', 'jared']
    },
    {
      name: 'Table 2',
      capacity: 3,
      students: ['john', 'julian']
    },
    {
      name: 'Table 3',
      capacity: 2,
      students: ['julia', 'jamie']
    }],
  unassigned: []
}

const actual3 = SeatingChart.assignTables(students3,tables3)
if (JSON.stringify(actual3) == JSON.stringify(expect3)){
  console.log('TEST3: PASS')
} else {
  console.log('TEST3: FAIL')
  console.log(JSON.stringify(actual3))
  console.log(JSON.stringify(expect3))
}