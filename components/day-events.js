import PropTypes from 'prop-types';
import EventItem from './event-item';

export default function DayEvents({ events } = {}) {
  return (
    <>
      {events.map((event, index) => (
        <EventItem
          title={event.summary}
          startDateTime={new Date(event.start)}
          endDateTime={new Date(event.end)}
          key={index}
        />
      ))}
    </>
  );
}

DayEvents.propTypes = {
  events: PropTypes.array
};
