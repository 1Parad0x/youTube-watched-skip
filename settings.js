chrome.storage.sync.get(['filterEnabled', 'viewPercentage'], ({ filterEnabled, viewPercentage }) => {
    document.getElementById('filterToggle').checked = filterEnabled || false;
});

document.getElementById('saveSettings').addEventListener('click', () => {
    const filterEnabled = document.getElementById('filterToggle').checked;

    chrome.storage.sync.set({filterEnabled}, () => {
    });
});