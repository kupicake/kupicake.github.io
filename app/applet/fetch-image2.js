async function get() {
  const res = await fetch('https://freeimage.host/i/Cf5qvYN');
  const text = await res.text();
  const match = text.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
  if (match) console.log(match[1]);
  else console.log('no match', text.substring(0, 200));
}
get();
