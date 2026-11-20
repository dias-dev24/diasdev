# diasdev

Portfólio criativo com editor animado que transforma código em uma interface, projetos conceituais, filtros, detalhes interativos e formulário para baixar um briefing localmente.

## Executar

Requer Node.js 18 ou superior. Não há dependências para instalar.

```sh
npm run dev
```

Abra http://localhost:3000. Para verificar a sintaxe, execute `npm run check`.

O site estático completo está em `diasdev-portfolio/dist`. Essa pasta pode ser publicada em qualquer hospedagem estática.

## Personalizar

- Conteúdo, navegação e formulário: `diasdev-portfolio/dist/index.html`.
- Cores, responsividade e animações: `diasdev-portfolio/dist/styles.css`.
- Animação do editor, filtros e detalhes dos projetos: `diasdev-portfolio/dist/app.js`.

Os três projetos são conceitos demonstrativos, identificados como tais. Substitua pelos trabalhos reais e adicione seu canal de contato antes de usar o portfólio comercialmente. O briefing é baixado localmente e não envia dados. Fontes do Google Fonts possuem fallback local. O site respeita a preferência do sistema por movimento reduzido e permite pausar as animações.
