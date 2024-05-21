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
title.src = "/graphics/TITLEplaceholder.png";
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
        state = "title";
        addEventListener("keydown", function (e) {
            console.log("which key was press: " + e.key);
            if (state == "title" && e.key === "Enter") {
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
        if (menu_option == 1) {
                selector_x = 45;
                selector_y = 65;
                size_x = 62;
                size_y = 94;
                selector_radius = 3;
                ctx.clearRect(132, 53, 97, 126);
        } else if (menu_option == 2) {
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
        if (state == "menu") {
                if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
                        if (menu_option == 1) {
                                menu_option = 2;
                        } else if (menu_option == 2) {
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
let left_page_test = `Tarot is many thing to many people. Cartomancy. Way to delve into own depths. Way to connect
                        with universe or your deities. Method to pick what to eat. It can be any of that. Secular or spiritual.
                        (But please don't sue us even if you visit us for divination!) 
                        A basic method is to have a question, focus on the question, shuffle the deck and interpret the card you see to answer the question.
                        Focus on the elements in image, focus on the feeling, focus on the words of description. Advanced learners may also focus on associated elements or even use assigned hebrew
                        letters as springboard into  Qaballa. Still, even focusing on the answer Tarot gives us instinctually is useful. IN fact, listening to what youa re feeling looking at the card and its description is the most powerful tool in yoiur arsenal`

function switch_about() {
        console.log("only console log for now - about");
        state = "about";
        console.log(state);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(about_screen, sx, sy, sw, sh, 0, 0, 256, 224);
        ctx.font = "12px bm-japan";
        ctx.fillStyle = " #000000 ";
        ctx.textAlign = "left"
        ctx.fillText("TAROT 101", 37,32);
};

function switch_shuffle_menu() {
        console.log("only console log for now - shuffle page")
        //state = "shuffling"
        ctx.clearRect(0, 0, canvas.width, canvas.height);


};
window.addEventListener("keydown", function (e) {
        if (state == "about" && e.key == "x") { 
                ctx.clearRect(0,0, canvas.width, canvas.height);
                draw_menu();
        }
});
window.addEventListener("keydown", function (e) {
        if (state == "menu") {
        if (e.key == "y" || e.key == "z" || e.key == " ") {
                if (menu_option == 1) {
                        switch_shuffle_menu();
                } else {
                        switch_about()
                }
        };
        }
})

const body = document.querySelector("body");
const deck_board = new Image();
deck_board.src = "graphics/CARDDECKPLACEMENT.png"

let tarot_array = [];
for (let i = 1; i <= 22; i++) {
        tarot_array.push(i);
};

function shuffle() {
        let shuffle_deck = (array) => {
                for (let i = array.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
        };
        ctx.font = "12px, font_04b03";
        shuffle_deck(tarot_array);
        return (tarot_array[0]);
};

function deal_card() {
        shuffle();
        let drawn_card = tarot_array[0];
        console.log(drawn_card);

}
deck_board.onload = () => {
        ctx.drawImage(deck_board, 0, 0, 256, 224),
                ctx.fillStyle = "#800034 ";
        ctx.roundRect(96, 64, 64, 96, 5);
        ctx.fill();
        ctx.stroke();
}

function draw_explanation (drawn_card) {

}
window.addEventListener("load", init);