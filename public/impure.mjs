import curry from "ramda/curry.js"
import compose from "ramda/compose.js"
import flip from "ramda/flip.js"
import tap from "ramda/tap.js"

// DOM
export const querySelector = curry((el, sel) => el.querySelector(sel))
export const getDOMEl = querySelector(document)
export const setHTML = curry((el, html) => el.innerHTML = html)
export const append = curry((el, node) => el.appendChild(node))
export const scrollToBottom = (el) => (el.scrollTop = el.scrollHeight)
export const editable = (el) => el.contentEditable = true
export const notEditable = (el) => el.contentEditable = false
export const focus = (el) => setTimeout(() => el.focus(), 0)
export const clearStyles = (el) => el.style = ""
export const removeClass = curry((el, cls) => el.classList.remove(cls))
export const addClass = curry((el, cls) => el.classList.add(cls))
export const clickEl = (el) => el.click()

// Misc
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
export const trace = curry((tag, x) => {
    console.log(tag, x)
    return x
})

// Range & Selection
export const range = () => document.createRange()
export const rangeSelectContents = curry((range, el) => range.selectNodeContents(el))
export const elementSelectContentsRange = (el) => tap(flip(rangeSelectContents)(el))(range())
export const collapseRange = (range) => range.collapse(false)
export const selection = () => window.getSelection()
export const removeAllRanges = (sel) => sel.removeAllRanges()
export const addRange = curry((sel, range) => sel.addRange(range))
export const rangeCollapsed = compose(
    tap(collapseRange),
    elementSelectContentsRange
)
export const rangeSelected = (range) => tap(addRange(tap(removeAllRanges)(selection())))(range)
export const caretToEnd = compose(
    rangeSelected,
    rangeCollapsed
)

// Events
export const listen = curry((el, event, handler) => el.addEventListener(event, handler))
export const unlisten = curry((el, event, handler) => el.removeEventListener(event, handler))
export const windowListen = listen(window)
export const customEvent = curry((name, detail) => new CustomEvent(name, {detail}))
export const dispatch = curry((el, e) => el.dispatchEvent(e))
export const windowDispacth = dispatch(window)
export const stopPropagation = (e) => e.stopPropagation()

// Fetch
export const doFetch = curry((url, options) => fetch(url, options))
export const toArrayBuffer = (res) => res.arrayBuffer()