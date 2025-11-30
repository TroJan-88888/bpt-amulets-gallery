function readFileAsDataURL(file){
  return new Promise((res,rej)=>{
    const r = new FileReader();
    r.onload=()=>res(r.result);
    r.onerror=rej;
    r.readAsDataURL(file);
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  const form = document.getElementById('upload-form');
  if(!form) return;
  form.addEventListener('submit', async e=>{
    e.preventDefault();
    const file=document.getElementById('file-input').files[0];
    const title=document.getElementById('img-title').value;
    const type=document.getElementById('img-type').value;
    const material=document.getElementById('img-material').value;
    const desc=document.getElementById('img-desc').value;
    if(!file){ alert('กรุณาเลือกไฟล์'); return; }
    const dataUrl = await readFileAsDataURL(file);

    const token=sessionStorage.getItem('amulets_jwt');
    const res = await fetch('<GAS_WEBAPP_URL>',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({action:'upload',title,type,material,desc,dataUrl,token})
    });
    const data = await res.json();
    if(data.ok){ alert('อัปโหลดสำเร็จ'); loadAdminList(); } 
    else alert('ล้มเหลว');
  });
});

// Load Admin list
async function loadAdminList(){
  const gallery = document.getElementById('admin-list');
  gallery.innerHTML='';
  const items = await fetch('<GAS_WEBAPP_URL>?action=amulets').then(r=>r.json());
  items.forEach(i=>{
    const card=document.createElement('div'); card.className='card';
    card.innerHTML=`<img src="${i.image}" alt="${i.title}"><h3>${i.title}</h3>
    <p>${i.description}</p>
    <button onclick="deleteItem(${i.id})">ลบ</button>`;
    gallery.appendChild(card);
  });
}

async function deleteItem(id){
  if(!confirm('ลบรายการนี้?')) return;
  const token=sessionStorage.getItem('amulets_jwt');
  const res = await fetch('<GAS_WEBAPP_URL>',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({action:'delete',id,token})
  });
  const data = await res.json();
  if(data.ok){ loadAdminList(); } else { alert('ล้มเหลว'); }
}
