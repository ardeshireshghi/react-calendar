import { act } from 'react-dom/test-utils';
import { renderWithAllProviders, mockCurrentDate } from '../test-utils';
import CalendarWeeklyView from '../../components/calendar-weekly-view';

describe('CalendarWeeklyView', () => {
  describe('Week day hour and day labels', () => {
    let restoreDateMock;

    const startOfTheWeek = new Date('2020-11-22'); // sunday
    const endOfTheWeek = new Date('2020-11-29'); // end of saturday (next sunday morning)

    beforeEach(() => {
      // Setup
      restoreDateMock = mockCurrentDate('2020-11-22');
    });

    afterEach(() => {
      restoreDateMock();
    });

    it('shows week day labels with correct days', () => {
      const { getByText } = renderWithAllProviders(
        <CalendarWeeklyView startDate={startOfTheWeek} endDate={endOfTheWeek} />
      );

      expect(getByText('22')).toBeInTheDocument();
      expect(getByText('23')).toBeInTheDocument();
      expect(getByText('24')).toBeInTheDocument();
      expect(getByText('25')).toBeInTheDocument();
      expect(getByText('26')).toBeInTheDocument();
      expect(getByText('27')).toBeInTheDocument();
      expect(getByText('28')).toBeInTheDocument();
    });

    it('shows hour labels with correct format', () => {
      const { getByText } = renderWithAllProviders(
        <CalendarWeeklyView startDate={startOfTheWeek} endDate={endOfTheWeek} />
      );

      expect(getByText('1 AM')).toBeInTheDocument();
      expect(getByText('6 AM')).toBeInTheDocument();
      expect(getByText('12 PM')).toBeInTheDocument();
      expect(getByText('23 PM')).toBeInTheDocument();
    });
  });

  describe('Calendar events', () => {
    let restoreDateMock;

    const startOfTheWeek = new Date('2020-11-22'); // sunday
    const endOfTheWeek = new Date('2020-11-29'); // end of saturday (next sunday morning)
    const mockCalendarEventData = {
      primary: [
        {
          summary: 'Event in the past',
          start: '2020-11-20T14:30:00Z',
          end: '2020-11-20T15:30:00Z'
        },
        {
          summary: 'Test event 1',
          start: '2020-11-26T14:30:00Z',
          end: '2020-11-26T15:30:00Z'
        },
        {
          summary: 'Test event 2',
          start: '2020-11-28T11:20:00Z',
          end: '2020-11-28T12:00:00Z'
        },
        {
          summary: 'Event end of next saturday',
          start: '2020-11-28T23:20:00Z',
          end: '2020-11-29T00:45:00Z'
        }
      ]
    };

    beforeEach(() => {
      // Setup
      restoreDateMock = mockCurrentDate('2020-11-22');
    });

    afterEach(() => {
      restoreDateMock();
    });

    it('shows calendar event summaries in the week with correct info', () => {
      const { getByText, queryByText } = renderWithAllProviders(
        <CalendarWeeklyView
          startDate={startOfTheWeek}
          endDate={endOfTheWeek}
        />,
        {
          initialEventData: mockCalendarEventData
        }
      );

      expect(getByText('Test event 1')).toBeInTheDocument();
      expect(getByText('Test event 2')).toBeInTheDocument();
      expect(getByText('Event end of next saturday')).toBeInTheDocument();
      expect(queryByText('Event in the past')).not.toBeInTheDocument();
    });

    it('shows calendar event times with correct format', () => {
      const { getByText } = renderWithAllProviders(
        <CalendarWeeklyView
          startDate={startOfTheWeek}
          endDate={endOfTheWeek}
        />,
        {
          initialEventData: mockCalendarEventData
        }
      );

      expect(getByText('14:30 - 15:30')).toBeInTheDocument();
      expect(getByText('11:20 - 12:00')).toBeInTheDocument();
      expect(getByText('23:20 - 00:45')).toBeInTheDocument();
    });
  });
});
