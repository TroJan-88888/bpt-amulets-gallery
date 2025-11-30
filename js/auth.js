document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;

  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;

    try {
      const res = await fetch('<GAS_WEBAPP_URL>', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', user, pass })
      });

      const data = await res.json();
      if (data.token) {
        sessionStorage.setItem('amulets_jwt', data.token);
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
        loadAdminList();
      } else {
        document.getElementById('login-msg').textContent = 'ล็อกอินล้มเหลว';
      }
    } catch (err) {
      console.error(err);
      alert('เกิดข้อผิดพลาดระหว่างล็อกอิน');
    }
  });

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('amulets_jwt');
    location.reload();
  });
});
