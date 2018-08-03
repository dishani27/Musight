window.addEventListener("load",initEvents)

var audio;
var togglePlay = false;
var togglePlayButton;

function initEvents(){

    card_group = document.querySelector(".card_group");
    audio = document.querySelector(".audio");
    document.querySelector("#SavePlaylist").addEventListener("click",savePlayList);
    range_slider = document.querySelector("#slider");

    togglePlayButton = document.querySelector(".play_pause");
    togglePlayButton.addEventListener("click",togglePlayPause);

    document.querySelector(".pre").addEventListener("click",previousSong);
    document.querySelector(".next").addEventListener("click",nextSong);
    document.querySelector(".stop").addEventListener("click",stopSong);   
    range_slider.addEventListener("click",seekSong); 

    for(var i=0; i<SongsArray.length; i++){
        
        h2 = document.querySelector(".text-center");
        card_deck = document.querySelector(".card-deck");
        var card = document.createElement("div");
        var card_body = document.createElement("div");

        var S_Img = document.createElement("img");
        var S_Name = document.createElement("span");
        var Add_B = document.createElement("button");
        var A_icon = document.createElement("i");
        var play_b = document.createElement("button");
        var p_icon = document.createElement("i");

        card.className = "card";
        card_body.className = "card-body";
        Add_B.className = "btn add_btn";
        A_icon.className = "fas fa-plus";
        play_b.className = "play_icon";
        p_icon.className = "fas fa-play";

        S_Img.setAttribute("src",SongsArray[i].SongImage);
        S_Img.className = "card-img-top";

        S_Name.innerHTML = SongsArray[i].SongName;
        S_Name.className = "span_s_name";
        S_Name.setAttribute("id",SongsArray[i].id);


        card_group.appendChild(h2);
        card_group.appendChild(card_deck);
        
        card_deck.appendChild(card);
        
        card.appendChild(S_Img);
        card.appendChild(card_body);
       
        Add_B.appendChild(A_icon);
        play_b.appendChild(p_icon);

        card_body.appendChild(S_Name);
        card_body.appendChild(Add_B);
        card_body.appendChild(play_b);

        S_Name.addEventListener("click", PlaySong);
        p_icon.addEventListener("click",setSongName);
        Add_B.addEventListener("click",addToPlaylist);
    }
    loadPlaylist();
}

function setSongName(event){
    var song_name = event.target.parentElement.parentElement.childNodes[0].innerHTML;
    // console.log("p_icon",song_name);

    var S_Url;

    for(var i=0; i<SongsArray.length; i++){
        if(SongsArray[i].SongName == song_name){
           S_Url = SongsArray[i].SongUrl;
           audio.id = SongsArray[i].id;
           S_cover_img = SongsArray[i].SongImage;
           S_name = SongsArray[i].SongName;
        }
    }
 
    audio.src = S_Url;
    togglePlayButton.innerHTML = '<i class="fas fa-pause color"></i>';

   changeCover(S_cover_img, S_name);
   audio.src = S_Url;
   audio.play();

//    setInterval(function(){
//        slider.value = audio.currentTime;
//    },500);

//    setTimeout(function(){
//     var duration = audio.duration;
//     slider.max = duration;
//    },200);

   audio.onloadedmetadata = () =>slider.max = audio.duration; 
   slider.onchange = () => audio.currentTime = slider.value;
   audio.ontimeupdate = () => slider.value = audio.currentTime;
    
}

function PlaySong(event){
      var song_name = event.target.innerHTML;
//    console.log("target",song_name);
       var S_Url;

   for(var i=0; i<SongsArray.length; i++){
       if(SongsArray[i].SongName == song_name){
          S_Url = SongsArray[i].SongUrl;
          S_cover_img = SongsArray[i].SongImage;
          audio.id = SongsArray[i].id;
          S_name = SongsArray[i].SongName;
       }
   }

   togglePlayButton.innerHTML = '<i class="fas fa-pause color"></i>';  

   changeCover(S_cover_img, S_name);
   audio.src = S_Url;
   audio.play();

//    setInterval(function(){
//        slider.value = audio.currentTime;
//    },500);

//    setTimeout(function(){
//     var duration = audio.duration;
//     slider.max = duration;
//    },200);

audio.onloadedmetadata = () =>slider.max = audio.duration;
slider.onchange = () => audio.currentTime = slider.value;
audio.ontimeupdate = () => slider.value = audio.currentTime;

}
function changeCover(S_cover_img, S_name){
   cover_img = document.querySelector("#cover");
   cover_img.setAttribute("src",S_cover_img);

   span_song_name = document.querySelector(".song_name");
   span_song_name.innerHTML = S_name;

}

function addToPlaylist(event){
   var song_id = event.target.parentElement.parentElement.childNodes[0].id;
//    console.log(song_id);
   
   for(var i=0;i<SongsArray.length; i++){
       if(SongsArray[i].id==song_id){
           obj.addSong(SongsArray[i].id, SongsArray[i].SongName, SongsArray[i].SongUrl, SongsArray[i].SongImage);
       }
   }
   printPlaylist();
}

