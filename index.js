// Your code here
function createEmployeeRecord(arr) {
  let employee = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  };

  return employee;
}

function createEmployeeRecords(arr) {
  let employeeRecords = arr.map(function(e) {
    return createEmployeeRecord(e);
  })

  return employeeRecords;
}

function createTimeInEvent(employeeRecord, timeInStamp) {
  let timeInEvent = {
    type: "TimeIn",
    hour: parseInt(timeInStamp.slice(-4)),
    date: timeInStamp.slice(0, 10)
  };

  employeeRecord.timeInEvents.push(timeInEvent);

  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeOutStamp) {
  let timeOutEvent = {
    type: "TimeOut",
    hour: parseInt(timeOutStamp.slice(-4)),
    date: timeOutStamp.slice(0, 10)
  };

  employeeRecord.timeOutEvents.push(timeOutEvent);

  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  let timeInRecord = employeeRecord.timeInEvents.find(record => record.date === date);

  let timeOutRecord = employeeRecord.timeOutEvents.find(record => record.date === date);

  return (timeOutRecord.hour - timeInRecord.hour)/100;
}

function wagesEarnedOnDate(employeeRecord, date) {
  let hours = hoursWorkedOnDate(employeeRecord, date);

  return (hours * employeeRecord.payPerHour);
}

function allWagesFor(employee) {
  let dates = employee.timeInEvents.map(function(e) {
    return e.date;
  })

  let wagesArray = dates.map(function(date) {
    return wagesEarnedOnDate(employee, date);
  })

  return wagesArray.reduce(function(memo, i) {
    return memo + i;
  })
}

function findEmployeeByFirstName(arr, name) {
  let match = arr.find(employee => employee.firstName === name);

  return match;
}

function calculatePayroll(arr) {
  let wagesArray = arr.map(function(e) {
    return allWagesFor(e);
  })

  return wagesArray.reduce(function(memo, i) {
    return memo + i;
  })
}
