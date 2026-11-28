# diasdev

Portfólio criativo com editor animado que transforma código em uma interface, projetos conceituais, filtros, detalhes interativos e formulário para baixar um briefing localmente.

## Executar

Requer Node.js 18 ou superior. Não há dependências para instalar.

```sh
npm run dev
```

Abra http://localhost:3000. Para verificar a sintaxe, execute `npm run check`.

O site estático completo está em `diasdev-portfolio/dist`. Essa pasta pode ser publicada em qualquer hospedagem estática.

## Publicar na Vercel

Importe o repositório e mantenha **Root Directory** na raiz do repositório (campo vazio ou `.`). O arquivo `vercel.json` já define o projeto como estático, executa a verificação de sintaxe e publica `diasdev-portfolio/dist`, onde estão o `index.html`, o CSS e o JavaScript.

Com a integração GitHub habilitada, novos commits na `main` iniciam um novo deploy. Se o projeto já foi importado, confira o **Root Directory** e acompanhe o deploy do commit mais recente. Não é necessário executar o servidor Node na hospedagem.

## Personalizar

- Conteúdo, navegação e formulário: `diasdev-portfolio/dist/index.html`.
- Cores, responsividade e animações: `diasdev-portfolio/dist/styles.css`.
- Animação do editor, filtros e detalhes dos projetos: `diasdev-portfolio/dist/app.js`.

O primeiro projeto apresenta o site real da Shai Camisetas, com captura em `diasdev-portfolio/dist/assets/shai-camisetas.jpeg`. O segundo projeto apresenta a Bravo Barbearia, demonstração de portfólio com agendamento online, Next.js, React, TypeScript e persistência em banco de dados, com captura em `diasdev-portfolio/dist/assets/bravo-barbearia.png`. O terceiro projeto apresenta o Flux, aplicativo de finanças pessoais em Flutter e Dart, com dashboard, movimentações, gráficos interativos e metas, com capa da apresentação em `diasdev-portfolio/dist/assets/flux-onboarding.png` e dashboard nos detalhes em `diasdev-portfolio/dist/assets/flux.jpeg`. A demonstração usa dados fictícios e mantém as alterações apenas na sessão. O briefing é baixado localmente e não envia dados. Fontes do Google Fonts possuem fallback local. O site respeita a preferência do sistema por movimento reduzido e permite pausar as animações.
