const parsedUrl = new URL(window.location.href);
const bani = parsedUrl.searchParams.get('b') || 'ks';
const rawSection = Number(parsedUrl.searchParams.get('s')) || 1;
// zero pad the section number
const section = rawSection <= 999 ? `00${rawSection}`.slice(-3) : rawSection;
const validGurbani = ['ks'];

// TODO read state from URL
// TODO read state from cookie
// TODO if cookie > URL, change URL to match
// TOOD render kabit

/**
 * setup the page and grab the next json
 */
const initialize = () => {
  if (!validGurbani.includes(bani)) {
    renderError('error', `we don't have ${bani}`);
    return false;
  }

  // load gurmukhi from relevant text file
  return fetch(`data/${bani}/${section}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error  + ${response.status}`);
      }
      return response.json();
    })
    .then(body => {
      console.log(body);
      return render({
        content: body,
        bani,
        section
      });
    })
    .catch(err => {
      renderError('error', JSON.stringify(err));
    });
};

/**
 * render the bani
 * @param {} state
 */
function render (state) {
  console.log(state);
  document.getElementById('section-number').innerText = state.section;
  document.getElementById('bani').innerText = state.content;
}

/**
 * render out errors
 *
 * @param {string} level
 * @param {string} msg
 */
function renderError (level, msg) {
  console.error(msg);

  const el = document.getElementById('debug');
  el.classList.remove('d-none');
  el.classList.add(level);
  el.innerText = msg;
}

// kick off
(function ready (fn) {
  if (document.readyState !== 'loading') {
    initialize();
  } else {
    document.addEventListener('DOMContentLoaded', initialize);
  }
})();
