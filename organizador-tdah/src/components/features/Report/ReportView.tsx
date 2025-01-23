import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  CircularProgress,
  Alert,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Archive as ArchiveIcon,
  Unarchive as UnarchiveIcon,
  Delete as DeleteIcon,
  Share as ShareIcon,
  GetApp as ExportIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { showToast } from '../../common/Toast/Toast';

interface Report {
  _id: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  startDate: string;
  endDate: string;
  metrics: {
    tasks: {
      total: number;
      completed: number;
      overdue: number;
      completionRate: number;
      averageCompletionTime?: number;
      byPriority: Record<string, number>;
      byCategory: Record<string, number>;
    };
    routines: {
      total: number;
      active: number;
      adherenceRate: number;
      mostMissed: string[];
      mostCompleted: string[];
      byCategory: Record<string, number>;
    };
    goals: {
      total: number;
      achieved: number;
      inProgress: number;
      achievementRate: number;
      byCategory: Record<string, number>;
    };
    focus: {
      totalSessions: number;
      totalMinutes: number;
      averageSessionLength: number;
      bestTimeOfDay?: string;
      bestDayOfWeek?: string;
    };
    health?: {
      sleepQuality?: number;
      exerciseMinutes?: number;
      meditationMinutes?: number;
      moodAverage?: number;
      medicationAdherence?: number;
    };
  };
  insights: Array<{
    type: 'success' | 'warning' | 'suggestion';
    message: string;
    metric: string;
    value?: number;
    recommendation?: string;
  }>;
  summary: string;
  archived?: boolean;
  createdAt: string;
}

