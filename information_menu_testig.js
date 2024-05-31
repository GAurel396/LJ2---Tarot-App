const canvas = document.querySelector(".game_canvas");
const ctx = canvas.getContext("2d");
canvas.width = 256;
canvas.height = 224;
const test = document.querySelector("button");
let state;
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
        drawn_card_image.onload = () => {ctx.drawImage(drawn_card_image, 21, 48, 96, 128);};

}

addEventListener("keydown", function (e) {
        if (state == "explanation_menu" && e.key === "x") {
                console.log("switches back to menu")
        }
});
window.addEventListener("load", switch_shuffle_menu);