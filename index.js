var newPath = '/demo/index.html'
console.log('newPath:'+newPath)
if (newPath.length > 0) {
    if (newPath.startsWith('/') === false) {
        newPath = '/'+newPath
    }
    console.log('newPath:'+newPath)
    console.log('正在跳转...')
    window.location.href = window.location.href.replace('/index.html', newPath)
    console.log(window.location.href)
}
