async function renderGallery(){
  const items = await fetchAmulets();
  populateFilters(items);

  const gallery = document.getElementById('gallery');
  gallery.innerHTML='';

  const filterType = document.getElementById('filter-type');
  const filterMaterial = document.getElementById('filter-material');
  const searchInput = document.getElementById('search-input');

  function filterItems(){
    const type = filterType.value;
    const mat = filterMaterial.value;
    const keyword = searchInput.value.toLowerCase();
    gallery.innerHTML='';

    items.filter(i=>{
      return (type==='all'||i.type===type)
          && (mat==='all'||i.material===mat)
          && (i.title.toLowerCase().includes(keyword)||i.description.toLowerCase().includes(keyword));
    }).forEach(i=>{
      const card = document.createElement('div'); card.className='card';
      card.innerHTML=`<img src="${i.image}" alt="${i.title}"><h3>${i.title}</h3><p>${i.description}</p>`;
      gallery.appendChild(card);
    });
  }

  filterType.addEventListener('change',filterItems);
  filterMaterial.addEventListener('change',filterItems);
  searchInput.addEventListener('input',filterItems);

  filterItems();
}

document.addEventListener('DOMContentLoaded',renderGallery);
