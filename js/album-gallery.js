// album-gallery.js
function renderGallery(items){
  const gallery = document.getElementById('albums-gallery');
  gallery.innerHTML = '';
  items.forEach(it=>{
    const card = document.createElement('div');
    card.className='card';
    card.innerHTML = `<h3>${escapeHtml(it.name)}</h3>
      <a href="${it.url}" target="_blank">
        <img src="https://via.placeholder.com/300x200?text=${encodeURIComponent(it.name)}" alt="${escapeHtml(it.name)}">
      </a>`;
    gallery.appendChild(card);
  });
}

function escapeHtml(s){ return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'" :'&#39;'})[c]); }

function filterGallery(){
  const category = document.getElementById('filter-category').value;
  const material = document.getElementById('filter-material').value;
  const search = document.getElementById('search-input').value.toLowerCase();
  const filtered = ALBUMS.filter(a=>{
    const matchSearch = a.name.toLowerCase().includes(search);
    // category/material match placeholder (คุณสามารถ map จริงจาก backend)
    return matchSearch;
  });
  renderGallery(filtered);
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderGallery(getAlbums());
  document.getElementById('search-input').addEventListener('input', filterGallery);
  document.getElementById('filter-category').addEventListener('change', filterGallery);
  document.getElementById('filter-material').addEventListener('change', filterGallery);
});
