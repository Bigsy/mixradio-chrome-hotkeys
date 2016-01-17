function onCommand(command) {
    chrome.tabs.query({url: 'https://mixrad.io/*'}, function(tabs) {

        if (tabs.length === 0 && command === "pinned") {
            chrome.tabs.create({url: 'https://mixrad.io', 'pinned': true});
        } else {
            switch (command)
            {
                case "mymix":
                    var code = "document.getElementsByClassName('tile--mymix__description')[0].click();"
                    break;
                default:
                    var code = "document.getElementsByClassName('button-control__button button-control player__" + command + "')[0].click();"
                    break;
            }}
        for (var tab in tabs) {
            chrome.tabs.executeScript(tab.id, {code: code});
        }
        window.close();
    });
};

chrome.commands.onCommand.addListener(onCommand);
