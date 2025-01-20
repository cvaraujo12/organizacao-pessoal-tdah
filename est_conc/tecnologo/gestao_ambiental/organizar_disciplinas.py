#!/usr/bin/env python3
import os
import shutil
import re
from pathlib import Path
from datetime import datetime

def criar_estrutura_disciplina(caminho_disciplina):
    """Cria a estrutura padrão de pastas para uma disciplina."""
    pastas = {
        '_materiais': ['slides', 'pdfs', 'videos', 'legislacao'],
        '_exercicios': ['praticos', 'teoricos', 'estudos_caso'],
        '_resumos': ['mapas_mentais', 'flashcards', 'anotacoes'],
        '_laboratorio': ['relatorios', 'protocolos', 'dados_coletados'],
        '_avaliacoes': ['provas', 'trabalhos', 'apresentacoes']
    }
    
    for pasta, subpastas in pastas.items():
        pasta_principal = Path(os.path.join(caminho_disciplina, pasta))
        pasta_principal.mkdir(parents=True, exist_ok=True)
        for subpasta in subpastas:
            Path(os.path.join(pasta_principal, subpasta)).mkdir(parents=True, exist_ok=True)

def criar_template_resumo():
    """Retorna o template para resumos."""
    return """# Resumo: [Título do Tópico]

## Objetivos de Aprendizagem
- [ ] Objetivo 1
- [ ] Objetivo 2
- [ ] Objetivo 3

## Conceitos Principais
1. [Conceito 1]
   - Definição
   - Importância Ambiental
   - Aplicações Práticas
   - Legislação Relacionada

2. [Conceito 2]
   - Definição
   - Importância Ambiental
   - Aplicações Práticas
   - Legislação Relacionada

## Estudos de Caso
1. Caso: [Nome do Caso]
   - Contexto
   - Problema Ambiental
   - Soluções Aplicadas
   - Resultados Obtidos

## Aspectos Práticos
- Metodologias de Análise
- Equipamentos Utilizados
- Procedimentos de Coleta
- Medidas de Segurança

## Legislação Aplicável
- Leis
- Normas
- Resoluções
- Diretrizes

## Conexões com Outras Disciplinas
- [Disciplina 1] → [Conexão]
- [Disciplina 2] → [Conexão]

## Impactos Ambientais e Sociais
- Impactos Diretos
- Impactos Indiretos
- Medidas Mitigadoras
- Benefícios Socioambientais

## Recursos Adicionais
- [Link 1](url)
- [Link 2](url)

## Notas TDAH
- Pontos-chave para memorização
- Dicas de estudo específicas
- Lembretes importantes
- Conexões visuais

Data: [Data]
Tempo de Estudo: [Duração]
"""

def criar_template_relatorio():
    """Retorna o template para relatórios de laboratório."""
    return """# Relatório de Prática: [Título da Prática]

## Informações Gerais
- Data da Prática: [Data]
- Local: [Laboratório/Campo]
- Equipe: [Membros]

## Objetivos
- [ ] Objetivo 1
- [ ] Objetivo 2

## Material e Métodos
### Equipamentos Utilizados
- Equipamento 1
- Equipamento 2

### Reagentes/Materiais
- Material 1
- Material 2

### Procedimento
1. Passo 1
2. Passo 2
3. Passo 3

## Resultados e Discussão
### Dados Coletados
| Parâmetro | Valor | Unidade |
|-----------|-------|---------|
|           |       |         |

### Análise dos Resultados
- Observação 1
- Observação 2

### Discussão
- Interpretação dos resultados
- Comparação com literatura
- Implicações práticas

## Conclusões
- Conclusão 1
- Conclusão 2

## Referências
- [Referência 1]
- [Referência 2]

## Anexos
- Fotos
- Gráficos
- Dados Brutos

Data de Entrega: [Data]
"""

def criar_template_estudo_caso():
    """Retorna o template para estudos de caso."""
    return """# Estudo de Caso: [Título]

## Contextualização
- Localização
- Período
- Atores Envolvidos

## Problema Ambiental
### Descrição
- Detalhamento do problema
- Causas identificadas
- Impactos observados

### Aspectos Legais
- Legislação aplicável
- Normas técnicas
- Requisitos legais

## Diagnóstico
### Metodologia
- Métodos de análise
- Dados coletados
- Ferramentas utilizadas

### Resultados
- Principais achados
- Análise de dados
- Interpretações

## Soluções Propostas
### Medidas Técnicas
- Solução 1
- Solução 2

### Medidas Administrativas
- Medida 1
- Medida 2

### Análise de Viabilidade
- Aspectos econômicos
- Aspectos técnicos
- Aspectos sociais

## Implementação
### Cronograma
- Fase 1
- Fase 2

### Recursos Necessários
- Recursos humanos
- Recursos materiais
- Recursos financeiros

## Resultados Esperados
- Benefícios ambientais
- Benefícios sociais
- Indicadores de sucesso

## Lições Aprendidas
- Aprendizado 1
- Aprendizado 2

Data: [Data]
Responsável: [Nome]
"""

