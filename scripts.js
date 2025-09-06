const terminal = document.getElementById("terminal");

const lines = [
  { type: "command", text: "Social-Media" },
  { type: "command", text: "$ UserInfo" },
  { type: "response", text: "Nombre: Yerson Perez" },
  { type: "response", text: "Carrera: Logística y Transporte" },
  { type: "response", text: "Intereses: nada" },
  { type: "response", text: "Skills: nada" },
  { type: "response", text: "Hobbies: Música, Ver películas" },
  { type: "command", text: "$ ls social/" },
  { type: "response", text: "<a href='https://instagram.com/' target='_blank'>instagram/</a>" },
  { type: "response", text: "<a href='https://tiktok.com/' target='_blank'>tiktok/</a>" },
  { type: "response", text: "<a href='https://youtube.com/' target='_blank'>youtube/</a>" },
  { type: "response", text: " <a href='https://linkedin.com/' target='_blank'>linkedin/</a>" },
  { type: "command", text: "> _" }
];

let lineIndex = 0;
let charIndex = 0;

function typeLine() {
  if (lineIndex >= lines.length) return;

  const line = lines[lineIndex];
  const container = document.createElement("div");
  container.className = line.type;
  terminal.appendChild(container);

  function typeChar() {
    if (charIndex < line.text.length) {
      container.innerHTML = line.text.substring(0, charIndex + 1) + '<span class="cursor"></span>';
      charIndex++;
      setTimeout(typeChar, 50);
    } else {
      container.innerHTML = line.text; // línea completa
      lineIndex++;
      charIndex = 0;
      setTimeout(typeLine, 500);
    }
  }

  typeChar();
}

typeLine();
