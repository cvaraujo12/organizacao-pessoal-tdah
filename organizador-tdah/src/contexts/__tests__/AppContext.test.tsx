import { render, screen, fireEvent, act } from '@testing-library/react';
import { useContext } from 'react';
import { AppProvider, useApp } from '../AppContext';
import { Usuario } from '../../types';

const TestComponent = () => {
  const { estado, dispatch } = useApp();
  return (
    <div>
      <span data-testid="loading">{estado.carregando.toString()}</span>
      <span data-testid="error">{estado.erro || 'no-error'}</span>
      <button
        onClick={() => dispatch({ type: 'DEFINIR_CARREGANDO', payload: true })}
        data-testid="set-loading"
      >
        Set Loading
      </button>
      <button
        onClick={() => dispatch({ type: 'DEFINIR_ERRO', payload: 'erro-teste' })}
        data-testid="set-error"
      >
        Set Error
      </button>
    </div>
  );
};

describe('AppContext', () => {
  it('deve fornecer estado inicial correto', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId('loading')).toHaveTextContent('false');
    expect(screen.getByTestId('error')).toHaveTextContent('no-error');
  });

  it('deve atualizar estado de carregamento', async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId('set-loading'));
    });

    expect(screen.getByTestId('loading')).toHaveTextContent('true');
  });

  it('deve atualizar estado de erro', async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId('set-error'));
    });

    expect(screen.getByTestId('error')).toHaveTextContent('erro-teste');
  });

  it('deve lançar erro quando useApp é usado fora do Provider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useApp deve ser usado dentro de um AppProvider');

    consoleError.mockRestore();
  });

  it('deve atualizar usuário corretamente', async () => {
    const TestUserComponent = () => {
      const { estado, dispatch } = useApp();
      return (
        <div>
          <span data-testid="user-name">{estado.usuario?.nome || 'no-user'}</span>
          <button
            onClick={() => dispatch({
              type: 'DEFINIR_USUARIO',
              payload: {
                id: '1',
                nome: 'Teste User',
                email: 'teste@example.com',
                preferencias: {
                  tema: 'claro',
                  notificacoes: true,
                  intervaloPomodoroMinutos: 25
                }
              }
            })}
            data-testid="set-user"
          >
            Set User
          </button>
        </div>
      );
    };

    render(
      <AppProvider>
        <TestUserComponent />
      </AppProvider>
    );

    expect(screen.getByTestId('user-name')).toHaveTextContent('no-user');

    await act(async () => {
      fireEvent.click(screen.getByTestId('set-user'));
    });

    expect(screen.getByTestId('user-name')).toHaveTextContent('Teste User');
  });
}); 