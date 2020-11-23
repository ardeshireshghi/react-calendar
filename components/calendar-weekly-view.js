import PropTypes from 'prop-types';
import styled from 'styled-components';

import WeekDayLabels from './week-day-labels';
import WeekDaySchedules from './week-day-schedules';
import withClassName from './with-classname';

const ScrollableSection = styled.div`
  max-height: calc(100vh - 100px);
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
`;

export function CalendarWeeklyView({ startDate, endDate } = {}) {
  return (
    <>
      <WeekDayLabels startDate={startDate} endDate={endDate} />
      <ScrollableSection>
        <WeekDaySchedules startDate={startDate} endDate={endDate} />
      </ScrollableSection>
    </>
  );
}

CalendarWeeklyView.propTypes = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired
};

export default styled(withClassName(CalendarWeeklyView))`
  background-color: ${(props) => props.theme.color.white};
  border-radius: 5px;
  margin: ${(props) => `0 ${props.theme.spacing.medium}`};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 500px;
`;
