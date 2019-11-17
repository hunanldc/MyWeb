var newPath = '/demo/index.html'

if (newPath.startsWith('/') === false) {
    newPath = '/'+newPath
}
window.location.href = window.location.href.replace('/index.html', newPath)