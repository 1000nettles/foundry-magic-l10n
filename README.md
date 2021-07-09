# BETA - Foundry Magic L10n 🪄

A CLI tool for interacting with the Foundry Magic Localization service, with a dose of magic.

## What is this, exactly?

This CLI tool allows you, a module or system developer, to generate 15 different localization files in the FoundryVTT "language file" format. This utilizes [AWS Translate](https://aws.amazon.com/translate/) - a "fluent and accurate machine translation" engine. It takes your base English translations, and converts them into language files for you to download and include in your own modules and systems.

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

We support all the languages which have existing FoundryVTT community translation support:

* Arabic
* Chinese (Simplified)
* Chinese (Traditional)
* Czech
* English
* Finnish
* French
* German
* Italian
* Japanese
* Korean
* Polish
* Portuguese
* Russian
* Spanish
* Swedish

## FAQ

* Is this a complete replacement for human-translated strings? 
   * Nope - AWS Translate is really good, but there will always be things that a human will translate better than a machine.
* I got an error, where do I report it?
   * Please add an issue [here](https://github.com/1000nettles/foundry-magic-l10n/issues). Thanks!
