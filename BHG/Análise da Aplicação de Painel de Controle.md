# Análise da Aplicação de Painel de Controle

## Funcionalidades Principais

A aplicação é um sistema de controle de leitos hospitalares com as seguintes características:

### Estrutura Geral
- **10 leitos** independentes, cada um com sua própria aba
- Interface em abas com navegação entre leitos e painel de controle
- Design responsivo usando Tailwind CSS

### Funcionalidades por Leito
- **Tabela de dados por hora**: 12 horas (19h às 6h)
- **Colunas de entrada**: INS, VO, PLA, MED, NOR, DOR, FEN, BIC, BIC, HEM
- **Colunas de saída**: VO SNG, DIUR, EVA C, HD, DRE 1, DRE 2
- **Cálculos automáticos**: Totais por coluna, balanços por turno (manhã, tarde, noite)
- **Balanço 24h**: Soma dos três turnos
- **Status de conclusão**: Checkbox para marcar preenchimento completo

### Funcionalidades de Controle
- **Atalhos de teclado**:
  - Enter: Move para próxima linha
  - `/`: Repete valor para baixo na coluna
  - `*`: Limpa valores para baixo na coluna
- **Botões de ação**:
  - Limpar coluna individual
  - Repetir valor na coluna
  - Limpar leito completo
- **Exportar/Importar**: Dados em formato JSON
- **Limpar todos os leitos**

### Armazenamento Atual
- **localStorage**: Cada leito salvo como `bhsync-bed-{index}`
- **Formato JSON**: Estrutura chave-valor com `{coluna}-{hora}` ou `{coluna}`
- **Auto-save**: Salvamento automático com debounce de 500ms
- **Indicador visual**: Status de salvamento local

### Estrutura de Dados
```javascript
// Exemplo de dados de um leito
{
  "b-19": "100",    // INS às 19h
  "c-19": "50",     // VO às 19h
  "sumManha": "200", // Total manhã
  "sumTarde": "150", // Total tarde
  "isComplete": true // Status de conclusão
}
```

## Pontos para Integração GitHub

1. **Substituir localStorage** por chamadas à API do GitHub
2. **Autenticação** necessária para acesso ao repositório
3. **Estrutura de arquivo** no GitHub para armazenar dados
4. **Sincronização** entre dispositivos
5. **Tratamento de conflitos** em caso de edição simultânea
6. **Interface de configuração** para setup inicial

