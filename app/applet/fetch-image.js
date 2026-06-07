import https from 'https';

https.get('https://freeimage.host/i/Cf5qvYN', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
    if (match) console.log(match[1]);
    else console.log('no match', data.substring(0, 500));
  });
});
