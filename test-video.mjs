import https from 'https';

https.get('https://drive.google.com/uc?export=download&id=1IS9mfxhpCFZBbnWNimJXwH5xtIrGViOV', (res) => {
  console.log(res.statusCode, res.headers['content-type']);
  if (res.statusCode >= 300 && res.statusCode < 400) {
    console.log("Redirect to", res.headers.location);
  }
});
