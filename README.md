# 📚 BookAccess

Sistema web desenvolvido para a disciplina de **Interação Humano-Computador (IHC)**, com foco em **acessibilidade digital** para leitura de documentos PDF.

O projeto tem como objetivo permitir que usuários carreguem arquivos PDF e tenham uma experiência de leitura mais acessível, com recursos voltados para inclusão digital, conforto visual e melhor usabilidade.

## Objetivo do Projeto

O **BookAccess** foi desenvolvido para auxiliar usuários na leitura de documentos PDF diretamente no navegador, oferecendo recursos de acessibilidade que permitem adaptar a interface conforme diferentes necessidades.

Entre os principais recursos implementados estão:

* Upload e leitura de arquivos PDF;
* Extração do texto do PDF para leitura acessível;
* Ajuste do tamanho da fonte;
* Modo de alto contraste;
* Salvamento de documentos na biblioteca local;
* Navegação entre páginas com React Router;
* Navbar estilizada;
* Animações e transições suaves com GSAP;
* Interface responsiva;
* Suporte à acessibilidade digital com foco em inclusão.

## Tecnologias Utilizadas

* React
* Vite
* JavaScript
* React Router DOM
* PDF.js / pdfjs-dist
* GSAP
* VLibras
* HTML5
* CSS3
* LocalStorage

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

* Node.js, versão 18 ou superior;
* npm.

Para verificar se estão instalados, execute:

```bash
node -v
npm -v
```

## Como clonar o projeto

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

Entre na pasta do projeto:

```bash
cd projeto_ihc
```

## Instalando as dependências

Instale todas as dependências do projeto:

```bash
npm install
```

Caso seja necessário instalar manualmente as bibliotecas principais, utilize:

```bash
npm install react-router-dom
npm install gsap
npm install pdfjs-dist@4.10.38
```

## Executando o projeto

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em:

```bash
http://localhost:5173
```

## 📂 Estrutura do Projeto

```text
src/
│
├── assets/
│
├── components/
│   ├── AccessibilityPanel.jsx
│   ├── Navbar.jsx
│   ├── Pdfuploader.jsx
│   └── PdfViewer.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Reader.jsx
│   └── Library.jsx
│
├── services/
│
├── App.jsx
├── main.jsx
├── App.css
└── index.css
```

## Recursos de Acessibilidade

O projeto possui recursos voltados para melhorar a experiência de leitura e navegação, principalmente para usuários com dificuldades visuais ou que necessitam de uma interface mais adaptável.

Recursos implementados:

* **Alto contraste:** permite alterar a interface para um modo com maior contraste visual;
* **Controle de tamanho da fonte:** botões para aumentar, diminuir e restaurar o tamanho padrão da fonte;
* **Leitura de PDF:** extração do texto de arquivos PDF para exibição dentro da interface;
* **Biblioteca local:** permite salvar documentos carregados no navegador usando LocalStorage;
* **Interface responsiva:** adaptação da interface para diferentes tamanhos de tela;
* **Transições suaves:** animações com GSAP para melhorar a experiência de navegação;
* **Navbar acessível:** navegação principal entre Início, Leitor e Biblioteca;
* **Suporte ao VLibras:** recurso voltado para inclusão de usuários surdos.

## Responsabilidades dos Integrantes

### Antônio Lucas

Responsável pela estrutura inicial do projeto e implementação das primeiras funcionalidades da aplicação.

Principais responsabilidades:

* Criação da estrutura base do projeto React com Vite;
* Organização inicial das páginas e componentes;
* Implementação da estrutura de navegação inicial;
* Apoio na funcionalidade de leitura de PDF;
* Integração e organização de recursos iniciais de acessibilidade;
* Contribuição na construção da proposta geral do BookAccess.

### Luan Cristian

Responsável pela implementação de melhorias visuais, acessibilidade, animações e ajustes de usabilidade.

Principais responsabilidades:

* Implementação do modo de alto contraste;
* Implementação do controle de tamanho da fonte;
* Ajustes visuais da interface com CSS;
* Criação e estilização da navbar;
* Centralização e melhoria visual das páginas;
* Implementação de animações com GSAP;
* Implementação de transições suaves entre páginas;
* Ajustes na leitura de PDF utilizando PDF.js;
* Correção de compatibilidade do `pdfjs-dist`;
* Organização visual da tela de leitura e da biblioteca.

## Funcionalidades Principais

### Página Inicial

A página inicial apresenta o projeto BookAccess e permite acessar rapidamente:

* Leitor de PDF;
* Biblioteca de documentos.

### Leitor Acessível

A tela de leitura permite:

* Selecionar um arquivo PDF;
* Extrair o texto do documento;
* Aumentar ou diminuir o tamanho da fonte;
* Ativar ou desativar o alto contraste;
* Salvar o documento na biblioteca.

### Minha Biblioteca

A biblioteca permite visualizar os documentos salvos localmente no navegador, possibilitando acesso posterior ao conteúdo carregado.

## Testes Realizados

Foram realizados testes de:

* Upload de arquivos PDF;
* Extração de texto dos documentos;
* Funcionamento do alto contraste;
* Ajuste de tamanho da fonte;
* Salvamento na biblioteca;
* Navegação entre páginas;
* Responsividade;
* Transições visuais com GSAP.

## Disciplina

Projeto desenvolvido para a disciplina de **Interação Humano-Computador (IHC)**, com foco em acessibilidade, usabilidade e inclusão digital.

## Equipe

* Antônio Lucas
* Luan Cristian
