# Spotippos Anúncios
> Aplicativo web que te ajuda a encontrar o imóvel dos seus sonhos em Spotippos.

_Spotippos Anúncios_ lista dinamicamente todos os anúncios de imóveis de Spotippos. Com filtros que o ajudarão a encontrar o imóvel dos seus sonhos em Spotippos.

Você poderá utilizá-lo quando estiver em casa, no seu computador pessoal, ou na rua, em seu dispositivo móvel.

![Tela inicial - Desktop](docs/main-screen_desktop.png)

##### Telas
**Tela Incial**: [ [Desktop](docs/main-screen_desktop.png) | [Mobile](docs/main-screen_mobile.png) | [Tablet](docs/main-screen_tablet.png) ]

**Detalhes do anúncio**: [ [Desktop](docs/details-screen_desktop.png) | [Mobile](docs/details-screen_mobile.png) | [Tablet](docs/details-screen_tablet.png) ]

## Instalação
Para a instalação você vai precisar do [Node.js](https://nodejs.org/en/) e [Ruby](https://www.ruby-lang.org/pt/) instalados em sua máquina. Caso ainda não tenha, instale-os agora.

Após a instalação de ambos, abra um prompt de comando (`cmd` no windows) e digite:

```sh
git clone https://bitbucket.org/renato_rodrigues/vivareal-spotippos.git
cd vivareal-spotippos
npm install
npm start
```

## Uso
Após a instalação, abra o endereço <http://localhost:8000> em seu navegador.

Além da listagem inicial, você poderá utilizar os 6 critérios disponíveis na barra lateral para refinar ainda mais a busca pelo seu imóvel ideal em Spotippos.

Sempre que precisar utilizar novamente roda apenas `npm start` e abra <http://localhost:8000> no navegador.

## Navegação por teclas
A tela de detalhes de imóveis possui o recurso de navegação por teclas quando é aberta à partir de uma lista de resultados.

Para navegar entre os imóveis utilize:

| Teclas           | Ação                      |
|------------------|---------------------------|
| j, Seta Direita  | Próximo imóvel            |
| k, Seta Esquerda | Imóvel anterior           |
| u, backspace     | Volta aos resultados      |
| ?                | Abre a listagem de teclas |


## Opções para desenvolvedores

Os arquivos fonte do projeto estão localizados na pasta _./app_ estão organizados em uma estrutura que permite visualizar o resultado do desenvolvimento sem a necessidade de gerar um build a cada atualização. Para isto o `grunt` está configurado para gerar os assets na mesma pasta onde o servidor de DEV serve na porta 8080.

Os testes automatizados por padrão rodam no Google Chrome, mas existe a opção de rodá-los também no PhantomJS.



##### Utilização

```sh
git clone https://bitbucket.org/renato_rodrigues/vivareal-spotippos.git
cd vivareal-spotippos
npm install
npm run server
```
e para gerar os assets automaticamente, em outra janela digite

```sh
grunt watch
```

##### Testes automatizados
Arquivos ficam localizados em _./test_ e os relatórios gerados em _./test/reports_

Google Chrome (padrão) - Clique em `[ DEBUG ]` para ver os resultados
```sh
npm test
```
PhantomJS
```sh
npm run test-phantom
```
PhantomJS, execução única
```sh
npm run test-single-run
```

##### Build
Assets de produção são gerados em _./dist_

```sh
grunt build
```

##### Servidores locais
Pasta _./app_ com artefatos de desenvolvimento (porta 8080)
```sh
npm run server
```

Pasta _./dist/app_ com artefatos de produção (porta 8000)
```sh
npm start
```

## Histórico de lançamentos

*   1.2.0 _\[09/08/2016\]_
    *   Botões de navegação na tela de detalhes do anúncio
    *   Navegação entre imóveis com o teclado (j/k/u)
    *   Utilização do bower para gerenciar dependências
    *   Testes unitários em todos os controllers, services, filters e directives
    *   Relatório de cobertura de testes unitários
    *   Refactorings, melhorias estruturais e de Layout
    *   [changelog completo](CHANGELOG)
*   1.1.0 _\[09/06/2016\]_
    *   Tela de detalhe de imóveis
    *   Mapa da localização do imóvel em Spotippos na tela de detalhe
    *   Relátorios de testes em formato Jasmine e JUNIT
*   1.0.0 _\[07/06/2016\]_
    *   Versão inicial

## Roadmap
*   3.0.0
    *   Criação do próprio backend usando Node/Express/MongoDB

*   2.0.0
    *   Layout mobile first
    *   Ordenação dos resultados
    *   Filtro por províncias na barra lateral    
    *   Tela de adição de imóvel
    *   Calcular e exibir a província através da latitude e longitude usando R-Tree
    *   Deploy automático para o S3/Heroku/FTP
    *   Testes end-to-end com protractor

*   ~~1.1.0~~
    *   ~~Tela de detalhe de imóveis~~
    *   ~~Mapa da localização do imóvel em Spotippos na tela de detalhe~~
*   ~~1.0.0~~
    *   ~~Versão inicial~~

## Contato

Renato Rodrigues – [about.me/renato.rodrigues](https://about.me/renato.rodrigues)

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

[https://bitbucket.org/renato_rodrigues/](https://bitbucket.org/renato_rodrigues/)
