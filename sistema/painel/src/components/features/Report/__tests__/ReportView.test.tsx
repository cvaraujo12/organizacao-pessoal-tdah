import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import axios from 'axios';
import theme from '../../../../styles/theme';
import ReportView from '../ReportView';
import { showToast } from '../../../common/Toast/Toast';

jest.mock('axios');
jest.mock('../../../common/Toast/Toast');

const mockReports = {
  reports: [
    {
      _id: 'report1',
      type: 'daily',
      startDate: '2024-01-22T00:00:00.000Z',
      endDate: '2024-01-22T23:59:59.999Z',
      metrics: {
        tasks: {
          total: 10,
          completed: 8,
          overdue: 1,
          completionRate: 80,
          byPriority: {},
          byCategory: {},
        },
        routines: {
          total: 5,
          active: 4,
          adherenceRate: 85,
          mostMissed: [],
          mostCompleted: ['Rotina 1', 'Rotina 2'],
          byCategory: {},
        },
        goals: {
          total: 3,
          achieved: 2,
          inProgress: 1,
          achievementRate: 66.67,
          byCategory: {},
        },
        focus: {
          totalSessions: 4,
          totalMinutes: 100,
          averageSessionLength: 25,
          bestTimeOfDay: '10:00',
          bestDayOfWeek: 'Segunda-feira',
        },
        health: {
          sleepQuality: 8,
          exerciseMinutes: 30,
          meditationMinutes: 15,
          moodAverage: 7,
          medicationAdherence: 100,
        },
      },
      insights: [
        {
          type: 'success',
          message: 'Ótima taxa de conclusão de tarefas!',
          metric: 'tasks.completionRate',
          value: 80,
        },
        {
          type: 'warning',
          message: 'Você tem uma tarefa atrasada',
          metric: 'tasks.overdue',
          value: 1,
          recommendation: 'Tente priorizar a conclusão de tarefas atrasadas',
        },
      ],
      summary: 'Resumo do relatório diário',
      archived: false,
      createdAt: '2024-01-22T00:00:00.000Z',
    },
  ],
  pagination: {
    total: 1,
    page: 1,
    pages: 1,
  },
};

const renderReportView = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <ReportView />
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe('ReportView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (axios.get as jest.Mock).mockResolvedValue({ data: mockReports });
  });

  it('should render the component', async () => {
    renderReportView();

    expect(screen.getByText('Relatórios')).toBeInTheDocument();
    expect(screen.getByText('Novo Relatório')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Relatório Diário')).toBeInTheDocument();
    });
  });

  it('should open dialog when clicking new report button', () => {
    renderReportView();

    fireEvent.click(screen.getByText('Novo Relatório'));

    expect(screen.getByText('Gerar Novo Relatório')).toBeInTheDocument();
    expect(screen.getByLabelText('Tipo de Relatório')).toBeInTheDocument();
  });

  it('should show date pickers when selecting custom report type', () => {
    renderReportView();

    fireEvent.click(screen.getByText('Novo Relatório'));
    
    const select = screen.getByLabelText('Tipo de Relatório');
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByText('Personalizado'));

    expect(screen.getByLabelText('Data Inicial')).toBeInTheDocument();
    expect(screen.getByLabelText('Data Final')).toBeInTheDocument();
  });

  it('should generate a new report', async () => {
    const mockReport = mockReports.reports[0];
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: mockReport });

    renderReportView();

    fireEvent.click(screen.getByText('Novo Relatório'));
    fireEvent.click(screen.getByText('Gerar Relatório'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/reports', {
        type: 'daily',
        startDate: null,
        endDate: null,
      });
      expect(showToast.success).toHaveBeenCalledWith('Relatório gerado com sucesso!');
    });
  });

  it('should show error when generating report fails', async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Failed to generate report'));

    renderReportView();

    fireEvent.click(screen.getByText('Novo Relatório'));
    fireEvent.click(screen.getByText('Gerar Relatório'));

    await waitFor(() => {
      expect(showToast.error).toHaveBeenCalledWith('Erro ao gerar relatório');
    });
  });

  it('should archive a report', async () => {
    (axios.patch as jest.Mock).mockResolvedValueOnce({ data: { ...mockReports.reports[0], archived: true } });

    renderReportView();

    await waitFor(() => {
      const archiveButton = screen.getByTitle('Arquivar');
      fireEvent.click(archiveButton);
    });

    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalledWith('/api/reports/report1', { action: 'archive' });
      expect(showToast.success).toHaveBeenCalledWith('Relatório atualizado com sucesso!');
    });
  });

  it('should delete a report', async () => {
    window.confirm = jest.fn(() => true);
    (axios.delete as jest.Mock).mockResolvedValueOnce({});

    renderReportView();

    await waitFor(() => {
      const deleteButton = screen.getByTitle('Excluir');
      fireEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith('/api/reports/report1');
      expect(showToast.success).toHaveBeenCalledWith('Relatório excluído com sucesso!');
    });
  });

  it('should toggle between active and archived reports', async () => {
    renderReportView();

    await waitFor(() => {
      const toggleButton = screen.getByText('Mostrar Arquivados');
      fireEvent.click(toggleButton);
      expect(screen.getByText('Mostrar Ativos')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/reports', {
        params: {
          page: 1,
          limit: 10,
          archived: true,
        },
      });
    });
  });

  it('should display metrics correctly', async () => {
    renderReportView();

    await waitFor(() => {
      expect(screen.getByText('Tarefas')).toBeInTheDocument();
      expect(screen.getByText('Total: 10')).toBeInTheDocument();
      expect(screen.getByText('Concluídas: 8 (80%)')).toBeInTheDocument();
      expect(screen.getByText('Atrasadas: 1')).toBeInTheDocument();
    });
  });

  it('should display insights correctly', async () => {
    renderReportView();

    await waitFor(() => {
      expect(screen.getByText('Insights')).toBeInTheDocument();
      expect(screen.getByText('Ótima taxa de conclusão de tarefas!')).toBeInTheDocument();
      expect(screen.getByText('Você tem uma tarefa atrasada')).toBeInTheDocument();
      expect(screen.getByText('Recomendação: Tente priorizar a conclusão de tarefas atrasadas')).toBeInTheDocument();
    });
  });

  it('should show loading state', () => {
    (axios.get as jest.Mock).mockImplementationOnce(() => new Promise(() => {}));
    renderReportView();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should show empty state when no reports are found', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { reports: [], pagination: { total: 0, page: 1, pages: 0 } } });
    renderReportView();

    await waitFor(() => {
      expect(screen.getByText('Nenhum relatório encontrado')).toBeInTheDocument();
    });
  });
}); 