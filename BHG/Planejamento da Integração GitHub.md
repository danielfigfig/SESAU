# Planejamento da Integração GitHub

## Estratégias de Autenticação

### Opção 1: Personal Access Token (Mais Simples)
- **Prós**: Implementação mais simples, sem necessidade de OAuth flow
- **Contras**: Usuário precisa criar e configurar token manualmente
- **Uso**: Ideal para uso pessoal ou pequenos grupos

### Opção 2: OAuth App (Mais Profissional)
- **Prós**: Experiência de usuário melhor, login automático via GitHub
- **Contras**: Mais complexo de implementar, requer servidor para callback
- **Uso**: Ideal para aplicação pública

### Opção 3: GitHub App (Mais Avançado)
- **Prós**: Permissões mais granulares, tokens de curta duração
- **Contras**: Mais complexo ainda
- **Uso**: Para aplicações empresariais

## Estratégia Escolhida: Personal Access Token

Para esta implementação, vamos usar Personal Access Token por ser:
- Mais simples de implementar
- Não requer servidor backend
- Adequado para o caso de uso (controle pessoal de dados)
- Permite implementação totalmente client-side

## Estrutura de Armazenamento no GitHub

### Repositório
- Usuário criará um repositório específico para os dados
- Exemplo: `meus-dados-leitos` ou similar

### Estrutura de Arquivos
```
/dados-leitos.json
```

### Formato do Arquivo JSON
```json
{
  "lastUpdated": "2025-06-16T00:33:00Z",
  "version": "1.0",
  "leitos": {
    "leito-1": {
      "b-19": "100",
      "c-19": "50",
      "sumManha": "200",
      "sumTarde": "150",
      "isComplete": true
    },
    "leito-2": { ... },
    ...
  }
}
```

## Fluxo de Funcionamento

### Configuração Inicial
1. Usuário cria Personal Access Token no GitHub
2. Usuário cria repositório para dados (ou usa existente)
3. Usuário configura token e repositório na aplicação

### Salvamento
1. Aplicação faz GET para verificar se arquivo existe
2. Se existe, obtém SHA do arquivo atual
3. Faz PUT com novo conteúdo (base64) e SHA para atualizar
4. Se não existe, faz PUT para criar

### Carregamento
1. Aplicação faz GET para obter conteúdo do arquivo
2. Decodifica base64 e parseia JSON
3. Carrega dados nos leitos

### Sincronização
- Auto-save a cada mudança (com debounce)
- Indicador visual de status de sincronização
- Tratamento de conflitos (último a salvar ganha)

## API Endpoints Necessários

### GET Repository Contents
```
GET /repos/{owner}/{repo}/contents/{path}
```

### PUT Repository Contents (Create/Update)
```
PUT /repos/{owner}/{repo}/contents/{path}
```

### Headers Necessários
```
Authorization: Bearer {token}
Accept: application/vnd.github+json
X-GitHub-Api-Version: 2022-11-28
```

## Interface de Configuração

### Campos Necessários
- GitHub Username
- Repository Name
- Personal Access Token
- Botão para testar conexão
- Botão para sincronizar dados

### Validações
- Verificar se token é válido
- Verificar se repositório existe e é acessível
- Verificar permissões de escrita

## Tratamento de Erros

### Erros Comuns
- Token inválido ou expirado
- Repositório não encontrado
- Sem permissão de escrita
- Limite de rate limit atingido
- Problemas de conectividade

### Estratégias
- Retry automático com backoff
- Cache local como fallback
- Mensagens de erro claras para o usuário
- Modo offline quando necessário

