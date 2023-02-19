// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;
// Create the audio element for the player
let curr_track = document.createElement('audio');
let curr_bpm
let randomColors;
// Define the list of tracks that have to be played
let track_list = [{
    name: "Paro Hour",
    artist: "Luciid",
    image: "./images/parohour.jpg",
    path: "music/Luciid-Paro_Hour.mp3",
    bpm: 400
},
{
    name: "Lumina",
    artist: "Exodia",
    image: "./images/exodia.jpg",
    path: "music/Lumina[DY-006].mp3",
    bpm: 343

},

{
    name: "Crust",
    artist: "Flying Lotus",
    image: "./images/flyinglotus.png",
    path: "music/Crust.mp3",
    bpm: 561


},
{
    name: "Blood Sugar",
    artist: "Pendulum",
    image: "./images/pendulum.jpg",
    path: "music/BloodSugar.mp3",
    bpm: 371

}];
let randomColor;
loadTrack(track_index)



function loadTrack(track_index) {
    // Clear the previous seek timer

    clearInterval(updateTimer);
    resetValues();
    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    // Update details of the track
    curr_bpm = track_list[track_index].bpm;
    track_art.style.backgroundImage =
        "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent =
        "PLAYING " + (track_index + 1) + " OF " + track_list.length;
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
    // Apply a random background color
    randomRGBColor();
    //Start canvas video


}
// function random_bg_color() {
//     // Get a random number between 64 to 256
//     // (for getting lighter colors)
//     let red = Math.floor(Math.random() * 256) + 64;
//     let green = Math.floor(Math.random() * 256) + 64;
//     let blue = Math.floor(Math.random() * 256) + 64;
//     // Construct a color withe the given values
//     let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
//     // Set the background to the new color
//     // document.body.style.background = bgColor;
// }
function randomRGBColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    const colors = [red, green, blue];
    colors[Math.floor(Math.random() * 3)] = 255;

    randomColor = "rgb(" + colors[0] + "," + colors[1] + "," + colors[2] + ")";
    document.querySelector('.player').style.boxShadow = `0 4px 30px ${randomColor}`;
}
// Function to reset all values to their default
function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;

    clearInterval(randomColors)

}
function playpauseTrack() {
    // Switch between playing and pausing
    // depending on the current state
    if (!isPlaying) playTrack();
    else pauseTrack();
}
function playTrack() {
    // Play the loaded track
    curr_track.play();
    isPlaying = true;
    // Replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    randomColors = setInterval(randomRGBColor, curr_bpm)

    startCanvasVideo()
}
function pauseTrack() {
    clearInterval(randomColors)
    // Pause the loaded track
    curr_track.pause();
    isPlaying = false;
    // Replace icon with the play icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {

    // Go back to the first track if the
    // current one is the last in the track list
    if (track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;
    // Load and play the new track
    delCanvas()

    loadTrack(track_index);
    playTrack();
}
function prevTrack() {

    // Go back to the last track if the
    // current one is the first in the track list
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length - 1;
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
    seekto = curr_track.duration * (seek_slider.value / 100);
    // Set the current track position to the calculated seek position
    curr_track.currentTime = seekto;
}
function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    curr_track.volume = volume_slider.value / 100;
}
function seekUpdate() {
    let seekPosition = 0;
    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;
        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
        // Add a zero to the single digit time values
        if (currentSeconds < 10) {
            currentSeconds = "0" + currentSeconds;
        }
        if (durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
        }
        if (currentMinutes < 10) {
            currentMinutes = "0" + currentMinutes;
        }
        if (durationMinutes < 10) {
            durationMinutes = "0" + durationMinutes;
        }
        // Display the updated duration
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

//CANVAS
const canvas = document.getElementById("spectrum");
const ctx = canvas.getContext("2d");
//SPECTRUM
function startCanvasVideo() {

    const audio = curr_track;
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function renderFrame() {
        requestAnimationFrame(renderFrame);
        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = "rgb(29, 24, 24, 1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];

            ctx.fillStyle = randomColor

            ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

            x += barWidth + 1;
        }
    }

    audio.addEventListener("play", renderFrame);
}
function delCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
let isPlaylistCreated = false
function testClick() {
    if (!isPlaylistCreated) {
        track_list.forEach((track, index) => {

            let trackElement = document.createElement('ul');
            trackElement.innerHTML = `<div class="trackList" ><h3 data-bs-dismiss="modal">${track.name} - ${track.artist} </h3></div>`;
            isPlaylistCreated = true
            trackElement.addEventListener("click", () => {
                track_index = index;
                loadTrack(track_index);
                playTrack();
            });
            trackListElement.appendChild(trackElement);

        });
    }
}


function playRandom() {
    let new_track_index = track_index;
    while (new_track_index === track_index) {
      new_track_index = Math.floor(Math.random() * track_list.length);
    }
    loadTrack(new_track_index);
    playTrack();
  }