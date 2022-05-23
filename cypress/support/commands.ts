// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import { attachCustomCommands } from 'cypress-firebase';

const fbConfig = {
    projectId: 'quotes-collection-manager',
    appId: '1:953752700344:web:b1c665ed69266f8bb2bb4d',
    storageBucket: 'quotes-collection-manager.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyBfmbuqoNIJ5umpXlsGvhpkrtCiC_qh5Y8',
    authDomain: 'quotes-collection-manager.firebaseapp.com',
    messagingSenderId: '953752700344',
    measurementId: 'G-62GB5RYGKY',
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
