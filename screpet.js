const music_list = [
    {
      name: "Night Owl",
      artist: "Broke For Free",
      image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
      path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
    },
    {
      name: "Shipping Lanes",
      artist: "Chad Crouch",
      image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
      path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
    },
    {
        name: "Enthusiast",
        artist: "Tours",
        image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
        path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
    },
    {
        name:"Iayyayo Song",
        artist:"Paruthiveeran",
        image:"./image/1-1965990720.jpg",
        path:"./songs/Iayyayo Video Song _ Paruthiveeran.mp3"
    },
    {
        name:"Nizhalinai Nijamum Song",
        artist:"Raam",
        image:"./image/images.jpeg",
        path:"./songs/Nizhalinai Nijamum_Raam.mp3"
    },
    {
        name:"Tanka-Dunga Song",
        artist:"Paruthiveeran",
        image:"./image/1-1965990720.jpg",
        path:"./songs/Tanka-Dunga (1).mp3"
    }
  ];

// select the all element in HTML page Tags

let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let prev_track = document.querySelector(".prev-track");
let playpause_track = document.querySelector(".playpause-track"); 
let next_track = document.querySelector(".next-track"); 

let current_time = document.querySelector(".current-time");
let seek_slider = document.querySelector(".seek_slider");
let total_duration = document.querySelector(".total-duration");
let volume_slider = document.querySelector(".volume_slider");
// let count = 0 
// window.addEventListener("DOMContentLoaded",()=>{
//     creat_audio.src = music_list[count].path
//     track_artist.innerText =  music_list[count].artist
//     track_name.innerText = music_list[count].name

// })


// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// create by Element in Audio Tag
let creat_audio = document.createElement("audio");

// console.log(next_track);


function loadTrack(track_index){
// Clear the previous seek timer
    clearInterval(updateTimer);
    resetValue();

// Load a new track
    creat_audio.src = music_list[track_index].path;
    creat_audio.load();

// Update details of the track
    track_art.style.backgroundImage = "url("+music_list[track_index].image+")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;



    updateTimer = setInterval(seekUpdate, 1000);
    
    creat_audio.addEventListener("ended", nextTrack);
}




function resetValue(){

    current_time.textContent ="00:00";
    total_duration.textContent ="00:00";
    seek_slider.value ="0";
}

// Load the first track in the tracklist
loadTrack(track_index);


function playpauseTrack(){
    if (!isPlaying) {
        playTrack();


    }
    else{
        pauseTrack();
    }
}


function playTrack(){
    creat_audio.play();
    isPlaying = true;

    playpause_track.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    creat_audio.pause();
    isPlaying = false;

    playpause_track.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>'
}


function nextTrack() {
    if(track_index < music_list.length - 1){
        track_index +=1;
        // console.log(track_index);
    }
    else{
        track_index = 0;
        // console.log(track_index)
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if (track_index > 0) {
        track_index -=1;
        // console.log(track_index);
    }
    else{
        track_index = music_list.length - 1;
    }
    loadTrack(track_index);
    playTrack();
}

function seekTo(){

    let seekto = creat_audio.duration * (seek_slider.value / 100);

    creat_audio.currentTime = seekto;
}

function setVolume(){
    creat_audio.volume = volume_slider.value / 100;
}

function seekUpdate(){
    let seekPosition = 0;

    if(!isNaN(creat_audio.duration)){
    // Check if the current track duration is a legible number
        seekPosition  = creat_audio.currentTime * (100/creat_audio.duration);
        seek_slider.value = seekPosition;

    // Calculate the time left and the total duration
        let currentMinutes = Math.floor(creat_audio.currentTime / 60);
        let currentSeconds = Math.floor(creat_audio.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(creat_audio.duration / 60);
        let durationSeconds = Math.floor(creat_audio.duration - durationMinutes * 60);


    // Add a zero to the single digit time values
        if(currentSeconds <10){currentSeconds = "0"+currentMinutes;}
        if(durationSeconds <10){durationSeconds = "0"+durationSeconds;}
        if(currentMinutes <10){currentMinutes = "0"+currentMinutes;}
        if(durationMinutes <10){durationMinutes = "0"+durationMinutes;}


    // Display the updated duration
    current_time.textContent = currentMinutes+":"+currentSeconds;
    total_duration.textContent = durationMinutes+":"+durationSeconds;

    }
}



















































/*
let play = document.getElementById("play");

function playemusic(){
    let audio = new Audio("audio.mp3");
    audio.play()
}

play.addEventListener("click",playemusic);
*/
