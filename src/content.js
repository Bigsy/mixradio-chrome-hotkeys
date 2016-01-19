chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.text == "play?") {
        sendResponse(document.getElementsByClassName('button-control__button button-control player__pause')[0]);
    }
}
);

//now create our observer and get our target element
var observer = new MutationObserver(fnHandler),
    elTarget = document.getElementsByClassName('mini-player-container__container')[0],
    objConfig = {
        childList: true,
        subtree : true,
        attributes: true,
        characterData : true
    };

//then actually do some observing
observer.observe(elTarget, objConfig);

function fnHandler () {
    console.log("DETECTED_VARIATION");
}