const events = {};

function getIdGenerator() {
  let lastId = 0;

  return function getNextUniqueId() {
    lastId += 1;
    return lastId;
  };
}

const getNextUniqueId = getIdGenerator();

function on(eventType, callback) {
  const id = getNextUniqueId();

  if (!events[eventType]) events[eventType] = {};

  events[eventType][id] = callback;

  return {
    off(): void {
      delete events[eventType][id];
      if (Object.keys(events[eventType]).length === 0) delete events[eventType];
    },
  };
}
function dispatch(eventType, arg) {
  if (!events[eventType]) return;

  Object.keys(events[eventType]).forEach((key) => events[eventType][key](arg));
}

export const EventBus = {
  on,
  dispatch,
};
