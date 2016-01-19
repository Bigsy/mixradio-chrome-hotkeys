var Elements = {
    play: "button-control__button button-control player__play",
    pause: "button-control__button button-control player__pause",
    next: "button-control__button button-control player__skip-next",
    like: "button-control__button button-control player__like",
    dislike: "button-control__button button-control player__dislike",
    mymix: "tile--mymix__description"
};

function createOptions(opts){
    var options =  {
        type: "basic",
        title: opts.mix,
        message: opts.song,
        contextMessage: opts.artist,
        iconUrl: opts.img
    }
    return options;
};

function clickElement(tabs, classname){
    for (var i = 0; i < tabs.length; i++) {
        chrome.tabs.executeScript(tabs[i].id, {code: "document.getElementsByClassName('" + classname + "')[0].click();"});}
}

function onCommand(command) {
    chrome.tabs.query({url: 'https://mixrad.io/*'}, function(tabs) {
        if (tabs.length === 0 && command === "pinned") {
            chrome.tabs.create({url: 'https://mixrad.io', 'pinned': true});
        } else {
            switch (command) {
                case "play-pause":
                    for (var i = 0; i < tabs.length; i++) {
                        chrome.tabs.sendMessage(tabs[i].id, {text: "play?"}, function(response) {
                            if (response === null) {
                                clickElement(tabs, Elements.play);
                            } else {
                                clickElement(tabs, Elements.pause);
                            }
                        });
                    }
                    break;
                case "next":
                    clickElement(tabs, Elements.next);
                    break;
                case "like":
                    clickElement(tabs, Elements.like);
                    break;
                case "dislike":
                    clickElement(tabs, Elements.dislike);
                    break;
                case "mymix":
                    clickElement(tabs, Elements.mymix);
                    break;
                case "current-toast":
                    chrome.tabs.sendMessage(tabs[0].id, {text: "currenttrack"}, function(response) {
                        chrome.notifications.create("id1", createOptions(response), crCallback);
                    });
                    break;
                default:
                    break;
            }}
    });
};
function crCallback(notID) {
}
chrome.commands.onCommand.addListener(onCommand);
