import PropTypes from 'prop-types';
import styled from 'styled-components';

import withClassName from './with-classname';
import { HOURS_LABEL_WIDTH } from '../styles/calendar-weekly-view';

const DateNumber = styled.span`
  display: inline-block;
  vertical-align: middle;
  font-size: ${(props) => props.theme.font.large};
  font-weight: 500;
  margin-right: 0.5rem;
  padding: 0.5rem;
  border-radius: 50%;
  color: ${(props) =>
    props.isToday ? props.theme.color.white : props.theme.color.black};
  background-color: ${(props) =>
    props.isToday ? props.theme.color.purple : 'transparent'};
`;

const DayText = styled.span`
  display: inline-block;
  font-weight: 300;
  vertical-align: middle;
  color: ${(props) =>
    props.isToday ? props.theme.color.black : props.theme.color.gray};
`;

export function DayLabel({ dateInMonth, dayPlainText, isToday = false } = {}) {
  return (
    <>
      <DateNumber isToday={isToday}>{dateInMonth}</DateNumber>
      <DayText isToday={isToday}>{dayPlainText}</DayText>
    </>
  );
}

export default styled(withClassName(DayLabel))`
  flex-basis: calc((100% - ${HOURS_LABEL_WIDTH}px) / 7);
  flex-grow: 1;
  min-width: 60px;
  padding: 1rem;
  text-align: center;
  border-left: 1px solid ${(props) => props.theme.color.midGray};
`;
