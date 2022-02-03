const fs = require('fs')

let allStudents = []
let allTables = []
let tablesPerRow = 0

try {
	const studentFile = fs.readFileSync('/Desktop/SeatingChart/students.csv', 'utf8')
	let fileRows = studentFile.split('\n')
	fileRows.shift() //remove title row
	fileRows.forEach(row => {
		const tmpArr = row.split(',')
		if (tmpArr.length >= 2 && tmpArr[0].length > 0){
			const currentKid = {
				name: `${tmpArr[1].replace('\"','').replace(' ','')} ${tmpArr[0].replace('\"','').replace(' ','')}`,
				shouldBeClose: tmpArr[2].includes('x'),
			}
			allStudents.push(currentKid)
		}
	})
} catch (err) {
	console.log(`Error reading Students file. Can't continue. Please name the file "students.csv".`)
	process.exit()
}

try {
	tablesPerRow = parseInt(fs.readFileSync('/Desktop/SeatingChart/classroom_setup/tablesPerRow.txt', 'utf8').split(',')[0])
	if (isNaN(tablesPerRow)){
		console.log(`Oops seems your setting for "tables per row" is not a number. Please make sure the file "tablesPerRow.txt" only contains a number.`)
		process.exit()	
	}
} catch (err) {
	console.log(`Error reading Tables Per Row file. Can't continue. Please name the file "tablesPerRow.txt".`)
	process.exit()
}

try {
	const tableFile = fs.readFileSync('/Desktop/SeatingChart/classroom_setup/tables.csv', 'utf8')
	const fileRows = tableFile.split('\n') 
	fileRows.shift() //remove title row
	fileRows.forEach(row => {
		const tmpArr = row.split(',')
		if (tmpArr.length >= 4 ){
			const currentTable = {
				name: tmpArr[0],
				capacity: parseInt(tmpArr[1]),
				location: parseInt(tmpArr[2]),
				fillOrder: parseInt(tmpArr[3]),
				students: [],
			}
			if (isNaN(currentTable.capacity) || isNaN(currentTable.location) || isNaN(currentTable.fillOrder)) {
				console.log(`Oops seems like you have an issue with the data for table ${currentTable.name}. 
				Please make sure the values for Capacity, Location, and Fill Order are numbers.`)
				process.exit()	
			}
			allTables.push(currentTable)
		} else  if (tmpArr[0].length > 0) {
			console.log(`hmm your table named: "${tmpArr[0]}" seems to be missing info so I gotta skip it`)
		}
	})
} catch (err) {
	console.log(`Error reading Tables file. Can't continue. Please name the file "tables.csv".`)
	process.exit()
}

console.log('Ok seems like you got:')
console.log(allStudents.length, 'students')
console.log(allTables.length, 'tables')
console.log(tablesPerRow, 'tables per row')
console.log('working on your chart...')


const shuffle = (arr) => {
	for (var i = arr.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
	}
	return arr.sort((a,b) => b.shouldBeClose-a.shouldBeClose);
}

const sortTableByFillOrder = (tables) => {
	return tables.sort((a, b) => parseFloat(a.fillOrder) - parseFloat(b.fillOrder));
}
const sortTableByLocation = (tables) => {
	return tables.sort((a, b) => parseFloat(a.location) - parseFloat(b.location));
}

const assignTables = (students, tables) => {
	let unassigned = []
	for (i=0; i<students.length; i++) {
		const tableIndex = (i + tables.length) % tables.length
		if (tables[tableIndex].students.length < tables[tableIndex].capacity) {
			tables[tableIndex].students.push(students[i])
		} else {
			unassigned.push(students[i])
		}
	}
	unassigned.forEach(kid => {
		let isUnassigned = true
		tables.forEach(table => {
			if (isUnassigned && table.students.length < table.capacity) {
				table.students.push(kid)
				unassigned.splice(unassigned.indexOf(kid), 1)
				isUnassigned = false
			}
		})
	})
	return { tables, unassigned }
}

const formatTables = (tables, unassigned) => {
	let seatingChart = ""

	tables.forEach(table => {
		seatingChart += '\"' + table.name + '\n\n'
		table.students.forEach(kid => {
			seatingChart += kid.name + '\n'
		})
		seatingChart += '\",'
		if ((tables.indexOf(table) + tablesPerRow) % tablesPerRow === tablesPerRow - 1){ // TODO: needs to be extracted and tested
			seatingChart += '\n'
		}
	})
	if (unassigned.length > 0) {
		seatingChart += '\"' + 'Unassigned' + '\n\n'
		unassigned.forEach(kid => {
			seatingChart += kid.name + '\n'
		})
		seatingChart + '\"\n'
	}
	return seatingChart
}

const createSeatingChart = (students, tables) => {
	const shuffledStudents = shuffle(students)
	const tablesInFillOrder = sortTableByFillOrder(tables)

	const assignments = assignTables(shuffledStudents, tablesInFillOrder)
	const tablesInLocationOrder = sortTableByLocation(assignments.tables)

	const formattedTables = formatTables(tablesInLocationOrder, assignments.unassigned)
	fs.writeFileSync('/Desktop/SeatingChart/seatingchart.csv', formattedTables) //TODO: make this an HTML with inline styling??
	console.log('Chart completed. See file: "seatingchart.csv"')
}

createSeatingChart(allStudents, allTables)

module.exports = {
	assignTables,
	sortTableByFillOrder,
	sortTableByLocation,
	formatTables
}