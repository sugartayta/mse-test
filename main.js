try {
  if (!"MediaSource" in window)
    throw new ReferenceError(
      "There is no MediaSource property in window object."
    );
  var mime = "audio/mpeg";
  if (!MediaSource.isTypeSupported(mime)) {
    alert(
      "Can not play the media. Media of MIME type " + mime + " is not supported."
    );
    throw "Media of type " + mime + " is not supported.";
  }
} catch (e) {
  console.log(e);
}


var audio = document.querySelector('audio');
var addButton = document.querySelector('button')

mediaSource = new MediaSource();
audio.src = URL.createObjectURL(mediaSource);

mediaSource.addEventListener('sourceopen', function(){
  var sourceBuffer = this.addSourceBuffer(mime);
  var xhr = new XMLHttpRequest;
  xhr.open('GET', 'sample.mp3');
  xhr.responseType = 'arraybuffer';
  xhr.onload = function() {
      try {
          switch (this.status) {
              case 200:
                const response = this.response
                sourceBuffer.appendBuffer(response);
                sourceBuffer.addEventListener('updateend', function(_){
                  console.log('ready')
                })
                break;
              case 404:
                throw 'File Not Found';
              default:
                throw 'Failed to fetch the file';
         }
      } catch (e) {
        console.error(e);
      }
    };
    xhr.send();

    addButton.addEventListener('click', function() {
      var xhr = new XMLHttpRequest;
      xhr.open('GET', 'other.mp3');
      xhr.responseType = 'arraybuffer';
      xhr.onload = function() {
          try {
              switch (this.status) {
                  case 200:
                    const response = this.response
                    sourceBuffer.appendBuffer(response);
                    sourceBuffer.addEventListener('updateend', function(_){
                      console.log("ready")
                    })
                    break;
                  case 404:
                    throw 'File Not Found';
                  default:
                    throw 'Failed to fetch the file';
             }
          } catch (e) {
            console.error(e);
          }
        };
        xhr.send();
    })
})




