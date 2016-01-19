function openshort() {
    //window.open("chrome://extensions/configureCommands")
    chrome.tabs.create({url : "chrome://extensions/configureCommands"});
}

document.getElementById('openshort').addEventListener('click', openshort);