function homeUrlPath() {
    var href = window.location.href
    var index = href.indexOf('/MyWeb')
    if (index > 0) {
        var homeUrlPath = href.substring(0, index + 6)
        return homeUrlPath+'/'
    } else {
        return 'https://hunanldc.github.io/MyWeb/'
    }
}

function gotoRelativePath(relativePath) {
    if (relativePath.startsWith('/')) {
        relativePath = relativePath.substring(1, relativePath.length);
    }
    window.location.href = homeUrlPath()+ relativePath
}