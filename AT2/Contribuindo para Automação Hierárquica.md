# Contribuindo para Automação Hierárquica

Obrigado por considerar contribuir para o projeto Automação Hierárquica! 🎉

## Como Contribuir

### Reportando Bugs

1. **Verifique** se o bug já foi reportado nas [Issues](https://github.com/seu-usuario/automacao-hierarquica/issues)
2. **Crie uma nova issue** se necessário, incluindo:
   - Descrição clara do problema
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots (se aplicável)
   - Informações do ambiente (navegador, OS, etc.)

### Sugerindo Melhorias

1. **Abra uma issue** com a tag "enhancement"
2. **Descreva** a melhoria proposta
3. **Explique** por que seria útil
4. **Forneça** exemplos de uso se possível

### Contribuindo com Código

#### Configuração do Ambiente

1. **Fork** o repositório
2. **Clone** seu fork:
   ```bash
   git clone https://github.com/seu-usuario/automacao-hierarquica.git
   cd automacao-hierarquica
   ```
3. **Crie** uma branch para sua feature:
   ```bash
   git checkout -b feature/nome-da-feature
   ```

#### Padrões de Código

##### HTML
- Use HTML5 semântico
- Inclua atributos de acessibilidade (aria-*, role, etc.)
- Mantenha a estrutura limpa e organizada

##### CSS
- Use CSS Custom Properties (variáveis CSS)
- Siga a metodologia BEM para nomenclatura de classes
- Mantenha responsividade em mente
- Use unidades relativas (rem, em, %, vw, vh)

##### JavaScript
- Use ES6+ features
- Mantenha funções pequenas e focadas
- Documente código complexo
- Use nomes descritivos para variáveis e funções
- Evite variáveis globais

#### Estrutura de Commits

Use mensagens de commit claras e descritivas:

```
tipo(escopo): descrição breve

Descrição mais detalhada se necessário.

- Lista de mudanças
- Outra mudança
```

**Tipos de commit:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Mudanças na documentação
- `style`: Mudanças de formatação/estilo
- `refactor`: Refatoração de código
- `test`: Adição ou correção de testes
- `chore`: Tarefas de manutenção

**Exemplos:**
```
feat(triggers): adiciona gatilhos de condição

Implementa sistema de gatilhos baseados em condições
com suporte a operadores lógicos.

- Adiciona interface para configurar condições
- Implementa avaliação de expressões
- Adiciona testes unitários
```

#### Testando

1. **Teste** sua funcionalidade em diferentes navegadores
2. **Verifique** responsividade em dispositivos móveis
3. **Teste** acessibilidade com leitores de tela
4. **Valide** HTML e CSS

#### Pull Request

1. **Atualize** sua branch com a main:
   ```bash
   git checkout main
   git pull upstream main
   git checkout feature/nome-da-feature
   git rebase main
   ```

2. **Push** suas mudanças:
   ```bash
   git push origin feature/nome-da-feature
   ```

3. **Abra** um Pull Request com:
   - Título claro e descritivo
   - Descrição detalhada das mudanças
   - Screenshots (se aplicável)
   - Referência a issues relacionadas

## Diretrizes de Design

### Princípios
- **Simplicidade**: Interface limpa e intuitiva
- **Acessibilidade**: Funcional para todos os usuários
- **Performance**: Carregamento rápido e responsivo
- **Consistência**: Padrões visuais uniformes

### Cores
- Primária: `#667eea`
- Secundária: `#764ba2`
- Sucesso: `#28a745`
- Erro: `#dc3545`
- Aviso: `#ffc107`

### Tipografia
- Família: System fonts (Segoe UI, SF Pro, etc.)
- Tamanhos: Escala modular baseada em rem
- Peso: 400 (normal), 500 (medium), 600 (semibold)

## Código de Conduta

### Nosso Compromisso

Estamos comprometidos em tornar a participação neste projeto uma experiência livre de assédio para todos, independentemente de idade, tamanho corporal, deficiência, etnia, identidade e expressão de gênero, nível de experiência, nacionalidade, aparência pessoal, raça, religião ou identidade e orientação sexual.

### Nossos Padrões

**Comportamentos que contribuem para um ambiente positivo:**
- Usar linguagem acolhedora e inclusiva
- Respeitar diferentes pontos de vista e experiências
- Aceitar críticas construtivas graciosamente
- Focar no que é melhor para a comunidade
- Mostrar empatia com outros membros da comunidade

**Comportamentos inaceitáveis:**
- Uso de linguagem ou imagens sexualizadas
- Trolling, comentários insultuosos/depreciativos
- Assédio público ou privado
- Publicar informações privadas de outros sem permissão
- Outras condutas consideradas inadequadas em ambiente profissional

### Aplicação

Instâncias de comportamento abusivo, de assédio ou de outra forma inaceitável podem ser reportadas entrando em contato com a equipe do projeto. Todas as reclamações serão analisadas e investigadas, resultando em uma resposta considerada necessária e apropriada às circunstâncias.

## Reconhecimento

Contribuidores serão reconhecidos no README.md e releases do projeto.

## Dúvidas?

Sinta-se à vontade para abrir uma issue com suas dúvidas ou entrar em contato diretamente.

Obrigado por contribuir! 🚀

