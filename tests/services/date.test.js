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
