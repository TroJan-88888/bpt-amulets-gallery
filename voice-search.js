// ================== เสียงพูด ==================
function speak(text) {
  window.speechSynthesis.cancel();
  const s = new SpeechSynthesisUtterance(text);
  s.lang = "th-TH";
  s.rate = 0.95;
  window.speechSynthesis.speak(s);
}

// ================== ค้นหาด้วยเสียง ==================
function startVoiceSearch() {
  if (!("webkitSpeechRecognition" in window)) {
    alert("เบราว์เซอร์ไม่รองรับการค้นหาด้วยเสียง");
    return;
  }

  const rec = new webkitSpeechRecognition();
  rec.lang = "th-TH";
  rec.interimResults = false;
  rec.continuous = false;

  rec.onresult = (e) => {
    const text = e.results[0][0].transcript.trim();
    searchAmulet(text);
  };

  rec.start();
}

// ================== AI ค้นหาพระ ==================
function searchAmulet(text) {
  for (let group of amuletDB) {
    for (let key of group.keywords) {
      if (text.includes(key)) {
        speak(`พบ ${key} อยู่ใน${group.album} กำลังเปิดให้ครับ`);
        setTimeout(() => {
          window.location.href = group.link;
        }, 2600);
        return;
      }
    }
  }
  speak("ยังไม่ได้เพิ่มครับเจ้านาย");
}
