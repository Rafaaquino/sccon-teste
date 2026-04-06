# SCCON teste dev Frontend — Busca de CEPs

SPA desenvolvida em Angular 6 como teste técnico para a vaga de desenvolvedor front-end na SCCON

Página funcional para teste em produção https://rafaaquino.github.io/sccon-teste/

## Pré-requisitos

- Node versão 10
- Npm versão 6
- Angular versão ~6.2.9

## Instalação

git clone <https://github.com/Rafaaquino/sccon-teste.git>
cd sccon-cep-app
npm install

## Executar

verifique a versão do Node em sua máquina local.
abra o termina e digite `Node -v`.

Precisamos da versão 10 do Node, se não tiver terá que instalar a versão 10 ou usar NVM https://www.nvmnode.com/pt/ para gerenciamento de versões de Node

após baixar o projeto abra o termina e faça a instalação
rode o comando `npm i` e `npm run start` o projeto ira abir em [http://localhost:4200]

## Deploy

para enviar o projeto em PROD (gh-pages)
use `npm run build` e crie um arquivo 404 na pasta dist com esse conteudo
`

<script>
  window.location.href = '/sccon-teste/';
</script>`

depois use `npm run deploy`

no github va na branch gh-pages verifique se os arquivos subiram e entao va em settings - pages e veja o link gerado

## Principais Recursos Implementados

- Lazy Load - HomeModule e CepModule carregados sob demanda via `loadChildren` |
- Reactive Forms - Validação com REGEX (`/^\d{5}-\d{3}$/`) + `markAllAsTouched` |
- Máscara de CEP - `ngx-mask` com `mask="00000-000"` |
- Estado Reativo - `BehaviorSubject` privado + `buscas$` público via `.asObservable()` |
- Async Pipe - Listagem consome `buscas$` sem nenhum `.subscribe()` no componente |
- HttpInterceptor - `ErrorInterceptor` para tratamento global de erros HTTP |
- Persistência - `localStorage` sincronizado com o `BehaviorSubject` |
- HTML Semântico - Tags `<header>`, `<nav>`, `<section>`, `<table>`, `<time>`, atributos `aria-*` e `data-*` |
- SCSS estruturado - Variáveis em `_variables.scss`, mixins em `_mixins.scss`, BEM nos componentes |
- CSS Animations - Fade-in nas páginas, spinner no botão de busca, hover/active nos botões |
- Angular Material - MatToolbar, MatMenu, MatButton, MatIcon no Header |
- Bootstrap 4 - Grid responsivo |

## Desafios

- Angular 6 com `loadChildren` string syntax — formato obrigatório `'./path/module#ClassName'`
- BehaviorSubject inicializado do localStorage — sincronização entre estado em memória e storage feita inteiramente no service
- ngx-mask v6 — versão compatível com Angular 6; requer `NgxMaskModule.forRoot()` no módulo lazy
