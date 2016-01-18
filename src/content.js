chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.text == "play?") {
        sendResponse(document.getElementsByClassName('button-control__button button-control player__play')[0]);
    }
}
);