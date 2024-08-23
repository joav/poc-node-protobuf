import compose from "https://unpkg.com/ramda@0.30.1/es/compose.js"
import flip from "https://unpkg.com/ramda@0.30.1/es/flip.js"
import { getDOMEl, setHTML } from "./impure.mjs"

const renderMsg = flip(setHTML)("Hello World")
const idSelector = (id) => `#${id}`

const app = compose(renderMsg, getDOMEl, idSelector)

export default app