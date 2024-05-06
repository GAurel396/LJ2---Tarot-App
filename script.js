const canvas = document.querySelector(".game_canvas");
const ctx = canvas.getContext("2d");
canvas.width  = 256;
canvas.height = 224;
//selecting body to implement pause on click-out
const body = document.querySelector("body");
//LTJAM logo
const logo = new Image();
logo.src = "/graphics/splash-screen.png"
logo.classList.add("logo");
//Title screen
const title = new Image();
title.src = "/graphics/TITLEplaceholder.png";
title.classList.add ("title_screen");

function init () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log("Init function works");
        ctx.fillRect
        logo.onload = () => {          ctx.drawImage(logo, 0, 0, 256, 224);        };
        //add animation loop in spritesheeet like thing similar to jekyll and hyde. 
        title.onload = () => {          ctx.drawImage(title, 0, 0, 256, 224);        };

}

function draw_menu () {

};

function shuffle () {

};

window.addEventListener("load", init());