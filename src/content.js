chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.text == "play?") {
        sendResponse(document.getElementsByClassName('button-control__button button-control player__pause')[0]);
    }
    if (request.text == "currenttrack") {
        sendResponse(document.getElementsByClassName('player-meta-item')[0].innerText);
    }
}
);