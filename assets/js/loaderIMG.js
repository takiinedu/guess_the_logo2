console.log("connect index.js to index.html success");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDjds91lHLZ0x2KI71oHc0rZgbxhE2JBn4",
    authDomain: "logo-b3804.firebaseapp.com",
    projectId: "logo-b3804",
    storageBucket: "logo-b3804.appspot.com",
    messagingSenderId: "640346822474",
    appId: "1:640346822474:web:d5f14b57bb18afd55613b3",
    measurementId: "G-HNKT0PE0QQ"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const imagesRef = ref(storage, 'images/');

const img_truoc = document.getElementById("frame-font__img");
const img_sau = document.getElementById("frame-back__img");
const name_truoc = document.getElementById("frame-font__title");
const name_sau = document.getElementById("frame-back__title");

let number_of_logos = 60;
let index_array = Array.from({ length: number_of_logos }, (_, i) => i);

let url = "";
let name = "";

const fetchImages = async () => {
    try {
        const res = await listAll(imagesRef);
        const items = await Promise.all(res.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            const nameWithoutExtension = itemRef.name.replace(/\.[^/.]+$/, "");
            return { name: nameWithoutExtension, url };
        }));
        return items.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
        console.error("Error listing images:", error);
    }
};

const updateImage = (items) => {
    let random = Math.floor(Math.random() * (index_array.length - 1));
    let index = index_array[random];
    // console.log("random: ", random);
    console.log("Img: ",index);
    const removed = index_array.splice(random, 1);
    if (index < items.length) {
        const item = items[index];
        url = item.url;
        name = item.name;
        // console.log(url);
        img_truoc.src = url;
    }
};
fetchImages().then(updateImage);

const countdown = document.getElementById("countdown");
const play_btn = document.getElementById("play");
let can_click_play = false;

setTimeout(() => {
    can_click_play = true;
    play_btn.style.cursor = "pointer";
}, 2000);

// guessed
const length = number_of_logos.length;
let guessed = 0;
function guessed_() {
    if (guessed < 3) {
        guessed++;
    }
    document.querySelector('.progress__length').style.width = `${guessed * 100 / 3}%`;
}
// // integral
let integral = 0;
// function integral_() {
//     if (integral < 10) {
//         integral++;
//     }
//     document.querySelector('.integral__length').style.width = `${integral * 10}%`;
// }
let time = 10;

const countdown_ = () => {
    if (time === -1) return;
    if (time === 0 &&guessed < 3) {
        document.getElementById("lose").style.display = "initial";
        play_btn.style.display = "none";
        document.querySelector('.menugame').style.top = '0';
        document.querySelector('.menugame').style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        return;
    }
    if (guessed == 3) {
        can_click_play = false;
        const cup = document.querySelector('.cup');
        cup.style.display = 'initial';
        setTimeout(() => {
            cup.style.transition = '1s';
            cup.style.transform = 'rotateY(720deg)';
            cup.style.width = '50%';
        }, 1000);
        setTimeout(() => {
            cup.style.transition = '1s';
            cup.style.opacity = '0';
        }, 2500);
        setTimeout(() => {
            cup.style.opacity = '1';
            cup.style.display = 'none';
            cup.style.transform = 'rotateY(0deg)';
            cup.style.width = '10%';
            document.getElementById("win").style.display = "initial";
            play_btn.style.display = "none";
            document.querySelector('.menugame').style.top = '0';
            document.querySelector('.menugame').style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        }, 3500);
        return;
    }
    time--;
    setTimeout(countdown_, 1000);
};

play_btn.addEventListener("click", () => {
    if (can_click_play) {
        can_click_play = false;
        time = 11;
        countdown_();
        document.querySelector('.menugame').style.top = '-100vh';
        setTimeout(() => {
            document.querySelector('.container').style.top = '50%';
        }, 100);
        img_sau.src = url;
        name_sau.innerHTML = name;
        setTimeout(() => {
            countdown.style.transition = 'all 10s linear';
            countdown.style.backgroundColor = 'rgb(255, 0, 0)';
            countdown.style.width = '0';
        }, 1300);
        setTimeout(() => {
            img_truoc.src = url;
            can_click_play = true;
        }, 3300);
    }
});

let rotateY = 0;
let mat = 1;
const card = document.querySelector('.card');
card.addEventListener("click", async () => {
    if(index_array.length === 0) {
        time = -1;
        can_click_play = false;
    };
    if (can_click_play) {
        can_click_play = false;
        rotateY = rotateY === 0 ? 180 : 360;
        document.querySelector('.frames').style.transform = `rotateY(${rotateY}deg)`;
        if (rotateY === 360) {
            setTimeout(() => {
                rotateY = 0;
                document.querySelector('.frames').style.transition = '0s';
                document.querySelector('.frames').style.transform = `rotateY(${rotateY}deg)`;
            }, 2500);
            setTimeout(() => {
                document.querySelector('.frames').style.transition = '1s';
            }, 2550);
        }
        if (mat === 1) {
            // integral_()
            time = -1;
            mat = 2;
            countdown.style.transition = 'all 0s linear';
            setTimeout(() => countdown.style.width = '100%', 100);
            setTimeout(() => countdown.style.backgroundColor = 'rgb(225, 255, 0)', 200);
            setTimeout(() => {
                countdown.style.transition = 'all 2s linear';
                countdown.style.width = '0';
            }, 300);
            setTimeout(() => {
                countdown.style.transition = 'all 0s linear';
                countdown.style.backgroundColor = 'rgb(0, 229, 255)';
            }, 3000);
            const items = await fetchImages();
            updateImage(items);
            setTimeout(() => {
                img_truoc.src = url;
                can_click_play = true;
            }, 2000);
        } else {
            time = 11;
            guessed_();
            countdown_();
            countdown.style.transition = 'all 0s linear';
            setTimeout(() => {
                countdown.style.width = '100%';
                countdown.style.backgroundColor = 'rgb(0, 229, 255)';
            }, 100);
            setTimeout(() => {
                countdown.style.transition = 'all 10s linear';
                countdown.style.backgroundColor = 'rgb(255, 0, 0)';
                countdown.style.width = '0';
            }, 200);
            setTimeout(() => {
                mat = 1;
                img_sau.src = url;
                name_sau.innerHTML = name;
            }, 1000);
            setTimeout(() => {
                can_click_play = true;
            }, 3000);
        }
    }
});
