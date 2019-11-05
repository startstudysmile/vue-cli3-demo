import { Message } from 'element-ui'

const ERROR_CODE_OBJ = {
  '0xA0122A081': '用户未登录',
  '0xA0122A082': '该账号已经被锁定',
  '0xA0122A001': '订单号缺失'
}

export function HandleError(error) {
  let errCode = error.data.error_code
  let errMsg = error.data.error_msg
  Message.error(ERROR_CODE_OBJ['0x' + errCode.toString(16).toUpperCase()] || errCode + ':' + errMsg)
}
