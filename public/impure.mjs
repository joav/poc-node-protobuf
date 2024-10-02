import curry from "ramda/curry.js"

export const getDOMEl = (sel) => document.querySelector(sel)
export const setHTML = curry((el, html) => el.innerHTML = html)
export const append = curry((el, node) => el.appendChild(node))
export const scrollToBottom = curry((el) => el.scrollTop = el.scrollHeight)
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))