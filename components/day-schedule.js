import PropTypes from 'prop-types';
import styled from 'styled-components';

import withClassName from './with-classname';
import DayEvents from './day-events';
import {
  HOURS_LABEL_WIDTH,
  HOURS_CELL_HEIGHT
} from '../styles/calendar-weekly-view';

const HourCell = styled.div`
  height: ${HOURS_CELL_HEIGHT}px;
  border-bottom: 1px solid ${(props) => props.theme.color.midGray};
`;

export function DaySchedule({ events } = {}) {
  return (
    <>
      {[...Array(24)].map((_, hour) => (
        <HourCell key={hour} />
      ))}
      <DayEvents events={events} />
    </>
  );
}

DaySchedule.propTypes = {
  events: PropTypes.array
};

export default styled(withClassName(DaySchedule))`
  display: flex;
  flex-direction: column;
  position: relative;
  flex-basis: calc((100% - ${HOURS_LABEL_WIDTH}px) / 7);
  flex-grow: 1;
  border-left: 1px solid ${(props) => props.theme.color.midGray};
`;
