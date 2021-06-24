// Your code here

function createEmployeeRecord(arr){
    let record = {};
    record.firstName = arr[0];
    record.familyName = arr[1];
    record.title = arr[2];
    record.payPerHour = arr[3];
    record.timeInEvents = [];
    record.timeOutEvents = [];
    return record;
}

function createEmployeeRecords(arrOfArr){
    return arrOfArr.map(e => createEmployeeRecord(e))
}

function createTimeInEvent(employeeRecord, dateTimeString) {
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        date: dateTimeString.split(" ")[0],
        hour: parseInt(dateTimeString.split(" ")[1], 10)
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateTimeString) {
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        date: dateTimeString.split(" ")[0],
        hour: parseInt(dateTimeString.split(" ")[1], 10)
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    const dateIn = employeeRecord.timeInEvents.find(e => e.date === date)
    const dateOut = employeeRecord.timeOutEvents.find(e => e.date === date)
    return (dateOut.hour - dateIn.hour)/100
}

function wagesEarnedOnDate(employeeRecord, date){
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date)
    return hoursWorked * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    const totalIn = employeeRecord.timeInEvents.map(e => e.hour).reduce((acc, e) => acc + e)
    const totalOut = employeeRecord.timeOutEvents.map(e => e.hour).reduce((acc, e) => acc + e)
    const totalTime = (totalOut - totalIn)/100
    return totalTime * employeeRecord.payPerHour
}

function calculatePayroll(employees) {
    const wages = employees.map(function(record) {return allWagesFor(record)})
    return wages.reduce((acc, e) => acc + e)
}

function findEmployeeByFirstName(records, firstName) {
    return records.find(element => element.firstName === firstName)
}