const {
  exec,
} = require(`child_process`)

const executeCommandWithOutput = (command) => new Promise((resolve, reject) => {
  exec(command, (error, stdout) => {
    if (error) {
      return reject(error)
    }
    // ignore stderr because log lines go there
    return resolve(stdout)
  })
})

const getPublishHistory = async () => {
  let jsonResult
  try {
    jsonResult = JSON.parse(await executeCommandWithOutput(`expo publish:history --raw`))
  } catch (error) {
    throw error
  }
  return jsonResult
}

const getLastPublishVersion = async () => {
  let publishHistory
  try {
    publishHistory = await getPublishHistory()
  } catch (error) {
    throw error
  }
  const {
    channel,
    publishedTime,
  } = publishHistory.queryResult[0]

  // assume channel always conforms to environment-version format
  const [environment, version] = channel.split(`-`)

  return {
    channel,
    environment,
    version,
    publishedTime,
  }
}

module.exports = {
  getPublishHistory,
  getLastPublishVersion,
}