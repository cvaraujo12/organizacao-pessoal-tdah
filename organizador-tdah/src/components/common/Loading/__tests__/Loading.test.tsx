import { render, screen } from '@testing-library/react';
import { Loading } from '../Loading';

describe('Loading', () => {
  it('deve renderizar com valores padrão', () => {
    render(<Loading />);
    
    const loading = screen.getByTestId('loading');
    const spinner = screen.getByTestId('loading-spinner');

    expect(loading).toBeInTheDocument();
    expect(spinner).toHaveClass('w-8 h-8');
    expect(screen.queryByTestId('loading-message')).not.toBeInTheDocument();
  });

  it('deve renderizar com tamanho personalizado', () => {
    render(<Loading size="large" />);
    
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('w-12 h-12');
  });

  it('deve renderizar com mensagem personalizada', () => {
    render(<Loading message="Processando dados..." />);
    
    const message = screen.getByTestId('loading-message');
    expect(message).toHaveTextContent('Processando dados...');
  });

  it('deve renderizar sem mensagem quando message é undefined', () => {
    render(<Loading message={undefined} />);
    
    expect(screen.queryByTestId('loading-message')).not.toBeInTheDocument();
  });

  it('deve ter atributos de acessibilidade corretos', () => {
    const message = 'Teste de carregamento';
    render(<Loading message={message} />);
    
    const loading = screen.getByTestId('loading');
    expect(loading).toHaveAttribute('role', 'status');
    expect(loading).toHaveAttribute('aria-label', message);
  });

  it('deve usar testId personalizado', () => {
    render(<Loading testId="custom-loading" message="Teste" />);
    
    expect(screen.getByTestId('custom-loading')).toBeInTheDocument();
    expect(screen.getByTestId('custom-loading-spinner')).toBeInTheDocument();
    expect(screen.getByTestId('custom-loading-message')).toBeInTheDocument();
  });
}); 