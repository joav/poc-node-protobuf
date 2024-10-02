import compose from "ramda/compose.js"
import flip from "ramda/flip.js"
import always from "ramda/always.js"
import { getDOMEl } from "impure"
import {renderLines} from "console"

const idSelector = (id) => `#${id}`

const lineInput = always({msg: "[U]&nbsp;", cls: "line--input"})
const flippedRenderLines = flip(renderLines)
const renderWelcome = flippedRenderLines(
    [
        {msg: "Welcome again", cls: "system"},
        {msg: "In the next line insert a name:", cls: "system"},
        lineInput()
    ]
);

const app = compose(renderWelcome, getDOMEl, idSelector)

export default app