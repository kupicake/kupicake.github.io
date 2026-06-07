(async () => {
  try {
     const url = 'https://cdn.pixabay.com/photo/2024/11/24/09/25/dragonfly-10302152_1280.png';
     const r = await fetch(url, {method: 'HEAD'});
     console.log(url, r.status);
  } catch(e) {}
})();
