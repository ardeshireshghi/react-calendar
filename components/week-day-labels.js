import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getDayNameFromDate, todayAtZero } from '../services/date';
import { HOURS_LABEL_WIDTH } from '../styles/calendar-weekly-view';

import DayLabel from './day-label';
import withClassName from './with-classname';

function getDateDaysBetweenDates(startDate, endDate) {
  const result = [];

  let currentDate = new Date(startDate);

  while (currentDate < endDate) {
    const date = new Date(currentDate);
    result.push([date, date.getDate(), getDayNameFromDate(date)]);

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
}

export function WeekDayLabels({ startDate, endDate } = {}) {
  const todayDate = todayAtZero();

  return (
    <>
      {getDateDaysBetweenDates(startDate, endDate).map(
        ([date, dateInMonth, dayPlainText], index) => (
          <DayLabel
            key={index}
            dateInMonth={dateInMonth}
            dayPlainText={dayPlainText}
            isToday={todayDate.getTime() === date.getTime()}
          />
        )
      )}
    </>
  );
}

WeekDayLabels.propTypes = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  eventsGroupedByCalendarName: PropTypes.objectOf(PropTypes.array)
};

export default styled(withClassName(WeekDayLabels))`
  display: flex;
  padding-left: ${HOURS_LABEL_WIDTH}px;
  border-bottom: 1px solid ${(props) => props.theme.color.lightGray};
`;
