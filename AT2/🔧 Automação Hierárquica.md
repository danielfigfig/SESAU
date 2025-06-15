# 🔧 Automação Hierárquica

Uma aplicação web moderna e intuitiva para criar e gerenciar grupos e ações hierárquicas com sistema de gatilhos automatizados.

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-blue)](https://seu-usuario.github.io/automacao-hierarquica)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 🚀 Demonstração

Acesse a aplicação em funcionamento: [**Demo ao Vivo**](https://seu-usuario.github.io/automacao-hierarquica)

![Screenshot da Aplicação](https://via.placeholder.com/800x400/667eea/ffffff?text=Automação+Hierárquica)

## ✨ Funcionalidades

### 🏗️ Organização Hierárquica
- **Grupos aninhados**: Organize suas automações em estruturas hierárquicas
- **Ações configuráveis**: Crie ações com diferentes tipos de gatilhos
- **Interface visual**: Árvore expansível e intuitiva para navegação

### ⚡ Sistema de Gatilhos
- **Gatilhos de Tempo**: Execute ações em intervalos ou horários específicos
- **Gatilhos de Evento**: Responda a eventos do navegador (cliques, teclas, etc.)
- **Gatilhos de Condição**: Execute quando condições específicas forem atendidas
- **Execução Manual**: Controle total sobre quando executar suas ações

### 🎨 Interface Moderna
- **Tema Escuro/Claro**: Alterne entre temas conforme sua preferência
- **Design Responsivo**: Funciona perfeitamente em desktop e mobile
- **Animações Suaves**: Transições e efeitos visuais elegantes
- **Acessibilidade**: Suporte completo a leitores de tela e navegação por teclado

### 💾 Persistência de Dados
- **Armazenamento Local**: Seus dados são salvos automaticamente no navegador
- **Backup/Restore**: Exporte e importe suas configurações
- **Histórico de Atividades**: Log detalhado de todas as operações

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos modernos com CSS Grid, Flexbox e Custom Properties
- **JavaScript ES6+**: Lógica da aplicação com classes e módulos
- **Font Awesome**: Ícones vetoriais
- **Local Storage**: Persistência de dados no navegador

## 📦 Instalação e Uso

### Opção 1: GitHub Pages (Recomendado)
1. Faça um fork deste repositório
2. Ative o GitHub Pages nas configurações do repositório
3. Acesse sua aplicação em `https://seu-usuario.github.io/automacao-hierarquica`

### Opção 2: Local
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/automacao-hierarquica.git
   cd automacao-hierarquica
   ```

2. Abra o arquivo `index.html` em seu navegador ou use um servidor local:
   ```bash
   # Com Python 3
   python -m http.server 8000
   
   # Com Node.js (npx)
   npx serve .
   
   # Com PHP
   php -S localhost:8000
   ```

3. Acesse `http://localhost:8000` no seu navegador

## 📖 Como Usar

### Primeiros Passos
1. **Criar um Grupo**: Clique em "Adicionar Grupo" na barra lateral
2. **Adicionar Ações**: Dentro de um grupo, clique no ícone de raio para criar ações
3. **Configurar Gatilhos**: Abra uma ação e adicione gatilhos para automatização
4. **Testar**: Use o botão "Executar Ação" para testar suas configurações

### Atalhos de Teclado
- `Ctrl + N`: Criar novo grupo
- `Ctrl + Shift + N`: Criar nova ação
- `F1`: Mostrar ajuda
- `Ctrl + L`: Limpar log de atividades
- `Esc`: Fechar modais

### Tipos de Gatilhos

#### ⏰ Gatilhos de Tempo
- **Intervalo**: Execute a cada X segundos/minutos/horas
- **Agendamento**: Execute em horários específicos
- **Atraso**: Execute após um tempo determinado

#### 🖱️ Gatilhos de Evento
- **Clique**: Quando elementos são clicados
- **Hover**: Quando o mouse passa sobre elementos
- **Teclado**: Quando teclas são pressionadas
- **Scroll**: Quando a página é rolada

#### 🔍 Gatilhos de Condição
- **Variáveis**: Baseado em valores de variáveis
- **Estado**: Baseado no estado da aplicação
- **Comparações**: Usando operadores lógicos

## 🎯 Casos de Uso

### Automação Residencial
```
🏠 Casa Inteligente
├── 💡 Iluminação
│   ├── ⚡ Ligar Luzes da Sala (19:00 todos os dias)
│   └── ⚡ Apagar Luzes (23:00 todos os dias)
├── 🌡️ Climatização
│   ├── ⚡ Ligar Ar Condicionado (Temperatura > 25°C)
│   └── ⚡ Desligar Ar Condicionado (Temperatura < 22°C)
└── 🔒 Segurança
    ├── ⚡ Ativar Alarme (22:00 todos os dias)
    └── ⚡ Verificar Câmeras (A cada 30 minutos)
```

### Automação de Escritório
```
🏢 Escritório
├── 💻 Computadores
│   ├── ⚡ Backup Automático (02:00 todos os dias)
│   └── ⚡ Atualizar Sistema (Domingo 03:00)
├── 📧 Comunicação
│   ├── ⚡ Enviar Relatório Diário (18:00 dias úteis)
│   └── ⚡ Lembrete de Reunião (15 min antes)
└── 📊 Monitoramento
    ├── ⚡ Verificar Servidores (A cada 5 minutos)
    └── ⚡ Gerar Relatório Semanal (Sexta 17:00)
```

## 🔧 Configuração Avançada

### Personalização de Temas
Edite as variáveis CSS em `styles.css`:
```css
:root {
    --primary-color: #667eea;
    --primary-dark: #764ba2;
    /* Adicione suas cores personalizadas */
}
```

### Extensão de Funcionalidades
A aplicação foi projetada para ser extensível. Você pode:
- Adicionar novos tipos de gatilhos
- Implementar integrações com APIs externas
- Criar plugins personalizados
- Adicionar novos tipos de ações

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga estes passos:

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### Diretrizes de Contribuição
- Mantenha o código limpo e bem documentado
- Adicione testes para novas funcionalidades
- Siga os padrões de código existentes
- Atualize a documentação quando necessário

## 📝 Roadmap

### Versão 2.0
- [ ] Sistema de plugins
- [ ] Integração com APIs externas
- [ ] Modo colaborativo
- [ ] Backup na nuvem
- [ ] Aplicativo mobile (PWA)

### Versão 2.1
- [ ] Editor visual de fluxos
- [ ] Marketplace de automações
- [ ] Análise de performance
- [ ] Notificações push

## 🐛 Relatando Bugs

Encontrou um bug? Ajude-nos a melhorar:

1. Verifique se o bug já foi reportado nas [Issues](https://github.com/seu-usuario/automacao-hierarquica/issues)
2. Se não, crie uma nova issue com:
   - Descrição detalhada do problema
   - Passos para reproduzir
   - Screenshots (se aplicável)
   - Informações do navegador/sistema

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- [Font Awesome](https://fontawesome.com/) pelos ícones
- [GitHub Pages](https://pages.github.com/) pela hospedagem gratuita
- Comunidade open source pelas inspirações e feedback

## 📞 Contato

- **GitHub**: [@seu-usuario](https://github.com/seu-usuario)
- **Email**: seu-email@exemplo.com
- **LinkedIn**: [Seu Nome](https://linkedin.com/in/seu-perfil)

---

<div align="center">
  <p>Feito com ❤️ para a comunidade</p>
  <p>⭐ Se este projeto te ajudou, considere dar uma estrela!</p>
</div>

