(function config() {
  import('./index.js').then(({default: dotenv}) => {
    let results = dotenv.config();
    return results;
  })
})()