const LIBRARIES = {
  Path: require("path"),
  Express: require("express"),
  Skill: require("../../../Libraries/Skill")
};

class STTChrome extends LIBRARIES.Skill {
  constructor(_main, _settings, _folder) {
    super(_main, _settings, _folder);
    const SELF = this;

    this.Main.Express.use("/STTChrome", LIBRARIES.Express.static(LIBRARIES.Path.join(__dirname, "/public")));
  }
}

module.exports = STTChrome;
