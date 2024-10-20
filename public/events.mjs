import compose from "ramda/compose.js"
import tap from "ramda/tap.js"
import flip from "ramda/flip.js"
import prop from "ramda/prop.js"
import andThen from "ramda/andThen.js"
import {
    windowListen,
    listen,
    trace,
    removeClass,
    addClass,
    getDOMEl,
    focus,
    caretToEnd,
    stopPropagation,
    toArrayBuffer
} from "impure"
import {fetcher} from "fetcher"
import {toUint8Arr} from "utils"
import {decode} from "proto"

// Helpers
const removeActiveClass = flip(removeClass)('console--active')
const addActiveClass = compose(
    flip(addClass)('console--active'),
    prop('target')
)
const responseParse = compose(
    andThen(prop('message')),
    andThen(decode),
    andThen(toUint8Arr)
)

const lastInputLine = () => getDOMEl('.line--input:last-child')

// Handlers
const handleGlobalClick = () => removeActiveClass(getDOMEl('.console'))
const handleAppClick = compose(
    tap(caretToEnd),
    tap(focus),
    lastInputLine,
    addActiveClass,
    tap(stopPropagation)
)
const handleNameEvent = (app) => compose(
    andThen(trace('response')),
    responseParse,
    andThen(toArrayBuffer),
    fetcher,
    tap(() => removeActiveClass(app)),
    trace("name")
)

// Events
const clickWindow = () => windowListen('click')(compose(handleGlobalClick, trace('click')))
const clickApp = (app) => listen(app)('click')(handleAppClick)
const name = (app) => (trace('app from events', app), windowListen('name', trace('handler from events', handleNameEvent(app))))

const events = compose(
    tap(clickWindow),
    tap(name),
    tap(clickApp)
)

export default events;