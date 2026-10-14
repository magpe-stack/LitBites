# LitBites 📚

O **LitBites** é um Progressive Web App (PWA) minimalista desenvolvido em preto e branco que apresenta microresumos literários clássicos de forma totalmente **aleatória**, permitindo leitura rápida, cópia instantânea e funcionamento **100% offline**.

---

## 🚀 O que é um PWA?
Um **Progressive Web App (PWA)** combina o melhor da web e dos aplicativos móveis. Ele pode ser acessado diretamente pelo navegador web sem nenhuma instalação prévia, mas também oferece a opção de ser **instalado no seu celular ou computador** como um aplicativo nativo, com ícone próprio e suporte completo para funcionamento offline.

---

## 📖 Como Usar no Site (Sem Instalar)
Basta abrir o arquivo `index.html` ou acessar o link publicado no seu navegador web favorito:
1. **Passar (🫲):** Clique no botão com o ícone de mão deslizando para sortear e exibir um novo microresumo aleatório.
2. **Copiar (🖐️):** Clique no botão com o ícone de mão aberta para copiar o resumo e as informações da obra para a sua área de transferência.
3. **Alternar Tema:** Clique no botão `🌓` no topo à direita para alternar entre o modo claro e escuro.

---

## 📱 Como Instalar como Aplicativo

### 🤖 No Android (Chrome / Edge)
1. Acesse o site do app.
2. Toque no **menu de três pontos** (`⋮`) no canto superior direito do navegador.
3. Selecione **"Instalar aplicativo"** ou **"Adicionar à tela inicial"**.
4. Confirme. O ícone aparecerá na sua gaveta de aplicativos.

### 🍎 No iPhone e iPad (Safari)
1. Abra o site no navegador **Safari**.
2. Toque no botão **Compartilhar** (quadrado com seta para cima na barra inferior).
3. Selecione **"Adicionar à Tela de Início"** e confirme.

### 💻 No Computador (Chrome, Edge, Brave)
1. Acesse o site no navegador.
2. Clique no ícone de instalação na barra de endereços (ou abra o menu `⋮` > **Instalar LitBites...**).
3. Confirme. O app abrirá em uma janela própria dedicada.

---

## 💻 Como Instalar e Rodar Localmente

1. Baixe todos os arquivos do projeto para uma pasta local (`index.html`, `style.css`, `app.js`, `resumos.json`, `sw.js`, `manifest.json`, `logo.svg`).
2. Inicie um servidor HTTP local simples na pasta (necessário para que o `fetch` leia o arquivo `resumos.json` corretamente):
   - **Com Python 3:** `python -m http.server 8000`
   - **Com Node.js / npx:** `npx serve`
   - **Com VS Code:** Use a extensão *Live Server* e clique em "Go Live".
3. Acesse `http://localhost:8000` no seu navegador.

---

litbites/
├── index.html
├── style.css
├── app.js
├── resumos.json
├── sw.js
├── manifest.json
├── logo.svg
└── README.md

---
