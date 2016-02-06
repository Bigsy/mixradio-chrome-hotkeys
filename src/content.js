chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.text == "play?") {
        sendResponse(document.getElementsByClassName('button-control player__pause player-control')[0]);
    }
    if (request.text == "currenttrack") {
        var data = document.getElementsByClassName('player-meta-item')[0].innerText;
        var img = document.getElementsByClassName('player-packshot__item')[0].src;
        var sdata = data.split(/\r?\n/);

        var options = {
            mix: sdata[0],
            song: sdata[1],
            artist: sdata[2],
            img: img,
        }
        sendResponse(options);
    }
}
);