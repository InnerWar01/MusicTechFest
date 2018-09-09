const Model = function () {
    let sounds = [
        {
            id: 0,
            url: require('../sounds/silence.wav'),
            cover: require('../media/cover.jpg'),
            artist: {
              name: 'Anonymous',
              song: 'No song'
            },
        },
        {
          id: 1,
          url: require('../sounds/CLAVE.WAV'),
          cover: require('../media/cover.jpg'),
          artist: {
            name: 'Anonymous',
            song: 'Clave'
          },
        },
        {
          id: 2,
          url: require('../sounds/HHCL.WAV'),
          cover: require('../media/cover.jpg'),
          artist: {
            name: 'Anonymous',
            song: 'HHCL'
          },
        },
        {
            id: 3,
            url: require('../sounds/KICK2.WAV'),
            cover: require('../media/cover.jpg'),
            artist: {
                name: 'Anonymous',
                song: 'Kick'
            },
        },
        {
            id: 4,
            url: require('../sounds/PERC6.WAV'),
            cover: require('../media/cover.jpg'),
            artist: {
                name: 'Anonymous',
                song: 'Perc'
            }
        },
        {
            id: 5,
            url: require('../sounds/SNARE1.WAV'),
            cover: require('../media/cover.jpg'),
            artist: {
                name: 'Anonymous',
                song: 'Snare'
            }
        },
    ];

    let sequenceArr = new Array();

    this.createSequence = function(rhythm, sound_id) {
        sequenceArr = [];
        for (var i = 0; i < rhythm.length; i++) {
            if (rhythm[i]) {
                sequenceArr.push(this.getSound(sound_id));
            } else {
                sequenceArr.push(this.getSound(0));
            }
        }

        return sequenceArr;
    }

    this.getSound = function(sound_id){
        return sounds.find(x => x.id === sound_id);
    };

    this.getSounds = function(){
        if (sequenceArr.length === 0)
            return sounds;

        return sequenceArr;
    };

    this.fetch_geolocation = function(params){
        const url = "http://130.229.135.119:5002/sequence?location=" + params.latitude + ';' + params.longitude;
        return fetch(url)
        .then(processResponse)
        .catch(handleError)
    }

    // this.fetch_userId = function(){
    //     let userId_json = generic_fetch("user_id");
    //     return userId_json.user_id;   
    // }

    const processResponse = function (response) {
        if (response.ok) {
          return response.json()
        }
        throw response;
    }
     
    const handleError = function (error) {
        if (error.json) {
          error.json().then(error => {
            console.error('API Error:', error.message || error)
          })
        } else {
          console.error('API Error:', error.message || error)
        }
    }
};

export const modelInstance = new Model();