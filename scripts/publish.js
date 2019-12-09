const {
  spawn,
} = require(`child_process`)

const inquirer = require(`inquirer`)
const Expo = require(`./expo`)

const run = async () => {
  console.log(`This will publish the current version of UCL Assistant over-the-air via Expo to all eligible devices`)

  const {
    channel: lastChannel,
    version: lastVersion,
    publishedTime: lastPublishedTime,
  } = await Expo.getLastPublishVersion()

  console.log(`Last published to release channel ${lastChannel} at ${lastPublishedTime}`)

  const questions = [{
    type: `list`,
    name: `environment`,
    message: `Publish in which environment?`,
    choices: [`development`, `staging`, `production`],
    default: `production`,
  }, {
    type: `input`,
    name: `version`,
    message: `Publish to which version?`,
    default: lastVersion,
  }]

  const {
    environment,
    version,
  } = await inquirer.prompt(questions)

  const expoCommand = `node node_modules/expo/bin/cli.js publish --release-channel=${environment}-${version}`

  const confirmationQuestion = [{
    type: `confirm`,
    // eslint-disable-next-line no-secrets/no-secrets
    name: `publishCommandCorrect`,
    message: `The following command will now be run: ${expoCommand}`,
    default: false,
  }]

  const {
    publishCommandCorrect,
  } = await inquirer.prompt(confirmationQuestion)

  if (!publishCommandCorrect) {
    return console.error(`Wrong command => stopped`)
  }

  const [command, ...args] = expoCommand.split(` `)
  return spawn(command, args, {
    stdio: `inherit`,
  })
}

run()
