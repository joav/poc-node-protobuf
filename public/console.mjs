import pipe from "ramda/pipe.js"
import andThen from "ramda/andThen.js"
import curry from "ramda/curry.js"
import split from "ramda/split.js"
import compose from "ramda/compose.js"
import prop from "ramda/prop.js"
import add from "ramda/add.js"
import ifElse from "ramda/ifElse.js"
import isNil from "ramda/isNil.js"
import { sleep, append, getDOMEl, scrollToBottom } from "impure"

const trace = curry((tag, x) => {
    console.log(tag, x)
    return x
})

const PREFIX_CHAR_COUNT = 4
const PREFIX_WORD_COUNT = 1
const WORDS_PER_MINUTE = 400


const splitChars =  split("")
const countChars = compose(trace("chars count"), add(PREFIX_CHAR_COUNT), prop("length"), trace("chars"), splitChars)
const splitWords =  split(" ")
const countWords = compose(trace("words count"), add(PREFIX_WORD_COUNT), prop("length"), trace("words"), splitWords)
const calcSeconds = (words) => words * 60 / WORDS_PER_MINUTE
const seconds = compose(calcSeconds, countWords)
const getMsgInfo = ({msg, cls}) => ({msg, cls, chars: countChars(msg), seconds: seconds(msg)})
const formatStyles = ({chars, seconds}) => `width: ${chars}ch; animation: typing ${seconds}s steps(${chars});`
const ms = (s) => s * 1000
const sleepMs = compose(trace('sleep'), sleep, trace('ms'), ms)

const html = ({msg, cls, ...info}) => ({
    msg,
    cls,
    html: `<div class="line ${cls}" style="${formatStyles(info)}">${msg}</div>`,
    ...info
})
const format = compose(trace("html + info"), html, trace("info"), getMsgInfo)
const htmlStringAsElement = (html) => new DOMParser()
    .parseFromString(html, "text/html")
    .documentElement
    .querySelector('div')

const renderMsg = curry((parent, then) => pipe(
    trace("msg"),
    format,
    ({html, seconds}) => ({el: htmlStringAsElement(html), seconds}),
    trace("el + seconds"),
    ({el, seconds}) => (append(parent, el), seconds),
    trace("seconds"),
    sleepMs,
    andThen(then)
))

export let renderLines;

const firstIsNill = (_, [first]) => isNil(first)
const renderFirstMsg = (parent, [first, ...rest]) => renderMsg(parent)(() => (scrollToBottom(parent), renderLines(parent, rest)))(first)

const resolve = () => getDOMEl('.line:last-child')

renderLines = ifElse(
    firstIsNill,
    resolve,
    renderFirstMsg
)
