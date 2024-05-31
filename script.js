const canvas = document.querySelector(".game_canvas");
const ctx = canvas.getContext("2d");
canvas.width = 256;
canvas.height = 224;

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

window.addEventListener("keydown", function (e) {
        if (state === "menu" && menu_option === 1) {
                if (e.key === "y" || e.key === "z" || e.key === " ") {
                        switch_shuffle_menu();   
                } 
        } else if (state === "menu" && menu_option === 2) {
                if (e.key === "y" || e.key === "z" || e.key === " ") {
                        switch_about();
                }
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

let tarot_info = [];
fetch("cards_description.json").then((response) => response.json()).then((json) => {
        tarot_info = json;
        console.log(json)
        console.log("INFO LOADED")}
);
let shuffle_menu = new Image();
shuffle_menu.src = "graphics/shuffling_screesnng.png"; 
let shuffling = new Image();
shuffling.src = "graphics/shufflin_screen.png";



let tarot_array = [];
for (let i = 1; i <= 22; i++) {
        tarot_array.push(i);
};
 
function switch_shuffle_menu() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        state = "shuffle_menu";
        setTimeout(function(){
                ctx.drawImage(shuffle_menu, 0,0, 256, 224);
                ctx.font = "12px bm-japan";
                ctx.fillStyle = " #ff08ff  ";
                ctx.textAlign = "center";
                ctx.fillText("Press A to shuffle.", 128, 190);
        }, 500);
};

addEventListener("keydown", function (e) {
        if (state === "shuffle_menu") {
            if (e.key === "y" || e.key === "z" || e.key === " ") {
                deal_card();
            } 
        } else if (state === "shuffling") {
                stop_animation();
                this.setTimeout(draw_explanation(), 1000);
        }
    });


function shuffle() {
        let shuffle_deck = (array) => {
                for (let i = array.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
        };
        shuffle_deck(tarot_array);
        return (tarot_array[0]);
};
let drawn_card
function deal_card() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(shuffle_menu, 0,0, 256, 224);
        animating_shuffling = setInterval(shuffle_animation, 100);
        shuffle_animation();
        state = "shuffling";
        shuffle();
        drawn_card = tarot_array[0];
        console.log(drawn_card);
};

let shuffle_frame = 0;

function shuffle_animation () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(shuffle_menu, 0,0, 256, 224);
        ctx.fillText("Press A to stop shuffling.", 128, 190);
        ctx.drawImage(shuffling, 82*shuffle_frame, 0, 82, 150, 87, 17, 82, 150 );
        if (shuffle_frame === 5) {
                shuffle_frame = 0;
        } else shuffle_frame += 1;
}

function stop_animation () {
        clearInterval(animating_shuffling);
}

let keyword = 0;
keyword_x = 0;

const fail_safe = new Object;
fail_safe.title = "The Fool";
fail_safe.subtitle = "Air - Uranus - Aleph";
fail_safe.number = "0";
fail_safe.image = "graphics/cards/0.png";
fail_safe.short_desc = ["purity", "blank slate", "foolishness", "uniqueness", "journey", "unorthodox", "carelesness"];


let explanation_bg = new Image();
explanation_bg.src = "graphics/explanation_screem.png";
function draw_explanation () {
        state = "explanation_menu";
        console.log(drawn_card)
        let card = tarot_info[drawn_card];
        let drawn_card_image;
        let title;
        let subtitle;
        let keywords;
        console.log(tarot_info);
        console.log(card);
        drawn_card_image = new Image();;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setTimeout(function(){
                ctx.drawImage(explanation_bg, 0,0, 256, 224);

        }, 200);
        if (tarot_info.length === 0 || drawn_card === undefined) {
                drawn_card_image.src = fail_safe.image;
                console.log("it failed to load. fallback to the Fool")
        } else {drawn_card_image.src = card.image;
                title = card.title;
                subtitle = card.subtitle;
                keywords = card.short_desc;}
        drawn_card_image.onload = () => {
                                ctx.drawImage(drawn_card_image, 21, 48, 96, 128);
                                ctx.fillStyle = "#260a34";
                                ctx.font = "9px bm_space";
                                ctx.textAlign = "center";
                                ctx.fillText(title, 192,33);
                                ctx.fillStyle = "#7d7da3";
                                ctx.font = "8px font_04b03";
                                ctx.fillText(subtitle, 192, 45);
                                let iterate_keywords = 0;
                                while (iterate_keywords < keywords.length) {
                                        ctx.fillStyle = "260a34";
                                        ctx.font = "8px font_04b03";
                                        ctx.fillText(keywords[iterate_keywords], 196, 63 + (63*iterate_keywords))
                                };
        };


}

addEventListener("keydown", function (e) {
        if (state == "explanation_menu" && e.key === "x") {
                console.log("switches back to menu")
                draw_menu()
        }
});
window.addEventListener("load", init);