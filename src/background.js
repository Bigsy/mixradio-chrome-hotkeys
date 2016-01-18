var Elements = {
    play: "button-control__button button-control player__play",
    pause: "button-control__button button-control player__pause",
    next: "button-control__button button-control player__skip-next",
    like: "button-control__button button-control player__like",
    dislike: "button-control__button button-control player__dislike",
    mymix: "tile--mymix__description"
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
            switch (command)
            {
                case "play-pause":
                    for (var i = 0; i < tabs.length; i++) {
                        chrome.tabs.executeScript(tabs[i].id, {file: "content.js"});
                        chrome.tabs.sendMessage(tabs[i].id, {text: "play?"}, function(response) {
                            if (response === null) {
                                clickElement(tabs, Elements.pause);
                            } else {
                                clickElement(tabs, Elements.play);
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
                default:
                    break;
            }}
    });
};

chrome.commands.onCommand.addListener(onCommand);