function printPlaylist(){
    var ul = document.querySelector("#playlist");
    ul.innerHTML = "";

    obj.SongsList.forEach(function(song){

        var li = document.createElement("li");
        var span = document.createElement("span");
        var img = document.createElement("img");
        var d_btn = document.createElement("button");
        var d_icon = document.createElement("i");
        var play_btn = document.createElement("button");
        var p_icon = document.createElement("i");


        li.className = "list-group-item p_list";
        span.innerHTML = song.name;
        span.setAttribute("id",song.id);
        img.setAttribute("src",song.image);
        img.className = "playlist_img";
        d_btn.className = "btn delete_btn";
        d_icon.className = "fas fa-minus";
        play_btn.className = "p_button";
        p_icon.className = "fas fa-play p_icon";

        d_btn.appendChild(d_icon);
        play_btn.appendChild(p_icon);

        ul.appendChild(li);
        li.appendChild(img);
        li.appendChild(play_btn);
        li.appendChild(span);
        li.appendChild(d_btn);

        span.addEventListener("click",PlaySong);
        p_icon.addEventListener("click",setPlaylistSongName);
        d_btn.addEventListener("click",deleteSong);
    })
}

function deleteSong(event){
    var song_id = event.target.parentElement.parentElement.childNodes[2].id;
    // console.log(song_id);
    obj.deleteSong(song_id);
    printPlaylist();
}

function setPlaylistSongName(event){
    var song_name = event.target.parentElement.parentElement.childNodes[2].innerHTML;
    // console.log("p_icon",song_name);

    var S_Url;

    for(var i=0; i<SongsArray.length; i++){
        if(SongsArray[i].SongName == song_name){
           S_Url = SongsArray[i].SongUrl;
           audio.id = SongsArray[i].id;
           S_name = SongsArray[i].SongName;
           S_cover_img = SongsArray[i].SongImage;
        //    console.log(audio.id);
        }
        
    }
 
    audio.src = S_Url;
    togglePlayButton.innerHTML = '<i class="fas fa-pause color"></i>';

   changeCover(S_cover_img, S_name);
   audio.src = S_Url;
   audio.play();

//    setInterval(function(){
//        slider.value = audio.currentTime;
//    },500);

//    setTimeout(function(){
//     var duration = audio.duration;
//     slider.max = duration;
//    },200);

   audio.onloadedmetadata = () =>slider.max = audio.duration;
   slider.onchange = () => audio.currentTime = slider.value;
   audio.ontimeupdate = () => slider.value = audio.currentTime;
  
}

function savePlayList(){
    if(window.localStorage){
        var json = JSON.stringify(obj.SongsList);
        // console.log(json);
        localStorage.setItem('saved_playlist', json);
    }
    else{
        alert("Update your Browser");
    }
}

function loadPlaylist(){

    if(localStorage.saved_playlist) {
        var saved = localStorage.getItem('saved_playlist');
        obj.SongsList = JSON.parse(saved);
        // console.log(obj.SongsList);
        printPlaylist();
    }
    else{
        console.log("No Songs Found");
    }
}

function togglePlayPause(){
    if(togglePlay) {
        audio.play();
        togglePlayButton.innerHTML = '<i class="fas fa-pause color"></i>';
        togglePlay = false;
    }
    else {
        audio.pause();
        togglePlayButton.innerHTML = '<i class="fas fa-play color"></i>';
        togglePlay = true;
    }
}

function previousSong(p_song){

    var song_id = audio.id;
    // console.log("id",song_id);

    var p_song = parseInt(song_id) - 6;
    var song_name;
    // console.log("pre",p_song);

    for(var i = 0; i < SongsArray.length; i++){
        if(SongsArray[i].id == p_song) {
            song_name = SongsArray[i].SongName;
            // console.log(p_song, songName);
            S_name = SongsArray[i].SongName;
           S_cover_img = SongsArray[i].SongImage;
           changeCover(S_cover_img, S_name);
        }
    }
  
    var S_Url;
 
    for(var i=0; i<SongsArray.length; i++){
        if(SongsArray[i].SongName == song_name){
           S_Url = SongsArray[i].SongUrl;
           audio.id = p_song;
        }
    }
 
    audio.src = S_Url;
    audio.play();
    
}

function nextSong(n_song){
    var song_id = audio.id;
    // console.log("id",song_id);

    var n_song = parseInt(song_id) + 6;
    var song_name;
    // console.log("next",n_song);

    for(var i = 0; i < SongsArray.length; i++){
        if(SongsArray[i].id == n_song) {
            song_name = SongsArray[i].SongName;
            // console.log(p_song, songName);
            S_name = SongsArray[i].SongName;
           S_cover_img = SongsArray[i].SongImage;
           changeCover(S_cover_img, S_name);

        }
    }
  
    var S_Url;
 
    for(var i=0; i<SongsArray.length; i++){
        if(SongsArray[i].SongName == song_name){
           S_Url = SongsArray[i].SongUrl;
           audio.id = n_song;
           
        }
    }
 
    audio.src = S_Url;
    audio.play();
    
}

function stopSong(){
    // console.log("hey");
    audio.currentTime = 0;
    audio.pause();
    togglePlayButton.innerHTML = '<i class="fas fa-play color"></i>';

}
function seekSong(){
    audio.currentTime = slider.value;
}