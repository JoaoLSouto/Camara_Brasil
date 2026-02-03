# Câmara Brasil

Aplicação web para consulta de informações sobre deputados federais, notícias, eventos e atividades da Câmara dos Deputados do Brasil.

## Sobre o Projeto

Este projeto foi desenvolvido com React e utiliza a API de Dados Abertos da Câmara dos Deputados para fornecer informações atualizadas sobre:
- Deputados federais e seus perfis
- Notícias e comunicados oficiais
- Eventos e sessões parlamentares
- Estatísticas e dados da Câmara
- Frentes parlamentares
- Vídeos e transmissões ao vivo
- Integração com redes sociais

## Tecnologias Utilizadas

- React 18
- React Router DOM
- Styled Components
- Axios
- JSON Server (para mock de dados)
- API de Dados Abertos da Câmara dos Deputados

## Instalação e Configuração

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositório>
cd camara
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor JSON (para dados mockados):
```bash
node server.js
```

4. Em outro terminal, inicie a aplicação:
```bash
npm start
```

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm start`

Executa a aplicação em modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizar no navegador.

A página recarrega automaticamente quando você faz alterações.\
Você também verá erros de lint no console.

### `node server.js`

Inicia o servidor JSON na porta 5000 para servir dados mockados.

### `npm test`

Executa os testes em modo watch interativo.\
Veja mais informações sobre [executar testes](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build`

Compila a aplicação para produção na pasta `build`.\
Otimiza o React para melhor performance em produção.

O build é minificado e os nomes dos arquivos incluem hashes.\
Sua aplicação está pronta para deploy!

Veja mais sobre [deployment](https://facebook.github.io/create-react-app/docs/deployment).

## Estrutura do Projeto

```
camara/
├── public/           # Arquivos públicos estáticos
├── src/
│   ├── assets/       # Imagens e recursos
│   ├── components/   # Componentes reutilizáveis
│   ├── contexts/     # Context API (tema, etc)
│   ├── pages/        # Páginas da aplicação
│   ├── services/     # Configuração de API
│   └── styles/       # Estilos globais
├── db.json          # Dados mockados
└── server.js        # Servidor JSON
```

## Funcionalidades

- 🏛️ **Deputados**: Lista e busca de deputados federais com informações detalhadas
- 📰 **Notícias**: Últimas notícias e comunicados da Câmara
- 📅 **Eventos**: Agenda de eventos e sessões parlamentares
- 📊 **Estatísticas**: Dados e estatísticas sobre as atividades parlamentares
- 🎥 **Vídeos**: Vídeos e transmissões ao vivo das sessões
- 🤝 **Frentes Parlamentares**: Informações sobre frentes e grupos de trabalho
- 🌐 **Redes Sociais**: Integração com mídias sociais da Câmara
- 💬 **Fale Conosco**: Canal de comunicação

## API

Este projeto utiliza a [API de Dados Abertos da Câmara dos Deputados](https://dadosabertos.camara.leg.br/swagger/api.html).

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## Contato

Para mais informações sobre o projeto, entre em contato através da página "Fale Conosco" na aplicação.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# DeputadosReactjs
# Camara_Deputados
