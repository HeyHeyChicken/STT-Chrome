const LIBRARIES = {
  Path: require("path"),
  Express: require("express"),
  Skill: require("../../../Libraries/Skill")
};

class STTChrome extends LIBRARIES.Skill {
  constructor(_main, _settings, _folder) {
    super(_main, _settings, _folder);
    const SELF = this;

/*
    this.Main.Manager.addAction("Spotify.music.pause", function(_intent, _socket){
      _socket.emit("set_spotify_pause");
    });

    this.Main.Manager.addAction("Spotify.music.play", function(_intent, _socket){
      //SELF.RefreshToken(_socket, true);
    });

    this.Main.Manager.addAction("Spotify.music.next", function(_intent, _socket){
      _socket.emit("set_spotify_next");
    });

    this.Main.Manager.addAction("Spotify.music.previous", function(_intent, _socket){
      _socket.emit("set_spotify_previous");
    });

    this.Main.ClientIO.on("connection", function(socket){
      // L'utilisateur demande son token
      socket.on("get_spotify_token", function() {
        //SELF.RefreshToken(socket, false);
      });
      socket.on("set_spotify_device", function(_name) {
        //SELF.SetDevice(_name, socket);
      });
      socket.on("set_spotify_token", function(_code) {
        //SELF.SetCode(_code, socket);
      });

    });
    */

    this.Main.Express.use("/STTChrome", LIBRARIES.Express.static(LIBRARIES.Path.join(__dirname, "/public")));
  }

  /* #################################################################################### */
  /* ### FUNCTIONS ###################################################################### */
  /* #################################################################################### */


}

module.exports = STTChrome;
