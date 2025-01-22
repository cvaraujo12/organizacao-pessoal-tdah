import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '../Card';

describe('Card', () => {
  it('deve renderizar children corretamente', () => {
    render(
      <Card>
        <p>Conteúdo do Card</p>
      </Card>
    );

    expect(screen.getByText('Conteúdo do Card')).toBeInTheDocument();
  });

  it('deve renderizar título quando fornecido', () => {
    render(
      <Card title="Título do Card">
        <p>Conteúdo</p>
      </Card>
    );

    expect(screen.getByTestId('card-title')).toHaveTextContent('Título do Card');
  });

  it('deve aplicar classes personalizadas', () => {
    render(
      <Card className="custom-class">
        <p>Conteúdo</p>
      </Card>
    );

    const card = screen.getByTestId('card');
    expect(card).toHaveClass('custom-class');
  });

  it('deve chamar onClick quando clicado', () => {
    const handleClick = jest.fn();
    render(
      <Card onClick={handleClick}>
        <p>Conteúdo Clicável</p>
      </Card>
    );

    fireEvent.click(screen.getByTestId('card'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('deve ser clicável com teclado quando tem onClick', () => {
    const handleClick = jest.fn();
    render(
      <Card onClick={handleClick}>
        <p>Conteúdo Clicável</p>
      </Card>
    );

    const card = screen.getByTestId('card');
    fireEvent.keyDown(card, { key: 'Enter', code: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('deve ter role="button" quando clicável', () => {
    render(
      <Card onClick={() => {}}>
        <p>Conteúdo Clicável</p>
      </Card>
    );

    expect(screen.getByTestId('card')).toHaveAttribute('role', 'button');
  });

  it('deve ter role="article" quando não clicável', () => {
    render(
      <Card>
        <p>Conteúdo Não Clicável</p>
      </Card>
    );

    expect(screen.getByTestId('card')).toHaveAttribute('role', 'article');
  });
}); 