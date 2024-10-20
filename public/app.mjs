import compose from "ramda/compose.js"
import tap from "ramda/tap.js"
import { getDOMEl, trace } from "impure"
import events from "events"
import { welcome } from "renderer"

const idSelector = (id) => `#${id}`

const app = compose(events, tap(welcome), trace('app'), getDOMEl, trace('id'), idSelector)
export default app