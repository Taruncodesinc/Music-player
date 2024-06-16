const playPausebtn = document.getElementById("play");
const forward = document.getElementById("forward");
const rewind = document.getElementById("rewind");
const audioplayer = document.getElementById("audioPlayer");
const playedFor = document.getElementById("playing-for");

const audioSource = document.getElementById("audioSource");

const progressLine = document.getElementById('progress-line');
const progressCircle = document.getElementById('progress-circle');
const progressContainer = document.getElementById('progress-container');
const filled=document.getElementById('fill-div');
const img=document.getElementById("img");
var songNow = document.getElementById("song");
var artistNow = document.getElementById("artist");


var songs = [
  { name: "Fein", artist: "Travis Scott", url: "Fein.mp3",imgUrl:'fien.jpg' },
  { name: "Hawa Banke", artist: "Darshan Raval", url: "HawaBanke.mp3", imgUrl:'hawabanke.jpg' },
  {name:"Attention", artist:"Charlie Puth", url:"Attention.mp3",imgUrl:"attention.jpeg"},
  { name: "Ye Raaten Ye Mausam", artist: "Sanam", url: "yRYM.mp3", imgUrl:'yeRyem.jpeg' },
];



playPausebtn.addEventListener("click", togglePlayPause);
function togglePlayPause() {
 
  if (playPausebtn.classList.contains('play')) {
    audioplayer.play();
    playPausebtn.classList.remove('play');
    playPausebtn.classList.add('pause');
    playPausebtn.innerHTML = '<i class="ri-pause-line"></i>';
  
  } else {
    audioplayer.pause();
    playPausebtn.classList.remove('pause');
    playPausebtn.classList.add('play');
    playPausebtn.innerHTML = '<i class="ri-play-fill bg-purple-"></i>';
 
  }
}
// Time formatter
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
}

// Time updater
audioplayer.addEventListener("timeupdate", function () {
  playedFor.textContent = formatTime(audioplayer.currentTime);
});

// Song info updater
var currentSong = 0;
function updateSongInfo() {
  songNow.textContent = songs[currentSong].name;
  artistNow.textContent = songs[currentSong].artist;
  img.style.backgroundImage = `url(${songs[currentSong].imgUrl})`;
  img.style.opacity = 0;
  
  setTimeout(() => {
    img.style.backgroundImage = `url(${songs[currentSong].imgUrl})`;
    img.style.opacity = 1;
  }, 500); 
}

forward.addEventListener("click", function () {
  currentSong++;
  if (currentSong >= songs.length) {
    currentSong = 0;
  }
  audioSource.src = songs[currentSong].url;
  audioplayer.load();
  if (playPausebtn.classList.contains('pause')) {
    audioplayer.play();
  }
  updateSongInfo();
});

rewind.addEventListener("click", function () {
  currentSong--;
  if (currentSong < 0) {
    currentSong = songs.length - 1;
  }
  audioSource.src = songs[currentSong].url;
  audioplayer.load();
  if (playPausebtn.classList.contains('pause')) {
    audioplayer.play();
  }
  updateSongInfo();
});

updateSongInfo();


function updateProgressCircle() {
  const duration = audioplayer.duration;
  const currentTime = audioplayer.currentTime;
  const progress = currentTime / duration;
  const progressContainerWidth = progressContainer.offsetWidth;
  filled.style.width = `${progress * 100}%`;
  progressCircle.style.left = `${progress * progressContainerWidth}px`;


}
updateProgressCircle();  
// Function to seek in the audio
function seekAudio(event) {
  const progressContainerWidth = progressContainer.offsetWidth;
  const clickX = event.offsetX;
  const duration = audioplayer.duration;

  
  audioplayer.currentTime = (clickX / progressContainerWidth) * duration;
}

audioplayer.addEventListener('timeupdate', updateProgressCircle);
audioplayer.addEventListener('play', updateProgressCircle);
audioplayer.addEventListener('pause', updateProgressCircle);
audioplayer.addEventListener('ended', updateProgressCircle);

audioplayer.addEventListener('loadedmetadata', updateProgressCircle);


progressContainer.addEventListener('click', seekAudio);



updateProgressCircle() ;





// Seek

