const canvas = document.querySelector(".game_canvas");
const ctx = canvas.getContext("2d");
canvas.width  = 256;
canvas.height = 224;
const test = document.querySelector("button");
//selecting body to implement pause on click-out

const body = document.querySelector("body");
const deck_board = new Image ();
deck_board.src = "graphics/CARDDECKPLACEMENT.png"

let tarot_array = [];
for (let i=1; i<=22;i++) {
  tarot_array.push(i);
};

function shuffle (){
        let shuffle_deck = (array) => { 
                for (let i = array.length - 1; i > 0; i--) { 
                  const j = Math.floor(Math.random() * (i + 1)); 
                  [array[i], array[j]] = [array[j], array[i]]; 
                } 
                return array; 
              }; 
              ctx.font = "12px, font_04b03";
              shuffle_deck(tarot_array);
              return(tarot_array[0]);  
};

function deal_card () {
        shuffle();
        let drawn_card = tarot_array[0];
        console.log(drawn_card);

        //play animation of shuffling and also ask for a input to stop


}
let shuffle_y = 64;
card_size_y = 96;
        function test_shuffling() {
        for (let y=64; y==0; y++) {
                ctx.fillStyle = "#800034 ";
                ctx.roundRect(96,shuffle_y,64, card_size_y,5);
                ctx.fill();
                ctx.stroke();
                };   
        };
      
        deck_board.onload = () => 
                        {ctx.drawImage(deck_board, 0,0,256,224),
                        ctx.fillStyle = "#800034 ";
                        ctx.roundRect(96,64,64,96,5);
                        ctx.fill();
                        ctx.stroke();
                }

test.addEventListener("click", test_shuffling())




LTJAM logo
const logo = new Image();
logo.src = "/graphics/splash-screen-sheet.png"
logo.classList.add("logo");
//Title screen
const title = new Image();
title.src = "/graphics/TITLEplaceholder.png";
title.classList.add ("title_screen");
//menu
const menu = new Image();
menu.src = "/graphics/MMPLACEHOLDER.png";
menu.classList.add("menu");

function init () {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log("Init function works");
        //initial screen
        function draw_logo () {
                let frames = 1;
                let sx = 0
                let sy = 0
                let sw = 256;
                let sh = 224;
                ctx.fillStyle = "#000";
                ctx.fillRect(0,0,256,224);
                logo.onload = () => {          ctx.drawImage(logo, frames*sx, sy, sw, sh, 0, 0, 256, 224);        }   
                if (frames < 5) frames ++;
        }

        draw_logo();
        //requestAnimationFrame (draw_logo())
        //title.onload = () => {          ctx.drawImage(title, 0, 0, 256, 224);        };

}

function draw_menu () {
                menu.onload = () => {   ctx.drawImage(menu, 0,0, 256 ,224)}
};

function shuffle () {

};

window.addEventListener("load", init());
//canvas.addEventListener("keydown", function draw_menu()); */