function doGet(e){
  const action = e.parameter.action;
  if(action==='albums'){
    const albums = [
      {"name":"เชียงใหม่","url":"https://photos.google.com/album/AF1QipNikZnyPDpsuIh56ncLi4B72AQA1nQIQd_644MW"},
      {"name":"พระปรุหนังหลวงพ่อเนียม","url":"https://mega.nz/folder/bK4yjIaA#iLp1GuhiwRVVpPshQ1YpXQ"}
    ];
    const out = albums.map(a=>({
      name:a.name,
      thumbnail:getThumb(a.url),
      link:a.url
    }));
    return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput('Ready');
}

function getThumb(url){
  if(url.includes('photos.google.com')) return 'https://via.placeholder.com/300x200?text=Photo';
  if(url.includes('mega.nz')) return 'https://via.placeholder.com/300x200?text=MEGA';
  return 'https://via.placeholder.com/300x200';
}
