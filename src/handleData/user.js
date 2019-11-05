import { STORE_OBJ } from '../common/Data/index.js'

// 处理用户数据
export function HandleUserData(data) {
  try {
    let permissionObj = { index: true }
    let userPermissonList = data.permissions.map(item => {
      return item.substring(11)
    })
    userPermissonList.forEach(item => {
      permissionObj[item] = item
    })
    return {
      userInfo: {
        id: data.id,
        name: data.name,
        nickName: data.nickname,
        phone: data.phone,
        permissionObj: permissionObj,
        currentStoreId: data.current_store,
        currentStore: STORE_OBJ[data.current_store].name,
        storeList: data.stores.map(item => {
          return {
            name: STORE_OBJ[item].name,
            id: item
          }
        }),
        position: data.position_text
      }
    }
  } catch (err) {
    console.log(err)
  }
}
