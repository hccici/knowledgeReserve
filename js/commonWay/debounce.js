/* setTimeout */
function debounce(fn) {
    let to;
    return function (...args) {
        clearTimeout(to)
        to = setTimeout(fn.bind(this,...args), 1000)
    }
}

function say() {
    let list = Array.from(arguments)
    let res = ''
    list.forEach(item => {
        res += item
    })
    console.log(res)
}
/* say('护手霜', 'ss')
say('护手霜', 'ss')
say('护手霜', 'ss') */
let dSay = debounce(say)
dSay('护手霜', 'ss')
dSay('护手霜', 'ss')
dSay('护手霜', 'ss')