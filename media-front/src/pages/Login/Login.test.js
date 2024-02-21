import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login/Login';

describe('Login Component', () => {
  it('Iniciar sesión', () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    const helloWorldText = screen.getByRole('button', { name: "Iniciar sesión" });
    expect(helloWorldText).toBeInTheDocument();
  });

  it('handles login with correct credentials', async () => {
    const mockToken = 'mockToken123';
    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: mockToken }),
      })
    );

    render(<BrowserRouter><Login /></BrowserRouter>);

    fireEvent.change(screen.getByLabelText('Usuario:'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Contraseña:'), { target: { value: 'testpassword' } });
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('token', mockToken);
      expect(window.location.href).toContain('/dashboard');
    });
  });

})