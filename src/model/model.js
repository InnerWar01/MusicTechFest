const Model = function () {
    let sounds = [
        {
          url: require('../sounds/CLAVE.WAV'),
          cover: require('../media/cover.jpg'),
          artist: {
            name: 'Anonymous',
            song: 'Clave'
          },
        },
        {
          url: require('../sounds/HHCL.WAV'),
          cover: require('../media/cover.jpg'),
          artist: {
            name: 'Anonymous',
            song: 'HHCL'
          },
        },
        {
            url: require('../sounds/KICK2.WAV'),
            cover: require('../media/cover.jpg'),
            artist: {
                name: 'Anonymous',
                song: 'Kick'
            },
        },
        {
            url: require('../sounds/PERC6.WAV'),
            cover: require('../media/cover.jpg'),
            artist: {
                name: 'Anonymous',
                song: 'Perc'
            }
        },
        {
            url: require('../sounds/SNARE1.WAV'),
            cover: require('../media/cover.jpg'),
            artist: {
                name: 'Anonymous',
                song: 'Snare'
            }
        },
    ];

    this.getSounds = function(){
        return sounds;
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