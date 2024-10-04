import compose from "ramda/compose.js"
import tap from "ramda/tap.js"
import flip from "ramda/flip.js"
import {windowListen, trace, removeClass} from "impure"
import {notImplemented} from "utils"

// Helpers
const removeActiveClass = flip(removeClass)('console--active')

// Handlers
const handleGlobalClick = () => notImplemented('click')
const handleNameEvent = (app) => compose(() => removeActiveClass(app), trace("name"))

// Events
const click = () => windowListen('click', handleGlobalClick)
const name = (app) => (trace('app from events', app), windowListen('name', trace('handler from events', handleNameEvent(app))))

const events = compose(
    tap(name),
    tap(click)
)

export default events;