import curry from "https://unpkg.com/ramda@0.30.1/es/curry.js"

export const getDOMEl = (sel) => document.querySelector(sel)
export const setHTML = curry((el, html) => el.innerHTML = html)