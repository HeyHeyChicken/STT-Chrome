class STT_Chrome {
  constructor() {
    this.Translation = {
      "en-US": {
        "talk_network_problem": "I can't hear you. Check your internet connection, and that you are using the Chrome browser."
      },
      "fr-FR": {
        "talk_network_problem": "Je n'arrive pas à vous entendre. Vérifiez votre connexion internet, et que vous utilisez le navigateur Chrome."
      }
    };
    this.TimeToCut = 500;
    this.Langs = [
      ['Afrikaans',       ['af-ZA']],
      ['አማርኛ',           ['am-ET']],
      ['Azərbaycanca',    ['az-AZ']],
      ['বাংলা',            ['bn-BD', 'বাংলাদেশ'],
                          ['bn-IN', 'ভারত']
      ],
      ['Bahasa Indonesia',['id-ID']],
      ['Bahasa Melayu',   ['ms-MY']],
      ['Català',          ['ca-ES']],
      ['Čeština',         ['cs-CZ']],
      ['Dansk',           ['da-DK']],
      ['Deutsch',         ['de-DE']],
      ['English',         ['en-AU', 'Australia'],
                          ['en-CA', 'Canada'],
                          ['en-IN', 'India'],
                          ['en-KE', 'Kenya'],
                          ['en-TZ', 'Tanzania'],
                          ['en-GH', 'Ghana'],
                          ['en-NZ', 'New Zealand'],
                          ['en-NG', 'Nigeria'],
                          ['en-ZA', 'South Africa'],
                          ['en-PH', 'Philippines'],
                          ['en-GB', 'United Kingdom'],
                          ['en-US', 'United States']
      ],
      ['Español',         ['es-AR', 'Argentina'],
                          ['es-BO', 'Bolivia'],
                          ['es-CL', 'Chile'],
                          ['es-CO', 'Colombia'],
                          ['es-CR', 'Costa Rica'],
                          ['es-EC', 'Ecuador'],
                          ['es-SV', 'El Salvador'],
                          ['es-ES', 'España'],
                          ['es-US', 'Estados Unidos'],
                          ['es-GT', 'Guatemala'],
                          ['es-HN', 'Honduras'],
                          ['es-MX', 'México'],
                          ['es-NI', 'Nicaragua'],
                          ['es-PA', 'Panamá'],
                          ['es-PY', 'Paraguay'],
                          ['es-PE', 'Perú'],
                          ['es-PR', 'Puerto Rico'],
                          ['es-DO', 'República Dominicana'],
                          ['es-UY', 'Uruguay'],
                          ['es-VE', 'Venezuela']
      ],
      ['Euskara',         ['eu-ES']],
      ['Filipino',        ['fil-PH']],
      ['Français',        ['fr-FR']],
      ['Basa Jawa',       ['jv-ID']],
      ['Galego',          ['gl-ES']],
      ['ગુજરાતી',           ['gu-IN']],
      ['Hrvatski',        ['hr-HR']],
      ['IsiZulu',         ['zu-ZA']],
      ['Íslenska',        ['is-IS']],
      ['Italiano',        ['it-IT', 'Italia'],
                          ['it-CH', 'Svizzera']
      ],
      ['ಕನ್ನಡ',             ['kn-IN']],
      ['ភាសាខ្មែរ',          ['km-KH']],
      ['Latviešu',        ['lv-LV']],
      ['Lietuvių',        ['lt-LT']],
      ['മലയാളം',          ['ml-IN']],
      ['मराठी',             ['mr-IN']],
      ['Magyar',          ['hu-HU']],
      ['ລາວ',              ['lo-LA']],
      ['Nederlands',      ['nl-NL']],
      ['नेपाली भाषा',        ['ne-NP']],
      ['Norsk bokmål',    ['nb-NO']],
      ['Polski',          ['pl-PL']],
      ['Português',       ['pt-BR', 'Brasil'],
                          ['pt-PT', 'Portugal']
      ],
      ['Română',          ['ro-RO']],
      ['සිංහල',            ['si-LK']],
      ['Slovenščina',     ['sl-SI']],
      ['Basa Sunda',      ['su-ID']],
      ['Slovenčina',      ['sk-SK']],
      ['Suomi',           ['fi-FI']],
      ['Svenska',         ['sv-SE']],
      ['Kiswahili',       ['sw-TZ', 'Tanzania'],
                          ['sw-KE', 'Kenya']
      ],
      ['ქართული',         ['ka-GE']],
      ['Հայերեն',          ['hy-AM']],
      ['தமிழ்',            ['ta-IN', 'இந்தியா'],
                          ['ta-SG', 'சிங்கப்பூர்'],
                          ['ta-LK', 'இலங்கை'],
                          ['ta-MY', 'மலேசியா']
      ],
      ['తెలుగు',           ['te-IN']],
      ['Tiếng Việt',      ['vi-VN']],
      ['Türkçe',          ['tr-TR']],
      ['اُردُو',            ['ur-PK', 'پاکستان'],
                          ['ur-IN', 'بھارت']
      ],
      ['Ελληνικά',         ['el-GR']],
      ['български',         ['bg-BG']],
      ['Pусский',          ['ru-RU']],
      ['Српски',           ['sr-RS']],
      ['Українська',        ['uk-UA']],
      ['한국어',            ['ko-KR']],
      ['中文',             ['cmn-Hans-CN', '普通话 (中国大陆)'],
                          ['cmn-Hans-HK', '普通话 (香港)'],
                          ['cmn-Hant-TW', '中文 (台灣)'],
                          ['yue-Hant-HK', '粵語 (香港)']
      ],
      ['日本語',           ['ja-JP']],
      ['हिन्दी',             ['hi-IN']],
      ['ภาษาไทย',         ['th-TH']]
    ];
    this.TimeOut = null;

    const SELF = this;

    MAIN.App.startSTT = function(){
      MAIN.Socket.emit("fake_start_recording");

      let myLangIsCompatible = false;

      for(let i = 0; i < SELF.Langs.length; i++){
        for(let j = 0; j < SELF.Langs[i].length; j++){
          if(SELF.Langs[i][j][0] == MAIN.App.language){
            myLangIsCompatible = true;
          }
        }
      }

      if(myLangIsCompatible){
        var final_transcript = "";
        var recognizing = false;
        var ignore_onend;
        var listenAgain = false;
        if (!("webkitSpeechRecognition" in window)) {
          console.error("the Web Speech API does not appear to be accessible (STT-Chrome).");
        } else {
          var recognition = new webkitSpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;

          recognition.onstart = function() {
            recognizing = true;
            MAIN.App.listening = true;
          };

          recognition.onerror = function(event) {
            ignore_onend = true;

            switch(event.error){
              case "network":
                MAIN.Socket.emit("server", SELF.Translation[MAIN.App.language]["talk_network_problem"]);
                break;
                case "no-speech":
                //listenAgain = true;
                break;
              default:
                console.error("Error: " + event.error + ".");
                console.error(event);
                break;
            }
          };

          recognition.onend = function(event) {
            recognizing = false;
            MAIN.App.listening = false;
            if (ignore_onend && !listenAgain) {
              return;
            }
            if (!final_transcript && !listenAgain) {
              return;
            }

            if(listenAgain){
              start();
            }
          };

          recognition.onresult = function(event) {
            var interim_transcript = '';
            if (typeof(event.results) == 'undefined') {
              recognition.onend = null;
              recognition.stop();
              return;
            }
            for (var i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
              } else {
                interim_transcript += event.results[i][0].transcript;
              }
            }

            MAIN.App.input = capitalize(linebreak(final_transcript));
            if(MAIN.App.input.length == 0){
              MAIN.App.input = capitalize(linebreak(interim_transcript));
            }

            if(final_transcript.length > 0){
              if(SELF.TimeOut != null){
                clearTimeout(SELF.TimeOut);
                SELF.TimeOut = null;
              }
              SELF.TimeOut = setTimeout(function(){
                listenAgain = false;
                recognition.stop();

                MAIN.App.sendMessage(undefined, "cs_message");
              }, SELF.TimeToCut);
            }
          };
        }

        start();
      }

      else{
        console.error("Your language is incompatible with this skill (STT-Chrome)!");
      }

      function linebreak(s) {
        var two_line = /\n\n/g;
        var one_line = /\n/g;
        return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
      }

      function capitalize(s) {
        var first_char = /\S/;
        return s.replace(first_char, function(m) { return m.toUpperCase(); });
      }

      function start() {
        listenAgain = false;
        if (recognizing) {
          recognition.stop();
          return;
        }
        final_transcript = '';
        recognition.lang = MAIN.App.language;
        MAIN.App.input = "";
        ignore_onend = false;
        recognition.start();
      }
    }
  }
}

new STT_Chrome();
