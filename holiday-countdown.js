'use strict'
function getYear(date) {
    return date.getUTCFullYear()
}

function thisYear() {
    return getYear(new Date())
}

function getMonth(date) {
    return date.getUTCMonth() + 1
}

function thisMonth() {
    return getMonth(new Date())
}

function getDay(date) {
    return date.getUTCDate()
}

function thisDay() {
    return getDay(new Date())
}

function isPast(month, day) {
    return thisMonth() > month || (thisMonth() == month && thisDay() > day)
}

function nextOccurrence(month, day) {
    return `${thisYear() + (isPast(month, day) ? 1 : 0)}-${month}-${day}`
}

function diffTime(date1) {
    return function(date2) {
        return Math.abs( date1.getTime() - date2.getTime())
    }
}

function diffTimeNow(date) {
    return diffTime(new Date())(date)
}

function getFullDays(n) {
    return Math.floor(n / (1000 * 60 * 60 * 24))
}

function diffDays(date1) {
    return function(date2) {
        return getFullDays(diffTime(date1)(date2))
    }
}

function diffDaysNow(date) {
    return diffDays(new Date())(date)
}

function daysUntil(month, day) {
    return diffDaysNow(new Date(nextOccurrence(month, day)))
}

function getEaster(year) {
    var f = Math.floor,
        G = year % 19,
        C = f(year / 100),
        H = (C - f(C / 4) - f((8 * C + 13)/25) + 19 * G + 15) % 30,
        I = H - f(H/28) * (1 - f(29/(H + 1)) * f((21-G)/11)),
        J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
        L = I - J,
        month = 3 + f((L + 40)/44),
        day = L + 28 - 31 * f(month / 4)

    return [month,day]
}

function getThanksgiving(year) {
    return new Date(new Date(`thursday november ${year}`).getTime() + (1000 * 60 * 60 * 24 * 7 * 3))
}

const holidays = {
    'christmas': () => daysUntil(12, 25),
    'easter': () => {
        const day = getEaster(thisYear())
        if (isPast(...day))
            return daysUntil(...getEaster(thisYear() + 1))
         
         return daysUntil(...day)
    },
    'valentines': () => daysUntil(2, 14),
    'halloween': () => daysUntil(10, 31),
    'saint patrick\'s': () => daysUntil(3, 17),
    'new year\'s eve': () => daysUntil(12, 31),
    'thanksgiving': () => {
        const date = getThanksgiving(thisYear())
        if (isPast(getMonth(date), getDay(date)))
            return diffDaysNow(getThanksgiving(thisYear() + 1))
         
         return diffDaysNow(date)
    }
}
if (window['module'])
    module.exports.holidays = holidays