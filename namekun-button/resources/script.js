window.onload = () => {
    var audioElement = new Audio();
    var audioLoop = false;
    document.querySelectorAll(".button").forEach(element => {
        element.addEventListener("click", e => {
            audioElement.pause();
            audioElement = new Audio(`./audio/${element.id}.mp3`);
            audioElement.play();
            audioElement.loop = audioLoop;

            //時間取得
            audioElement.addEventListener("timeupdate", e => {
                var minutes = `${parseInt(audioElement.duration / 60)}`;
                var seconds = `${parseInt(audioElement.duration % 60)}`;
                if(seconds.length == 1) {
                    seconds = `0${seconds}`;
                }
                if(minutes.length == 1) {
                    minutes = `0${minutes}`;
                }
                document.getElementById("length").innerHTML = `${minutes}:${seconds}`;

                minutes = `${parseInt(audioElement.currentTime / 60)}`;
                seconds = `${parseInt(audioElement.currentTime % 60)}`;
                if(seconds.length == 1) {
                    seconds = `0${seconds}`;
                }
                if(minutes.length == 1) {
                    minutes = `0${minutes}`;
                }


                document.getElementById("currentpos").innerHTML = `${minutes}:${seconds}`
                document.getElementById("play-position").value = (audioElement.currentTime / audioElement.duration);
            })
            audioElement.addEventListener("ended", () => {
                audioElement =  new Audio();
            })            
        })
    })
    document.getElementById("togglePlay").addEventListener("click", () => {
        if(!audioElement.paused) {
            audioElement.pause()
            document.getElementById("togglePlay").innerHTML = `<div id="togglePlay"><span class="material-icons">play_arrow</span></div>`
        } else {
            audioElement.play();
            document.getElementById("togglePlay").innerHTML = `<div id="togglePlay"><span class="material-icons">pause</span></div>`
        }
    })
    document.getElementById("toggleLoop").addEventListener("click", () => {
        if(audioElement.loop) {
            audioElement.loop = false;
            audioLoop = false;
            document.getElementById("toggleLoop").style.color = "#666";
        } else {
            audioElement.loop = true;
            audioLoop = true;
            document.getElementById("toggleLoop").style.color = "#fff"
        }
    })
}