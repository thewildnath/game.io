const CONST = require('../shared/constants');

let gameUpdates = [];
let firstLocalTimestamp = 0;
let firstServerTimestamp = 0;

export function initialiseState() {
  gameUpdates = [];
  firstLocalTimestamp = 0;
  firstServerTimestamp = 0;
}

export function processGameUpdate(update) {
  if (!firstServerTimestamp) {
    firstLocalTimestamp = Date.now();
    firstServerTimestamp = update.t;
  }

  gameUpdates.push(update);

  // Keep only one update before the current server time
  const baseUpdateId = getBaseUpdateId();
  if (baseUpdateId > 0) {
    gameUpdates.splice(0, baseUpdateId);
  }
}

// Returns {player, others, bullets}
export function getCurrentState() {
  if (!firstServerTimestamp) {
    return {};
  }

  const serverTime = getServerTime();
  const baseUpdateId = getBaseUpdateId();

  // If other updates are too old, return the last one
  if (baseUpdateId < 0 || baseUpdateId === gameUpdates.length - 1) {
    return gameUpdates[gameUpdates.length - 1];
    // Else interpolate between baseUpdate and nextUpdate
  }
  // TODO: interpolate
  return gameUpdates[baseUpdateId];
}

// Returns the id of the latest update before the current server time,
// or -1 if N/A
function getBaseUpdateId() {
  const serverTime = getServerTime();
  let baseUpdateId = 0;

  while (baseUpdateId < gameUpdates.length
            && gameUpdates[baseUpdateId].t <= serverTime) {
    ++baseUpdateId;
  }

  return baseUpdateId - 1;
}

function getServerTime() {
  return firstServerTimestamp + (Date.now() - firstLocalTimestamp) - CONST.RENDER_DELAY;
}
