#!/usr/bin/env python3
import os
import shutil
from pathlib import Path

def remover_duplicatas_ads():
    """Remove as pastas duplicadas do curso de ADS."""
    base_path = Path('est_conc/tecnologo/ADS')
    
    # Lista de pastas antigas para remover
    pastas_antigas = [
        'arquitetura_computadores_hardware',
        'avaliacao_integrada_1',
        'avaliacao_integrada_2',
        'engenharia_software_analise_requisitos',
        'programacao_dispositivos_moveis',
        'projeto_integrador_2',
        'redes_computadores_seguranca_informacao',
        'desenvolvimento_web_javascript_frameworks',
        'metodos_quantitativos_estatisticos',
        'programacao_orientada_objetos',
        'projeto_integrador_1',
        'indices',
        'materiais_estudo',
        'resumos'
    ]
    
    # Lista de pastas para manter (nova estrutura)
    manter_pastas = [
        'fundamentos',
        'programacao',
        'banco_dados',
        'redes',
        'gestao_eng_software',
        'projetos',
        'avaliacoes',
        'complementares',
        '_materiais_apoio',
        '_planejamento',
        '_recursos'
    ]
    
    print("Removendo pastas duplicadas de ADS...")
    
    # Remover pastas antigas
    for pasta in pastas_antigas:
        caminho = base_path / pasta
        if caminho.exists():
            print(f"Removendo {pasta}...")
            shutil.rmtree(caminho)
    
    # Remover pastas numeradas se existirem duplicatas não numeradas
    for pasta in manter_pastas:
        pasta_numerada = next(base_path.glob(f"[0-9]*-{pasta}"), None)
        pasta_normal = base_path / pasta
        
        if pasta_numerada and pasta_normal.exists():
            print(f"Removendo pasta numerada duplicada {pasta_numerada.name}...")
            shutil.rmtree(pasta_numerada)

def remover_duplicatas_gestao():
    """Remove as pastas duplicadas do curso de Gestão Ambiental."""
    base_path = Path('est_conc/tecnologo/gestao_ambiental')
    
    # Lista de pastas antigas para remover
    pastas_antigas = [
        'biodiversidade',
        'ecologia',
        'geologia_solos',
        'gestao_amb',
        'tga',
        'economia',
        'empreend',
        'quimica',
        'metodos',
        'linguagem',
        'economia_brasileira',
        'empreendedorismo',
        'estudos_linguagem',
        'fundamentos_geologia_solos',
        'gestao_ambiental',
        'introducao_teoria_geral_administracao',
        'metodologia_pesquisa_cientifica',
        'quimica_geral',
        'materiais_estudo',
        'resumos',
        'indices'
    ]
    
    # Lista de pastas para manter (nova estrutura)
    manter_pastas = [
        'fundamentos_ambientais',
        'gestao_adm',
        'ciencias_naturais',
        'metodologia_pesquisa',
        '_materiais_apoio',
        '_planejamento',
        '_praticas_laboratoriais',
        '_recursos'
    ]
    
    print("\nRemovendo pastas duplicadas de Gestão Ambiental...")
    
    # Remover pastas antigas
    for pasta in pastas_antigas:
        caminho = base_path / pasta
        if caminho.exists():
            print(f"Removendo {pasta}...")
            shutil.rmtree(caminho)
    
    # Remover pastas numeradas se existirem duplicatas não numeradas
    for pasta in manter_pastas:
        pasta_numerada = next(base_path.glob(f"[0-9]*-{pasta}"), None)
        pasta_normal = base_path / pasta
        
        if pasta_numerada and pasta_normal.exists():
            print(f"Removendo pasta numerada duplicada {pasta_numerada.name}...")
            shutil.rmtree(pasta_numerada)

def main():
    remover_duplicatas_ads()
    remover_duplicatas_gestao()
    print("\nLimpeza concluída!")

if __name__ == '__main__':
    main() 