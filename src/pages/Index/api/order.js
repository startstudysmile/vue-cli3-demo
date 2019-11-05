import Axios from '../http/index'

// 添加订单
export function AddOrder(data) {
  return new Promise(resolve => {
    Axios.post('/orders', data).then(() => {
      resolve()
    })
  })
}

// 修改订单
export function ModifyOrder(data) {
  return new Promise(resolve => {
    Axios.put('/orders', data).then(() => {
      resolve()
    })
  })
}

// 修改订单类型
export function ModifyOrderType(data) {
  return new Promise(resolve => {
    Axios.put('/orders/print', data).then(() => {
      resolve()
    })
  })
}

// 查询订单
export function SearchOrder(data) {
  return new Promise(resolve => {
    Axios.get('/orders', data).then(res => {
      resolve(res)
    })
  })
}

// 查询订单详情
export function SearchOrderDetail(data) {
  return new Promise(resolve => {
    Axios.get('/orders/detail', data).then(res => {
      resolve(res)
    })
  })
}
