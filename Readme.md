#Vortx Show me the code

### Inciando o projeto
## 💻 Pré-requisitos

Antes começar e necessário ter o docker no seu ambiente. 
## 🚀 Instalando 

Para instalar o projeto, siga estas etapas:

Copie o arquivo .env.example da raiz do projeto para um arquivo chamado .env

```
DB_DATABASE= #nome do seu banco de dados
DB_USERNAME= #username do banco de dados 
DB_PASSWORD= #senha do banco de dados
DB_PORT= #porta externa do banco 
DB_DOCKER_PORT= # porta interna do banco nos contairners
DB_TYPE= # tipo do banco de dados 
DB_HOST= # host do seu banco de dados
SECRET_KEY= # uma key aleatoria para gerar o jwt token

```
Apos preencher esses dados execute o comando. 

``
$ docker compose up -d
``

Apos a finalização desse comando execute. 

``
docker exec -it votrx_aplication_1 yarn seed:refresh
``

pronto a aplicação de banckend estara rodando no localhost porta 5000