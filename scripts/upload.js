const fs = require(`fs`)

const {
  spawn,
} = require(`child_process`)

const inquirer = require(`inquirer`)

const run = async () => {
  console.log(`This will upload the latest build of UCL Assistant to the Play or App Store (but will not automatically release the uploaded build)`)

  const questions = [{
    type: `list`,
    name: `store`,
    message: `Upload to which store?`,
    choices: [{
      name: `App Store (iOS)`,
      value: `ios`,
    }, {
      name: `Play Store (Google Play)`,
      value: `android`,
    }],
  },
    /* {
       type: `list`,
       name: `action`,
       message: `Upload which binary?`,
       choices: [{
         name: `Upload the latest build`,
         value: `latest`,
       },
       {
         name: `Upload a local build`,
         value: `local`,
       },
       ],
       when: ({
         store,
       }) => store === `android`,
     } */
  ]

  const {
    store,
  } = await inquirer.prompt(questions)

  let expoArgs

  if (store === `android`) {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    if (!fs.existsSync(`android.json`)) {
      return console.error(`android.json missing in project root`)
    }
    expoArgs = `--key android.json`
  }
  if (store === `ios`) {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    if (!fs.existsSync(`ios.json`)) {
      return console.error(`ios.json missing in project root`)
    }

    const {
      username,
      password,
    } = JSON.parse(fs.readFileSync(`ios.json`)) // eslint-disable-line security/detect-non-literal-fs-filename
    expoArgs = `--apple-id ${username} --apple-id-password ${password}`
  }

  const expoCommand = `expo upload:${store} ${expoArgs}`

  const confirmationQuestion = [{
    type: `confirm`,
    // eslint-disable-next-line no-secrets/no-secrets
    name: `uploadCommandCorrect`,
    message: `The following command will now be run: ${expoCommand}`,
    default: false,
  }]

  const {
    uploadCommandCorrect,
  } = await inquirer.prompt(confirmationQuestion)

  if (!uploadCommandCorrect) {
    return console.error(`Wrong command => stopped`)
  }

  const [command, ...args] = expoCommand.split(` `)
  return spawn(command, args, {
    stdio: `inherit`,
  })
}

run()
