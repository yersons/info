const terminal = document.getElementById("terminal-body");
const input = document.getElementById("terminal-input");
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const particles = [];
for (let i = 0; i < 300; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 3 + 1,
    speedX: (Math.random()-0.5)*0.5,
    speedY: (Math.random()-0.5)*0.5,
    color: 'hsla(0,0%,100%,0.99)'
  });
}
function animateBackground(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let p of particles){
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fill();
    p.x+=p.speedX;
    p.y+=p.speedY;
    if(p.x<0||p.x>canvas.width)p.speedX*=-1;
    if(p.y<0||p.y>canvas.height)p.speedY*=-1;
  }
  requestAnimationFrame(animateBackground);
}
animateBackground();


const initialLines = [
  { type: "command", text: "whoami" },
  { type: "command", text: "$ info" },
  { type: "response", text: "Nombre: Yerson Perez" },
  { type: "response", text: "Carrera: Logística y Transporte" },
  { type: "command", text: "$ ls social/" },
  { type: "response", text: "<a href='https://instagram.com/' target='_blank'>instagram/</a>" },
  { type: "response", text: "<a href='https://github.com/yersons' target='_blank'>github/</a>" }
  
];

let lineIndex=0;
let charIndex=0;
let userPrompt;
let inputText;

function typeLine(){
  if(lineIndex>=initialLines.length){
    createPrompt(); // prompt visible al final
    return;
  }
  const line=initialLines[lineIndex];
  const container=document.createElement("div");
  container.className=line.type;
  terminal.appendChild(container);

  function typeChar(){
    if(charIndex<line.text.length){
      container.innerHTML=line.text.substring(0,charIndex+1)+'<span class="cursor"></span>';
      charIndex++;
      setTimeout(typeChar,50);
    }else{
      container.innerHTML=line.text;
      terminal.scrollTop=terminal.scrollHeight;
      lineIndex++;
      charIndex=0;
      setTimeout(typeLine,300);
    }
  }
  typeChar();
}

typeLine();


function createPrompt(){
  userPrompt=document.createElement("div");
  userPrompt.className="command";
  userPrompt.innerHTML='$ <span class="input-text"></span><span class="cursor"></span>';
  terminal.appendChild(userPrompt);
  inputText=userPrompt.querySelector(".input-text");
  terminal.scrollTop=terminal.scrollHeight;
}


const commands={
  help:"Comandos disponibles: help, userinfo, social, clear",
  info:"Nombre: Yerson Perez\nCarrera: Logística y Transporte",
  social:"<a href='https://instagram.com/' target='_blank'>instagram/</a>\n<a href='https://github.com/yersons' target='_blank'>github/</a>",
  clear:"clear",
};


window.addEventListener("keydown",(e)=>{
  input.focus();
  if(!userPrompt) return;

  if(e.key.length===1) inputText.textContent+=e.key;
  else if(e.key==="Backspace") inputText.textContent=inputText.textContent.slice(0,-1);
  else if(e.key==="Enter"){
    const commandText=inputText.textContent.trim();
    userPrompt.innerHTML=`$ ${commandText}`;
    if(commands[commandText]){
      if(commands[commandText]==="clear") terminal.innerHTML="";
      else printLine(commands[commandText],"response");
    }else printLine(`Comando no encontrado: ${commandText}`,"response");
    createPrompt(); // nuevo prompt
  }
  terminal.scrollTop=terminal.scrollHeight;
});

function printLine(text,type="response"){
  const container=document.createElement("div");
  container.className=type;
  container.innerHTML=text;
  terminal.appendChild(container);
  terminal.scrollTop=terminal.scrollHeight;
}
