import compose from "ramda/compose.js"
import prop from "ramda/prop.js"
import {doFetch, trace} from "impure"
import {helloRequest, encode} from "proto"

const api = doFetch('api')
const options = (data) => ({method: 'POST', body: data, headers: {'Content-Type': 'application/protobuf; proto=com.joav.HelloRequest'}})
const apiOptions = compose(
    trace('options'),
    options,
    trace('encode result'),
    encode,
    helloRequest
)

export const fetcher = compose(
    api,
    apiOptions,
    trace('name for message'),
    prop('detail')
)