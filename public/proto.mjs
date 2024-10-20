import proto from "proto/com.joav"
import compose from "ramda/compose.js"

const {HelloRequest, HelloResponse} = proto

const helloRequestConstructor = (raw) => HelloRequest.create(raw)
const helloRequestRaw = (name) => ({name})
export const helloRequest = compose(helloRequestConstructor, helloRequestRaw)
export const encode = (msg) => HelloRequest.encode(msg).finish()
export const decode = (msg) => HelloResponse.decode(msg)