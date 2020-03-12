//hot module reloading when running dev
if (process.env.NODE_ENV == 'development') {
  require('crx-hotreload');
}

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ color: '#3aa757' }, function() {
    console.log('The color is green.');
  });
});
