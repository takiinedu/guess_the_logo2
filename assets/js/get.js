
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

const logo__name = document.getElementById("logo__name");
const logo__img = document.getElementById("logo__img");
const logo = document.getElementById("logo-container");

if (!logo__name || !logo__img || !logo) {
    console.error("One or more elements with the specified IDs were not found.");
    throw new Error("One or more elements with the specified IDs were not found.");
}

let number_of_logos = 60;
let index_array = [0];
for (let i = 0; i < number_of_logos; i++) {
    index_array[i] = i;
}

let name = "";
let url = "";
let check = 1;
let index = 0;
let CanClick = true;
let count = 10;
function runn() {
    document.getElementById("countdow").style.transition = "width 10s linear";
    document.getElementById("countdow").style.width = "0%";
}
let time = 500;
let red = 0;
function loss(){
    setTimeout(function () {
        if (red == 0) {
            console.log("red");
            document.getElementById("logo").style.backgroundColor = "red";
            time = 1000;
            red = 1;
        }else{
            console.log("white");
            document.getElementById("logo").style.backgroundColor = "white";
            time = 500;
            red = 0;
        }
        loss();
    }, time);
}
logo.addEventListener("click", () => {
    if (CanClick) {
        CanClick = false;
        if (check === 1) {
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
                    console.log("index =", index);
                    console.log(index_array);
                    if (index < items.length) {
                        const item = items[index];
                        name = item.name;
                        url = item.url;
                        logo__img.src = url;
                        logo__name.innerHTML = "________";
                        check = 2;
                    }
                })
                .catch((error) => {
                    console.error("Error listing images:", error);
                });
            count = -1;
            setTimeout(function () {
                count = 10;
                let width = (count - 1)/10*100;
                document.getElementById("countdow").style.width = `${width}%`;
                runn();
            }, 1300);
            setTimeout(function () {
                CanClick = true; // Sau 2 giây cho phép click lại
            }, 3000);
        } else if (check === 2) {
            count = -1;
            document.getElementById("countdow").style.transition = "1s";
            document.getElementById("countdow").style.width = `100%`;
            logo__name.innerHTML = name;
            check = 1;
            CanClick = true;
        }
    }
});