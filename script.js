const nameT = document.getElementById("name");
const msgR = document.getElementById("msgRefus");
const msgV = document.getElementById("msgValid");
const character = document.getElementById("char");
const classe = document.getElementById("Character");
const i = document.createElement("img");
const iC = document.createElement("img");
iCd = iC.id
iC.setAttribute("id","iCid")
const card = document.getElementById("card");
i.className = "imgIcon";
let data = [];



function createNewChar() {
  const display = card.style.display;
  const create = document.getElementById("newCharacter");
  if (create.style.display !== "none") {
    create.style.display = "none";
  }
  if (display === "none") {
    card.style.display = "block";
  } else {
    card.style.display = "block";
  }
}
function validForm() {
  if (nameT.value === "") {
    console.log("failure");
    msgR.innerHTML = "Veuillez choisir un nom de personnage";
    msgV.innerHTML = "";
  } else {
    console.log("success");
    msgR.innerHTML = "";
    msgV.innerHTML = "Peronnage créé";
    collectData();
  }
}

let elt = document.querySelector("select");
elt.addEventListener("change", function () {
  console.log(this.selectedIndex);
});

function collectData() {
  data.push({
    namer: nameT.value,
    classer: classe.value,
  });
  console.log(data);
  createchar();
  nameT.value = "";
  localStorage.setItem("data", JSON.stringify(data));
}

function createchar() {
  char.innerHTML = "";
  data.map((x, y) => {
    const d = document.createElement("div");
    d.id = y;
    const nameP = document.createElement("p");
    nameP.className = "name";
    const classeC = document.createElement("p");
    classeC.className = "classe";
    d.className = "perso";
    nameP.textContent = x.namer;
    classeC.textContent = x.classer;
    d.appendChild(nameP);
    d.appendChild(classeC);
    char.appendChild(d);
    d.setAttribute("onclick","postChar(this)");
    
    post(x.classer);
    d.appendChild(i);
    d.innerHTML += `
    <div class=buttons>  
      <img src="image/suppr.png" alt="" onclick="deleteChar(this)" id="btnSuppr">
      <img src="image/edit.png" alt="" onclick="modify(this)" id="btnEdit">
    </div>
    `;
    // d.setAttribute("onclick","choixPerso(\""+data.classe+"\")")
  });
  // ReStart();
}

function postChar(e){
  const enChar = document.getElementById("chooseCharacter");
  enChar.appendChild(iC);
  const fack = JSON.parse(localStorage.getItem("data"));
  const titi = e.id;
  const chooseChar = fack[titi].classer;
  console.log(chooseChar)
  post(chooseChar);
}
;

function post(classe) {
  if (classe === "Warrior") {
    i.setAttribute("src", "image/icones/war.webp");
    iC.setAttribute("src","image/WAR.webp")
  }
  if (classe === "Hunter") {
    i.setAttribute("src", "image/icones/hunter.png");
    iC.setAttribute("src","image/hcor.png")
  }
  if (classe === "Mage") {
    i.setAttribute("src", "image/icones/mage.png");
    iC.setAttribute("src","image/magcor.png")
  }
  if (classe === "Warlock") {
    i.setAttribute("src", "image/icones/demo.png");
    iC.setAttribute("src","image/dcor.png")
  }
  if (classe === "Rogue") {
    i.setAttribute("src", "image/icones/rogue.png");
    iC.setAttribute("src","image/rogcor.png")
  }
  if (classe === "DeathKnight") {
    i.setAttribute("src","image/icones/dk.webp");
    iC.setAttribute("src","image/dkcor.png")
  }
}


function deleteChar(e) {
  e.parentElement.parentElement.remove();
  console.log(e.parentElement.parentElement.id);
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  createchar();
  console.log(data);
}

function start() {
  const start = document.getElementById("button");
  start.remove();
  let element = document.getElementById("EnCard");
  let display = element.style.display;
  const cardE = document.getElementById("container");
  console.log(data);
  if (display === "none") {
    element.style.display = "block";
    cardE.style.display = "block";
    recupData();
  } else {
    element.style.display = "none";
  }
}

function recupData() {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createchar();
}

function fullscreen() {
  document.documentElement.requestFullscreen();
}

// camera (fonction API 2)
(() => {
  const width = 320;
  let height = 0;
  let streaming = false;
  let video = null;
  let canvas = null;
  let photo = null;
  let startbutton = null;

  function showViewLiveResultButton() {
    if (window.self !== window.top) {
      document.querySelector(".contentarea").remove();
      const button = document.createElement("button");
      button.textContent = "View live result of the example code above";
      document.body.append(button);
      button.addEventListener("click", () => window.open(location.href));
      return true;
    }
    return false;
  }

  function startup() {
    if (showViewLiveResultButton()) {
      return;
    }
    video = document.getElementById("video");
    canvas = document.getElementById("canvas");
    photo = document.getElementById("photo");
    startbutton = document.getElementById("startbutton");

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
      });

    video.addEventListener(
      "canplay",
      (ev) => {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);
          if (isNaN(height)) {
            height = width / (4 / 3);
          }

          video.setAttribute("width", width);
          video.setAttribute("height", height);
          canvas.setAttribute("width", width);
          canvas.setAttribute("height", height);
          streaming = true;
        }
      },
      false
    );

    startbutton.addEventListener(
      "click",
      (ev) => {
        takepicture();
        ev.preventDefault();
      },
      false
    );

    clearphoto();
  }

  function clearphoto() {
    const context = canvas.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  }

  function takepicture() {
    const context = canvas.getContext("2d");
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      const data = canvas.toDataURL("image/png");
      photo.setAttribute("src", data);
    } else {
      clearphoto();
    }
  }

  window.addEventListener("load", startup, false);
})();

function modify(e) {
  const newname = document.getElementById("modify");
  const dis = newname.style.display;
  const divv = e.parentElement.parentElement.id;
  localStorage.setItem("id", divv);
  if (dis === "none") {
    newname.style.display = "block";
    console.log("yo");
    console.log(divv);
  } else if (dis === "none") {
    newname.style.display = "block";
  } else {
    newname.style.display = "none";
  }
}

function edit() {
  const nameE = document.getElementById("newName");
  newname = nameE.value;
  console.log(newname);
  const test = localStorage.getItem("id");
  data[test].namer = newname;
  localStorage.setItem("data", JSON.stringify(data));
  createchar();
}
