// Google Apps Script (GAS) - Code.gs
// ใช้เป็น Proxy สำหรับ upload/delete/serve thumbnails
// ต้อง deploy as Web App (Anyone, even anonymous)

// ====== Config ======
const ADMIN_USER = 'admin';
const ADMIN_PASSWORD = 'bpt2024'; // รหัสผ่าน admin
const JWT_SECRET = 'bpt_secret_2025';
const FOLDER_ID = 'YOUR_DRIVE_FOLDER_ID'; // โฟลเดอร์ Google Drive สำหรับเก็บรูป

// ====== Dependencies ======
function doOptions(e) {
  return ContentService.createTextOutput('').setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
}

function doGet(e){ return handleRequest(e); }
function doPost(e){ return handleRequest(e); }

function handleRequest(e){
  const params = e.parameter || {};
  const path = params.path || '';
  const authHeader = (e.headers && e.headers.Authorization) || '';
  const token = authHeader.replace('Bearer ','');
  const method = e.postData ? e.postData.contents : null;
  
  // ====== CORS ======
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setHeader('Access-Control-Allow-Origin','*');
  output.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');
  output.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');

  try{
    // ====== Public: List Albums / Thumbnails ======
    if(path=='albums'){ 
      const folder = DriveApp.getFolderById(FOLDER_ID);
      const files = folder.getFiles();
      const result = [];
      while(files.hasNext()){
        const f = files.next();
        result.push({
          id: f.getId(),
          name: f.getName(),
          url: `https://drive.google.com/uc?export=view&id=${f.getId()}`,
          category: f.getDescription() || 'ไม่ระบุ',
        });
      }
      output.setContent(JSON.stringify({success:true,albums:result}));
      return output;
    }

    // ====== Admin Actions ======
    if(path=='login'){
      const body = JSON.parse(method);
      if(body.user===ADMIN_USER && body.pass===ADMIN_PASSWORD){
        const token = Utilities.base64Encode(JSON.stringify({user:ADMIN_USER,t:Date.now()}));
        output.setContent(JSON.stringify({success:true,token}));
      } else {
        output.setContent(JSON.stringify({success:false,msg:'รหัสผ่านผิด'}));
      }
      return output;
    }

    if(!token){ output.setContent(JSON.stringify({success:false,msg:'ต้องล็อกอิน'})); return output; }

    // ====== Upload ======
    if(path=='upload'){
      const body = JSON.parse(method);
      const content = Utilities.base64Decode(body.data.split(',')[1]);
      const blob = Utilities.newBlob(content, body.mime, body.name);
      const folder = DriveApp.getFolderById(FOLDER_ID);
      const file = folder.createFile(blob);
      file.setDescription(body.category || '');
      output.setContent(JSON.stringify({success:true,id:file.getId(),url:`https://drive.google.com/uc?export=view&id=${file.getId()}`}));
      return output;
    }

    // ====== Delete ======
    if(path=='delete'){
      const body = JSON.parse(method);
      const fileId = body.id;
      DriveApp.getFileById(fileId).setTrashed(true);
      output.setContent(JSON.stringify({success:true}));
      return output;
    }

    output.setContent(JSON.stringify({success:false,msg:'ไม่พบ endpoint'}));
    return output;

  } catch(err){
    output.setContent(JSON.stringify({success:false,msg:err.toString()}));
    return output;
  }
}
