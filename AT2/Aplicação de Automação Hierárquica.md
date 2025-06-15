# Aplicação de Automação Hierárquica

## Descrição
Uma página web local que permite criar grupos e ações hierárquicas com sistema de gatilhos para automação.

## Funcionalidades Principais

### 1. Interface Hierárquica
- Botão "+" principal para adicionar grupos
- Dentro de cada grupo: botões para criar subgrupos ou ações
- Estrutura em árvore expansível/colapsável

### 2. Grupos
- Nome personalizável
- Podem conter outros grupos (aninhamento)
- Podem conter ações
- Interface visual clara da hierarquia

### 3. Ações
- Nome e descrição
- Tipos de gatilhos:
  - Tempo (agendamento)
  - Evento (clique, hover, etc.)
  - Condição (baseada em valores)
- Configuração de automação

### 4. Sistema de Gatilhos
- Interface para configurar diferentes tipos de gatilhos
- Simulação de execução de ações
- Log de atividades

## Estrutura Técnica
- HTML5 + CSS3 + JavaScript vanilla
- Armazenamento local (localStorage)
- Interface responsiva
- Componentes modulares

## Arquivos
- index.html - Página principal
- styles.css - Estilos da aplicação
- script.js - Lógica JavaScript
- README.md - Documentação

