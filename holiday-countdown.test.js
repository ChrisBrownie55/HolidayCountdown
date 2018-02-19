'use strict'
const hc = require( './holiday-countdown' )

it('isPast month in the future', () => 
    expect(hc.isPast(12,31)).toBeFalsy()
)

it('isPast month in the past', () =>
    expect(hc.isPast(1,0)).toBeTruthy()
)

it('isPast day in the future', () =>
    expect(hc.isPast(hc.thisMonth(), hc.thisDay() + 1)).toBeFalsy()
)

it('isPast day in the past', () =>
    expect(hc.isPast(hc.thisMonth(), hc.thisDay() - 1 )).toBeTruthy()
)

it('nextOccurence next year', () => 
    expect(hc.nextOccurrence(hc.thisMonth() - 1, 1)).toBe(`${hc.thisYear() + 1}-${hc.thisMonth() - 1}-1`)
)

it('nextOccurence this year', () => 
    expect(hc.nextOccurrence(hc.thisMonth() + 1, 1)).toBe(`${hc.thisYear()}-${hc.thisMonth() + 1}-1`)
)

it('diffTime regular value', () =>
    expect(hc.diffTime(new Date(2500))(new Date(1000))).toBe(1500)
)

it('diffTime absolute value', () =>
    expect(hc.diffTime(new Date(1000))(new Date(2500))).toBe(1500)
)

it('getFullDays', () =>
    expect(hc.getFullDays(1000*60*60*24*3)).toBe(3)
)