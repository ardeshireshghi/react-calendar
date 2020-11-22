import { act } from 'react-dom/test-utils';
import { renderWithAllProviders, screen } from './test-utils';
import Calendar from '../pages/calendar';

describe('Calendar', () => {
  describe('Calendar heading', () => {
    let realDate;

    beforeEach(() => {
      // Setup
      const currentDate = new Date('2020-11-22');
      realDate = Date;
      global.Date = class extends (
        Date
      ) {
        constructor(date) {
          if (date) {
            return super(date);
          }

          return currentDate;
        }
      };
    });

    afterEach(() => {
      global.Date = realDate;
    });

    it("shows today's date on calendar heading", async () => {
      await act(async () => {
        await renderWithAllProviders(<Calendar />, {
          appContext: {
            isAppAuthorised: true,
            signOut: jest.fn()
          }
        });
      });

      expect(screen.getByText('November, 2020')).toBeInTheDocument();
    });
  });
});
