//Variable
let currentWeapon = 0;
let weapon = ""

let currentBox = ''

gridW1 = [8, 11, 7, 9, 10];
gridW2 = [
    [16, 3, 14],
    [15, 13, 12],
    [6, 2, 1],
    [5, 4, 0]
];

// FETCH REQ
function ajaxRandom(id) {

    fetch(`https://valorant-api.com/v1/weapons`)
        .then((response) => {
            return response.json();
        })
        .then((weapon) => {
            console.log(weapon);

            currentBox = 'ergRandom'

            if (weapon.data[id] && weapon.data[id].displayName) {
                let name = weapon.data[id].displayName;

                let pic = weapon.data[id].displayIcon;
                document.getElementById('ergRandom').innerHTML = `
                    <h3>${name}</h3>
                    <img src="${pic}">
                    <p id="showMore" onclick="showMoreF(${id})">Show more</p>
                `;
            }


        })
        .catch((error) => {
            throw error;
        })
}
function ajaxClick(id) {

    console.log(currentWeapon)
    fetch(`https://valorant-api.com/v1/weapons`)
        .then((response) => {
            return response.json();
        })
        .then((weapon) => {
            console.log(weapon);

            currentBox = 'ergClick'

            if (weapon.data[id] && weapon.data[id].displayName) {
                let name = weapon.data[id].displayName;

                let pic = weapon.data[id].displayIcon;
                document.getElementById('ergClick').innerHTML = `
                <h3>${name}</h3>
                <img src="${pic}">
                <p id="showMore" onclick="showMoreF(${id})">Show more</p>
                `;
            }

        })
        .catch((error) => {
            throw error;
        })
}

function ajaxSearch(id) {
    fetch(`https://valorant-api.com/v1/weapons`)
        .then((response) => {
            return response.json();
        })
        .then((weapon) => {
            console.log(weapon);

            currentBox = 'ergSearch'

            let matchFound = false; // Flag, um festzustellen, ob ein Match gefunden wurde

            for (let i = 0; i < 19; i++) {
                if (weapon.data[i] && weapon.data[i].displayName) {
                    console.log('Weapon Name:', weapon.data[i].displayName);
                    let name = weapon.data[i].displayName;
                    console.log('Comparing with:', id);

                    if (name == id) {
                        console.log('Match found:', name);
                        let pic = weapon.data[i].displayIcon;
                        document.getElementById('ergSearch').innerHTML = `
                            <h3>${name}</h3>
                            <img src="${pic}">
                            <p id="showMore" onclick="showMoreF(${i})">Show more</p>
                        `;
                        matchFound = true; // Setze das Flag auf true, wenn ein Match gefunden wurde
                        break; // Beende die Schleife, da bereits ein Match gefunden wurde
                    }
                }
            }

            if (!matchFound) {
                // Fehlermeldung, wenn keine Waffe mit dem angegebenen Namen gefunden wurde
                document.getElementById('ergSearch').innerHTML = '<p>Error: Weapon not found</p>';
            }

        })
        .catch((error) => {
            throw error;
        });
}

function showMoreF(id) {

    fetch(`https://valorant-api.com/v1/weapons`)
        .then((response) => {
            return response.json();
        })
        .then((weapon) => {
            console.log(weapon);

            document.getElementById('showMore').style.display = 'none'

            let category = weapon.data[id].shopData.category
            let coast = weapon.data[id].shopData.cost
            let magazineSize = weapon.data[id].weaponStats.magazineSize
            let reloadTime = weapon.data[id].weaponStats.reloadTimeSeconds
            let fireRate = weapon.data[id].weaponStats.fireRate

            document.getElementById(currentBox).innerHTML += `
            <div class="moreErg"
            <p>Category: ${category}</p>
            <p>Coast: ${coast}</p>
            <p>Magazine Size: ${magazineSize}</p>
            <p>Reload Time: ${reloadTime}</p>
            <p>Fire Rate: ${fireRate}</p>
            </div>`;

        })
        .catch((error) => {
            throw error;
        });

}

