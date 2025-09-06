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
  { type: "response", text: "<a href='https://www.instagram.com/jer.sonr?igsh=bTZ5ZGJmdTdydWs0' target='_blank'>instagram/</a>" },
  { type: "command", text: "$ _" }
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
      container.innerHTML = line.text;
      lineIndex++;
      charIndex = 0;
      setTimeout(typeLine, 500);
    }
  }

  typeChar();
}

typeLine();
