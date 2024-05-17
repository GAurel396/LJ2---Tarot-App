const canvas = document.querySelector(".game_canvas");
const ctx = canvas.getContext("2d");
canvas.width  = 256;
canvas.height = 224;
const test = document.querySelector("button");
const main_menu = new Image();
main_menu.src = "graphics/MMPLACEHOLDERt.png"
let menu_option = 1;

let sx = 0 
let sy = 0;
let sw = 256;
let sh = 224;

function drawBG () {
    ctx.drawImage(main_menu, sx, sy, sw, sh, 0, 0, 256, 224);
}; 

let selector_x;
let selector_y;
let size_x;
let size_y;
let selector_radius;

function draw_rectangle () {
    if (menu_option == 1) {
    selector_x = 45;
    selector_y = 65;
    size_x = 62;
    size_y = 94;
    selector_radius = 3;
    ctx.clearRect(132,  53, 97 , 126);
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
    ctx.roundRect(selector_x,selector_y, size_x, size_y, selector_radius);
    ctx.stroke();

}

main_menu.onload =  () => {
    drawBG ();
    draw_rectangle ();
};   

window.addEventListener("keydown", function (e) {
    console.log(e.key);
    if (e.key=="ArrowLeft" || e.key=="ArrowRight") {
        if (menu_option == 1) {
                menu_option = 2;
        } else if (menu_option == 2) {
            menu_option = 1;
        }
    }
    draw_rectangle();
} );

function switch_shuffle_menu () {
    console.log("only console log for now - shuffle page")
};

function switch_about () {
    console.log("only console log for now - about")
};


window.addEventListener("keydown", function(e) {
    if (e.key == "y" || e.key == "z" || e.key == " ") {
        if (menu_option == 1) {
            switch_shuffle_menu();
        } else {switch_about()}
    };
})