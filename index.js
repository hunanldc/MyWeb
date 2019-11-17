var newPath = '/demo/index.html'

if (newPath.startsWith('/') === false) {
    newPath = '/'+newPath
}
console.log('正在跳转...')
var newHref = window.location.href.replace('/index.html', newPath)
console.log(newHref)
window.location.href = newHref