// ดึงข้อมูล amulets จาก GAS
async function fetchAmulets(){
  const res = await fetch('<GAS_WEBAPP_URL>?action=amulets');
  const data = await res.json();
  return data;
}

// สร้าง filter หมวดหมู่และเนื้อ
function populateFilters(items){
  const typeSet = new Set(items.map(i=>i.type));
  const materialSet = new Set(items.map(i=>i.material));

  const typeSel = document.getElementById('filter-type');
  const matSel = document.getElementById('filter-material');

  typeSet.forEach(t=>{
    const o=document.createElement('option'); o.value=t; o.textContent=t; typeSel.appendChild(o);
  });
  materialSet.forEach(m=>{
    const o=document.createElement('option'); o.value=m; o.textContent=m; matSel.appendChild(o);
  });
}
