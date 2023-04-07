# RSS-Mobile-Reader
 
## Descrição:
Esta aplicativo serve para rapidamente coletar artigos de noticias do site Raspberry PI News e mostrar de forma rapida um resumo do conteudo.
Este sistema usa o serviço de RSS para coletar a informação e tambem disponelizar um link de acesso para o propio artigo

## Dependencias:
 - [Node.JS](https://nodejs.org/en)

 - [Yarn](https://www.npmjs.com/package/yarn)

```
npm install --global yarn
```

 - [react-native-rss-parser](https://www.npmjs.com/package/react-native-rss-parser)

```
npm install react-native-rss-parser --save
```

## Instalar:
Clone o repositorio
```
git clone https://github.com/NowhereCat/RSS-Mobile-Reader.git
```

Instale react-native-rss-parser no projeto
```
npm install react-native-rss-parser --save
```

Va para a pasta my-project

```
cd my-project
```

Execute o projeto
```
yarn start
```

**OBS: Caso tenho algum erro, crie um projeto EXPO e copie e cole os conteudos da pasta my-project**

```
yarn create expo-app my-project
```


## Como usar:

### Clique no botão superior a direita para carregar ou recarregar a informação RSS
![](https://i.ibb.co/jJJFm8N/1.png)![](https://i.ibb.co/J20qyPz/2.png)

### Logo os 10 ultimos artigos de noticias serão carregados abaixo, com o titulo, descrição, link e data de postagem
![](https://i.ibb.co/R0WKBhy/3.png)

### Você pode digitar algo na barra de pesquisa para achar algo especifico
![](https://i.ibb.co/Mk3kVtz/4.png)
