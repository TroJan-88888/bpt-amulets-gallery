const ALBUMS = [
  {"name": "เชียงใหม่", "url": "https://photos.google.com/album/AF1QipNikZnyPDpsuIh56ncLi4B72AQA1nQIQd_644MW"},
  {"name": "หลวงปู่ทวดวัดช้างให้", "url": "https://photos.google.com/album/AF1QipOILbe6R2qZrL020jEJtaCEcAQZeb9VQLIXEK5j"},
  {"name": "พระปรุหนังหลวงพ่อเนียม", "url": "https://mega.nz/folder/bK4yjIaA#iLp1GuhiwRVVpPshQ1YpXQ"},
  {"name": "พระปิดตาหลวงพ่อเนียม", "url": "https://mega.nz/folder/aTp1VYZC#N3tGa1QYQO7YDpLXTtGnAQ"}
];

function fetchAlbumThumbnails(){
  return ALBUMS.map(a=>({
    name: a.name,
    thumbnail: getThumbnailUrl(a.url),
    link: a.url
  }));
}

function getThumbnailUrl(url){
  if(url.includes('photos.google.com')) return 'https://via.placeholder.com/300x200?text=Photo';
  if(url.includes('mega.nz')) return 'https://via.placeholder.com/300x200?text=MEGA';
  return 'https://via.placeholder.com/300x200';
}
