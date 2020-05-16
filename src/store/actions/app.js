import store from '../'

export const registerKeyboardShortcuts = () => {
  document.addEventListener('keyup', handleKeyboardShortcuts, false)
}

export const handleKeyboardShortcuts = e => {
  if (e.ctrlKey && e.keyCode === 37) {
    store.dispatch({ type: 'TOGGLE_SIDEBAR' })
    window.dispatchEvent(new Event('resize'))
  }
}
