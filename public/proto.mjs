import proto from "proto/com.joav"
import compose from "ramda/compose.js"

const {HelloRequest} = proto

const helloRequestConstructor = (raw) => HelloRequest.create(raw)
const helloRequestRaw = (name) => ({name});
export const helloRequest = compose(helloRequestConstructor, helloRequestRaw);