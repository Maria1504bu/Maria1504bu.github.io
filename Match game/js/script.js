let srcs = ['IMG_20220722_095255.jpg',
    'IMG_20220722_100017.jpg',
    'photo_2023-02-16_07-34-34.jpg',
    'photo_2023-02-16_07-36-12.jpg',
    'photo_2023-02-16_07-41-55.jpg',
    'photo_2023-02-16_07-42-18.jpg',
    'photo_2023-02-16_07-43-01.jpg',
    'photo_2023-02-16_07-44-37.jpg'];

function shuffleImages() {
    let imges = srcs.map((src, index) =>
        ({ src: src, name: index })
    );
    imges = imges.concat(...imges);
    // algorithm Fisher-Yets
    for (let i = imges.length - 1; i > 0; i--) {
        let j = Math.ceil(Math.random() * i);
        [imges[i], imges[j]] = [imges[j], imges[i]];
    }
    return imges;
}

function appendImages() {
    let imagesData = shuffleImages();
    let section = document.querySelector("section");
    for (img of imagesData) {
        let card = document.createElement("div");
        card.className = "card";

        let face = document.createElement("img");
        face.className = "face";
        face.src = ".\\img\\" + img.src;
        face.setAttribute("name", img.name);
        card.append(face)

        let back = document.createElement("img");
        back.className = "back";
        back.src = ".\\img\\background.jpg";
        card.append(back);
        section.append(card);
        card.addEventListener("click", (e) => {
            card.classList.add("choosed");
            checkMatch(e);
        })
    }
}


function checkMatch(e) {
    let choosed = document.querySelectorAll(".choosed");
    if(choosed.length >= 2){
        setTimeout(() => {choosed.forEach((card) => card.classList.remove("choosed"))}, 1500);
        if(choosed[0].firstChild.name === choosed[1].firstChild.name){
            choosed.forEach((card) => card.classList.add("matched"))
            if(choosed[0].firstChild.name == 2){
                setTimeout(() => alert("Ойой, чотири Володьки. Що робити?!)))"), 1000);
            }
        } else{
            document.querySelector("iconify-icon").remove();
            let lifes = document.querySelectorAll("iconify-icon").length;
            if(lifes == 0){
                startGame()
            } else if(lifes == 5){
                alert("Букуська, ану думай! Поцілуйчики зникають!");
            }
        }
    }
}
function startGame(){
    attachLifes();
    document.querySelector("section").innerHTML = "";
    appendImages();
}

function attachLifes(){
    let h1 = document.querySelector("h1");
    for(let i = 0; i < 10; i++){
        h1.insertAdjacentHTML("beforeend", "<iconify-icon inline icon=\"emojione:kiss-mark\"></iconify-icon>");
    }
}
startGame()