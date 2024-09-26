import compose from "ramda/compose.js"
import flip from "ramda/flip.js"
import prop from "ramda/prop.js"
import { getDOMEl, setHTML } from "impure"
import {helloRequest} from "proto"

const renderMsg = flip(setHTML)
const reqMsg = (name) => `
<div class="line system">Hello ${name}! Hello ${name}!</div>
<div class="line system system--success">Hello ${name}!</div>
<div class="line system system--success">Hello ${name}!</div>
<div class="line system system--success">Hello ${name}!</div>
<div class="line system system--success">Hello ${name}!</div>
<div class="line system system--success">Hello ${name}!</div>
<div class="line line--input">some input</div>
<div class="line system system--success">Hello ${name}!</div>
<div class="line system system--success">Hello ${name}!</div>
<div class="line system system--success">Hello ${name}!</div>
<div class="line system system--success">Hello ${name}!</div>
<div class="line system system--success">Hello ${name}!</div>
<div class="line system system--success">Hello ${name}!</div>
<div class="line system system--success">Hello ${name}!</div>
<div class="line system system--success">Hello ${name}!</div>
<div class="line system system--success">Hello ${name}!</div>
<div class="line system system--success">Hello ${name}!</div>
<div class="line system system--success">Hello ${name}!</div>
<div class="line system system--success">Hello ${name}!</div>
`
const renderReq = compose(renderMsg, reqMsg, prop("name"), helloRequest)('BLOG')
const idSelector = (id) => `#${id}`

const app = compose(renderReq, getDOMEl, idSelector)

export default app