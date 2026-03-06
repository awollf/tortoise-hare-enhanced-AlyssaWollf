// when one of the animals reach the end of the track, show result

const startBtn = document.getElementById("startBtn");
const messageEl = document.getElementById("message");
const trackEl = document.getElementById("track");

const track_length = 70;

let tortoisePosition = 1;
let harePositon = 1;
let raceIntervalId = null;

startBtn.addEventListener("click", startRace);

// start race with button click
function startRace() {
    tortoisePosition = 1;
    harePosition = 1;

    messageEl.textContent = "Bang! And they are off!";

    startBtn.disabled = true;

    if (raceIntervalId !== null) {
        clearInterval(raceIntervalId);
    }

    // trigger the move tortoise and hare every second
    // run forward every second
    raceIntervalId = setInterval(raceStep, 1000);
}

function raceStep() {
    moveTortoise(); // move tortoise randomly

    moveHare(); // move hare randomly

    // fix the position if they go beyond the race track
    clampPosition();

    // render the track again with new positions
    renderTrack();

    // check finish
    if (tortoisePosition >= track_length || harePositon >= track_length) {
        clearInterval(raceIntervalId);
        raceInterval = null;
        startBtn.disabled = false;
        showResult();
    }
}

function moveTortoise() {
    // random integer 1-10
    let roll = Math.floor(Math.random() * 10) + 1;

    if (roll >= 1 && roll <= 5) {
        // 1-5 fast plod
        tortoisePosition += 4;
    } else if (roll >= 6 && roll <= 7) {
        // 6-7 slip
        tortoisePosition -= 5;
    } else {
        // 8-10 slow plod
        tortoisePosition += 1;
    }
}

function moveHare() {
    // random integer 1-10
    let roll = Math.floor(Math.random() * 10) + 1;

    if (roll >= 1 && roll <= 6) {
        // 1-5 fast plod
        harePosition += 4;
    } else if (roll >= 8 && roll <= 9) {
        // 6-7 slip
        harePosition -= 2;
    } else {
        // 8-10 slow plod
        harePosition += 8;
    }
}

function clampPosition() {
    // fit the position within the track
    const min_position = 1;
    const max_position = track_length;

    tortoisePosition = Math.min(
        max_position,
        Math.max(min_position, tortoisePosition),
    );

    harePosition = Math.min(max_position, Math.max(min_position, harePosition));
}

// render track with tortoise and hare emojis
function renderTrack() {
    trackEl.innerHTML = "";

    for (let i = 1; i <= track_length; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
    }

    const isTortoiseHere = tortoisePosition === i;
    const isHareHere = harePosition === i;

    if (isTortoiseHere && isHareHere) {
        cell.textcontent = "BOOM";
        cell.classList.add("both");
    } else if (isTortoiseHere) {
        cell.textContent = "TURTLE";
        cell.classList.add("tortoise");
    } else if (isHareHere) cell.textContent = "emoji";
    cell.classList.add("hare");
}
trackEl.appendChild(cell);

function showResult() {
    if (tortoisePosition >= track_length && harePosition >= track_length) {
        messageEl.textContent = "It's a tie!";
    } else if (tortoisePosition >= track_length) {
        messageEl.textContent = "Tortoise wins. Yay!";
    } else if (harePosition >= track_length) {
        messageEl.textContent = "Hare wins. Yuck!";
    } else {
        messageEl.textContent = "Race stopped.";
    }
}

renderTrack();
