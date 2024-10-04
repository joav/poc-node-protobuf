import compose from "ramda/compose.js"
import flip from "ramda/flip.js"
import andThen from "ramda/andThen.js"
import tap from "ramda/tap.js"
import { getDOMEl, trace } from "impure"
import {renderLines} from "console"
import {lineInput, asEditable} from "user"
import events from "events"

const idSelector = (id) => `#${id}`

const flippedRenderLines = flip(renderLines)
const renderWelcome = flippedRenderLines(
    [
        {msg: "Welcome again", cls: "system"},
        {msg: "In the next line insert a name:", cls: "system"},
        lineInput()
    ]
);

const render = compose(
    andThen(asEditable),
    trace('promise first render'),
    renderWelcome
);

const app = compose(events, tap(render), trace('app'), getDOMEl, trace('id'), idSelector)
export default app