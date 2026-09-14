import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import LoginPage from './LoginPage';
import api from '../utils/api';
import authUserReducer from '../states/authUser/reducer';
import loadingReducer from '../states/loading/reducer';

vi.mock('../utils/api', () => ({
  default: {
    login: vi.fn(),
    putAccessToken: vi.fn(),
    getOwnProfile: vi.fn(),
  },
}));

function renderLoginPage() {
  const store = configureStore({
    reducer: { authUser: authUserReducer, loading: loadingReducer },
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/login']}>
        <LoginPage />
      </MemoryRouter>
    </Provider>,
  );

  return store;
}

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show validation errors and not call the API when submitting an empty form', async () => {
    const user = userEvent.setup();
    renderLoginPage();

    await user.click(screen.getByRole('button', { name: 'Masuk' }));

    expect(await screen.findByText('Email wajib diisi')).toBeInTheDocument();
    expect(screen.getByText('Kata sandi wajib diisi')).toBeInTheDocument();
    expect(api.login).not.toHaveBeenCalled();
  });

  it('should log the user in and update the store on valid credentials', async () => {
    const user = userEvent.setup();
    const fakeUser = { id: 'user-1', name: 'John Doe', email: 'john@example.com' };
    api.login.mockResolvedValue('fake-token');
    api.getOwnProfile.mockResolvedValue(fakeUser);

    const store = renderLoginPage();

    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getByLabelText('Kata sandi'), 'secret123');
    await user.click(screen.getByRole('button', { name: 'Masuk' }));

    await waitFor(() => {
      expect(store.getState().authUser).toEqual(fakeUser);
    });
    expect(api.login).toHaveBeenCalledWith({ email: 'john@example.com', password: 'secret123' });
  });

  it('should display the API error message on failed login', async () => {
    const user = userEvent.setup();
    api.login.mockRejectedValue(new Error('email or password is wrong'));

    renderLoginPage();

    await user.type(screen.getByLabelText('Email'), 'wrong@example.com');
    await user.type(screen.getByLabelText('Kata sandi'), 'wrongpass');
    await user.click(screen.getByRole('button', { name: 'Masuk' }));

    expect(await screen.findByText('email or password is wrong')).toBeInTheDocument();
  });
});
