import { Loading } from 'element-ui'

let loading

function startLoading() {
  loading = Loading.service({
    lock: true,
    target: document.querySelector('.loading')
  })
}
function endLoading() {
  loading.close()
}

let needLoadingRequestCount = 0
export function ShowLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function HideLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
