let card = document.getElementById("card");
let colorPallete = document.getElementById("color-pallete");
let minutes = document.getElementById("minutes");
let interval = document.getElementById("interval");
let remaining = document.getElementById("remaining");
let action = document.getElementById("action");
let intervalController, counterIntervalController;
let intervalTime, breakTime, count;

disableButton(true);

window.addEventListener("load", () => {
    if (Notification.permission === "default") {
        Notification.requestPermission();
    };
    if (Notification.permission === "denied") {
        Notification.requestPermission();
        console.log("Please give permission by clicking icon beside url");
    };
});
colorPallete.addEventListener("click", (event) => {
    document.body.style.backgroundColor = event.target.style.backgroundColor;
});
minutes.addEventListener("change", () => {
    disableButton(false);
    intervalTime = getMinutes() * 1000 * 60;
    count = getMinutes() * 60;
    interval.innerText = (intervalTime / 1000) / 60;
    remaining.innerText = getRemainingTime();
});

action.addEventListener("click", startInterval);

function getMinutes() {
    return minutes.value;
}

function disableButton(state) {
    action.disabled = state;
}

function getRemainingTime() {
    if (count <= 60) {
        return `00:${count}`;
    }
    else {
        let minutes = Math.floor(count / 60);
        let seconds = Math.floor(count % 60);
        return `${minutes}:${seconds}`;
    }
}
function showNotification() {
    const notification = new Notification("Hey", {
        body: "Please, Take A Break"
    });
    //reset counter after notification
    clearInterval(counterIntervalController);
    action.innerText = "Start";
    count = getMinutes() * 60;
    remaining.innerText = getRemainingTime();
}

function startInterval() {
    if (action.innerText === "Start") {
        action.innerText = "Stop";
        setTimeout(showNotification, intervalTime);
        counterIntervalController = setInterval(updateCounter, 1000);
    }
    else {
        action.innerText = "Start";
        clearInterval(counterIntervalController);
        count = getMinutes() * 60;
        remaining.innerText = getRemainingTime();
    }
}

function updateCounter() {
    --count;
    remaining.innerText = getRemainingTime();
}
