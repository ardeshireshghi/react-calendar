import styled from 'styled-components';

const CalendarHeading = styled.header`
  color: ${(props) => props.theme.color.darkerGray};
  font-size: ${(props) => props.theme.font.xxlarge};
  font-weight: 300;
  padding: ${(props) => props.theme.spacing.large};
  margin-bottom: ${(props) => props.theme.spacing.medium};
  border-bottom: 1px solid ${(props) => props.theme.color.lightGray};
`;

export default CalendarHeading;
