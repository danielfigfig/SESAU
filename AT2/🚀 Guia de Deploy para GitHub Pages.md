# 🚀 Guia de Deploy para GitHub Pages

## Passos para Publicar no GitHub

### 1. Criar Repositório
1. Acesse [GitHub.com](https://github.com) e faça login
2. Clique em "New repository" (ou use o botão "+" no canto superior direito)
3. Configure o repositório:
   - **Nome**: `automacao-hierarquica` (ou o nome que preferir)
   - **Descrição**: "Aplicação web para criar grupos e ações hierárquicas com sistema de gatilhos automatizados"
   - **Visibilidade**: Public (necessário para GitHub Pages gratuito)
   - **Inicializar**: Não marque nenhuma opção (README, .gitignore, license)
4. Clique em "Create repository"

### 2. Fazer Upload dos Arquivos
Você tem duas opções:

#### Opção A: Interface Web (Mais Fácil)
1. Na página do repositório criado, clique em "uploading an existing file"
2. Arraste todos os arquivos da pasta `github-automation-app` para a área de upload
3. Adicione uma mensagem de commit: "Initial commit - Automação Hierárquica v1.0"
4. Clique em "Commit changes"

#### Opção B: Git Command Line
```bash
# Clone o repositório vazio
git clone https://github.com/SEU-USUARIO/automacao-hierarquica.git
cd automacao-hierarquica

# Copie todos os arquivos para esta pasta
# (copie os arquivos da pasta github-automation-app)

# Adicione os arquivos
git add .
git commit -m "Initial commit - Automação Hierárquica v1.0"
git push origin main
```

### 3. Ativar GitHub Pages
1. Vá para as configurações do repositório (aba "Settings")
2. Role para baixo até a seção "Pages" no menu lateral
3. Em "Source", selecione:
   - **Source**: "Deploy from a branch"
   - **Branch**: "main"
   - **Folder**: "/ (root)"
4. Clique em "Save"
5. Aguarde alguns minutos para o deploy

### 4. Acessar Sua Aplicação
Após o deploy, sua aplicação estará disponível em:
```
https://SEU-USUARIO.github.io/automacao-hierarquica
```

## ✅ Verificação Pós-Deploy

### Checklist de Funcionalidades
- [ ] Site carrega corretamente
- [ ] Interface responsiva (teste em mobile)
- [ ] Tema claro/escuro funciona
- [ ] Criação de grupos funciona
- [ ] Criação de ações funciona
- [ ] Persistência de dados funciona
- [ ] Atalhos de teclado funcionam
- [ ] Modal de ajuda abre
- [ ] Log de atividades funciona

### Solução de Problemas Comuns

#### Site não carrega
- Verifique se o GitHub Pages está ativado
- Confirme que a branch está configurada como "main"
- Aguarde até 10 minutos para propagação

#### Funcionalidades não funcionam
- Abra o console do navegador (F12) para verificar erros
- Verifique se todos os arquivos foram enviados corretamente
- Confirme que os caminhos dos arquivos estão corretos

#### Design quebrado
- Verifique se o arquivo `styles.css` foi enviado
- Confirme que não há caracteres especiais nos nomes dos arquivos
- Teste em diferentes navegadores

## 🔄 Atualizações Futuras

Para atualizar a aplicação:
1. Modifique os arquivos localmente
2. Faça commit das mudanças
3. Push para o repositório
4. O GitHub Pages atualizará automaticamente

## 📊 Monitoramento

### Analytics (Opcional)
Para adicionar Google Analytics:
1. Descomente a seção de analytics no `index.html`
2. Substitua `GA_MEASUREMENT_ID` pelo seu ID do Google Analytics
3. Faça commit da mudança

### Domínio Personalizado (Opcional)
Para usar um domínio próprio:
1. Crie um arquivo `CNAME` na raiz com seu domínio
2. Configure o DNS do seu domínio para apontar para o GitHub Pages
3. Ative HTTPS nas configurações do repositório

## 🎉 Pronto!

Sua aplicação de Automação Hierárquica está agora publicada e acessível mundialmente através do GitHub Pages!

### Links Úteis
- [Documentação do GitHub Pages](https://docs.github.com/en/pages)
- [Configuração de domínio personalizado](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Solução de problemas](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites)

