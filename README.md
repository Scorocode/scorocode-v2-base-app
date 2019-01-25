# Base application template

Simple application template

## Installation:

The project is written in [Typescript](https://www.npmjs.com/package/typescript)

Steps to build this project:

1. Run `npm i` command
2. Run `npm run build:prod` command

Use `sc-cli` for publishing application on [scorocode.ru](https://scorocode.ru)


## Database

Create new entity instruction:
1. run command ```ENTITY=<name> npm run migration-create```
2. edit new file in ```src/models/migrations/<name>```
3. create object in ```src/models/entity```
4. add migrations rules to ```src/models/conn.ts```. Edit properties:
   - createConnection.entities
   - createConnection.migrations


More information about [orm](http://typeorm.io/#/)
