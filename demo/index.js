// https: //zhuanlan.zhihu.com/p/77573456
// https: //zhuanlan.zhihu.com/p/77573456

function getGameIDByUrl(gameUrl) {
  var key = 'gameid';
  gameUrl = gameUrl.toLowerCase();
  var gameID = getUrlParam(gameUrl, key);
  if (gameID.length === 0) {
    gameUrl = removeUrlQuery(gameUrl);
    var arr = gameUrl.split(key + '/');
    if (arr.length > 1) {
      var gameIDStr = arr[1]; //eg:13/zone  13.html
      var gameIDArr = gameIDStr.split('/');
      if (gameIDArr.length > 0) {
        gameID = gameIDArr[0];
        var arr = gameID.split('.');
        if (arr.length > 0) {
          gameID = arr[0];
        }
      }
    }
  }
  return gameID;
}

function removeUrlQuery(gameUrl) {
  gameUrl = gameUrl || '';
  var arr = gameUrl.split('?');
  if (arr.length > 0) {
    return arr[0];
  } else {
    return '';
  }
}

//获取url参数
function getUrlParam(url, key) {
  var reg = "/^.*[\\?|\\&]" + key + "\\=([^\\&]*)/";
  reg = eval(reg);
  var ret = url.match(reg);
  if (ret != null) {
    return decodeURIComponent(ret[1]);
  } else {
    return "";
  }
}

//单元测试
function test() {
  testSingleLinks();
}

function newSingleLinks(length) {
  var headNode = undefined;
  var preNode = undefined;
  for (var i = 0; i < length; i++) {
    var node = {
      value: i,
      nextNode: undefined,
    };
    if (i === 0) {
      headNode = node;
    } else {
      preNode.nextNode = node;
    }
    preNode = node
  }
  return headNode;
}

function logSingleLinks(linkHead) {
  var preNode = linkHead;
  while (preNode.nextNode !== undefined) {
    console.log(preNode.value);
    preNode = preNode.nextNode;
  }
  console.log(preNode.value);
}

//链表头，翻转的起始位置，翻转结束位置
function reverseSingLink(linkHead, start, end) {
  while (start < (end - 1)) {
    //交换第start与第end个节点,start,end从0开始
    if (start === 0) {
      var startPreNode = linkHead;
      var endPreNode = getSingleLinkNode(linkHead, end - 1);
      //交换第一个与最后一个
      var endNode = endPreNode.nextNode;
      var endNextNode = endNode.nextNode;
      endNode.nextNode = startPreNode.nextNode;
      endPreNode.nextNode = startPreNode;
      startPreNode.nextNode = endNextNode;
      linkHead = startPreNode;
    } else {
      var startPreNode = getSingleLinkNode(linkHead, start - 1);
      var startNode = startPreNode.nextNode;
      var endPreNode = getSingleLinkNode(linkHead, end - 1);
      //交换第一个与最后一个
      var endNode = endPreNode.nextNode;
      var endNextNode = endNode.nextNode;
      //交换endNode与startNode
      endNode.nextNode = startNode.nextNode;
      startNode.nextNode = endNextNode;
      endPreNode.nextNode = startNode;
      startPreNode.nextNode = endNode;
    }
    start++;
    end--;
  }
}

function getSingleLinkNode(linkHead, nodeIndex) {
  var currentNode = linkHead;
  var index = 0;
  while (currentNode.nextNode !== undefined && index < nodeIndex) {
    currentNode = currentNode.nextNode;
    index++;
  }
  if (index === nodeIndex) {
    return currentNode;
  } else {
    return undefined;
  }
}

function testSingleLinks() {
  var singleLinks = newSingleLinks(10);
  logSingleLinks(singleLinks);

  var index = 0;
  while (index < 10) {
    var node = getSingleLinkNode(singleLinks, index);
    console.log(index + ' ' + node.value);
    index++;
  }
  // return;

  var length = 10;
  var k = 3;
  var start = length - k - 1;
  var end = length - 1;
  while (start >= 0 && end - start === k) {
    reverseSingLink(singleLinks, start, end);
    console.log('#############');
    logSingleLinks(singleLinks);
    end = start;
    start = start - k;
  }
  console.log('#############');
  logSingleLinks(singleLinks);
}