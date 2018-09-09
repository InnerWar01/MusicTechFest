const Model = function() {

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

  let sequence_layers = [];

  let my_sequence_layer = {
    user_id: null,
    rhythm: [],
    sound_id: 0
  };

  let observers = [];

  console.log(my_sequence_layer.user_id);

  function getGeoloc() {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        maximumAge: 0,
        timeout: 5000,
        enableHighAccuracy: true
      })
    });
  }

  let location = {
    latitude: 10,
    longitude: 10
  };


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

  //This function accepts a

  this.idx_2_bool = function(idx_arr) {
    var val_arr = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, ];
    for (var i = 0; i < idx_arr.length; i++) {
      val_arr[idx_arr[i]] = true;
    }
    return val_arr;
  }

  this.bool_2_idx = function(val_arr) {
    var idx_arr = [];

    for (var i = 0; i < val_arr.length; i++) {
      if (val_arr[i] == true) {
        idx_arr.append(i);
      }
    }

    return idx_arr

  }

  this.changeTimeStep = function(idx) {

    var rtm_val = this.idx_2_bool(my_sequence_layer.rhythm);

    rtm_val[idx] != rtm_val[idx];

    //sequence_layers[sequence_layers.length-1].rhythm=val_2_idx(rtm_val);
    my_sequence_layer.rhythm = this.bool_2_idx(rtm_val);

    notifyObservers();

    if (my_sequence_layer.user_id != null) {
      this.sendSequence(location);
    }

  }

  this.changeSound = function(new_soundId) {
    //sequence_layers[sequence_layers.length-1].soundId=new_soundId;
    my_sequence_layer.sound_id = new_soundId;
    notifyObservers();
  }

  const processResponse = function(response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }


  const handleError = function(error) {
    if (error.json) {
      error.json().then(error => {
        console.error('dontGetAllDishes() API Error:', error.message || error)
      })
    } else {
      console.error('dontGsetAllDishes() API Error:', error.message || error)
    }
  }


  this.generic_fetch = function(param) {
    const url = "https://rmuapi-api-heroku.herokuapp.com/" + param;
    return fetch(url)
      .then(processResponse)
      .catch(handleError)


  }

  this.fetch_userId = function() {
    let userId_json = this.generic_fetch("user_id");

    return userId_json.then(function(result) {
      my_sequence_layer.user_id = result.user_id;
      return result
    });
  }


  this.fetch_sequence = function(location) {
    let seq_json = this.generic_fetch("sequence?location=" + location.latitude + ";" + location.longitude);

    return seq_json.then(function(result) {
      return result
    });

  }

  this.sendSequence = function(location) {
    const url = "https://rmuapi-api-heroku.herokuapp.com/sequence?location=" + location;
    var layer_json = JSON.stringify(my_sequence_layer);
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      //body: 'a=1'
      body: layer_json
    })
  }

  this.addObserver = function(observer) {
    observers.push(observer);
  };

  const notifyObservers = function() {
    observers.forEach(o => o.update());
  };


  // fetch_userId().then(function(result){

  // 	console.log(my_sequence_layer.my_user_id);
  // 	my_sequence_layer.user_id = result.user_id;
  // 	console.log(my_sequence_layer.my_user_id);
  // });
  this.fetch_userId();


  getGeoloc().then((data) => {
    location.latitude = data.coords.latitude;
    location.latitude = data.coords.longitude;
  })

  var d = new Date();

  var n = d.getTime();

  var n2 = 0;

  function F1() {

    setTimeout(function() {

      F1();
      getGeoloc().then((data) => {
        location.latitude = data.coords.latitude;
        location.latitude = data.coords.longitude;

        this.fetch_sequence(location).then(function(result) {
          console.log(result.location)
          console.log(result.sequence)

          sequence_layers = result.sequence;

          var updatedSequence_layers = [];

          for (var i = 0; i < result.sequence.length; i++) {
            if (result.sequence[i].user_id != my_sequence_layer.user_id) {
              updatedSequence_layers.push(result.sequence[i])
            }
          }

          sequence_layers = updatedSequence_layers;

          console.log("fetched sequences: " + updatedSequence_layers[0].sound_id);
          console.log("sequence_layers:" + sequence_layers.length)
          notifyObservers();
        });
      })
      console.log(my_sequence_layer.user_id)

    }, 2000);
  }

  F1();

}

export const modelInstance = new Model();
