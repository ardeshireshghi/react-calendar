import {
  formattedDayMonthFromDate,
  startEndDatesOfWeek
} from '../../services/date';

describe('#formattedDayMonthFromDate', () => {
  it('should format the date correctly', () => {
    const date = new Date('2020-01-20');
    expect(formattedDayMonthFromDate(date)).toEqual('January, 2020');
  });
});

describe('#startEndOfWeekDates', () => {
  it('should return correct start and end dates', () => {
    // Wednesday 25th
    const date = new Date('2020-11-25');
    const { startDate, endDate } = startEndDatesOfWeek(date);

    // Sunday 22th
    expect(startDate.toISOString()).toEqual('2020-11-22T00:00:00.000Z');

    // Saturday 28th (Sunday 29th hour zero)
    expect(endDate.toISOString()).toEqual('2020-11-29T00:00:00.000Z');
  });
});
