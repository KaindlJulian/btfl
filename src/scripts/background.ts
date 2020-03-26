chrome.storage.sync.get(['btfl-folders'], function(result) {
  console.log('Value currently is ' + result.key);
});
