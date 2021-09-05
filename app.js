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
        body: "Please, Take A Break",
    });
    //reset counter after notification
    count = getMinutes() * 60;
    remaining.innerText = getRemainingTime();
}

function startInterval() {
    if (action.innerText === "Start") {
        action.innerText = "Stop";
        intervalController = setInterval(showNotification, intervalTime);
        counterIntervalController = setInterval(updateCounter, 1000);
    }
    else {
        action.innerText = "Start";

        clearInterval(intervalController);
        clearInterval(counterIntervalController);
        count = getMinutes() * 60;
        remaining.innerText = getRemainingTime();
    }
}

function updateCounter() {
    --count;
    remaining.innerText = getRemainingTime();
}
