# TLA Dashboard Frontend

This project is based on Angular and is created with the Angular CLI. We try to be up to date with the current angular releases

## Architecture

The project aims to be modularized and uses NGRX store to keep state.

## Setting up and running the project

First, run

```bash
npm install
```

If you do not have the Angular CLI already installed, also

```bash
npm install -g @angular/cli
```

To launch the application using the angular CLI:

```bash
ng serve
```

Then, navigate to 'localhost:4200' to open the dashboard

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Testing with ssl

To test aspects of the app involving https (e.g. PWA functionality), follow the advice here https://medium.com/@rubenvermeulen/running-angular-cli-over-https-with-a-trusted-certificate-4a0d5f92747a store the key/cert somewhere (e.g. directory "ssl_test"), and run

#i18n


Using this method https://github.com/martinroob/ngx-i18nsupport/wiki/Tutorial-for-using-xliffmerge-with-angular-cli for i18n

As a tool to edit the .xlf files, i use poedit 

```bash
http-server build --ssl --cert ssl_test/server.crt --key ssl_test/server.key
```
