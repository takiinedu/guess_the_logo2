// slip
let rotateY = 0;
function card_clicked() {
    if (rotateY === 0) {
        rotateY = 180;
    } else {
        rotateY = 0;
    }
     document.querySelector('.frames').style.transform = 'rotateY(' + rotateY + 'deg)';
}
// play
function play_() {
}