# secretenv
Really simple wrapper around dotenv which allows encrypted bundled environment variable sets to be loaded into the environment.

```
Normal .env file loading into `process.env` occurs
If `SECRETENV_KEY` is set (in environment, or .env), then:
  If `SECRETENV_VALUE` is set, then:
    `SECRETENV_VALUE` is decrypted using `SECRETENV_KEY` and the JSON contents destructured on top of `process.env`
  else If `SECRETENV_VALUE` is not set, then:
    the parsed contents of the .env file are dumped into a JSON structure and encrypted using `SECRETENV_KEY` then output to the console in a format that can be used to set a single `SECRETENV_VALUE` environment variable.
```

## Usage
