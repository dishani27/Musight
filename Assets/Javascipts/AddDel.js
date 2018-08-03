function Song(id,name,url,image){
    this.id = id;
    this.name = name;
    this.url = url;
    this.image = image;
    this.delete = false;
}

var obj = {
    SongsList : [],

    addSong : function(id,name,url,image){

        var song =  new Song(id,name,url,image);
        // aa = this.SongsList;
        this.SongsList.push(song);
        // console.log("aa",aa );
    }, 

    deleteSong : function(s_id){

        // deleted song's array
        var deleted = this.SongsList.filter(function(obj){
            return obj.id == s_id;
        })

        deleted[0].delete = true;
        // making .delete value 'true' of the song which is clicked (changing from false which was default)

        // console.log("deleted song",deleted);

        this.SongsList = this.SongsList.filter(function(obj){
            return obj.delete == false;
            // returning array of songs which has .delete value 'false' by default 
        })

        // console.log("final playlist",this.SongsList);
        // prints returned final playlist
    }
}