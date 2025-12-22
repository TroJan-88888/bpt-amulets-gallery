// ================== เริ่มค้นหาด้วยเสียง ==================
function startVoiceSearch() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("เบราว์เซอร์ไม่รองรับการค้นหาด้วยเสียง");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "th-TH";
  recognition.interimResults = false;
  recognition.continuous = false;

  recognition.onresult = function (event) {
    const spoken = event.results[0][0].transcript.trim();
    searchAmulet(spoken);
  };

  recognition.start();
}

// ================== AI ค้นหาพระ ==================
function searchAmulet(keyword) {
  let found = false;

  for (let name in amuletDB) {
    if (keyword.includes(name)) {
      speak(`พบ ${name} อยู่ใน ${amuletDB[name].album}`);
      found = true;
      break;
    }
  }

  if (!found) {
    speak("ยังไม่ได้เพิ่มครับเจ้านาย");
  }
}

// ================== ระบบพูด ==================
function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "th-TH";
  speech.rate = 1;
  window.speechSynthesis.speak(speech);
}
