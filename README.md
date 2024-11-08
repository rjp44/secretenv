# secretenv

Minimal, simple wrapper around dotenv which allows encrypted bundled environment variable sets to be loaded into the environment.

Collapses all the variables from .env into a single pair of variables called `SECRETENV_BUNDLE` and `SECRETENV_KEY`.

## Overview and Health Warning

The primary goal for this repo is to manage the proliferation of environment variables when using lots of external APIs in primative environments in a way that is code compatible with the dotenv interface so that it can be used as a drop in replacement. 
Basically I want to use this to pay my cloud provider less for secret storage, and reduce my management overhead in projects where I have 20+ config and API keys that are all needed to build and run containers.

The package name is `dotenv` so that it can be used in a project which already uses `dotenv` as a dependency, and it uses the real `dotenv` as a passthrough dependency. 

All of this is pretty hacky and almost certainly a bad idea. In fact, managing valuable secrets using hacky crypto code written by strangers is in general cordless bungee jumping into the abyss of bad ideas and I would strongly discourage anyone who is not me from using this repo.

Alternatives like:

* [dotenvx](https://github.com/jfromaniello/dotenvx)
*  Kubernetes secrets
*  Proprietary cloud secrets managers
*  etc etc

..are all way better (but possibly more expensive) alternatives for almost all use cases.

Notwithstanding the above warning, someone who is not me may end up maintaining code which uses this repo so...

## Usage

 Remove `dotenv` from your project and add this repo.
 
 ```bash
 yarn add https://github.com/rjp44/secretenv
 ```

 Create a new random secret key phrase in the environment variable `SECRETENV_KEY`. I use something like:
 
 ```bash
  export SECRETENV_KEY=`openssl rand -base64 36`
```
 
 Create a new encrypted single bundle in the environment variable `SECRETENV_BUNDLE`:

 ```bash
 export `npx secretenv -e`
 ```

 This will load the current `.env` file and encrypt it using the key phrase in `SECRETENV_KEY` and output the result to `SECRETENV_BUNDLE` environment variable.

 Alternatively if you wish to produce a bundle from a different file, you can specify the file name as the first argument to `secretenv`, which will then pass it as the `path` property to the underlying `dotenv` library `config()` initialization method and produce a bundle from that file instead.

 ```bash
 export `npx secretenv -p .env.production -e`
 ```
Congratulation, you now have a secret bundle! You can transport secrets around your project by setting the `SECRETENV_BUNDLE` and `SECRETENV_KEY` environment variables via, for example, proprietary cloud secrets managers.

Individual environment variables can be decrypted by setting the `SECRETENV_KEY` environment variable and then running `secretenv -r KEY_NAME` which will decrypt the bundle and output the variable contents to stdout.

For extra points, set the `SECRETENV_BUNDLE` and `SECRETENV_KEY` environment variables via different storage mechanisms. This **may** improve security as access to both are needed to rehydrate your container environment. That is unless I'm an idiot and have written the crypto code badly see [above](#overview-and-health-warning).
