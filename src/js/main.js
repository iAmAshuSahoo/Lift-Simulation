let floorInput = document.querySelector("#floor-input");
let liftInput = document.querySelector("#lift-value");
let simulateBtn = document.querySelector("#simulate");
let message = document.querySelector("#message");
let floorsPos = document.querySelector("#floors");
let resetBtn = document.querySelector("#reset");
let navPos = document.querySelectorAll(".navigation-buttons");
let liftsPosition = document.querySelectorAll(".lifts");
let liftDoor = document.querySelector(".lift-door");
let stateStore = document.querySelector("#state-store");
let allLifts = document.querySelectorAll(".lift");
let allLiftsPosObj = [];

let prevLiftIndex;

let up = document.querySelectorAll("#up");
let down = document.querySelectorAll("#down");
// console.log(up);

let noOfFloor, noOfLift;

function disableSimulate () {
    if ((!noOfFloor || noOfFloor < 1) && (!noOfLift || noOfLift < 1)) {
        simulateBtn.disabled = true;
        resetBtn.disabled = true;
    } else {
        simulateBtn.disabled = false;
        resetBtn.disabled = false;    
    }
}

disableSimulate();

floorInput.addEventListener("change", function changeValue(e) {
    noOfFloor = parseInt(e.target.value);
    disableSimulate();
});

liftInput.addEventListener("change", function changeValue(e) {
    noOfLift = parseInt(e.target.value);
    disableSimulate();
});

simulateBtn.addEventListener("click", simulateBtnAction);

message.addEventListener('click', function showUserBox () {
    stateStore.style.display = "flex";
    message.innerText = "";
})

resetBtn.addEventListener("click", function resetState () {
    noOfFloor = 0;
    noOfLift = 0;
    allLifts.innerHTML = "";
    generateFloor();
    disableSimulate();
});

// lift: div.lift
// pos: 2
// prevPos: 2
function upEvent () {
    up && up.length > 0 && up.forEach ((item, index) => {
        item.addEventListener("click", function upAction () {
            console.log("Hi", item, index);
            let diffArray = [];
            allLiftsPosObj.forEach(liftObj => {
                diffArray.push(Math.abs(liftObj.pos - (index+1)));
            });
            let minIndex = diffArray.indexOf(Math.min(...diffArray));
            if (allLiftsPosObj[minIndex+1] && (allLiftsPosObj[minIndex].visited > allLiftsPosObj[minIndex+1].visited)) {      // < (Math.floor(allLiftsPosObj.length/2))
                minIndex+=1;
            }  
            allLiftsPosObj[minIndex].pos = index + 1;
            allLiftsPosObj[minIndex].visited += 1;
            console.log(allLiftsPosObj, diffArray, diffArray.indexOf(Math.min(...diffArray)));
            let wait = (Math.abs(allLiftsPosObj[minIndex].pos - allLiftsPosObj[minIndex].prevPos)) * 2;
            
            allLiftsPosObj[minIndex].shiftLiftUp (index, wait, up.length - 1);
        });
    });
} 

function shiftLiftUp (ind, wait, navLength) {

    console.log("tran time" , wait, "sec");
    console.log(wait," sec");
    this.lift.style.transform = `translate(0, ${(navLength - ind) * -8.2}rem)`
    this.lift.style.transitionDuration = `${wait}s`;
    this.prevPos = this.pos;
    openDoor(this, wait)
    this.lift.childNodes[0].classList.remove("open-lift");
}

async function openDoor(that, ind) {
    // Await for the promise to resolve
    await new Promise((resolve) => {
        setTimeout(() => {
            // Resolve the promise
            // console.log(ind)
            let liftDoorEvent = that.lift.childNodes[0];
            liftDoorEvent.classList.add("open-close-duration");
            liftDoorEvent.classList.add("open-lift");
            resolve();  

        }, ind*1000);
    });
    // console.log('hi');
}

function downEvent () {
    down && down.length > 0 && down.forEach ((item, index) => {
        item.addEventListener("click", function downAction () {
            console.log("Hi", item, index);
            let diffArray = [];
            allLiftsPosObj.forEach(liftObj => {
                diffArray.push(Math.abs(liftObj.pos - index));
            });
            let minIndex = diffArray.indexOf(Math.min(...diffArray));
            if (allLiftsPosObj[minIndex+1] && (allLiftsPosObj[minIndex].visited > allLiftsPosObj[minIndex+1].visited)) {      // < (Math.floor(allLiftsPosObj.length/2))
                minIndex+=1;
            }  

            allLiftsPosObj[minIndex].pos = index;
            allLiftsPosObj[minIndex].visited += 1;
            console.log(allLiftsPosObj, diffArray, diffArray.indexOf(Math.min(...diffArray)));
            let wait = (Math.abs(allLiftsPosObj[minIndex].pos - allLiftsPosObj[minIndex].prevPos)) * 2;
            allLiftsPosObj[minIndex].shiftLiftUp (index, wait, down.length);
        });
    });
} 

function simulateBtnAction () {
    allLiftsPosObj.length = 0;
    generateFloor ();
    hideUserBox ();
}

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
    up = document.querySelectorAll("#up");
    down = document.querySelectorAll("#down");
    upEvent();
    downEvent();
}

function hideUserBox () {
    stateStore.style.display = "none";
    message.innerText = "Show Simulation Box";
}

function generateLifts () {
    liftsPosition = document.querySelectorAll(".lifts");
    let lift = document.createElement("div");
    lift.className = "lift";
    let liftDoorDiv = document.createElement("div");
    liftDoorDiv.className = "lift-door";
    lift.append(liftDoorDiv);  // adding new div inside div
    
    for (let index = noOfLift; index > 0; index--) {
        liftsPosition[liftsPosition.length - 1].appendChild(lift.cloneNode(true));
    }
    // liftsPosition[liftsPosition.length-1].innerHTML = lifts;
    allLifts = document.querySelectorAll(".lift");
    liftDoor = document.querySelector(".lift-door");
    allLifts && allLifts.length > 0 &&
    allLifts.forEach(lift => {
        allLiftsPosObj.push({
            lift: lift,
            pos: liftsPosition.length - 1,
            prevPos: liftsPosition.length - 1,
            visited: 0,
            shiftLiftUp
        })
    })
    // console.log(lift, liftsPosition, allLifts);
}

function generateNavigation () {
    navPos = document.querySelectorAll(".navigation-buttons");
    for (let index = noOfFloor; index > 0; index--) {
        let nav = ""
        if (index === 1) {
            if (noOfFloor != 1) {
                nav = nav.concat(`<div id="down" class="navigate">Down</div>`)
            }
        }
        else if (index == noOfFloor) {
            nav = nav.concat(`<div id="up" class="navigate">Up</div>`)
        }
        else {
            nav = nav.concat(`<div id="up" class="navigate">Up</div>
            <div id="down" class="navigate">Down</div>`)
        }
        navPos[index-1].innerHTML = nav
    }
}
