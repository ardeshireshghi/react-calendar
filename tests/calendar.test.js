import { renderWithAppContext } from './test-utils';
import Calendar from '../pages/calendar';

describe('Calendar', () => {
  it('renders without crashing', () => {
    const { getByText } = renderWithAppContext(<Calendar />, { isAppAuthorised: true, signOut: jest.fn() });
    expect(getByText('Calender goes here')).toBeInTheDocument();
  });
});
