import compose from "ramda/compose.js"
import always from "ramda/always.js"
import tap from "ramda/tap.js"
import prop from "ramda/prop.js"
import flip from "ramda/flip.js"
import split from "ramda/split.js"
import ifElse from "ramda/ifElse.js"
import isNil from "ramda/isNil.js"
import identity from "ramda/identity.js"
import slice from "ramda/slice.js"
import {
    editable,
    focus,
    clearStyles,
    caretToEnd,
    listen,
    unlisten,
    querySelector,
    customEvent,
    windowDispacth,
    notEditable,
    trace
} from "impure"
import { shift } from "utils"

// Helpers
const line = prop("lastLine")
const notBreaks = compose(
    isNil,
    trace("br"),
    flip(querySelector)("br")
)
const firstLine = compose(
    shift,
    split("\n"),
    prop("innerText")
)
const onlyOneLine = (el) => el.innerText = firstLine(el)

// Process events
const nameEvent = customEvent("name")
const dispatchNameEvent = compose(
    windowDispacth,
    nameEvent,
    slice(4, Infinity),
    firstLine
)
const unlistenEnter = ({el, handler}) => unlisten(el)('input')(handler)
const checkBreaks = compose(trace("notBreaks"), notBreaks, prop("el"), trace("data for check"))
const handleOnBreak = compose(
    onlyOneLine,
    tap(notEditable),
    trace("el"),
    tap(dispatchNameEvent),
    prop("el"),
    tap(unlistenEnter),
    trace("ctx")
)
const checkOnBreakEvent = ifElse(
    checkBreaks,
    identity,
    handleOnBreak
)
const handleInput = (el, ctx) => ctx.handler = () => {
    trace("checkOnBreakEvent", checkOnBreakEvent({el, handler: ctx.handler}))
}

// Events
const enter = (el) => listen(el)('input')(handleInput(el, {}))

const events = compose(
    tap(enter)
)

// Exports

// Public helper function
export const lineInput = always({msg: "[U]&nbsp;", cls: "line--input"})

// User controller
export const asEditable = compose(
    events,
    tap(caretToEnd),
    tap(clearStyles),
    tap(focus),
    tap(editable),
    line
)