import compose from "ramda/compose.js"
import flip from "ramda/flip.js"
import { getDOMEl, setHTML } from "impure"
import "proto"

const renderMsg = flip(setHTML)("Hello World")
const idSelector = (id) => `#${id}`

const app = compose(renderMsg, getDOMEl, idSelector)

export default app