// SHOW ALL
function ajaxAll() {
    fetch(`https://valorant-api.com/v1/weapons`)
        .then((response) => {
            return response.json();
        })
        .then((weapon) => {
            console.log(weapon);

            let boxNum = 0;

            for (let i = 0; i < 5; i++) {
                let numberW = gridW1[i]
                let name = weapon.data[numberW].displayName;
                let pic = weapon.data[numberW].displayIcon;
                document.getElementById(`grid1`).innerHTML += `
                <div class="div${boxNum}"
                <div id="guns1">
                <h3>${name}</h3><br>
                <img src="${pic}">
                </div>
                </div>
                `;
                boxNum = boxNum + 1;
            }

            console.log(boxNum)
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 3; j++) {
                    let numberW = gridW2[i][j]
                    let name = weapon.data[numberW].displayName;
                    let pic = weapon.data[numberW].displayIcon;
                    document.getElementById(`grid2`).innerHTML += `
                    <div class="div${boxNum}"
                    <div id="guns2">
                    <h3>${name}</h3><br>
                    <img src="${pic}">
                    </div>
                    </div>
                    `;
                    boxNum = boxNum + 1;
                }
            }

        })
        .catch((error) => {
            throw error;
        });
}
function ajaxShowGunsForWeapon() {
    fetch(`https://valorant-api.com/v1/weapons`)
        .then((response) => {
            return response.json();
        })
        .then((weapon) => {
            console.log(weapon);

            for (let i = 0; i < 18; i++) {
                let name = weapon.data[i].displayName;
                let pic = weapon.data[i].displayIcon;
                document.getElementById('slideGuns').innerHTML += `
                            <div id="gun${i}" onclick="ajaxShowSkins(${i})"
                            <h3>${name}</h3>
                            <img src="${pic}">
                            </div>`;
            }

        })
        .catch((error) => {
            throw error;
        });
}
//SHOW SKINS
function ajaxShowSkins(id) {
    document.getElementById('slideSkins').innerHTML = ''
    fetch(`https://valorant-api.com/v1/weapons`)
        .then((response) => {
            return response.json();
        })
        .then((weapon) => {
            console.log(weapon);
            let gunLength = weapon.data[id].skins.length

            for (let i = 0; i < gunLength; i++) {
                let srcPic = weapon.data[id].skins[i].displayIcon
                document.getElementById('slideSkins').innerHTML += `
                <div id="skinsDesg">
                 <div id="skin${i}">
                 <img src="${srcPic}">
                 </div>
                 </div>
                `
            }


        })
        .catch((error) => {
            throw error;
        });
}
//BUTTON DAS WEAPONS ANZEIGEN
function buttonClicked() {
    document.getElementById('buttonToUnterS').style.display = 'none'
    document.getElementById('boxes').style.display = 'grid'

    document.querySelector('.more').style.display = 'flex'
}

//Weapons shown grid

//Weapons random
function randomW() {
    document.getElementById('randomW').style.display = "inline"
    document.getElementById('clickW').style.display = "none"
    document.getElementById('searchW').style.display = "none"

    document.getElementById('box1').style.opacity = "100%"
    document.getElementById('box2').style.opacity = "70%"
    document.getElementById('box3').style.opacity = "70%"

    let id = 18
    let random = Math.random()
    random = random * id
    random = Math.floor(random)

    ajaxRandom(random);
}
//Click Weapon
function clickW() {
    document.getElementById('randomW').style.display = "none"
    document.getElementById('clickW').style.display = "inline"
    document.getElementById('searchW').style.display = "none"

    document.getElementById('box1').style.opacity = "70%"
    document.getElementById('box2').style.opacity = "100%"
    document.getElementById('box3').style.opacity = "70%"
    currentWeapon = 0

    ajaxClick(currentWeapon)
}
function goRight() {
    currentWeapon = currentWeapon + 1;
    if (currentWeapon == 18) {
        currentWeapon = 0;
    }
    ajaxClick(currentWeapon)
}
function goLeft() {
    currentWeapon = currentWeapon - 1;
    if (currentWeapon == -1) {
        currentWeapon = 17;
    }
    ajaxClick(currentWeapon)
}
//Search Weapon
function searchW() {
    document.getElementById('randomW').style.display = "none"
    document.getElementById('clickW').style.display = "none"
    document.getElementById('searchW').style.display = "inline"

    document.getElementById('box1').style.opacity = "70%"
    document.getElementById('box2').style.opacity = "70%"
    document.getElementById('box3').style.opacity = "100%"
}

function submitSearch() {
    weapon = document.getElementById('inputF').value
    ajaxSearch(weapon)
}

// ALL Guns
function showAll() {
    document.getElementById('box1').style.display = 'none'
    document.getElementById('box2').style.display = 'none'
    document.getElementById('box3').style.display = 'none'
    document.getElementById('allGuns').style.display = 'grid'
    document.getElementById('skinsGuns').style.display = 'none'

    ajaxAll()
}

//SKINS
function showSkins() {
    document.getElementById('slideGuns').innerHTML = ''
    document.getElementById('box1').style.display = 'none'
    document.getElementById('box2').style.display = 'none'
    document.getElementById('box3').style.display = 'none'
    document.getElementById('allGuns').style.display = 'none'
    document.getElementById('skinsGuns').style.display = 'grid'

    ajaxShowGunsForWeapon()
}

function backStart() {
    location.reload();
}

