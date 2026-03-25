let currentSession = null;
let sessionStartTime = null;
let phase = 0;
let lastTimestamp = 0;
let elapsedTime = 0;
let lastSecond = -1;
let currentSecond = 0;
let animationId;
let canvas;
let ctx;
let audioUnlocked = false;

const audioElements = {};

const COLORS = {
    orange: [248,196,113],
    green: [0,255,127],
    blue: [135,206,235],
    purple: [153,50,204],
    black: [0,0,0]
};

const session01Timeline = [ { time:0,  startFreq:0.3, endFreq:4.0, duration:90, color: COLORS.orange  },
                            { time:90,  startFreq:4.0, endFreq:8.0,  duration: 90, color: COLORS.green },
                            { time:180, startFreq:8.0,   endFreq:8.0,   duration: 90, color: COLORS.blue },
                            { time:270,  startFreq:8.0, endFreq:5.0,  duration: 120, color: COLORS.green },
                            { time:390, startFreq:5.0,   endFreq:3.5,   duration: 90, color: COLORS.green },
                            { time:480, startFreq:3.5,   endFreq:0.3,   duration: 126, color: COLORS.orange }
                          ];  //time new line = time previous line + duration previous line

const session02Timeline = [ { time:0,  startFreq:0.28, endFreq:0.84, duration:30, color: COLORS.orange  },
                            { time:30,  startFreq:0.84, endFreq:6.72,  duration: 30, color: COLORS.green },
                            { time:60,  startFreq:6.72, endFreq:6.72,  duration: 90, color: COLORS.blue },
                            { time:150, startFreq:6.72,   endFreq:0.42,   duration: 78, color: COLORS.green },

                            { time:228,  startFreq:0.42, endFreq:0.84, duration:30, color: COLORS.orange  },
                            { time:258,  startFreq:0.84, endFreq:6.72,  duration: 30, color: COLORS.green },
                            { time:288,  startFreq:6.72, endFreq:6.72,  duration: 90, color: COLORS.blue },
                            { time:378, startFreq:6.72,   endFreq:0.42,   duration: 78, color: COLORS.green },

                            { time:456,  startFreq:0.42, endFreq:0.84, duration:30, color: COLORS.orange  },
                            { time:486,  startFreq:0.84, endFreq:6.72,  duration: 30, color: COLORS.green },
                            { time:516,  startFreq:6.72, endFreq:6.72,  duration: 90, color: COLORS.blue },
                            { time:606, startFreq:6.72,   endFreq:0.28,   duration: 79, color: COLORS.orange }
                          ];  //time new line = time previous line + duration previous line

const session03Timeline = [ { time:0,  startFreq:0.2, endFreq:3.0, duration:45, color: COLORS.orange  },
                            { time:45,  startFreq:3, endFreq:6.5,  duration: 45, color: COLORS.orange },
                            { time:90,  startFreq:6.5, endFreq:6.5,  duration: 310, color: COLORS.green },
                            { time:400, startFreq:6.5,   endFreq:6.5,   duration: 175, color: COLORS.green },
                            { time:575,  startFreq:6.5, endFreq:6.5,  duration: 175, color: COLORS.blue },
                            { time:750, startFreq:6.5,   endFreq:4.0,   duration: 200, color: COLORS.blue },
                            { time:950, startFreq:4.0,   endFreq:0.5,   duration: 100, color: COLORS.orange }
                          ];  //time new line = time previous line + duration previous line

const session04Timeline = [ { time:0,  startFreq:0.2, endFreq:2.0, duration:60, color: COLORS.orange  },
                            { time:60,  startFreq:2, endFreq:5,  duration: 60, color: COLORS.green },
                            { time:120,  startFreq:5, endFreq:5, duration:90, color: COLORS.blue  },
                            { time:210,  startFreq:5, endFreq:3,  duration: 75, color: COLORS.blue },
                            { time:285, startFreq:3,   endFreq:0.2,   duration: 70, color: COLORS.orange }
                          ];  //time new line = time previous line + duration previous line

let currentStepIndex = 0;

const sessions = {

    session01: {
        audio: "audio/track1.mp3"
    },

    session02: {
        audio: "audio/track2.mp3"
    },

    session03: {
        audio: "audio/track3.mp3"
    },

    session04: {
        audio: "audio/track4.mp3"
    }

};

const checkbox = document.getElementById("agreeCheck");
const buttons = document.querySelectorAll(".session-buttons button");

