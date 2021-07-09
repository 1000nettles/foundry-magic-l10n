# ALPHA - Foundry Magic L10n 🪄

[![Patreon](img/become_a_patron.png)](https://www.patreon.com/1000nettles)

A CLI tool for interacting with the Foundry Magic Localization service, with a dose of magic.

## What is this, exactly?

This CLI tool allows you, _a module or system developer_, to generate 10 different localization files in the FoundryVTT "language file" format. This utilizes [AWS Translate](https://aws.amazon.com/translate/) - a "fluent and accurate machine translation" engine. It takes your base English translations, and converts them into language files for you to download and include in your own modules and systems.

## Installation

```
$ npm install -g foundry-magic-l10n
```

This will install the tool on your computer globally.

## Running

1. Run `foundry-magic-l10n run <your_manifest_url_here>`. This must be a direct URL to the manifest file itself, and must be publicly accessible on the internet.
2. Your job has now been started! Check up on the processing time of the job by running `foundry-magic-l10n list`. Jobs usually take around 15 - 20 minutes to complete.
3. Once completed, when you run `foundry-magic-l10n list` you should see `COMPLETED` associated to your job, and a `download` URL. Inside the downloaded zip file is a README which explains the next steps.

## Supported Languages

We are currently limited to a specific subset of supported FoundryVTT community translations. We're working to expand this with increasing our AWS Quota limits.

* Arabic (`ar`)
* Chinese (Simplified) (`cn`)
* French (`fr`)
* German (`de`)
* Italian (`it`)
* Japanese (`ja`)
* Korean (`ko`)
* Portuguese (`pt-BR`)
* Russian (`ru`)
* Spanish (`es`)

## Future Supported Languages

Once our quota limits are increased...

* Chinese (Traditional)
* Czech
* Finnish
* Polish
* Swedish

## Known Limitations

* Only **ONE** individual can be running translation jobs at one time. We're aware this is an insane limitation, and we're working on getting the quota limits increased. 🙈 Sorry! You're welcome to try running the `run` command and seeing if the service is currently available for you.
* Injecting dynamic values into translation strings not currently supported. For example "My name is {user}"... "{user}" is parsed by the translator as a word  
* Jobs take 15 - 20 minutes to run - just how AWS Translate's batch processing works, even for smaller amounts of text
* Only a subset of languages (see above)

## FAQ

* What is the "Foundry Magic L10n Service"
   * It's a AWS-powered service to execute the heavy lifting of marshaling the module files, translating them, creating the downloads, etc. This tool interacts with that service.
* Is this a complete replacement for human-translated strings? 
   * Nope - AWS Translate is really good, but there will always be things that a human will translate better than a machine.
* Will this generate files for existing translations / language files I have within my module?
  * No - the service will determine which of the above supported languages you _don't_ have language files for and generate for those.
* I got an error, where do I report it?
   * Please add an issue [here](https://github.com/1000nettles/foundry-magic-l10n/issues). Thanks!
