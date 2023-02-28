# PAS-2022-2
PADRÕES DE ARQUITETURA DE SOFTWARE 2022/2

Documento de Arquitetura de Software: https://docs.google.com/document/d/1BT7iXwN9QSZnJgJtHBYXl3dtdalltFQ9i6wFis_uOxM/edit?usp=share_link

**Como rodar o projeto**

Nosso projeto foi desenvolvido utilizando .NET em C#, logo é possível ter acesso ao código fonte utilizando a IDE Visual Studio.

Outra forma de rodar o projeto é através do docker, esta ferramenta possibilita a utilização da hospedagem da aplicação em containers, facilitando o uso da aplicação.Para usar a aplicação com o docker é necessário seguir os seguintes passos:

1 - Clonar o repositório

2 - Ir na pasta raiz na qual está localizado os arquivos **docker-compose.staging** e **docker-compose**

3 - Abrir o prompt de comando 

4 - Digitar o seguinte comando docker: **docker-compose -f docker-compose.staging.yml up -d --build**

5 - Após esses passos a aplicação estará disponível em ambiente local, sendo possível acessá-las da seguinte maneira:

* API: http://localhost:5208/swagger/index.html
* Aplicação WEB: http://localhost:5210/
