import compose from "ramda/compose.js"
import flip from "ramda/flip.js"
import prop from "ramda/prop.js"
import { getDOMEl, setHTML } from "impure"
import {helloRequest} from "proto"

const renderMsg = flip(setHTML)
const reqMsg = (name) => `Hello ${name}!`
const renderReq = compose(renderMsg, reqMsg, prop("name"), helloRequest)('MyName')
const idSelector = (id) => `#${id}`

const app = compose(renderReq, getDOMEl, idSelector)

export default app