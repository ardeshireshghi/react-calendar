import styled from 'styled-components';

import { HOURS_LABEL_WIDTH } from '../styles/calendar-weekly-view';

const HoursContainer = styled.div`
  width: ${HOURS_LABEL_WIDTH}px;
  font-size: ${(props) => props.theme.font.small};
`;

const HourLabel = styled.div`
  height: 80px;
  color: ${(props) => props.theme.color.darkGray};
  text-align: right;
  padding-right: 1rem;
`;

const HourLabelText = styled.div`
  line-height: 16px;
  transform: translateY(-8px);
`;

const labelValue = (hour) => {
  if (hour === 0) {
    return '';
  }

  return hour < 12 ? hour + ' AM' : hour + ' PM';
};

export default function HourLabels() {
  return (
    <HoursContainer>
      {[...Array(24)].map((_, hour) => (
        <HourLabel key={hour}>
          <HourLabelText>{labelValue(hour)}</HourLabelText>
        </HourLabel>
      ))}
    </HoursContainer>
  );
}
