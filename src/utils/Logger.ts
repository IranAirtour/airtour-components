import { stringify } from './StringUtils';

const environmentsIsDev = __DEV__;
// const environmentsIsDev = true;
const chalk = environmentsIsDev ? require('chalk') : null;

const ctx = environmentsIsDev ? new chalk.Instance({ level: 3 }) : null;
export function escapeError(e: Error | string, convertToJson: boolean = true) {
  let err = ' escapeError ';
  // return err
  try {
    err = (convertToJson ? stringify(e) : e) as string;
  } catch (er) {
    console.debug('log:: escapeError');
  }
  return err;
}
export function logError(e: any, label: string = '', convertToJson: boolean = true) {
  if (!environmentsIsDev) {
    return;
  }
  console.debug(
    ctx?.red?.('log:: =>' + label + ' : ' + escapeError(e, convertToJson)),
  );
}

export function logWarn(e: any, label = '', convertToJson = true) {
  if (!environmentsIsDev) {
    return;
  }
  console.debug(
    ctx?.yellow?.(
      'log:: warn =>' + label + ' : ' + escapeError(e, convertToJson),
    ),
  );
}

export function logDebug(e: any, label = '', convertToJson = true) {
  if (!environmentsIsDev) {
    return;
  }
  console.debug(
    ctx?.blue?.(
      'log:: warn =>' + label + ' : ' + escapeError(e, convertToJson),
    ),
  );
}
