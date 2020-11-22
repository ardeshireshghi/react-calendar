import PropTypes from 'prop-types';

export default function CalendarHeading({ text }) {
  return <header>{text}</header>;
}

CalendarHeading.propTypes = {
  text: PropTypes.string.isRequired
};
