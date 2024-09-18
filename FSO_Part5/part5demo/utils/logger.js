const info = (...params) => {
  if (process.env.NODE_ENV !== 'test'){
    console.log(...params)
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test'){
    console.log(...params)
  }
}

/**
 * extracting informaiton and error loggin into is own module is useful if we want to
 * to strart writings logs to files or sending them to external logging services like
 * graylog or papertrail
 */

module.exports = {
  info, error
}