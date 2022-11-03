<div align="center">
<h1>Tech Stack</h1>

<a href="https://reactjs.org/" title="React"><img src="https://github.com/get-icon/geticon/raw/master/icons/react.svg" alt="React" width="40px" height="40px"></a>
<a href="https://www.typescriptlang.org/" title="Typescript"><img src="https://github.com/get-icon/geticon/raw/master/icons/typescript-icon.svg" alt="Typescript" width="40px" height="40px"></a>
<a href="https://expressjs.com/" title="Express"><img src="https://github.com/get-icon/geticon/raw/master/icons/express.svg" alt="Express" width="40px" height="40px"></a>
<a href="https://www.postgresql.org/" title="PostgreSQL"><img src="https://github.com/get-icon/geticon/raw/master/icons/postgresql.svg" alt="PostgreSQL" width="40px" height="40px"></a>
<a href="https://www.docker.com/" title="docker"><img src="https://github.com/get-icon/geticon/raw/master/icons/docker-icon.svg" alt="docker" width="40px" height="40px"></a>
<a href="https://nodejs.org/" title="Node.js"><img src="https://github.com/get-icon/geticon/raw/master/icons/nodejs-icon.svg" alt="Node.js" width="40px" height="40px"></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" title="JavaScript"><img src="https://github.com/get-icon/geticon/raw/master/icons/javascript.svg" alt="JavaScript" width="40px" height="40px"></a>
<a href="https://ryanstutorials.net/bash-scripting-tutorial/bash-script.php" title="Bash"><img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/bash/bash.png" alt="Bash" width="40px" height="40px"></a>
<a href="https://eslint.org/" title="ESLint"><img src="https://github.com/get-icon/geticon/raw/master/icons/eslint.svg" alt="ESLint" width="40px" height="40px"></a>
<a href="https://prettier.io/" title="Prettier"><img src="https://github.com/get-icon/geticon/raw/master/icons/prettier.svg" alt="Prettier" width="40px" height="40px"></a>
<a href="https://www.npmjs.com/" title="NPM"><img src="https://github.com/get-icon/geticon/raw/master/icons/npm.svg" alt="NPM" width="40px" height="40px"></a>
</div>

## Pre-requisites
- Installed [Docker](https://www.docker.com/)
- Wsl 2 (if running on Windows)

## Getting started
- Clone the repository
```
git clone https://github.com/KonradPerlicki/react-node-app.git
```
- Change directory and create .env file
```
cd ./react-node-app
cp .env.example .env
```
- Set up the whole project by running the following command 
```
server/.tools/build.sh
```
This command will download and create docker containers, install all dependencies for the front-end and server and import sample of database 

## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **front-end**                 | Contains all front-end files, developed by [@NadmorskaAlpaka](https://github.com/NadmorskaAlpaka)
| **server**         | The back-end part of this project is fully developed and maintaned by [@me](https://github.com/KonradPerlicki)|