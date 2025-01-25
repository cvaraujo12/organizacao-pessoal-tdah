#!/usr/bin/env python3
import os
import shutil
import re
from pathlib import Path
from datetime import datetime

def criar_estrutura_disciplina(caminho_disciplina):
    """Cria a estrutura padrão de pastas para uma disciplina."""
    pastas = {
        '_materiais': ['slides', 'pdfs', 'videos'],
        '_exercicios': ['praticos', 'teoricos', 'desafios'],
        '_resumos': ['mapas_mentais', 'flashcards', 'anotacoes'],
        '_projetos': ['codigo', 'documentacao', 'recursos'],
        '_avaliacoes': ['provas', 'trabalhos', 'simulados']
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
   - Exemplos
   - Aplicações

2. [Conceito 2]
   - Definição
   - Exemplos
   - Aplicações

## Exemplos Práticos
```[linguagem]
// Exemplo de código ou aplicação prática
```

## Conexões com Outras Disciplinas
- [Disciplina 1] → [Conexão]
- [Disciplina 2] → [Conexão]

## Dúvidas e Pontos de Atenção
- [ ] Dúvida 1
- [ ] Dúvida 2

## Recursos Adicionais
- [Link 1](url)
- [Link 2](url)

## Notas TDAH
- Pontos-chave para memorização
- Dicas de estudo específicas
- Lembretes importantes

Data: [Data]
Tempo de Estudo: [Duração]
"""

def criar_template_exercicio():
    """Retorna o template para exercícios."""
    return """# Exercício: [Título]

## Objetivo
- Descrição do objetivo do exercício

## Requisitos
- [ ] Requisito 1
- [ ] Requisito 2

## Instruções
1. Passo 1
2. Passo 2
3. Passo 3

## Código Base (se aplicável)
```[linguagem]
// Código inicial
```

## Resultado Esperado
- Descrição do resultado esperado

## Dicas
- Dica 1
- Dica 2

## Checklist de Conclusão
- [ ] Implementação básica
- [ ] Testes
- [ ] Documentação

Data: [Data]
Tempo Estimado: [Duração]
"""

def criar_template_projeto():
    """Retorna o template para projetos."""
    return """# Projeto: [Nome do Projeto]

## Descrição
Breve descrição do projeto

## Objetivos
- [ ] Objetivo 1
- [ ] Objetivo 2

## Tecnologias Utilizadas
- Tech 1
- Tech 2

## Estrutura do Projeto
```
projeto/
├── src/
├── docs/
└── tests/
```

## Cronograma
- [ ] Fase 1 (Data)
- [ ] Fase 2 (Data)

## Documentação
- Link para documentação
- Instruções de instalação
- Guia de uso

## Critérios de Avaliação
- [ ] Critério 1
- [ ] Critério 2

## Notas e Observações
- Adicione notas aqui

Data Início: [Data]
Prazo: [Data]
"""

def criar_readme_disciplina(caminho_disciplina, nome_disciplina, codigo):
    """Cria um arquivo README.md para a disciplina."""
    readme_content = f"""# {nome_disciplina} (Código: {codigo})

## Estrutura da Pasta
### _materiais/
- `slides/`: Apresentações das aulas
- `pdfs/`: Materiais de leitura
- `videos/`: Videoaulas e demonstrações

### _exercicios/
- `praticos/`: Exercícios hands-on
- `teoricos/`: Questões conceituais
- `desafios/`: Problemas complexos

### _resumos/
- `mapas_mentais/`: Mapas mentais dos tópicos
- `flashcards/`: Cartões de memorização
- `anotacoes/`: Notas de aula e estudos

### _projetos/
- `codigo/`: Implementações
- `documentacao/`: Docs do projeto
- `recursos/`: Recursos auxiliares

### _avaliacoes/
- `provas/`: Avaliações formais
- `trabalhos/`: Trabalhos e apresentações
- `simulados/`: Testes preparatórios

## Templates Disponíveis
- [Template de Resumo](_resumos/template_resumo.md)
- [Template de Exercício](_exercicios/template_exercicio.md)
- [Template de Projeto](_projetos/template_projeto.md)

## Checklist de Progresso
### Módulo 1
- [ ] Aulas 1-4
- [ ] Exercícios Práticos
- [ ] Projeto 1

### Módulo 2
- [ ] Aulas 5-8
- [ ] Exercícios Práticos
- [ ] Projeto 2

## Links Úteis
- [Material Online da Disciplina](link_aqui)
- [Recursos Complementares](link_aqui)
- [Documentação Oficial](link_aqui)

## Dicas TDAH
- Use os mapas mentais para visualizar conexões
- Faça pausas regulares (Pomodoro: 25/5)
- Revise os flashcards diariamente
- Alterne entre teoria e prática
- Mantenha um diário de progresso

## Notas e Observações
- Última atualização: {datetime.now().strftime('%d/%m/%Y')}
"""
    
    with open(os.path.join(caminho_disciplina, 'README.md'), 'w') as f:
        f.write(readme_content)

def criar_templates_disciplina(caminho_disciplina):
    """Cria os templates básicos para a disciplina."""
    templates = {
        '_resumos/template_resumo.md': criar_template_resumo(),
        '_exercicios/template_exercicio.md': criar_template_exercicio(),
        '_projetos/template_projeto.md': criar_template_projeto()
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
        r'.*exerc.*\.(py|java|js|html|css)$': '_exercicios/praticos',
        r'.*proj.*\.(py|java|js|html|css)$': '_projetos/codigo',
        r'.*mapa.*\.(png|jpg|pdf)$': '_resumos/mapas_mentais',
        r'.*card.*\.(png|jpg|pdf)$': '_resumos/flashcards',
        r'.*nota.*\.(md|txt)$': '_resumos/anotacoes',
        r'.*prova.*\.(pdf|docx?)$': '_avaliacoes/provas',
        r'.*trabalho.*\.(pdf|docx?)$': '_avaliacoes/trabalhos'
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
    # Estrutura completa do curso com todos os períodos
    estrutura = {
        'p1': [
            ('gestao_governanca_TI', 'Gestão e Governança em TI', '2749'),
            ('ACE_sustentabilidade', 'ACE - Sustentabilidade', '3323'),
            ('sistemas_operacionais', 'Sistemas Operacionais', '493'),
            ('banco_dados_aplicados', 'Banco de Dados Aplicados', '6290')
        ],
        'p2': [
            ('metodos_quantitativos', 'Métodos Quantitativos Estatísticos', '2685'),
            ('desenvolvimento_web', 'Desenvolvimento Web JavaScript e Frameworks', '6294'),
            ('teste_qualidade_software', 'Teste e Qualidade de Software', '6297')
        ],
        'p3': [
            ('empreendedorismo', 'Empreendedorismo', '148'),
            ('gerencia_projetos_TI', 'Gerência de Projetos em TI', '2417'),
            ('projeto_integrador1', 'Projeto Integrador 1', '428')
        ],
        'p4': [
            ('elementos_rede', 'Elementos de uma Rede', '24247'),
            ('programacao_objetos', 'Programação Orientada a Objetos', '487'),
            ('arquitetura_computadores', 'Arquitetura de Computadores e Hardware', '868')
        ],
        'p5': [
            ('estrutura_dados', 'Estrutura de Dados', '2445'),
            ('redes_computadores', 'Redes de Computadores e Segurança da Informação', '30902'),
            ('programacao_internet', 'Programação para Internet', '6287'),
            ('avaliacao_integrada1', 'Avaliação Integrada 1', 'A15'),
            ('ACE_inclusao', 'ACE - Inclusão', 'F00483')
        ],
        'p6': [
            ('engenharia_software', 'Engenharia de Software: Análise de Requisitos', '62335'),
            ('gerenciamento_banco_dados', 'Gerenciamento de Banco de Dados', '2416'),
            ('programacao_mobile', 'Programação para Dispositivos Móveis', '2730')
        ],
        'p7': [
            ('projeto_integrador2', 'Projeto Integrador 2', '433'),
            ('avaliacao_integrada2', 'Avaliação Integrada 2', 'A16')
        ],
        'p8': [
            ('integracao_banco_dados', 'Integração Banco de Dados', 'F00181')
        ]
    }
    
    base_path = Path('est_conc/tecnologo/ADS/periodos')
    
    # Criar estrutura para cada disciplina
    for periodo, disciplinas in estrutura.items():
        for pasta, nome, codigo in disciplinas:
            caminho_disciplina = base_path / periodo / pasta
            print(f"Criando estrutura para {nome}...")
            criar_estrutura_disciplina(caminho_disciplina)
            criar_readme_disciplina(caminho_disciplina, nome, codigo)
            criar_templates_disciplina(caminho_disciplina)
            organizar_arquivos_existentes(caminho_disciplina)
            print(f"✓ Estrutura criada para {nome}")

if __name__ == '__main__':
    main() 