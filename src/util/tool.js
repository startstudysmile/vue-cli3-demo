export function parseStorage(name, type) {
  let data = type === 'sessionStorage' ? sessionStorage.getItem(name) : localStorage.getItem(name)
  if (!data) return null
  if (String(data) === 'null') return null
  try {
    return JSON.parse(data)
  } catch {
    return data
  }
}

export function setSessionStorage(name, data) {
  if (!name) {
    throw new Error('need name')
  }
  let needStringify = typeof data === 'object'
  let storageData = needStringify ? JSON.stringify(data) : data
  return sessionStorage.setItem(name, storageData)
}

export function getSessionStorage(name, noParse) {
  if (noParse) return localStorage.getItem(name)
  return parseStorage(name, 'sessionStorage')
}

// 获取参数
export function GetQueryString(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}

// 获取服务器时间
export function GetServerTime() {
  var xmlHttp = false
  //获取服务器时间
  try {
    xmlHttp = new window.ActiveXObject('Msxml2.XMLHTTP')
  } catch (e) {
    try {
      xmlHttp = new window.ActiveXObject('Microsoft.XMLHTTP')
    } catch (e2) {
      xmlHttp = false
    }
  }
  if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
    xmlHttp = new XMLHttpRequest()
  }
  xmlHttp.open('GET', 'null.txt', false)
  xmlHttp.setRequestHeader('Range', 'bytes=-1')
  xmlHttp.send(null)
  var severtime = new Date(xmlHttp.getResponseHeader('Date'))
  return severtime.getTime()
}
