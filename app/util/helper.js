import _ from 'lodash';

const array_to_IndexObj = (resources_arrays) => {
  const out = _(resources_arrays).reduce( (acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
  return out;
};


const cheapLogger = function cheapLogger( action, state_prev, state_next, note ) {
  console.log(`vvvvvvvvvvvvvvvvvvvvvvvvvvv`)
  console.log(`Log from: ${note}`)
  console.log('prev state: ', state_prev)
  console.log('action: ', action)
  console.log('next state: ', state_next)
  console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^')
}

export {
  array_to_IndexObj,
  cheapLogger
};
