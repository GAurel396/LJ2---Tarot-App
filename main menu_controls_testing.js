const canvas = document.querySelector(".game_canvas");
const ctx = canvas.getContext("2d");
canvas.width  = 256;
canvas.height = 224;
const test = document.querySelector("button");
const main_menu = new Image();
main_menu.src = "graphics/MMPLACEHOLDERt.png"

let sx = 0 
let sy = 0;
let sw = 256;
let sh = 224;
main_menu.onload = () => {ctx.drawImage(main_menu, sx, sy, sw, sh, 0, 0, 255, 223)
};   

cxt.beginpath