const ReportView: React.FC = () => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [reportType, setReportType] = useState<Report['type']>('daily');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [page, setPage] = useState(1);
  const [showArchived, setShowArchived] = useState(false);

  // Buscar relatórios
  const { data: reportsData, isLoading } = useQuery(
    ['reports', page, showArchived],
    async () => {
      const { data } = await axios.get('/api/reports', {
        params: {
          page,
          limit: 10,
          archived: showArchived,
        },
      });
      return data;
    }
  );

  // Gerar novo relatório
  const generateMutation = useMutation(
    async () => {
      const { data } = await axios.post('/api/reports', {
        type: reportType,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
      });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('reports');
        setOpenDialog(false);
        showToast.success('Relatório gerado com sucesso!');
      },
      onError: () => {
        showToast.error('Erro ao gerar relatório');
      },
    }
  );

  // Arquivar/desarquivar relatório
  const archiveMutation = useMutation(
    async ({ id, action }: { id: string; action: 'archive' | 'unarchive' }) => {
      const { data } = await axios.patch(`/api/reports/${id}`, { action });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('reports');
        showToast.success('Relatório atualizado com sucesso!');
      },
      onError: () => {
        showToast.error('Erro ao atualizar relatório');
      },
    }
  );

  // Deletar relatório
  const deleteMutation = useMutation(
    async (id: string) => {
      await axios.delete(`/api/reports/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('reports');
        showToast.success('Relatório excluído com sucesso!');
      },
      onError: () => {
        showToast.error('Erro ao excluir relatório');
      },
    }
  );

  // Exportar relatório
  const handleExport = async (report: Report) => {
    try {
      const response = await axios.get(`/api/reports/${report._id}/export`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `relatorio-${report.type}-${report._id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      showToast.success('Relatório exportado com sucesso!');
    } catch (error) {
      console.error('Erro ao exportar relatório:', error);
      showToast.error('Erro ao exportar relatório');
    }
  };

  const handleGenerateReport = () => {
    if (reportType === 'custom' && (!startDate || !endDate)) {
      showToast.error('Selecione o período do relatório');
      return;
    }

    generateMutation.mutate();
  };

  const handleArchive = (report: Report) => {
    archiveMutation.mutate({
      id: report._id,
      action: report.archived ? 'unarchive' : 'archive',
    });
  };

  const handleDelete = (report: Report) => {
    if (window.confirm('Tem certeza que deseja excluir este relatório?')) {
      deleteMutation.mutate(report._id);
    }
  };

  const renderMetrics = (report: Report) => {
    const { metrics } = report;

    return (
      <Grid container spacing={2}>
        {/* Tarefas */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Tarefas
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography>
                Total: {metrics.tasks.total}
              </Typography>
              <Typography>
                Concluídas: {metrics.tasks.completed} ({Math.round(metrics.tasks.completionRate)}%)
              </Typography>
              <Typography>
                Atrasadas: {metrics.tasks.overdue}
              </Typography>
              {metrics.tasks.averageCompletionTime && (
                <Typography>
                  Tempo médio de conclusão: {Math.round(metrics.tasks.averageCompletionTime / (1000 * 60))} minutos
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Rotinas */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Rotinas
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography>
                Total: {metrics.routines.total}
              </Typography>
              <Typography>
                Ativas: {metrics.routines.active}
              </Typography>
              <Typography>
                Taxa de aderência: {Math.round(metrics.routines.adherenceRate)}%
              </Typography>
              {metrics.routines.mostCompleted.length > 0 && (
                <Box>
                  <Typography variant="subtitle2">Rotinas mais completadas:</Typography>
                  {metrics.routines.mostCompleted.map((routine) => (
                    <Chip
                      key={routine}
                      label={routine}
                      size="small"
                      color="success"
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Metas */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Metas
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography>
                Total: {metrics.goals.total}
              </Typography>
              <Typography>
                Alcançadas: {metrics.goals.achieved} ({Math.round(metrics.goals.achievementRate)}%)
              </Typography>
              <Typography>
                Em progresso: {metrics.goals.inProgress}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Foco */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Sessões de Foco
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography>
                Total de sessões: {metrics.focus.totalSessions}
              </Typography>
              <Typography>
                Tempo total: {metrics.focus.totalMinutes} minutos
              </Typography>
              <Typography>
                Duração média: {Math.round(metrics.focus.averageSessionLength)} minutos
              </Typography>
              {metrics.focus.bestTimeOfDay && (
                <Typography>
                  Melhor horário: {metrics.focus.bestTimeOfDay}
                </Typography>
              )}
              {metrics.focus.bestDayOfWeek && (
                <Typography>
                  Melhor dia: {metrics.focus.bestDayOfWeek}
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Saúde */}
        {metrics.health && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Saúde
              </Typography>
              <Grid container spacing={2}>
                {metrics.health.sleepQuality && (
                  <Grid item xs={12} sm={4}>
                    <Typography>
                      Qualidade do sono: {Math.round(metrics.health.sleepQuality)}/10
                    </Typography>
                  </Grid>
                )}
                {metrics.health.exerciseMinutes && (
                  <Grid item xs={12} sm={4}>
                    <Typography>
                      Exercício: {metrics.health.exerciseMinutes} minutos
                    </Typography>
                  </Grid>
                )}
                {metrics.health.meditationMinutes && (
                  <Grid item xs={12} sm={4}>
                    <Typography>
                      Meditação: {metrics.health.meditationMinutes} minutos
                    </Typography>
                  </Grid>
                )}
                {metrics.health.moodAverage && (
                  <Grid item xs={12} sm={4}>
                    <Typography>
                      Humor médio: {Math.round(metrics.health.moodAverage)}/10
                    </Typography>
                  </Grid>
                )}
                {metrics.health.medicationAdherence && (
                  <Grid item xs={12} sm={4}>
                    <Typography>
                      Aderência à medicação: {Math.round(metrics.health.medicationAdherence)}%
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Grid>
        )}
      </Grid>
    );
  };

  const renderInsights = (report: Report) => {
    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Insights
        </Typography>
        <Grid container spacing={2}>
          {report.insights.map((insight, index) => (
            <Grid item xs={12} key={index}>
              <Alert
                severity={
                  insight.type === 'success'
                    ? 'success'
                    : insight.type === 'warning'
                    ? 'warning'
                    : 'info'
                }
                sx={{
                  '& .MuiAlert-message': {
                    width: '100%',
                  },
                }}
              >
                <Typography variant="subtitle1">{insight.message}</Typography>
                {insight.value && (
                  <Typography variant="body2" color="text.secondary">
                    Valor: {Math.round(insight.value)}
                    {insight.metric.includes('Rate') ? '%' : ''}
                  </Typography>
                )}
                {insight.recommendation && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, fontStyle: 'italic' }}
                  >
                    Recomendação: {insight.recommendation}
                  </Typography>
                )}
              </Alert>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h1">
          Relatórios
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setShowArchived(!showArchived)}
            startIcon={showArchived ? <UnarchiveIcon /> : <ArchiveIcon />}
          >
            {showArchived ? 'Mostrar Ativos' : 'Mostrar Arquivados'}
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setSelectedReport(null);
              setOpenDialog(true);
            }}
          >
            Novo Relatório
          </Button>
        </Box>
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : reportsData?.reports.length === 0 ? (
        <Alert severity="info">
          Nenhum relatório {showArchived ? 'arquivado' : ''} encontrado
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {reportsData?.reports.map((report: Report) => (
            <Grid item xs={12} key={report._id}>
              <Paper
                sx={{
                  p: 3,
                  opacity: report.archived ? 0.7 : 1,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box>
                    <Typography variant="h6">
                      Relatório {
                        report.type === 'daily' ? 'Diário' :
                        report.type === 'weekly' ? 'Semanal' :
                        report.type === 'monthly' ? 'Mensal' : 'Personalizado'
                      }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Período: {format(new Date(report.startDate), 'dd/MM/yyyy')} - {format(new Date(report.endDate), 'dd/MM/yyyy')}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      onClick={() => handleArchive(report)}
                      title={report.archived ? 'Desarquivar' : 'Arquivar'}
                    >
                      {report.archived ? <UnarchiveIcon /> : <ArchiveIcon />}
                    </IconButton>
                    <IconButton
                      onClick={() => {/* Implementar compartilhamento */}}
                      title="Compartilhar"
                    >
                      <ShareIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleExport(report)}
                      title="Exportar"
                    >
                      <ExportIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(report)}
                      title="Excluir"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    bgcolor: 'action.hover',
                    p: 2,
                    borderRadius: 1,
                    mb: 3,
                  }}
                >
                  {report.summary}
                </Typography>

                {renderMetrics(report)}
                {renderInsights(report)}
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Gerar Novo Relatório
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              select
              label="Tipo de Relatório"
              value={reportType}
              onChange={(e) => setReportType(e.target.value as Report['type'])}
              fullWidth
            >
              <MenuItem value="daily">Diário</MenuItem>
              <MenuItem value="weekly">Semanal</MenuItem>
              <MenuItem value="monthly">Mensal</MenuItem>
              <MenuItem value="custom">Personalizado</MenuItem>
            </TextField>

            {reportType === 'custom' && (
              <>
                <DatePicker
                  label="Data Inicial"
                  value={startDate}
                  onChange={setStartDate}
                  format="dd/MM/yyyy"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
                <DatePicker
                  label="Data Final"
                  value={endDate}
                  onChange={setEndDate}
                  format="dd/MM/yyyy"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleGenerateReport}
            variant="contained"
            disabled={generateMutation.isLoading}
            startIcon={generateMutation.isLoading ? <CircularProgress size={20} /> : <AssessmentIcon />}
          >
            {generateMutation.isLoading ? 'Gerando...' : 'Gerar Relatório'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReportView; 