checkbox.addEventListener("change", () => {

    buttons.forEach(btn => {
        btn.disabled = !checkbox.checked;
    });

    if (checkbox.checked) {
        preloadAudio();

        // small delay helps ensure audio is ready before unlock
        setTimeout(() => {
            unlockAudio();
        }, 400);
    }

});

function startSession(type){
    currentSession = type;
    sessionStartTime = performance.now();
    phase = 0;
    currentStepIndex = 0;
    document.getElementById("overlay").style.display = "none";
    canvas = document.getElementById("sessionCanvas");
    canvas.style.display = "block";
    canvas.onclick = stopSession;
    canvas.ontouchstart = stopSession;
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    animate();
    console.log("Starting session:", type);

    startAudio();
}

function stopSession(){

    const canvas = document.getElementById("sessionCanvas");
    const overlay = document.getElementById("overlay");

    // ✅ stop audio FIRST
    const audio = audioElements[currentSession];
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }

    // then reset state
    currentSession = null;
    sessionStartTime = null;
    elapsedTime = 0;
    lastSecond = -1;

    cancelAnimationFrame(animationId);

    canvas.style.display = "none";
    overlay.style.display = "flex";
}

function startAudio(){

    const audio = audioElements[currentSession];

    if (!audio) return;

    audio.loop = true;  // ✅ always loop (timeline or touching screen determines when audio stops)
    audio.currentTime = 0;

    audio.play().catch(err => {
        console.log("Audio play failed:", err);
    });

}

function animate(timestamp){

    if(typeof timestamp !== "number"){
        animationId = requestAnimationFrame(animate);
        return;
    }

    if(sessionStartTime === null){
        sessionStartTime = timestamp;
    }

    if (lastTimestamp === null) {
        lastTimestamp = timestamp;
        requestAnimationFrame(animate);
        return;
    }

    elapsedTime = (timestamp - sessionStartTime)/1000;
    let deltaTime = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;
    // clamp
    deltaTime = Math.min(deltaTime, 0.05);

    currentSecond = Math.floor(elapsedTime);

    if(currentSecond !== lastSecond){
        console.log("seconds interval:", currentSecond);
        lastSecond = currentSecond;
    }
    //console.log("elapsedTime", elapsedTime);
    //console.log("deltaTime", deltaTime);

    switch(currentSession){

        case "session01":
            animateSession01(elapsedTime, deltaTime);
            break;

        case "session02":
            animateSession02(elapsedTime, deltaTime);
            break;

        case "session03":
            animateSession03(elapsedTime, deltaTime);
            break;

        case "session04":
            animateSession04(elapsedTime, deltaTime);
            break;

    }

    animationId = requestAnimationFrame(animate);
}


function animateSession01(elapsedTime, deltaTime){
    let maxRed;
    let maxGreen;
    let maxBlue;
    let scaleRed;
    let scaleGreen;
    let scaleBlue;
    let startTime;
    let duration;
    let startFreq;
    let endFreq;
    let currentStep;


    if (elapsedTime < ((session01Timeline[session01Timeline.length-1].time)+(session01Timeline[session01Timeline.length-1].duration)) && (currentStepIndex < session01Timeline.length)) {
        currentStep = session01Timeline[currentStepIndex];
        startTime = currentStep.time;
        duration = currentStep.duration; //units of seconds, not milliseconds
        startFreq = currentStep.startFreq;
        endFreq = currentStep.endFreq;
        maxRed = currentStep.color[0];
        maxGreen = currentStep.color[1];
        maxBlue = currentStep.color[2];
        pulseColor(elapsedTime, deltaTime, startTime, duration, startFreq, endFreq, maxRed, maxGreen, maxBlue);
        if (elapsedTime >= (currentStep.time + currentStep.duration) && (currentStepIndex < session01Timeline.length-1) ) {
            currentStepIndex = currentStepIndex + 1;

        }
    }else{
        stopSession();
        return;
    }

}


function animateSession02(elapsedTime, deltaTime){
    let maxRed;
    let maxGreen;
    let maxBlue;
    let scaleRed;
    let scaleGreen;
    let scaleBlue;
    let startTime;
    let duration;
    let startFreq;
    let endFreq;
    let currentStep;


    if (elapsedTime < ((session02Timeline[session02Timeline.length-1].time)+(session02Timeline[session02Timeline.length-1].duration)) && (currentStepIndex < session02Timeline.length)) {
        currentStep = session02Timeline[currentStepIndex];
        startTime = currentStep.time;
        duration = currentStep.duration; //units of seconds, not milliseconds
        startFreq = currentStep.startFreq;
        endFreq = currentStep.endFreq;
        maxRed = currentStep.color[0];
        maxGreen = currentStep.color[1];
        maxBlue = currentStep.color[2];
        pulseColor(elapsedTime, deltaTime, startTime, duration, startFreq, endFreq, maxRed, maxGreen, maxBlue);
        if (elapsedTime >= (currentStep.time + currentStep.duration) && (currentStepIndex < session02Timeline.length-1) ) {
                currentStepIndex = currentStepIndex + 1;

        }
    }else{
        stopSession();
        return;
         }

}

