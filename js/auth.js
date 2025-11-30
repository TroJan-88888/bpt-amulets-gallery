document.addEventListener('DOMContentLoaded', ()=>{
  const loginForm = document.getElementById('login-form');
  const loginBox = document.getElementById('login-box');
  const adminPanel = document.getElementById('admin-panel');
  const logoutBtn = document.getElementById('logout-btn');

  if(!loginForm) return;

  loginForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const user = document.getElementById('login-user').value.trim();
    const pass = document.getElementById('login-pass').value;

    try{
      const res = await fetch('/backend/Code.gs?action=login', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({action:'login', user, pass})
      });
      const data = await res.json();
      if(data.token){
        sessionStorage.setItem('amulets_jwt', data.token);
        loginBox.style.display='none';
        adminPanel.style.display='block';
        loadAdminList();
        alert('ล็อกอินสำเร็จ');
      } else {
        alert('ล็อกอินล้มเหลว');
      }
    }catch(err){
      console.error(err);
      alert('เกิดข้อผิดพลาด');
    }
  });

  if(logoutBtn){
    logoutBtn.addEventListener('click', ()=>{
      sessionStorage.removeItem('amulets_jwt');
      location.reload();
    });
  }
});
