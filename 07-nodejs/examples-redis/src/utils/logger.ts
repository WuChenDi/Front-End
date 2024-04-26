/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-console */

const getTimestamp = () => {
  return new Date().toLocaleString() + '.' + new Date().getMilliseconds()
}

const logWithTimestamp = (message?: any, ...optionalParams: any[]) => {
  console.log(`[${getTimestamp()}]`, message, ...optionalParams)
}

const infoWithTimestamp = (message?: any, ...optionalParams: any[]) => {
  console.info(`[${getTimestamp()}]`, message, ...optionalParams)
}

const warnWithTimestamp = (message?: any, ...optionalParams: any[]) => {
  console.warn(`[${getTimestamp()}]`, message, ...optionalParams)
}

const errorWithTimestamp = (message?: any, ...optionalParams: any[]) => {
  console.error(`[${getTimestamp()}]`, message, ...optionalParams)
}

const logger = {
  log: logWithTimestamp,
  info: infoWithTimestamp,
  warn: warnWithTimestamp,
  error: errorWithTimestamp,
}

export default logger
