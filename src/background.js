var Elements = {
    play: "[type=button][title='Play this track']",
    pause: "[type=button][title='Pause this track']",
    next: "[type=button][title='Skip forward']",
    like: "[type=button][title='Like this track']",
    dislike: "[type=button][title='Dislike this track']",
    mymix: "[data-reactid$='$mymix\\.0']"
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

function clickElement(tabs, element){
    for (var i = 0; i < tabs.length; i++) {
        chrome.tabs.executeScript(tabs[i].id, {code: "$(\"" + element + "\").click();"});}
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
