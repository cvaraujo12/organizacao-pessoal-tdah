# Comandos do Sistema

## Verificação de Execução

### /check_exec [comando]
Realiza a verificação do protocolo de execução antes de executar um comando.

**Uso:**
```
/check_exec [comando a ser executado]
```

**Exemplo:**
```
/check_exec mover arquivo.txt pasta/
```

**Retorno:**
```
COMANDO: Mover arquivo.txt para pasta/

ANÁLISE:
- Objetivo: Mover um arquivo para outro diretório
- Recursos: arquivo.txt, pasta/
- Complexidade: Baixa

PLANO:
1. Verificar existência do arquivo
2. Verificar existência da pasta
3. Verificar permissões
4. Executar movimentação
5. Validar resultado

EXECUÇÃO:
✓ arquivo.txt existe
✓ pasta/ existe
✓ permissões OK
✓ arquivo movido
✓ validação completa

VALIDAÇÃO:
- Resultado: Sucesso
- Observações: Operação concluída sem problemas
```

**Regras:**
1. O comando deve ser usado antes de qualquer operação complexa
2. A execução só prossegue após confirmação do usuário
3. Cada etapa deve ser validada antes de prosseguir
4. Em caso de falha, a execução é interrompida 

# Comandos de Report por Nível

## Nível 1 - Fundação do Sistema 🏗️
### /report-n1
Gera relatórios sobre o desenvolvimento do nível 1.

Opções:
- `--update` 📊: Mostra o status atual de desenvolvimento, progresso das tarefas e últimas atualizações
- `--suggestion` 💡: Apresenta sugestões de melhorias e próximos passos baseados no status atual
- `--review` 🔍: Realiza uma análise completa do desenvolvimento, incluindo métricas, problemas e sucessos

**Exemplo de Uso:**
```bash
/report-n1 --update

📊 Status Atual - Nível 1
=========================
✅ Progresso Geral: 45%
📝 Tarefas Concluídas: 12/25
⏱️ Última Atualização: 2024-01-24

🔄 Atividades Recentes:
- Implementado sistema de logs
- Configurado protocolo base
- Atualizado .cursorrules
```

## Nível 2 - Expansão de Funcionalidades 🚀
### /report-n2
Gera relatórios sobre o desenvolvimento do nível 2.

Opções:
- `--update` 📊: Mostra o status atual de desenvolvimento, progresso das tarefas e últimas atualizações
- `--suggestion` 💡: Apresenta sugestões de melhorias e próximos passos baseados no status atual
- `--review` 🔍: Realiza uma análise completa do desenvolvimento, incluindo métricas, problemas e sucessos

**Exemplo de Uso:**
```bash
/report-n2 --suggestion

💡 Sugestões - Nível 2
======================
📌 Próximos Passos:
1. Implementar cache de comandos
2. Otimizar sistema de busca
3. Adicionar validações extras

⚡ Melhorias Sugeridas:
- Reduzir tempo de resposta
- Aumentar cobertura de testes
- Implementar logging avançado
```

## Nível 3 - Sistema Avançado ⚙️
### /report-n3
Gera relatórios sobre o desenvolvimento do nível 3.

Opções:
- `--update` 📊: Mostra o status atual de desenvolvimento, progresso das tarefas e últimas atualizações
- `--suggestion` 💡: Apresenta sugestões de melhorias e próximos passos baseados no status atual
- `--review` 🔍: Realiza uma análise completa do desenvolvimento, incluindo métricas, problemas e sucessos

**Exemplo de Uso:**
```bash
/report-n3 --review

🔍 Revisão Completa - Nível 3
============================
📊 Métricas:
- Performance: 95%
- Cobertura de Testes: 87%
- Satisfação Usuário: 4.8/5

✅ Sucessos:
- Sistema de monitoramento neural
- Integração com IA
- Adaptações TDAH

❗ Pontos de Atenção:
- Otimizar uso de memória
- Melhorar tempo de resposta
- Aumentar automações
``` 