import { act } from 'react-dom/test-utils';
import { renderWithAllProviders, screen, mockCurrentDate } from './test-utils';
import Calendar from '../pages/calendar';

describe('Calendar', () => {
  describe('Calendar heading', () => {
    let dateMockRestore;

    beforeEach(() => {
      // Setup
      dateMockRestore = mockCurrentDate('2020-11-22');
    });

    afterEach(() => {
      dateMockRestore();
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
