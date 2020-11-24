import PropTypes from 'prop-types';
import styled from 'styled-components';

import { HOURS_CELL_HEIGHT } from '../styles/calendar-weekly-view';

function eventTimeWithFormatting(startTime, endTime) {
  const startHour = startTime.getHours().toString().padStart(2, '0');
  const startMinutes = startTime.getMinutes().toString().padEnd(2, '0');
  const endHour = endTime.getHours().toString().padStart(2, '0');
  const endMinutes = endTime.getMinutes().toString().padEnd(2, '0');

  return `${startHour}:${startMinutes} - ${endHour}:${endMinutes}`;
}

const calculateTransform = ({ startTime }) => {
  const startHour = startTime.getHours();
  const startMinutes = startTime.getMinutes();

  return `${
    startHour * HOURS_CELL_HEIGHT + (startMinutes / 60) * HOURS_CELL_HEIGHT
  }px`;
};

const calculateHeight = ({ startTime, endTime }) => {
  const diffHours = (endTime - startTime) / 1000 / 3600;

  return `${diffHours * HOURS_CELL_HEIGHT}px`;
};

const StyledEventBlock = styled.div`
  position: absolute;
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  font-size: ${(props) => props.theme.font.small};
  color: ${(props) => props.theme.color.white};
  min-height: 20px;
  background-color: ${(props) => props.theme.color.green};
  transform: translateY(${(props) => calculateTransform(props)});
  height: ${(props) => calculateHeight(props)};
`;

const EventTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

export default function EventItem({ title, startDateTime, endDateTime } = {}) {
  return (
    <StyledEventBlock startTime={startDateTime} endTime={endDateTime}>
      <EventTitle>{title}</EventTitle>
      <div>{eventTimeWithFormatting(startDateTime, endDateTime)}</div>
    </StyledEventBlock>
  );
}

EventItem.propTypes = {
  title: PropTypes.string.isRequired,
  startDateTime: PropTypes.instanceOf(Date).isRequired,
  endDateTime: PropTypes.instanceOf(Date).isRequired
};
