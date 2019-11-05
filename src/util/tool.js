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

// 跳转到登录页面
export function JumpToLogin() {
  localStorage.clear()
  sessionStorage.clear()

  let loginUrl = {
    production: 'http://sso.dev.hzmantu.com/login/103',
    opsproduction: 'http://sso.dev.hzmantu.com/login/1014',
    development: 'http://sso.dev.hzmantu.com/login/1014'
  }[process.env.NODE_ENV]

  window.location.replace(loginUrl)
}
