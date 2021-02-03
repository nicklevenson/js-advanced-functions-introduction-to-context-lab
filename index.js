// Your code here

function createEmployeeRecord(array) {
  let employee = {}
  employee.firstName = array[0]
  employee.familyName = array[1]
  employee.title = array[2]
  employee.payPerHour = array[3]
  employee.timeInEvents = []
  employee.timeOutEvents = []
  return employee
}

function createEmployeeRecords(employees){
  let record = employees.map(e => {
    return createEmployeeRecord(e)
  })
  return record
}

function createTimeInEvent(record, time){
  let TimeIn = {type: "TimeIn", date: time.split(" ")[0], hour: parseInt(time.split(" ")[1])}
  record.timeInEvents.push(TimeIn)
  return record
}

function createTimeOutEvent(record, time) {
  let TimeOut = {type: "TimeOut", date: time.split(" ")[0], hour: parseInt(time.split(" ")[1])}
  record.timeOutEvents.push(TimeOut)
  return record
}

function hoursWorkedOnDate(record, date) {
  let inTime = record.timeInEvents.find(e => {
    return e.date === date
  }).hour
  let outTime = record.timeOutEvents.find(e => {
    return e.date === date
  }).hour
  return (outTime - inTime) / 100
}

function wagesEarnedOnDate(record, date) {
  return record.payPerHour * hoursWorkedOnDate(record, date)
}

function allWagesFor(record) {
  let dates = record.timeOutEvents.map(e => e.date)
  return dates.reduce(function (total, d) {
    return wagesEarnedOnDate(record, d) + total
  }, 0)
}

function calculatePayroll(records) {
  return records.reduce(function (total, r) {return allWagesFor(r) + total}, 0)
}


function findEmployeeByFirstName(records, name) {
  return records.find(r => r.firstName === name)
}