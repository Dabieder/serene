# TLA Dashboard Frontend

This project is based on Angular and is created with the Angular CLI. We try to be up to date with the current angular releases

## Architecture

The project aims to be modularized and uses NGRX store to keep state.

## Setting up and running the project

If you do not have the Angular CLI already installed, run 

```bash
npm install -g @angular/cli
```
Then

```bash
npm install
```
To launch the application using the angular CLI:

```bash
ng serve
```

Then, navigate to 'localhost:4200' to open the application.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Testing with ssl

To test aspects of the app involving https (e.g. PWA functionality), follow the advice here https://medium.com/@rubenvermeulen/running-angular-cli-over-https-with-a-trusted-certificate-4a0d5f92747a store the key/cert somewhere (e.g. directory "ssl_test"), and run

#i18n

To provide i18n, the method that is described here https://github.com/martinroob/ngx-i18nsupport/wiki/Tutorial-for-using-xliffmerge-with-angular-cli is used.

Therefore, to extract the language file for german, run the command
```
npm run extract-i18n
```
and the german translation .xlf file will be created in the i18n folder with the existing translations merged. 

To edit the .xlf files, a tool like [Poedit](https://poedit.net/) or [Tiny Translator](https://github.com/martinroob/ngx-i18nsupport/tree/master/projects/tiny-translator) can (or should) be used
