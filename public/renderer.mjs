import compose from "ramda/compose.js"
import flip from "ramda/flip.js"
import andThen from "ramda/andThen.js"
import { trace } from "impure"
import {renderLines} from "console"
import {lineInput, asEditable} from "user"

const flippedRenderLines = flip(renderLines)
const renderWelcome = flippedRenderLines(
    [
        {msg: "Welcome again", cls: "system"},
        {msg: "In the next line insert a name:", cls: "system"},
        lineInput()
    ]
);
const responseLines = (msg) => [
    {msg: "The API created the following message:", cls: "system"},
    {msg, cls: "system system--success"},
    {msg: "If you want to continue, insert a name in the next line:", cls: "system"},
    lineInput()
]
export const response = compose(
    flippedRenderLines,
    responseLines
);

export const welcome = compose(
    andThen(asEditable),
    trace('promise first render'),
    renderWelcome
);
