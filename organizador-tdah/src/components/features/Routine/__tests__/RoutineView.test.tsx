import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RoutineView from '../RoutineView';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

const renderRoutineView = () => {
  return render(
    <ThemeProvider theme={theme}>
      <RoutineView />
    </ThemeProvider>
  );
};

describe('RoutineView', () => {
  it('should render the component', () => {
    renderRoutineView();
    expect(screen.getByText('Rotinas')).toBeInTheDocument();
    expect(screen.getByText('Nova Rotina')).toBeInTheDocument();
  });

  it('should open dialog when clicking new routine button', () => {
    renderRoutineView();
    const newButton = screen.getByText('Nova Rotina');
    fireEvent.click(newButton);
    expect(screen.getByText('Nova Rotina')).toBeInTheDocument();
    expect(screen.getByLabelText('Título')).toBeInTheDocument();
  });

  it('should add a new routine', async () => {
    renderRoutineView();
    const newButton = screen.getByText('Nova Rotina');
    fireEvent.click(newButton);

    // Preencher formulário
    await userEvent.type(screen.getByLabelText('Título'), 'Rotina de Teste');
    await userEvent.type(screen.getByLabelText('Descrição'), 'Descrição da rotina');
    await userEvent.type(screen.getByLabelText('Horário'), '09:00');
    
    // Selecionar categoria
    const categorySelect = screen.getByLabelText('Categoria');
    fireEvent.mouseDown(categorySelect);
    const manhãOption = screen.getByText('Manhã');
    fireEvent.click(manhãOption);

    // Selecionar dias
    const segundaChip = screen.getByText('Seg');
    fireEvent.click(segundaChip);
    const tercaChip = screen.getByText('Ter');
    fireEvent.click(tercaChip);

    // Adicionar etapa
    await userEvent.type(screen.getByLabelText('Descrição'), 'Etapa 1');
    await userEvent.type(screen.getByLabelText('Tempo (min)'), '15');
    const addStepButton = screen.getByText('Adicionar');
    fireEvent.click(addStepButton);

    // Salvar rotina
    const saveButton = screen.getByText('Criar');
    fireEvent.click(saveButton);

    // Verificar se a rotina foi adicionada
    await waitFor(() => {
      expect(screen.getByText('Rotina de Teste')).toBeInTheDocument();
    });
  });

  it('should edit a routine', async () => {
    renderRoutineView();
    
    // Primeiro criar uma rotina
    const newButton = screen.getByText('Nova Rotina');
    fireEvent.click(newButton);
    await userEvent.type(screen.getByLabelText('Título'), 'Rotina para Editar');
    await userEvent.type(screen.getByLabelText('Horário'), '10:00');
    const categorySelect = screen.getByLabelText('Categoria');
    fireEvent.mouseDown(categorySelect);
    const manhãOption = screen.getByText('Manhã');
    fireEvent.click(manhãOption);
    const saveButton = screen.getByText('Criar');
    fireEvent.click(saveButton);

    // Editar a rotina
    await waitFor(() => {
      const editButton = screen.getByTestId('edit-button');
      fireEvent.click(editButton);
    });

    await userEvent.clear(screen.getByLabelText('Título'));
    await userEvent.type(screen.getByLabelText('Título'), 'Rotina Editada');
    
    const updateButton = screen.getByText('Salvar');
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(screen.getByText('Rotina Editada')).toBeInTheDocument();
    });
  });

  it('should delete a routine', async () => {
    renderRoutineView();
    
    // Primeiro criar uma rotina
    const newButton = screen.getByText('Nova Rotina');
    fireEvent.click(newButton);
    await userEvent.type(screen.getByLabelText('Título'), 'Rotina para Deletar');
    await userEvent.type(screen.getByLabelText('Horário'), '11:00');
    const categorySelect = screen.getByLabelText('Categoria');
    fireEvent.mouseDown(categorySelect);
    const manhãOption = screen.getByText('Manhã');
    fireEvent.click(manhãOption);
    const saveButton = screen.getByText('Criar');
    fireEvent.click(saveButton);

    // Deletar a rotina
    await waitFor(() => {
      const deleteButton = screen.getByTestId('delete-button');
      fireEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(screen.queryByText('Rotina para Deletar')).not.toBeInTheDocument();
    });
  });

  it('should validate required fields', async () => {
    renderRoutineView();
    const newButton = screen.getByText('Nova Rotina');
    fireEvent.click(newButton);

    // Tentar salvar sem preencher campos obrigatórios
    const saveButton = screen.getByText('Criar');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('Título é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Horário é obrigatório')).toBeInTheDocument();
    });
  });

  it('should handle step management correctly', async () => {
    renderRoutineView();
    const newButton = screen.getByText('Nova Rotina');
    fireEvent.click(newButton);

    // Adicionar etapa
    await userEvent.type(screen.getByLabelText('Descrição'), 'Etapa 1');
    await userEvent.type(screen.getByLabelText('Tempo (min)'), '15');
    let addStepButton = screen.getByText('Adicionar');
    fireEvent.click(addStepButton);

    // Verificar se a etapa foi adicionada
    expect(screen.getByText('Etapa 1')).toBeInTheDocument();
    expect(screen.getByText('15min')).toBeInTheDocument();

    // Adicionar outra etapa
    await userEvent.type(screen.getByLabelText('Descrição'), 'Etapa 2');
    await userEvent.type(screen.getByLabelText('Tempo (min)'), '20');
    addStepButton = screen.getByText('Adicionar');
    fireEvent.click(addStepButton);

    // Verificar se ambas as etapas estão presentes
    expect(screen.getByText('Etapa 1')).toBeInTheDocument();
    expect(screen.getByText('Etapa 2')).toBeInTheDocument();

    // Deletar uma etapa
    const deleteButtons = screen.getAllByTestId('delete-step-button');
    fireEvent.click(deleteButtons[0]);

    // Verificar se a etapa foi removida
    expect(screen.queryByText('Etapa 1')).not.toBeInTheDocument();
    expect(screen.getByText('Etapa 2')).toBeInTheDocument();
  });
}); 