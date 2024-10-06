console.log("connect index.js to index.html success");

// Import các hàm cần thiết từ SDK Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-storage.js";

// Cấu hình Firebase của ứng dụng web
const firebaseConfig = {
    apiKey: "AIzaSyDjds91lHLZ0x2KI71oHc0rZgbxhE2JBn4",
    authDomain: "logo-b3804.firebaseapp.com",
    projectId: "logo-b3804",
    storageBucket: "logo-b3804.appspot.com",
    messagingSenderId: "640346822474",
    appId: "1:640346822474:web:d5f14b57bb18afd55613b3",
    measurementId: "G-HNKT0PE0QQ"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const imagesRef = ref(storage, 'images/');

const img_truoc = document.getElementById("frame-font__img");
const img_sau = document.getElementById("frame-back__img");
const name_truoc = document.getElementById("frame-font__title");
const name_sau = document.getElementById("frame-back__title");

let number_of_logos = 60;
let index_array = [0];
for (let i = 0; i < number_of_logos; i++) {
    index_array[i] = i;
}
// comme on web 
let url = "";
let name = "";
listAll(imagesRef)
    .then((res) => {
        const promises = res.items.map((itemRef) => {
            return getDownloadURL(itemRef).then((url) => {
                const name_img = itemRef.name;
                const nameWithoutExtension = name_img.replace(/\.[^/.]+$/, "");
                return { name: nameWithoutExtension, url: url };
            });
        });

        return Promise.all(promises);
    })
    .then((items) => {
        // Sắp xếp các mục theo tên
        items.sort((a, b) => a.name.localeCompare(b.name));

        // Lấy một chỉ số ngẫu nhiên khác với chỉ số trước đó
        let random = Math.floor(Math.random() * index_array.length) - 1;
        let index = index_array[random];
        index_array.splice(random, 1);
        if (index < items.length) {
            const item = items[index];
            url = item.url;
            name = item.name;
            img_truoc.src = url;
        }
    })
    .catch((error) => {
        console.error("Error listing images:", error);
    });
const countdown = document.getElementById("countdown");
const play_btn = document.getElementById("play");
let can_click_play = false;
setTimeout(function () {
    can_click_play = true;
    document.getElementById("play").style.cursor = "pointer";
}, 2000);
// 
let time = 10;
function countdown_() {
    if (time == 0) {
        document.getElementById("lose").style.display = "initial";
        document.getElementById("play").style.display = "none";
        document.querySelector('.menugame').style.top = '0';
        return;
    }
    time --;
    setTimeout(function () {
        countdown_();
    }, 1000);
}

play_btn.addEventListener("click", () => {
    if (can_click_play) {
        // play_out
        time = 11;
        countdown_();
        const menugame = document.querySelector('.menugame');
        menugame.style.top = '-100vh';
        setTimeout(() => {
            const container = document.querySelector('.container');
            container.style.top = '50%';
        }, 100);
        // 
        img_sau.src = url;
        name_sau.innerHTML = name;
        setTimeout(function () {
            countdown.style.transition = 'all 10s linear';
            countdown.style.backgroundColor = 'rgb(255, 0, 0)'
            countdown.style.width = '0';
        }, 1300);
    }
});
let rotateY = 0;
let mat = 1;
function card_clicked() {
    document.querySelector('.frames').style.transform = 'rotateY(' + rotateY + 'deg)';
}
const card = document.querySelector('.card');
card.addEventListener("click", () => {
    if (can_click_play) {
        can_click_play = false;
        // 
        if (rotateY == 0) {
            rotateY = 180;
            img_truoc.src = url;
        } else {
            rotateY = 0;
        }
        document.querySelector('.frames').style.transform = 'rotateY(' + rotateY + 'deg)';
        // 
        if (mat == 1) {
            mat = 2;
            countdown.style.transition = 'all 0s linear';
            setTimeout(() => {
                countdown.style.width = '100%';
            }, 100);
            setTimeout(() => {
                countdown.style.backgroundColor = 'rgb(225, 255, 0)'
            }, 200);
            setTimeout(() => {
                countdown.style.transition = 'all 2s linear';
                countdown.style.width = '0';
            }, 300);
            setTimeout(() => {
                countdown.style.transition = 'all 0s linear';
                countdown.style.backgroundColor = 'rgb(0, 229, 255)'
            }, 3000);
            // 
            listAll(imagesRef)
                .then((res) => {
                    const promises = res.items.map((itemRef) => {
                        return getDownloadURL(itemRef).then((url) => {
                            const name_img = itemRef.name;
                            const nameWithoutExtension = name_img.replace(/\.[^/.]+$/, "");
                            return { name: nameWithoutExtension, url: url };
                        });
                    });

                    return Promise.all(promises);
                })
                .then((items) => {
                    // Sắp xếp các mục theo tên
                    items.sort((a, b) => a.name.localeCompare(b.name));

                    // Lấy một chỉ số ngẫu nhiên khác với chỉ số trước đó
                    let random = Math.floor(Math.random() * index_array.length) - 1;
                    let index = index_array[random];
                    index_array.splice(random, 1);
                    if (index < items.length) {
                        const item = items[index];
                        url = item.url;
                        name = item.name;
                        countdown.style.backgroundColor = 'rgb(225, 255, 0)'
                        setTimeout(function () {
                            img_truoc.src = url;
                            can_click_play = true;
                        }, 2000);
                    }
                })
                .catch((error) => {
                    console.error("Error listing images:", error);
                });
        }else{
            can_click_play = false;
            countdown.style.transition = 'all 0s linear';
            setTimeout(() => {
                countdown.style.width = '100%';
                countdown.style.backgroundColor = 'rgb(0, 229, 255)'
            }, 100);
            setTimeout(() => {
                countdown.style.transition = 'all 10s linear';
                countdown.style.backgroundColor = 'rgb(255, 0, 0)'
                countdown.style.width = '0';
            }, 200);
            mat = 1;
            setTimeout(function () {
                img_sau.src = url;
                name_sau.innerHTML = name;
                can_click_play = true;
            }, 2000);
        }
    }
});
let check = 0