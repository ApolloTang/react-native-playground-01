import resources from 'playground01/app/resources/actionNames';
import sessions from 'playground01/app/sessions/actionNames';
import login from 'playground01/app/containers/login/actionNames';
import collections from 'playground01/app/containers/collections/actionNames';
import details from 'playground01/app/containers/details/actionNames';

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

