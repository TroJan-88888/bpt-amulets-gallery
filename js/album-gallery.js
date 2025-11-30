document.addEventListener('DOMContentLoaded', ()=>{
  const gallery = document.getElementById('gallery');
  const searchInput = document.getElementById('search-input');

  let albums = fetchAlbumThumbnails();

  function render(items){
    gallery.innerHTML='';
    items.forEach(a=>{
      const div = document.createElement('div');
      div.className='card';
      div.innerHTML=`
        <a href="${a.link}" target="_blank">
          <img src="${a.thumbnail}" alt="${a.name}">
          <h3>${a.name}</h3>
        </a>
      `;
      gallery.appendChild(div);
    });
  }

  render(albums);

  searchInput.addEventListener('input', ()=>{
    const val = searchInput.value.toLowerCase();
    render(albums.filter(a=>a.name.toLowerCase().includes(val)));
  });
});
