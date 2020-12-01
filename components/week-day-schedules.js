import PropTypes from 'prop-types';
import styled from 'styled-components';

import HourLabels from './hour-labels';
import DaySchedule from './day-schedule';
import withClassName from './with-classname';
import { useCalendarData } from '../contexts/calendar-data-context';
import { getDatesBetweenDates } from '../services/date';

import { selectEventsForDate } from '../services/filter-calendar-events';

export function WeekDaySchedules({ startDate, endDate } = {}) {
  const { calendarEvents, activeCalendars } = useCalendarData();

  return (
    <>
      <HourLabels />
      {getDatesBetweenDates(startDate, endDate).map((date, index) => (
        <DaySchedule
          events={selectEventsForDate(date, activeCalendars, calendarEvents)}
          key={index}
        />
      ))}
    </>
  );
}

WeekDaySchedules.propTypes = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired
};

export default styled(withClassName(WeekDaySchedules))`
  display: flex;
`;
