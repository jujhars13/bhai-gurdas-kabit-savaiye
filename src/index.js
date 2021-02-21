
function ready (fn) {
  if (document.readyState !== 'loading') {
    render()
  } else {
    document.addEventListener('DOMContentLoaded', render)
  }
}

// TODO read state from URL
// TODO read state from cookie
// TODO if cookie > URL, change URL to match
// TOOD render kabit
const render = () => {
  console.log('satnaam')
}

// kick off
ready(() => { })
