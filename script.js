console.log("welcome");

//intitialse the variable
let songIndex=1;
let audioElement = new Audio("songs/1.mp3");

//masterPlay → play/pause button
//myProgressBar → range slider (seek bar)
//gif → playing animation
//songItems → saare song rows (NodeList ko Array me convert kiya)
//Array.from() isliye use hua kyunki forEach lagana hai

let masterPlay=document.getElementById("masterPlay");
let myProgressBar=document.getElementById("myProgressBar");
let gif=document.getElementById("gif");
let songItems=Array.from(document.getElementsByClassName("songItem"));
let masterSongName=document.getElementById("masterSongName");



let songs = [
    { songName: "Let me love you", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "hawayein", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Bandeya Rey Bandeya", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Gehra Hua / Dhurandhar", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Agar Tum Sath Ho ", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Satranga ", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Teri Deewani", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Bhula Dena", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Tauba Tauba", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Chaleya", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
  ];

 // forEach array ke har item pe ek-ek baar loop chalata hai
 //arr.forEach((item, index)     //syntax
songItems.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;

})

// audioElement.play();

//handle Play/pause click
masterPlay.addEventListener("click",()=>{
    if (audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity=1;

    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity=0;

    }
})

//update seekbar
audioElement.addEventListener("timeupdate",()=>{
    //currentTime → kitna song chal chuka
    //duration → total song length
    let progress=parseInt((audioElement.currentTime/audioElement.duration)*100); //in percent 
    myProgressBar.value=progress;
    //Song chalne ke sath slider bhi move karta hai

})

//Seek bar se song control karna
myProgressBar.addEventListener("change",()=>{
    audioElement.currentTime=(myProgressBar.value * audioElement.duration)/100;
})

//Har song ke play icon ko:
//pause htao and play lgao
const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>
    element.addEventListener("click",(e)=>{
        makeAllPlays();

        audioElement.pause();          // 🔥 ADD
        audioElement.currentTime = 0;  // 🔥 ADD

        songIndex = parseInt(e.target.id);

        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");

        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerHTML = songs[songIndex-1].songName;

        audioElement.play();
        gif.style.opacity = 1;

        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
    })
);


document.getElementById("next").addEventListener("click",()=>{
    audioElement.pause(); 
    audioElement.currentTime=0;
    if (songIndex>=10){
        songIndex=1;

    }
    else{
        songIndex+=1;

    }
    audioElement.src=`songs/${songIndex}.mp3`;
    audioElement.load();
    masterSongName.innerHTML=songs[songIndex-1].songName;
    
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})

document.getElementById("previous").addEventListener("click",()=>{
    audioElement.pause(); 
    audioElement.currentTime=0;
    if (songIndex<=1){
        songIndex=1;

    }
    else{
        songIndex-=1;

    }
   
    audioElement.src=`songs/${songIndex}.mp3`;
    audioElement.load();
    masterSongName.innerHTML=songs[songIndex-1].songName;
    
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})
