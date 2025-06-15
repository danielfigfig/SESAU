# Configuração do GitHub Pages

Este arquivo contém instruções para configurar o GitHub Pages para este projeto.

## Configuração Automática

O projeto inclui um workflow do GitHub Actions (`.github/workflows/pages.yml`) que automaticamente:

1. Detecta mudanças na branch `main`
2. Faz o deploy dos arquivos para o GitHub Pages
3. Disponibiliza o site em `https://seu-usuario.github.io/automacao-hierarquica`

## Configuração Manual

Se preferir configurar manualmente:

1. Vá para as configurações do repositório
2. Na seção "Pages", selecione:
   - Source: "Deploy from a branch"
   - Branch: "main"
   - Folder: "/ (root)"
3. Clique em "Save"

## Domínio Personalizado (Opcional)

Para usar um domínio personalizado:

1. Crie um arquivo `CNAME` na raiz do projeto com seu domínio
2. Configure o DNS do seu domínio para apontar para o GitHub Pages
3. Ative HTTPS nas configurações do repositório

## Verificação

Após o deploy, verifique se:
- [ ] O site carrega corretamente
- [ ] Todas as funcionalidades estão operacionais
- [ ] O design está responsivo
- [ ] Não há erros no console do navegador

## Troubleshooting

### Site não carrega
- Verifique se o GitHub Pages está ativado
- Confirme que os arquivos estão na branch correta
- Aguarde alguns minutos para propagação

### Recursos não carregam
- Verifique se os caminhos dos arquivos estão corretos
- Confirme que não há caracteres especiais nos nomes dos arquivos
- Verifique se todos os arquivos foram commitados

### Funcionalidades não funcionam
- Abra o console do navegador para verificar erros
- Teste em diferentes navegadores
- Verifique se o JavaScript está sendo carregado corretamente

