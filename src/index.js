const parsedUrl = new URL(window.location.href);
const bani = parsedUrl.searchParams.get('b') || 'ks';
const rawSection = Number(parsedUrl.searchParams.get('s')) || 1;
// zero pad the section number
const section = rawSection <= 999 ? `00${rawSection}`.slice(-3) : rawSection;
const validGurbani = ['ks'];

// TODO read state from cookie
// TODO if cookie > URL, change URL to match
/**
 * setup the page and grab the next json
 */
const initialize = () => {
  if (!validGurbani.includes(bani)) {
    renderError('error', `we don't have bani:${bani}`);
    return false;
  }

  // load gurmukhi from relevant file
  return fetch(`data/${bani}/${section}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error  + ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      return render({
        data: data[0].lines,
        section
      });
    })
    .catch(err => {
      renderError('error', JSON.stringify(err));
    });
};

/**
 * render the bani to the dom
 * @param {} state
 */
function render (state) {
  document.getElementById('section-number').innerText = state.section;
  document.getElementById('bani').innerHTML = renderGurbaniLines(state.data);
  return true;
}

/**
 * Render the ShabadOS data
 * @param {data} lines
 */
function renderGurbaniLines (lines) {
  return lines.map(line => {
    return `<section class='line'>
      <div class='gurmukhi'>${line.gurmukhi['Seva Singh']}</div>
      <div class='translation-english'>${line.translations.English['Shamsher Singh Puri'].translation}</div>
      <div class='translation-punjabi'>${line.translations.Punjabi['Sant Sampuran Singh'].translation}</div>
    </section>`;
  });
}

/**
 * button handlers
 */
const nextButtons = Array.from(document.getElementsByClassName('next-button'));
nextButtons.forEach(el => {
  el.addEventListener('click', () => {
    const nextSection = rawSection + 1;
    window.location.replace(`?b=${bani}&s=${nextSection}`);
  });
});
const prevButtons = Array.from(document.getElementsByClassName('prev-button'));
prevButtons.forEach(el => {
  if (rawSection <= 1) {
    el.classList.add('disabled');
  } else {
    const prevSection = rawSection - 1;
    el.classList.remove('disabled');
    el.addEventListener('click', () => {
      window.location.replace(`?b=${bani}&s=${prevSection}`);
    });
  }
});

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
