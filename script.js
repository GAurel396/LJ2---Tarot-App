const canvas = document.querySelector(".game_canvas");
const ctx = canvas.getContext("2d");
canvas.width = 256;
canvas.height = 224;
const test = document.querySelector("button");

//LTJAM logo
const logo = new Image();
logo.src = "/graphics/splash-screen-sheet.png"
logo.classList.add("logo");
//Title screen
const title = new Image();
title.src = "graphics/title.png"
title.classList.add("title_screen");
//menu
const menu = new Image();
menu.src = "/graphics/MMPLACEHOLDER.png";
menu.classList.add("menu");
//tracks which state the game is in
let state = "logo"

//here the game initializes
function init() {
        console.log("Init function works");
        let frames = 0;

        function draw_logo() {
                let sx = 0 + (frames * 256)
                let sy = 0
                let sw = 256;
                let sh = 224;

                ctx.drawImage(logo, sx, sy, sw, sh, 0, 0, 255, 223);
                frames++;
                if (frames >= 5) {
                        clearInterval(animate_logo);
                        frames = 0;
                        draw_title();
                }

        };
        let animate_logo = setInterval(draw_logo, 750);
}
function draw_title() {
        console.log("Title is called");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(title, 0, 0, 255, 223);
        ctx.font =  "12px bm_japan";
        ctx.textAlign  = "center";
        ctx.fillText("Press Start", 178, 113);
        state = "title";
        addEventListener("keydown", function (e) {
            console.log("which key was press: " + e.key);
            if (state === "title" && e.key === "Enter") {
                draw_menu();
            }
        });
    }

function draw_menu() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        state = "menu";
        //main_menu.onload = () => {
                drawBG();
                draw_rectangle();
        //};

};

const main_menu = new Image();
main_menu.src = "graphics/MMPLACEHOLDERt.png"
let menu_option = 1;

let sx = 0
let sy = 0;
let sw = 256;
let sh = 224;

function drawBG() {
        ctx.drawImage(main_menu, sx, sy, sw, sh, 0, 0, 256, 224);
};

let selector_x;
let selector_y;
let size_x;
let size_y;
let selector_radius;

function draw_rectangle() {
        if (menu_option === 1) {
                selector_x = 45;
                selector_y = 65;
                size_x = 62;
                size_y = 94;
                selector_radius = 3;
                ctx.clearRect(132, 53, 97, 126);
        } else if (menu_option === 2) {
                selector_x = 134;
                selector_y = 55;
                size_x = 89;
                size_y = 117;
                selector_radius = [0, 4, 0, 4];
                ctx.clearRect(selector_x, selector_y, size_x, size_y)
        }
        drawBG();
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "#ff08ff";
        ctx.roundRect(selector_x, selector_y, size_x, size_y, selector_radius);
        ctx.stroke();

}


window.addEventListener("keydown", function (e) {
        console.log(e.key);
        if (state === "menu") {
                if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                        if (menu_option === 1) {
                                menu_option = 2;
                        } else if (menu_option === 2) {
                                menu_option = 1;
                        }
                }
                draw_rectangle();
        }

});

let about_screen = new Image();
about_screen.src = "graphics/ABOUTPLACEHOLDER-export.png"
let page_w = 93;
let page_h = 177;
let l_page_x = 26;
let l_page_y = 22;
let r_page_x = 137;
let r_page_y = 22;

let page1 = new Image();
page1.src = "graphics/ABOUTpage1rt.png"

let page2 = new Image();
page2.src = "graphics/ABOUTpage2t.png"

let page4 = new Image();
page4.src = "graphics/aboutpage3.png";

let example = new Image();
example.src = "graphics/cards/0.png";

let pageleft = page1;
let pageright = page2; 
let plx = 92;
let ply = 151;
let book_state = 1;

function change_book_state (){
        if (book_state === 1) {
                pageleft = page1;
                pageright = page2;
                plx = 92; 
                ply = 151;
        } else {
                pageleft = example;
                pageright = page4;
                plx = 96; 
                ply = 128;
        }
        switch_about();
};

function switch_about() {;
        state = "about";
        console.log(state);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(about_screen, sx, sy, sw, sh, 0, 0, 256, 224);
        ctx.drawImage(pageleft, 26, 22, plx, ply);
        ctx.drawImage(pageright, 137,22, 92, 151);
};


window.addEventListener("keydown", function (e) {
        if (state === "about") {
                if (e.key === "ArrowRight" && book_state < 2) {
                        console.log("key pressed")
                        book_state += 1;
                        console.log(book_state);
                        change_book_state();
                } else if (e.key === "ArrowLeft" && book_state > 1) {
                        console.log("left pressed");
                      book_state -= 1;    
                      console.log (book_state);
                      change_book_state();       
                }
        }

}) 


window.addEventListener("load", init);