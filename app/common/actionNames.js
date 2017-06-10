import resources from 'postman_sync/app/resources/actionNames';
import sessions from 'postman_sync/app/sessions/actionNames';
import login from 'postman_sync/app/containers/login/actionNames';
import collections from 'postman_sync/app/containers/collections/actionNames';
import details from 'postman_sync/app/containers/details/actionNames';

const Symbol = require('es6-symbol');

const symbols = [
  ...resources,
  ...sessions,
  ...login,
  ...collections,
  ...details,
].reduce((acc, eventName) => ({
  ...acc,
  [`${eventName}`]: acc[eventName] ? duplicateEventNameError(eventName) : Symbol.for(`${eventName}`)
}), {});

function duplicateEventNameError (eventName) {
  throw new Error(`Event ${eventName} already exists`);
}

export default symbols;

