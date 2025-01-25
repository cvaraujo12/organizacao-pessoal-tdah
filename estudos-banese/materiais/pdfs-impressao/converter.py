import markdown
import os
import re
from bs4 import BeautifulSoup
from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration

def read_template():
    with open('template.html', 'r', encoding='utf-8') as f:
        return f.read()

def convert_md_to_html(md_content, title):
    # Converte markdown para HTML
    html = markdown.markdown(md_content)
    
    # Parse o HTML
    soup = BeautifulSoup(html, 'html.parser')
    
    # Adiciona cabeçalho do simulado
    header = soup.new_tag('div')
    header['class'] = 'simulado-header'
    header.string = title
    soup.insert(0, header)
    
    # Encontra todas as questões (parágrafos que começam com número)
    paragraphs = soup.find_all('p')
    for p in paragraphs:
        text = p.get_text()
        if re.match(r'^\d+\.', text):
            # Converte para div.questao
            new_div = soup.new_tag('div')
            new_div['class'] = 'questao'
            
            # Cria título da questão
            titulo = soup.new_tag('div')
            titulo['class'] = 'questao-titulo'
            titulo.string = text.split('.')[0] + '.'
            new_div.append(titulo)
            
            # Cria enunciado
            enunciado = soup.new_tag('div')
            enunciado['class'] = 'questao-enunciado'
            enunciado.string = ' '.join(text.split('.')[1:]).strip()
            new_div.append(enunciado)
            
            p.replace_with(new_div)
    
    # Converte listas não ordenadas em alternativas
    uls = soup.find_all('ul')
    for ul in uls:
        ul['class'] = 'alternativas'
        for i, li in enumerate(ul.find_all('li')):
            li['class'] = 'alternativa'
            li['data-letter'] = chr(97 + i) + ')'  # Adiciona a), b), c), etc.
    
    return str(soup)

def process_file(md_file):
    # Extrai o título do nome do arquivo
    base_name = os.path.splitext(os.path.basename(md_file))[0]
    title = base_name.replace('_', ' ').title()
    
    # Lê o arquivo markdown
    with open(md_file, 'r', encoding='utf-8') as f:
        md_content = f.read()
    
    # Converte para HTML
    html_content = convert_md_to_html(md_content, title)
    
    # Lê o template
    template = read_template()
    
    # Insere o conteúdo no template
    final_html = template.replace('<!-- O conteúdo do simulado será inserido aqui -->', html_content)
    
    # Configura as fontes
    font_config = FontConfiguration()
    
    # Cria o arquivo PDF
    output_file = os.path.splitext(md_file)[0] + '.pdf'
    HTML(string=final_html).write_pdf(
        output_file,
        font_config=font_config
    )
    
    print(f'Arquivo PDF {output_file} criado com sucesso!')

def main():
    # Processa todos os arquivos markdown no diretório
    for file in os.listdir('.'):
        if file.endswith('.md'):
            print(f'Processando {file}...')
            process_file(file)

if __name__ == '__main__':
    main() 