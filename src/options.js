function openshort() {
    chrome.tabs.create({url : "chrome://extensions/configureCommands"});
}

document.getElementById('openshort').addEventListener('click', openshort);