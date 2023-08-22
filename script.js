
function circleMouseFollower () {
    window.addEventListener("mousemove", function (details) {
        // console.log(details)
        document.querySelector("#mini-circle").style.transform = `translate(${details.clientX}px, ${details.clientY}px )`
    })

}

function playPause () {
    if (audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play()
        document.querySelector("path").setAttribute("d", "M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z")
        document.getElementById(`${songIndex}`).name = "pause";
        document.getElementsByClassName("count")[songIndex].innerHTML = `<img class="n5XwsUqagSoVk8oMiw1x" width="14" height="14" alt="" src="play.gif">`;
        document.getElementById("artist").innerHTML = songs[songIndex].artist;
        document.getElementById("current-name").innerHTML = songs[songIndex].songName;
        document.getElementById("fixTime").innerHTML = songs[songIndex].duration;
    }
    else {
        audioElement.pause();
        document.querySelector("path").setAttribute("d", "M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z")
        document.getElementById(`${songIndex}`).name = "play";
        document.getElementsByClassName("count")[songIndex].innerHTML = songIndex + 1;
    }
}

function nextSong() {
    if (songIndex === songs.length - 1) {
        console.log(songIndex = 0)

        audioElement.currentTime = 0;
        console.log(songs[songIndex].filePath)
        audioElement.src = songs[songIndex].filePath;
        audioElement.play();
        makeAllPlay();
        document.getElementById("9").name = "pause";
        playPause();
        

        document.querySelector("#corrent-song-img").style.backgroundImage = `url("${songs[songIndex].coverPath}")`;

        
    }
    else{
        songIndex++;

        audioElement.currentTime = 0;
        console.log(songs[songIndex].filePath)
        audioElement.src = songs[songIndex].filePath;
        audioElement.play();
        makeAllPlay();
        document.getElementById(`${songIndex}`).name = "pause";
        playPause();
        

        document.querySelector("#corrent-song-img").style.backgroundImage = `url("${songs[songIndex].coverPath}")`;

    }
}

function previousSong() {
    if (songIndex === 0) {
        console.log(songIndex = songs.length - 1)

        audioElement.currentTime = 0;
        console.log(songs[songIndex].filePath)
        audioElement.src = songs[songIndex].filePath;
        audioElement.play();
        makeAllPlay();
        document.getElementById("9").name = "pause";
        playPause();
        


        document.querySelector("#corrent-song-img").style.backgroundImage = `url("${songs[songIndex].coverPath}")`;

        
    }
    else if (songIndex > 0) {
        songIndex--;

        audioElement.currentTime = 0;
        console.log(songs[songIndex].filePath)
        audioElement.src = songs[songIndex].filePath;
        audioElement.play();
        makeAllPlay();
        document.getElementById(`${songIndex}`).name = "pause";
        playPause();
        


        document.querySelector("#corrent-song-img").style.backgroundImage = `url("${songs[songIndex].coverPath}")`;

    }
}

function checkKey(e) {

    e = e || window.event;
   
    if (e.keyCode == '37') {
       // left arrow
       previousSong();
    }
    else if (e.keyCode == '39') {
       // right arrow
       nextSong();
    }
    else if (e.keyCode == '32') {
        // space bar
        playPause();
    }

}

circleMouseFollower()


// Initialize the variables
let songIndex = 0;
let audioElement = new Audio("songs/Chaleya.mp3")
let masterPlay = document.getElementById("masterPlay")
let progressBaar = document.getElementById("progressBaar")
let songItem = Array.from(document.querySelectorAll(".song"))
let fill =  document.querySelectorAll(".bar .fill")
let shuffle = document.querySelector("#shuffle-me")
let repeat = document.querySelector("#repeat")


document.onkeydown = checkKey;



progressBaar.addEventListener("input", () => {
    newTime = progressBaar.value * audioElement.duration/ 100;
    audioElement.currentTime = newTime;
});

audioElement.addEventListener("timeupdate", () => {
    const currentTime = audioElement.currentTime;
    const duration = audioElement.duration;

    const progress = parseInt((currentTime / duration) * 100);
    progressBaar.value = progress;
    fill[0].style.width = progressBaar.value + "%";

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        return formattedTime;
    };

    document.getElementById("timeUpdate").innerHTML = formatTime(currentTime);

    if (audioElement.currentTime === audioElement.duration) {
        if (repeat.classList.contains("on")){
            audioElement.currentTime = 0;
            audioElement.play();
        }
        else if (shuffle.classList.contains("on")){ 
            songIndex = Math.floor(Math.random() * songs.length);
            audioElement.currentTime = 0;
            console.log(songs[songIndex].filePath)
            audioElement.src = songs[songIndex].filePath;
            audioElement.play();
            makeAllPlay();
            document.getElementById(`${songIndex}`).name = "pause";
            playPause();
        


        document.querySelector("#corrent-song-img").style.backgroundImage = `url("${songs[songIndex].coverPath}")`;
        }
        else {
            nextSong();
        }
    }
});





