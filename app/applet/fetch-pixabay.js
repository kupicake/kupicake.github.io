async function get() {
  try {
  const res = await fetch('https://pixabay.com/vectors/dragonfly-abstract-art-design-10302152/');
  const text = await res.text();
  const match = text.match(/<meta\\s+property="og:image"\\s+content="([^"]+)"/i);
  if (match) console.log(match[1]);
  else console.log('no match', text.substring(0, 500));
  } catch(e) { console.error(e) }
}
get();
