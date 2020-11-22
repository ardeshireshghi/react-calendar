import { render } from '@testing-library/react';
import AppContext from '../contexts/app-context';

export function renderWithAppContext(ui, contextValue = {}, ...options) {
  const Wrapper = ({ children }) => (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
  return render(ui, {
    ...options,
    wrapper: Wrapper
  });
}

export { render };