let songs = [
    {songName:'Chaleya (From "Jawan")', duration: "3:20", artist:"Anirudh Ravichander, Arijit Singh, Shilpa Rao", filePath:"songs/Chaleya.mp3", coverPath:"song-img/Jawan.jpg"},
    {songName:'Apna Bana Le (From "Bhediya")', duration: "4:21", artist:"Arijit Singh", filePath:"songs/Apna Bana Le Bhediya.mp3", coverPath:"song-img/Bhediya-Hindi-apna-banale.jpg"},
    {songName:'Shayad (From "Love Aaj Kal 2")', duration: "4:07", artist:"Pritam, Arijit Singh", filePath:"songs/Shayad Love Aaj Kal.mp3", coverPath:"song-img/shayad.jpg"},
    {songName:'Pyaar Hota Kayi Baar Hai', duration: "3:36", artist:"Pritam, Arijit Singh, Amitabh Bhattacharya, Charan", filePath:"songs/Pyaar Hota Kayi Baar Hai Tu Jhoothi Main Makkaar.mp3", coverPath:"song-img/pyaar-hota-kayi-baar-hai.jpg"},
    {songName:'Ghodey Pe Sawar (From "Qala")', duration: "3:13", artist:"Amit Trivedi, Amitabh Bhattacharya, Sireesha Bhagavatula", filePath:"songs/Ghodey Pe Sawaar Qala.mp3", coverPath:"song-img/ghode-pe-sawaar.jpg"},
    {songName:'Rait Zara Si (From "Atrangi Re")', duration: "4:51", artist:"A.R. Rahman, Arijit Singh, Shashaa Tirupati", filePath:"songs/Rait Zara Si Atrangi Re.mp3", coverPath:"song-img/rait-zara-si.jpg"},
    {songName:'Tumhe Kitna Pyaar Karte (From "Bawal")', duration: "5:05", artist:"Mithoon, Arijit Singh, Manoj Muntashir", filePath:"songs/Tumhe Kitna Pyaar Karte Bawaal.mp3", coverPath:"song-img/tumhe-kitna-pyaar-karte.jpg"},
    {songName:'Tere Hawaale (From "Laal Singh Chaddha")', duration: "5:46", artist:"Pritam, Arijit Singh, Shilpa Rao", filePath:"songs/Tere Hawaale Laal Singh Chaddha.mp3", coverPath:"song-img/tere-hawale.jpg"},
    {songName:'Saazish (From "Dhindhora")', duration: "4:40", artist:"Rekha Bhardwaj, Bhuvan Bam", filePath:"songs/Saazish Dhindora.mp3", coverPath:"song-img/saazish.jpg"},
    {songName:'Besabriya (From "M.S. Dhoni")', duration: "4:15", artist:"Armaan Malik", filePath:"songs/Besabriyaan M.s. Dhoni The Untold Story.mp3", coverPath:"song-img/besabariya.jpg"}
]


// audioElement.play()

songItem.forEach((element, i) => {
    console.log(songs[i].coverPath);
    element.querySelector(".song-img").src = songs[i].coverPath;
    element.getElementsByClassName("song-name")[0].innerHTML = songs[i].songName;
    element.getElementsByClassName("makers")[0].innerHTML = songs[i].artist;
    element.querySelector("p").innerHTML = songs[i].duration;
    element.querySelector("h6").innerHTML = i + 1;  
})


// Handle play/pause click
masterPlay.addEventListener("click", () => {
    playPause();
})





function makeAllPlay() {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.name = "play"
    })
    for(var i=0; i<songs.length; i++) {
        document.getElementsByClassName("count")[i].innerHTML = i + 1
    }
}


Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener("click", (e) => {
        makeAllPlay()
        songIndex = parseInt(e.target.id)
        e.target.name = "pause";
        audioElement.currentTime = 0;
        audioElement.src = songs[songIndex].filePath;
        audioElement.play();
        playPause();
        

        document.querySelector("#corrent-song-img").style.backgroundImage = `url("${songs[songIndex].coverPath}")`;
    })
})

document.querySelector("#previouse").addEventListener("click", () => {
    previousSong();
})



document.querySelector("#next").addEventListener("click", () => {
    nextSong();
})







shuffle.addEventListener("click", toggleElementState);
repeat.addEventListener("click", toggleElementState);

function toggleElementState(event) {
    const clickedElement = event.target;
    const isShuffleOn = shuffle.classList.contains("on");
    const isRepeatOn = repeat.classList.contains("on");

    if (clickedElement === shuffle) {
        if (isShuffleOn) {
            shuffle.classList.remove("on");
            shuffle.classList.add("off");
            shuffle.style.color = "";
            console.log("shuffle off");
        } else {
            shuffle.classList.remove("off");
            shuffle.classList.add("on");
            shuffle.style.color = "#18cba4";
            console.log("shuffle on");
            if (isRepeatOn) {
                repeat.classList.remove("on");
                repeat.classList.add("off");
                repeat.style.color = "";
                console.log("repeat off");
            }
        }
    } else if (clickedElement === repeat) {
        if (isRepeatOn) {
            repeat.classList.remove("on");
            repeat.classList.add("off");
            repeat.style.color = "";
            console.log("repeat off");
        } else {
            repeat.classList.remove("off");
            repeat.classList.add("on");
            repeat.style.color = "#18cba4";
            console.log("repeat on");
            if (isShuffleOn) {
                shuffle.classList.remove("on");
                shuffle.classList.add("off");
                shuffle.style.color = "";
                console.log("shuffle off");
            }
        }
    }
}



