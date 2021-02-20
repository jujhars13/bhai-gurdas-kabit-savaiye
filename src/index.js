
function ready (fn) {
  if (document.readyState !== 'loading') {
    render()
  } else {
    document.addEventListener('DOMContentLoaded', render)
  }
}

const render = () => {
  console.log('satnaam')
}

// kick off
ready(() => { })
