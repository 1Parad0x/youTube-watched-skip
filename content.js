function hideWatchedVideos() {
    chrome.storage.sync.get(['progressPercentage', 'filterEnabled'], (data) => {
        const filterEnabled = data.filterEnabled || false;
        const threshold = data.progressPercentage || 10;

        console.log(`Filter Enabled: ${filterEnabled}, Threshold: ${threshold}%`);

        const videoElements = document.querySelectorAll('ytd-rich-item-renderer, ytd-compact-video-renderer');

        videoElements.forEach(videoElement => {
            const progressBar = videoElement.querySelector('.ytd-thumbnail-overlay-resume-playback-renderer');
            if (progressBar) {
                const progressWidth = progressBar.style.width || "0%";
                const progressPercentage = parseInt(progressWidth.replace('%', ''), 10);

                console.log(`Video Progress: ${progressPercentage}%`);

                if (filterEnabled && progressPercentage >= threshold) {
                    videoElement.style.display = 'none';
                    console.log('Video hidden');
                } else {
                    videoElement.style.display = '';
                    console.log('Video shown');
                }
            }
        });
    });
}

window.addEventListener('load', hideWatchedVideos);
const observer = new MutationObserver(hideWatchedVideos);
observer.observe(document.body, { childList: true, subtree: true });

chrome.storage.onChanged.addListener(() => {
    hideWatchedVideos();
});
