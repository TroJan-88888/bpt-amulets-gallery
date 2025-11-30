// album-gallery.js
async function renderGallery(){
  const gallery = document.getElementById('gallery');
  const albums = await window.albumsData;
  gallery.innerHTML = '';
  albums.forEach(album=>{
    const card = document.createElement('div');
    card.className = 'card';
    const imgsHtml = album.thumbnails.map(src=>`<img src="${src}" alt="${album.name}">`).join('');
    card.innerHTML = imgsHtml + `<h3>${album.name}</h3><p><a href="${album.url}" target="_blank" style="color:gold;text-decoration:none;">เข้าชมอัลบั้ม</a></p>`;
    gallery.appendChild(card);
  });
}

window.addEventListener('DOMContentLoaded', renderGallery);
