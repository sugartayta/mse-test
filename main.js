const mime = "audio/mpeg";

try {
  if (!"MediaSource" in window)
    throw new ReferenceError(
      "There is no MediaSource property in window object."
    );
  if (!MediaSource.isTypeSupported(mime)) {
    alert(
      "Can not play the media. Media of MIME type " + mime + " is not supported."
    );
    throw "Media of type " + mime + " is not supported.";
  }
} catch (e) {
  console.log(e);
}


const audio = document.querySelector('audio');
const addButton = document.querySelector('button')


mediaSource = new MediaSource();
audio.src = URL.createObjectURL(mediaSource);

mediaSource.addEventListener('sourceopen', function(){
  const sourceBuffer = this.addSourceBuffer(mime);
  fetch("sample.mp3")
  .then(response => {
    return response.arrayBuffer()
  })
  .then(buffer => {
    sourceBuffer.appendBuffer(buffer);
    sourceBuffer.addEventListener('updateend', function(_){
      console.log('ready')
    })
  })
    addButton.addEventListener('click', function() {
      const xhr = new XMLHttpRequest;
      fetch("other.mp3")
      .then(response => {
        return response.arrayBuffer()
      })
      .then(buffer => {
        sourceBuffer.appendBuffer(buffer);
        sourceBuffer.addEventListener('updateend', function(_){
          console.log('ready')
        })
      })
    })
})




