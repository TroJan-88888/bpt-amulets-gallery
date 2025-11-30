// albums.js - fetch อัลบั้ม + thumbnail อัตโนมัติ
const API_BASE = '<REPLACE_WITH_YOUR_GAS_WEBAPP_URL>';

async function fetchAlbums(){
  try{
    const res = await fetch(`${API_BASE}?action=list_albums`);
    const data = await res.json();
    return data; // [{name,url,thumbnails:[]}, ...]
  }catch(err){
    console.error(err);
    return [];
  }
}

window.albumsData = fetchAlbums();
