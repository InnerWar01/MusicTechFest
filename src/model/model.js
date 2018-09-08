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
};

export const modelInstance = new Model();