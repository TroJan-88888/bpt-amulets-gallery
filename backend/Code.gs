/*
Code.gs - GAS proxy สำหรับดึง thumbnail
*/

const PROP = PropertiesService.getScriptProperties();

// ตัวอย่าง: list อัลบั้ม
function doGet(e){
  const action = e.parameter.action;
  if(action==='list_albums'){
    return ContentService.createTextOutput(JSON.stringify(getAlbums())).setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput('ok');
}

// ฟังก์ชันตัวอย่าง: ดึง thumbnail จาก Google Photos / MEGA
function getAlbums(){
  // NOTE: ต้องเชื่อม API ของ Google Photos หรือ MEGA ใน production
  return [
    {
      name:"เชียงใหม่",
      url:"https://photos.google.com/album/AF1QipNikZnyPDpsuIh56ncLi4B72AQA1nQIQd_644MW",
      thumbnails:["https://via.placeholder.com/300x200?text=ChiangMai1","https://via.placeholder.com/300x200?text=ChiangMai2"]
    },
    {
      name:"หลวงปู่ทวดวัดช้างให้",
      url:"https://photos.google.com/album/AF1QipOILbe6R2qZrL020jEJtaCEcAQZeb9VQLIXEK5j",
      thumbnails:["https://via.placeholder.com/300x200?text=LuangPu1","https://via.placeholder.com/300x200?text=LuangPu2"]
    },
    {
      name:"พระปรุหนังหลวงพ่อเนียม",
      url:"https://mega.nz/folder/bK4yjIaA#iLp1GuhiwRVVpPshQ1YpXQ",
      thumbnails:["https://via.placeholder.com/300x200?text=Mega1","https://via.placeholder.com/300x200?text=Mega2"]
    }
  ];
}
