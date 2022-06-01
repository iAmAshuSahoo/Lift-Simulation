let floorInput = document.querySelector("#floor-input");
let liftInput = document.querySelector("#lift-value");
let simulateBtn = document.querySelector("#simulate");
let floorsPos = document.querySelector("#floors");
let resetBtn = document.querySelector("#reset");
let navPos = document.querySelectorAll(".navigation-buttons");
let liftsPosition = document.querySelectorAll(".lifts");

let noOfFloor, noOfLift;

floorInput.addEventListener("change", function changeValue(e) {
    noOfFloor = parseInt(e.target.value);
});

liftInput.addEventListener("change", function changeValue(e) {
    noOfLift = parseInt(e.target.value);
});

simulateBtn.addEventListener("click", generateFloor);

resetBtn.addEventListener("click", function resetState () {
    noOfFloor = 0;
    noOfLift = 0;
    generateFloor();
});

function generateFloor() {
    let floors = "";
    for (let index = noOfFloor; index > 0; index--) {
        floors = floors.concat(`<section class="floor-component">
            <div class="floor-height">
                <div class="navigation-buttons"></div>
                <div class="lifts"></div>
            </div>
            <div class="floor-number">Floor ${index}</div>
        </section>`);
    }
    floorsPos.innerHTML = floors;
    if (noOfLift >= 1) {
        generateLifts();
    }
    if (noOfFloor >= 1) {
        generateNavigation();
    }
    floorInput.value = "";
    liftInput.value = "";
}

function generateLifts () {
    liftsPosition = document.querySelectorAll(".lifts");
    let lifts = ""
    for (let index = noOfLift; index > 0; index--) {
        lifts = lifts.concat(`<div class="lift"></div>`)
    }
    liftsPosition[liftsPosition.length-1].innerHTML = lifts;
}

function generateNavigation () {
    navPos = document.querySelectorAll(".navigation-buttons");
    for (let index = noOfFloor; index > 0; index--) {
        let nav = ""
        if (index === 1) {
            if (noOfFloor != 1) {
                nav = nav.concat(`<div class="down navigate">Down</div>`)
            }
        }
        else if (index == noOfFloor) {
            nav = nav.concat(`<div class="up navigate">Up</div>`)
        }
        else {
            nav = nav.concat(`<div class="up navigate">Up</div>
            <div class="down navigate">Down</div>`)
        }
        navPos[index-1].innerHTML = nav
    }
}
