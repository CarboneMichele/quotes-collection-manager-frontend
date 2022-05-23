// Plugins enable you to tap into, modify, or extend the internal behavior of Cypress
// For more info, visit https://on.cypress.io/plugins-api
const admin = require('firebase-admin');
import { plugin as cypressFirebasePlugin } from 'cypress-firebase';

module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions): any => {
    const extendedConfig = cypressFirebasePlugin(on, config, admin);
    return extendedConfig;
};
