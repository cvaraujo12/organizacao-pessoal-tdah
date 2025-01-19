import os
import re

class VerificadorSimulado:
    def __init__(self):
        self.checklist = {
            "estrutura_basica": {
                "titulo": False,
                "concurso": False,
                "tempo_total": False,
                "total_questoes": False,
                "controle_tempo": False,
                "instrucoes": False,
                "dicas_tdah": False,
                "blocos": 0,
                "distribuicao_temas": False,
                "gabarito": False
            },
            "questoes": [],
            "blocos": []
        }
    
    def verificar_arquivo(self, caminho_arquivo):
        try:
            with open(caminho_arquivo, 'r', encoding='utf-8') as arquivo:
                conteudo = arquivo.read()
                return self.verificar_conteudo(conteudo)
        except Exception as e:
            return f"Erro ao ler arquivo {caminho_arquivo}: {str(e)}"
    
    def verificar_conteudo(self, conteudo):
        # Verificar estrutura básica
        self.checklist["estrutura_basica"]["titulo"] = bool(re.search(r"# Simulado \d+ - Atendimento Bancário", conteudo))
        self.checklist["estrutura_basica"]["concurso"] = "## Concurso BANESE 2025 - CESGRANRIO" in conteudo
        self.checklist["estrutura_basica"]["tempo_total"] = "**Tempo Total:** 5 horas" in conteudo
        self.checklist["estrutura_basica"]["total_questoes"] = "**Total de Questões:** 20" in conteudo
        self.checklist["estrutura_basica"]["controle_tempo"] = "**Controle de Tempo por Bloco:**" in conteudo
        self.checklist["estrutura_basica"]["instrucoes"] = "### Instruções Gerais" in conteudo
        self.checklist["estrutura_basica"]["dicas_tdah"] = "### Dicas para TDAH" in conteudo
        self.checklist["estrutura_basica"]["distribuicao_temas"] = "### Distribuição dos Temas" in conteudo
        self.checklist["estrutura_basica"]["gabarito"] = "### Gabarito Comentado" in conteudo
        
        # Verificar blocos
        blocos = re.findall(r"### Bloco \d+:", conteudo)
        self.checklist["estrutura_basica"]["blocos"] = len(blocos)
        
        # Verificar questões
        for i in range(1, 21):
            padrao_questao = f"### Questão {i}"
            if padrao_questao in conteudo:
                questao = {
                    "numero": i,
                    "tempo_estimado": "**Tempo Estimado:**" in conteudo,
                    "espaco_tempo": "**⏱️ Tempo Gasto:**" in conteudo,
                    "checkbox_revisao": "**📝 Revisão:**" in conteudo,
                    "alternativas": len(re.findall(r"[a-e]\)", conteudo)) >= 5,
                    "dica_tdah": "**Dica TDAH:**" in conteudo
                }
                self.checklist["questoes"].append(questao)
        
        return self.checklist

def verificar_todos_simulados():
    diretorio = "materiais_organizados/02-simulados/05-atendimento/provas"
    verificador = VerificadorSimulado()
    resultados = {}
    
    for arquivo in os.listdir(diretorio):
        if arquivo.startswith("simulado_") and arquivo.endswith("_atendimento.md"):
            caminho_completo = os.path.join(diretorio, arquivo)
            resultados[arquivo] = verificador.verificar_arquivo(caminho_completo)
    
    return resultados

def gerar_relatorio(resultados):
    relatorio = "# Relatório de Verificação dos Simulados\n\n"
    
    for arquivo, checklist in resultados.items():
        relatorio += f"## {arquivo}\n\n"
        
        # Estrutura Básica
        relatorio += "### Estrutura Básica\n"
        for item, status in checklist["estrutura_basica"].items():
            relatorio += f"- {item}: {'✅' if status else '❌'}\n"
        
        # Questões
        relatorio += "\n### Questões\n"
        for questao in checklist["questoes"]:
            relatorio += f"\nQuestão {questao['numero']}:\n"
            for item, status in questao.items():
                if item != "numero":
                    relatorio += f"- {item}: {'✅' if status else '❌'}\n"
        
        relatorio += "\n---\n\n"
    
    return relatorio

if __name__ == "__main__":
    resultados = verificar_todos_simulados()
    relatorio = gerar_relatorio(resultados)
    
    with open("materiais_organizados/02-simulados/05-atendimento/relatorio_verificacao.md", "w", encoding="utf-8") as f:
        f.write(relatorio) 