# ALPHA - Foundry Magic L10n 🪄

[![Patreon](img/become_a_patron.png)](https://www.patreon.com/1000nettles)

A CLI tool for interacting with the Foundry Magic Localization service, with a dose of magic.

## What is this, exactly?

This CLI tool allows you, _a module or system developer_, to generate 15 different localization files in the FoundryVTT "language file" format. This utilizes [AWS Translate](https://aws.amazon.com/translate/) - a "fluent and accurate machine translation" engine. It takes your base English translations, and converts them into language files for you to download and include in your own modules and systems.



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

We currently support all of the [community-provided core translations](https://foundryvtt.wiki/en/languages).

* Arabic (`ar`)
* Catalan (`ca`)
* Czech (`cs`)
* Chinese (Simplified) (`cn`)
* Chinese (Traditional) (`zh-TW`)
* French (`fr`)
* German (`de`)
* Italian (`it`)
* Japanese (`ja`)
* Korean (`ko`)
* Polish (`pl`)
* Portuguese (`pt-BR`)
* Russian (`ru`)
* Spanish (`es`)
* Swedish (`sv`)

## Known Limitations

* Only **ONE** individual can be running translation jobs at one time. We're aware this is an insane limitation, and we're working on getting the quota limits increased. 🙈 Sorry! You're welcome to try running the `run` command and seeing if the service is currently available for you.
* Jobs take 15 - 20 minutes to run - just how AWS Translate's batch processing works, even for smaller amounts of text

## FAQ

* What is the "Foundry Magic L10n Service"?
   * Also built by myself, it's a AWS-powered service to execute the heavy lifting of marshaling the module files, translating them, creating the downloads, etc. This tool interacts with that service,
* Is this a complete replacement for human-translated strings? 
   * Nope - AWS Translate is really good, but there will always be things that a human will translate better than a machine.
* How "good" are the translations? Can I trust them to make sense to native speakers?
   * AWS Translate is already used by a lot of larger companies for translation generation today. It's my thinking that with this service, even if a translation isn't 100% perfect, we should be able to get really close to it. Check out the [AWS Translate Customer Testimonials](https://aws.amazon.com/translate/customers/) and [this article diving into the service](https://medium.com/swlh/how-good-is-amazon-translate-8e9f08b41789).
* Will this generate files for existing translations / language files I have within my module?
  * Yes it will - it will generate all the supported languages. If you have existing translations, this tool will only generate new translations based off any missing translations from your English language file. All language files are generated as `[language]-magicl10n.json` to be able to easily separate which are machine-translated and which are human-translated.
* I got an error or found a bug, where do I report it?
   * Please add an issue [here](https://github.com/1000nettles/foundry-magic-l10n/issues). Thanks!
