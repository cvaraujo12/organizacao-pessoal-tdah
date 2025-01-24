#!/usr/bin/env python3
import json
import os
from datetime import datetime, timedelta
import sys
from typing import Dict, List, Optional

class ProgressTracker:
    def __init__(self):
        self.data_file = "progress.json"
        self.progress_data = self.load_progress()
        
    def load_progress(self) -> Dict:
        """Carrega dados de progresso do arquivo JSON."""
        if os.path.exists(self.data_file):
            with open(self.data_file, 'r') as f:
                return json.load(f)
        return {
            "semestre_atual": 1,
            "disciplinas": {},
            "projetos": [],
            "estudos": [],
            "ultima_revisao": None,
            "proxima_revisao": None,
            "pomodoros_hoje": 0,
            "streak": 0
        }
    
    def save_progress(self):
        """Salva dados de progresso no arquivo JSON."""
        with open(self.data_file, 'w') as f:
            json.dump(self.progress_data, f, indent=2)
    
    def add_study_session(self, disciplina: str, topico: str, duracao: int):
        """Registra uma sessão de estudo."""
        if disciplina not in self.progress_data["disciplinas"]:
            self.progress_data["disciplinas"][disciplina] = {
                "topicos": {},
                "total_horas": 0,
                "ultima_sessao": None
            }
        
        if topico not in self.progress_data["disciplinas"][disciplina]["topicos"]:
            self.progress_data["disciplinas"][disciplina]["topicos"][topico] = {
                "horas": 0,
                "sessoes": 0,
                "nivel": "iniciante"
            }
        
        # Atualiza dados da sessão
        self.progress_data["disciplinas"][disciplina]["topicos"][topico]["horas"] += duracao/60
        self.progress_data["disciplinas"][disciplina]["topicos"][topico]["sessoes"] += 1
        self.progress_data["disciplinas"][disciplina]["total_horas"] += duracao/60
        self.progress_data["disciplinas"][disciplina]["ultima_sessao"] = datetime.now().isoformat()
        
        # Atualiza pomodoros
        self.progress_data["pomodoros_hoje"] += 1
        
        self.save_progress()
        print(f"Sessão de estudo registrada: {disciplina} - {topico} ({duracao} minutos)")
    
    def add_project(self, nome: str, tipo: str, tecnologias: List[str]):
        """Registra um novo projeto."""
        projeto = {
            "nome": nome,
            "tipo": tipo,
            "tecnologias": tecnologias,
            "inicio": datetime.now().isoformat(),
            "status": "em_andamento",
            "commits": 0
        }
        self.progress_data["projetos"].append(projeto)
        self.save_progress()
        print(f"Projeto registrado: {nome}")
    
    def update_project(self, nome: str, status: str, commits: Optional[int] = None):
        """Atualiza o status de um projeto."""
        for projeto in self.progress_data["projetos"]:
            if projeto["nome"] == nome:
                projeto["status"] = status
                if commits:
                    projeto["commits"] = commits
                break
        self.save_progress()
        print(f"Projeto atualizado: {nome} - {status}")
    
    def check_revision_needed(self) -> List[str]:
        """Verifica quais tópicos precisam de revisão."""
        hoje = datetime.now()
        disciplinas_revisao = []
        
        for disciplina, dados in self.progress_data["disciplinas"].items():
            if dados["ultima_sessao"]:
                ultima_sessao = datetime.fromisoformat(dados["ultima_sessao"])
                dias_sem_estudo = (hoje - ultima_sessao).days
                
                if dias_sem_estudo >= 7:  # Mais de uma semana sem estudar
                    disciplinas_revisao.append(disciplina)
        
        return disciplinas_revisao
    
    def generate_report(self):
        """Gera um relatório de progresso."""
        print("\n=== Relatório de Progresso ===")
        print(f"\nSemestre Atual: {self.progress_data['semestre_atual']}")
        print(f"Pomodoros Hoje: {self.progress_data['pomodoros_hoje']}")
        print(f"Streak: {self.progress_data['streak']} dias")
        
        print("\nDisciplinas:")
        for disciplina, dados in self.progress_data["disciplinas"].items():
            print(f"\n{disciplina}:")
            print(f"  Total de Horas: {dados['total_horas']:.1f}")
            print("  Tópicos:")
            for topico, topico_dados in dados["topicos"].items():
                print(f"    - {topico}: {topico_dados['horas']:.1f}h ({topico_dados['sessoes']} sessões)")
        
        print("\nProjetos:")
        for projeto in self.progress_data["projetos"]:
            print(f"\n{projeto['nome']}:")
            print(f"  Tipo: {projeto['tipo']}")
            print(f"  Status: {projeto['status']}")
            print(f"  Tecnologias: {', '.join(projeto['tecnologias'])}")
            print(f"  Commits: {projeto['commits']}")
        
        revisao_necessaria = self.check_revision_needed()
        if revisao_necessaria:
            print("\nDisciplinas que precisam de revisão:")
            for disciplina in revisao_necessaria:
                print(f"  - {disciplina}")

def main():
    tracker = ProgressTracker()
    
    if len(sys.argv) < 2:
        print("Uso: track_progress.py [comando] [argumentos...]")
        print("\nComandos disponíveis:")
        print("  study [disciplina] [topico] [duracao_minutos]")
        print("  project [nome] [tipo] [tecnologia1,tecnologia2,...]")
        print("  update [nome_projeto] [status] [commits]")
        print("  report")
        sys.exit(1)
    
    comando = sys.argv[1]
    
    if comando == "study":
        if len(sys.argv) != 5:
            print("Uso: track_progress.py study [disciplina] [topico] [duracao_minutos]")
            sys.exit(1)
        tracker.add_study_session(sys.argv[2], sys.argv[3], int(sys.argv[4]))
    
    elif comando == "project":
        if len(sys.argv) != 5:
            print("Uso: track_progress.py project [nome] [tipo] [tecnologia1,tecnologia2,...]")
            sys.exit(1)
        tecnologias = sys.argv[4].split(",")
        tracker.add_project(sys.argv[2], sys.argv[3], tecnologias)
    
    elif comando == "update":
        if len(sys.argv) < 4:
            print("Uso: track_progress.py update [nome_projeto] [status] [commits]")
            sys.exit(1)
        commits = int(sys.argv[4]) if len(sys.argv) > 4 else None
        tracker.update_project(sys.argv[2], sys.argv[3], commits)
    
    elif comando == "report":
        tracker.generate_report()
    
    else:
        print(f"Comando desconhecido: {comando}")
        sys.exit(1)

if __name__ == "__main__":
    main() 