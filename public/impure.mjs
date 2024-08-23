import curry from "ramda/curry.js"

export const getDOMEl = (sel) => document.querySelector(sel)
export const setHTML = curry((el, html) => el.innerHTML = html)