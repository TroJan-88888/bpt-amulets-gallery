function validateImage(file){
  if(!file) return 'no_file';
  if(!file.type.startsWith('image/')) return 'not_image';
  if(file.size>5*1024*1024) return 'too_large';
  return null;
}

async function readFile(file){
  return await new Promise((resolve,reject)=>{
    const reader = new FileReader();
    reader.onload = ()=>resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function loadAdminList(){
  const token = sessionStorage.getItem('amulets_jwt');
  if(!token) return;
  const listEl = document.getElementById('admin-list');
  listEl.innerHTML = '';
  try{
    const res = await fetch('/backend/Code.gs?action=amulets',{
      headers:{Authorization:'Bearer '+token}
    });
    const items = await res.json();
    items.forEach(it=>{
      const div = document.createElement('div');
      div.className='card';
      div.innerHTML=`
        <img src="${it.image}" alt="${it.title}">
        <h3>${it.title}</h3>
        <p>${it.description||''}</p>
        <button data-id="${it.id}" class="del-btn">ลบ</button>
      `;
      listEl.appendChild(div);
    });
    document.querySelectorAll('.del-btn').forEach(btn=>{
      btn.addEventListener('click', async (e)=>{
        if(!confirm('ลบรูปนี้จริงหรือ?')) return;
        const id = e.target.dataset.id;
        try{
          await fetch('/backend/Code.gs?action=delete',{
            method:'POST',
            headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
            body: JSON.stringify({action:'delete', id})
          });
          loadAdminList();
        }catch(err){ console.error(err); alert('ลบไม่สำเร็จ'); }
      });
    });
  }catch(err){ console.error(err); }
}

document.addEventListener('DOMContentLoaded', ()=>{
  const uploadForm = document.getElementById('upload-form');
  if(!uploadForm) return;
  uploadForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const token = sessionStorage.getItem('amulets_jwt');
    const file = document.getElementById('file-input').files[0];
    const title = document.getElementById('img-title').value.trim();
    const category = document.getElementById('img-category').value;
    const material = document.getElementById('img-material').value;
    const desc = document.getElementById('img-desc').value.trim();

    const v = validateImage(file);
    if(v){
      alert({no_file:'กรุณาเลือกไฟล์',not_image:'ไฟล์ต้องเป็นรูปภาพ',too_large:'ไฟล์เกิน 5MB'}[v]);
      return;
    }

    const dataUrl = await readFile(file);

    try{
      const res = await fetch('/backend/Code.gs?action=upload',{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
        body: JSON.stringify({action:'upload', title, category, material, desc, dataUrl})
      });
      const data = await res.json();
      if(data.ok){
        alert('อัปโหลดสำเร็จ');
        uploadForm.reset();
        loadAdminList();
      }else alert('อัปโหลดไม่สำเร็จ');
    }catch(err){ console.error(err); alert('เกิดข้อผิดพลาด'); }
  });

  const refreshBtn = document.getElementById('refresh-list');
  if(refreshBtn) refreshBtn.addEventListener('click', loadAdminList);
});
