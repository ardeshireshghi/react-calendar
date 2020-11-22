import { fetchWeeklyEvents } from '../../services/google-calendar-api-client';
import apiResponseFixture from '../fixtures/google-calendar-event-api-response.json';

describe('#fetchWeeklyEvents', () => {
  beforeEach(() => {
    gapi.client.calendar.events.list.mockImplementationOnce(() =>
      Promise.resolve(apiResponseFixture)
    );
  });

  it('should call google api with correct start and end dates', async () => {
    const startDate = new Date('2020-11-20');
    const endDate = new Date('2020-11-26');

    const events = await fetchWeeklyEvents({
      startDate,
      endDate,
      calendarId: 'primary'
    });

    const listApi = gapi.client.calendar.events.list;

    expect(listApi).toHaveBeenCalledWith(
      expect.objectContaining({
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString()
      })
    );
  });

  it('should return 2 calendar events with summary, start and end date', async () => {
    const events = await fetchWeeklyEvents({
      startDate: new Date('2020-11-20'),
      endDate: new Date('2020-11-26'),
      calendarId: 'primary'
    });

    expect(events).toHaveLength(2);
    expect(events[0].summary).toEqual('Test event 1');
    expect(events[0].start).toEqual('2020-11-24T12:30:00Z');
    expect(events[0].end).toEqual('2020-11-24T13:30:00Z');
  });
});