function animateSession03(elapsedTime, deltaTime){
    let maxRed;
    let maxGreen;
    let maxBlue;
    let scaleRed;
    let scaleGreen;
    let scaleBlue;
    let startTime;
    let duration;
    let startFreq;
    let endFreq;
    let currentStep;


    if (elapsedTime < ((session03Timeline[session03Timeline.length-1].time)+(session03Timeline[session03Timeline.length-1].duration)) && (currentStepIndex < session03Timeline.length)) {
        currentStep = session03Timeline[currentStepIndex];
        startTime = currentStep.time;
        duration = currentStep.duration; //units of seconds, not milliseconds
        startFreq = currentStep.startFreq;
        endFreq = currentStep.endFreq;
        maxRed = currentStep.color[0];
        maxGreen = currentStep.color[1];
        maxBlue = currentStep.color[2];
        pulseColor(elapsedTime, deltaTime, startTime, duration, startFreq, endFreq, maxRed, maxGreen, maxBlue);
        if (elapsedTime >= (currentStep.time + currentStep.duration) && (currentStepIndex < session03Timeline.length-1) ) {
            currentStepIndex = currentStepIndex + 1;

        }
    }else{
        stopSession();
        return;
    }

}


function animateSession04(elapsedTime, deltaTime){
    let maxRed;
    let maxGreen;
    let maxBlue;
    let scaleRed;
    let scaleGreen;
    let scaleBlue;
    let startTime;
    let duration;
    let startFreq;
    let endFreq;
    let currentStep;


    if (elapsedTime < ((session04Timeline[session04Timeline.length-1].time)+(session04Timeline[session04Timeline.length-1].duration)) && (currentStepIndex < session04Timeline.length)) {
        currentStep = session04Timeline[currentStepIndex];
        startTime = currentStep.time;
        duration = currentStep.duration; //units of seconds, not milliseconds
        startFreq = currentStep.startFreq;
        endFreq = currentStep.endFreq;
        maxRed = currentStep.color[0];
        maxGreen = currentStep.color[1];
        maxBlue = currentStep.color[2];
        pulseColor(elapsedTime, deltaTime, startTime, duration, startFreq, endFreq, maxRed, maxGreen, maxBlue);
        if (elapsedTime >= (currentStep.time + currentStep.duration) && (currentStepIndex < session04Timeline.length-1) ) {
            currentStepIndex = currentStepIndex + 1;

        }
    }else{
        stopSession();
        return;
    }

}

function pulseColor(elapsedTime, deltaTime, startTime, duration, startFreq, endFreq, maxRed, maxGreen, maxBlue){
    //If you don't want the frequency to ramp up or down to a different frequency,
    //then just make startFreq = endFreq'

    let t = (elapsedTime - startTime);

    let progress = Math.min(t/duration, 1);

    let freq = startFreq + progress * (endFreq - startFreq);
    //phase shift of -Pi/2 makes initial value of sineValue = 0.5( 1 + -1) = 0, or black screen
    let sineValue = 0.5 * (
        1 + Math.sin(phase - Math.PI / 2)
    );

    //if the frequency is changing (f(t)), you can't just plug the new frequency into that static formula.
    //Instead, the phase at any time t is the accumulation of all the "cycles" that have happened up to that point:
    phase = (phase + (2 * Math.PI * freq * deltaTime)) % (2 * Math.PI);
    let r = Math.round(sineValue * maxRed);
    let g = Math.round(sineValue * maxGreen);
    let b = Math.round(sineValue * maxBlue);

    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function preloadAudio() {
    Object.keys(sessions).forEach(key => {
        const audio = new Audio();
        audio.src = sessions[key].audio;
        audio.preload = "auto";
        audio.load();
        audioElements[key] = audio;
    });
}

function unlockAudio() {
    if (audioUnlocked) return;

    Object.values(audioElements).forEach(audio => {
        audio.play().then(() => {
            audio.pause();
            audio.currentTime = 0;
        }).catch(() => {});
    });

    audioUnlocked = true;
}