def criar_readme_disciplina(caminho_disciplina, nome_disciplina, codigo):
    """Cria um arquivo README.md para a disciplina."""
    readme_content = f"""# {nome_disciplina} (Código: {codigo})

## Estrutura da Pasta
### _materiais/
- `slides/`: Apresentações das aulas
- `pdfs/`: Materiais de leitura
- `videos/`: Videoaulas e demonstrações
- `legislacao/`: Leis e normas aplicáveis

### _exercicios/
- `praticos/`: Exercícios práticos
- `teoricos/`: Questões conceituais
- `estudos_caso/`: Análises de casos reais

### _resumos/
- `mapas_mentais/`: Mapas mentais dos tópicos
- `flashcards/`: Cartões de memorização
- `anotacoes/`: Notas de aula e estudos

### _laboratorio/
- `relatorios/`: Relatórios de práticas
- `protocolos/`: Procedimentos laboratoriais
- `dados_coletados/`: Dados de análises

### _avaliacoes/
- `provas/`: Avaliações formais
- `trabalhos/`: Trabalhos escritos
- `apresentacoes/`: Slides e materiais de apresentação

## Templates Disponíveis
- [Template de Resumo](_resumos/template_resumo.md)
- [Template de Relatório](_laboratorio/template_relatorio.md)
- [Template de Estudo de Caso](_exercicios/template_estudo_caso.md)

## Checklist de Progresso
### Módulo 1
- [ ] Aulas Teóricas 1-4
- [ ] Práticas Laboratoriais 1-2
- [ ] Estudo de Caso 1

### Módulo 2
- [ ] Aulas Teóricas 5-8
- [ ] Práticas Laboratoriais 3-4
- [ ] Estudo de Caso 2

## Links Úteis
- [Material Online da Disciplina](link_aqui)
- [Legislação Ambiental](link_aqui)
- [Bases de Dados Ambientais](link_aqui)

## Dicas TDAH
- Use os mapas mentais para visualizar relações entre conceitos
- Faça pausas regulares (Pomodoro: 25/5)
- Alterne entre teoria e prática
- Utilize exemplos reais para fixação
- Mantenha um diário de campo
- Fotografe ou desenhe observações importantes

## Notas e Observações
- Última atualização: {datetime.now().strftime('%d/%m/%Y')}
"""
    
    with open(os.path.join(caminho_disciplina, 'README.md'), 'w') as f:
        f.write(readme_content)

def criar_templates_disciplina(caminho_disciplina):
    """Cria os templates básicos para a disciplina."""
    templates = {
        '_resumos/template_resumo.md': criar_template_resumo(),
        '_laboratorio/template_relatorio.md': criar_template_relatorio(),
        '_exercicios/template_estudo_caso.md': criar_template_estudo_caso()
    }
    
    for caminho, conteudo in templates.items():
        caminho_completo = os.path.join(caminho_disciplina, caminho)
        os.makedirs(os.path.dirname(caminho_completo), exist_ok=True)
        with open(caminho_completo, 'w') as f:
            f.write(conteudo)

def organizar_arquivos_existentes(caminho_disciplina):
    """Organiza arquivos existentes nas pastas apropriadas."""
    padroes = {
        r'.*\.(pdf|pptx?|odp)$': '_materiais/slides',
        r'.*\.(docx?|txt|odt)$': '_materiais/pdfs',
        r'.*\.(mp4|avi|mkv)$': '_materiais/videos',
        r'.*lei.*\.(pdf|docx?)$': '_materiais/legislacao',
        r'.*caso.*\.(pdf|docx?)$': '_exercicios/estudos_caso',
        r'.*relat.*\.(pdf|docx?)$': '_laboratorio/relatorios',
        r'.*prot.*\.(pdf|docx?)$': '_laboratorio/protocolos',
        r'.*dados.*\.(xlsx?|csv)$': '_laboratorio/dados_coletados',
        r'.*mapa.*\.(png|jpg|pdf)$': '_resumos/mapas_mentais',
        r'.*card.*\.(png|jpg|pdf)$': '_resumos/flashcards',
        r'.*nota.*\.(md|txt)$': '_resumos/anotacoes',
        r'.*prova.*\.(pdf|docx?)$': '_avaliacoes/provas',
        r'.*trab.*\.(pdf|docx?)$': '_avaliacoes/trabalhos',
        r'.*apres.*\.(pptx?|pdf)$': '_avaliacoes/apresentacoes'
    }
    
    for arquivo in Path(caminho_disciplina).rglob('*'):
        if arquivo.is_file():
            for padrao, destino in padroes.items():
                if re.match(padrao, arquivo.name.lower()):
                    destino_path = Path(caminho_disciplina) / destino
                    destino_path.mkdir(parents=True, exist_ok=True)
                    shutil.move(str(arquivo), str(destino_path / arquivo.name))
                    break

def main():
    # Estrutura do curso
    estrutura = {
        'fundamentos_ambientais': [
            ('biodiversidade', 'Biodiversidade', 'BIO001'),
            ('ecologia', 'Ecologia', 'ECO001'),
            ('geologia_solos', 'Fundamentos de Geologia e Solos', 'GEO001')
        ],
        'gestao_adm': [
            ('gestao_amb', 'Gestão Ambiental', 'GA001'),
            ('tga', 'Teoria Geral da Administração', 'ADM001'),
            ('economia', 'Economia Brasileira', 'ECN001'),
            ('empreend', 'Empreendedorismo', 'EMP001')
        ],
        'ciencias_naturais': [
            ('quimica', 'Química Geral', 'QUI001')
        ],
        'metodologia_pesquisa': [
            ('metodos', 'Metodologia de Pesquisa Científica', 'MET001'),
            ('linguagem', 'Estudos da Linguagem', 'LIN001')
        ]
    }
    
    base_path = Path('est_conc/tecnologo/gestao_ambiental')
    
    # Criar estrutura para cada disciplina
    for area, disciplinas in estrutura.items():
        for pasta, nome, codigo in disciplinas:
            caminho_disciplina = base_path / area / pasta
            print(f"Criando estrutura para {nome}...")
            criar_estrutura_disciplina(caminho_disciplina)
            criar_readme_disciplina(caminho_disciplina, nome, codigo)
            criar_templates_disciplina(caminho_disciplina)
            organizar_arquivos_existentes(caminho_disciplina)
            print(f"✓ Estrutura criada para {nome}")

if __name__ == '__main__':
    main() 