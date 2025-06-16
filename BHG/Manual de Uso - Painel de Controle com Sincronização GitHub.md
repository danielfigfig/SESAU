# Manual de Uso - Painel de Controle com Sincronização GitHub

## Visão Geral

Esta é uma versão aprimorada do painel de controle de leitos hospitalares que permite sincronizar os dados com o GitHub, possibilitando acesso aos mesmos dados de múltiplos dispositivos.

## Principais Diferenças da Versão Original

### ✅ Novas Funcionalidades
- **Sincronização com GitHub**: Dados salvos automaticamente no GitHub
- **Acesso multi-dispositivo**: Mesmos dados disponíveis em qualquer lugar
- **Configuração GitHub**: Interface dedicada para configurar a integração
- **Status de sincronização**: Indicador visual do status da sincronização
- **Backup automático**: Dados sempre seguros no GitHub

### 🔄 Funcionalidades Mantidas
- Todas as funcionalidades originais da aplicação
- Interface idêntica para entrada de dados
- Cálculos automáticos de totais e balanços
- Atalhos de teclado (/, *, Enter)
- Exportar/importar dados em JSON
- Controle de status dos leitos

## Configuração Inicial

### Pré-requisitos
1. Conta no GitHub
2. Repositório no GitHub para armazenar os dados
3. Personal Access Token com permissão "repo"

### Passo a Passo

#### 1. Criar Repositório no GitHub
- Acesse [GitHub](https://github.com)
- Clique em "New repository"
- Nome sugerido: `meus-dados-leitos`
- Pode ser privado ou público
- Não precisa adicionar README

#### 2. Gerar Personal Access Token
- Acesse [GitHub Settings > Tokens](https://github.com/settings/tokens)
- Clique em "Generate new token (classic)"
- Nome: "Painel Leitos"
- Selecione o escopo "repo" (acesso completo aos repositórios)
- Clique em "Generate token"
- **IMPORTANTE**: Copie o token imediatamente (não será mostrado novamente)

#### 3. Configurar na Aplicação
- Abra a aplicação
- Clique na aba "GitHub"
- Preencha os campos:
  - **Nome de Usuário**: Seu username do GitHub
  - **Nome do Repositório**: Nome do repositório criado
  - **Personal Access Token**: Cole o token gerado
- Clique em "Testar Conexão" para verificar
- Se bem-sucedido, clique em "Salvar Configuração"

## Como Usar

### Entrada de Dados
1. Selecione o leito desejado (Leito 1 a 10)
2. Insira os valores nos campos correspondentes
3. Os dados são salvos automaticamente no GitHub
4. Observe o indicador de status no canto inferior direito

### Sincronização
- **Automática**: Dados são sincronizados a cada alteração (com delay de 2 segundos)
- **Manual**: Use o botão "Sincronizar Agora" na aba GitHub
- **Status**: Indicador visual mostra o status da sincronização

### Acesso de Outros Dispositivos
1. Abra a aplicação em outro dispositivo
2. Configure com as mesmas credenciais GitHub
3. Os dados serão carregados automaticamente

## Indicadores de Status

### Sincronização
- 🔵 **Sincronizando...**: Dados sendo enviados para o GitHub
- ✅ **Sincronizado com GitHub**: Dados salvos com sucesso
- ❌ **Erro na sincronização**: Problema na conexão ou configuração

### Configuração GitHub
- ✅ **Conexão bem-sucedida**: Repositório acessível
- ❌ **Erro na conexão**: Verificar credenciais ou repositório
- ⚠️ **Testando conexão...**: Verificação em andamento

## Solução de Problemas

### Erro de Autenticação
- Verificar se o token está correto
- Verificar se o token tem permissão "repo"
- Verificar se o token não expirou

### Repositório Não Encontrado
- Verificar se o nome do usuário está correto
- Verificar se o nome do repositório está correto
- Verificar se o repositório existe e é acessível

### Erro de Sincronização
- Verificar conexão com a internet
- Verificar se não atingiu o limite de rate do GitHub API
- Tentar sincronizar manualmente

### Dados Não Carregam
- Verificar se o arquivo `dados-leitos.json` existe no repositório
- Verificar se a configuração está salva corretamente
- Tentar recarregar a página

## Estrutura de Dados no GitHub

Os dados são salvos no arquivo `dados-leitos.json` na raiz do repositório com a seguinte estrutura:

```json
{
  "lastUpdated": "2025-06-16T00:37:00Z",
  "version": "1.0",
  "leitos": {
    "leito-1": {
      "b-19": "100",
      "c-19": "50",
      "sumManha": "200",
      "sumTarde": "150",
      "isComplete": true
    },
    "leito-2": { ... }
  }
}
```

## Segurança

### Boas Práticas
- Mantenha o Personal Access Token seguro
- Use repositório privado para dados sensíveis
- Não compartilhe o token com terceiros
- Revogue tokens não utilizados

### Limitações
- GitHub API tem limite de 5000 requests por hora
- Arquivos têm limite de 100MB (mais que suficiente para os dados)
- Tokens podem expirar (configurar expiração adequada)

## Backup e Recuperação

### Backup Automático
- Todos os dados ficam salvos no GitHub
- Histórico de versões disponível no GitHub
- Possibilidade de reverter alterações

### Recuperação
- Em caso de perda de dados locais, basta reconfigurar
- Dados são carregados automaticamente do GitHub
- Exportar dados via botão "Exportar Dados" para backup local

## Compatibilidade

### Navegadores Suportados
- Chrome/Chromium (recomendado)
- Firefox
- Safari
- Edge

### Dispositivos
- Desktop (Windows, Mac, Linux)
- Tablets
- Smartphones (interface responsiva)

## Suporte

Para problemas técnicos:
1. Verificar a seção "Solução de Problemas"
2. Verificar console do navegador (F12) para erros
3. Verificar status da API do GitHub
4. Tentar reconfigurar a integração GitHub

