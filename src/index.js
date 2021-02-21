(function ready(fn) {
  if (document.readyState != 'loading') {
    initialize();
  } else {
    document.addEventListener('DOMContentLoaded', initialize);
  }
})();

// TODO read state from URL
// TODO read state from cookie
// TODO if cookie > URL, change URL to match
// TOOD render kabit
const initialize = () => {
  console.log('satnaam')
}

