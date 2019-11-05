const fs = require('fs')
const path = require('path')
const upyun = require('upyun')
const args = process.argv
args.splice(0, 2)
// 得到配置
let [operator, password, bucket, rootpath, sourcefolder] = args
sourcefolder = path.resolve(__dirname, sourcefolder)
// 利用upyun包准备上传工具
const service = new upyun.Service(bucket, operator, password)
const client = new upyun.Client(service)
// 要上传的文件列表
let fileList = []

// 上传文件脚本
async function uploadFileList(fileList, client) {
  for (let item of fileList) {
    let file = null
    let remoteFile = null
    try {
      // 比对文件大小进行上传
      remoteFile = await client.headFile(item.remotePath)
      if (remoteFile && remoteFile.size === item.size && !/[(index.html)(idea.html)]$/.test(item.remotePath)) {
        // console.log('\x1b[33m'+localPath+'\t不需要上传\x1b[0m')
      } else {
        file = fs.readFileSync(item.filePath)
        await client.putFile(item.remotePath, file)
        console.log('\x1b[32m' + item.filePath + '\t上传成功\x1b[0m')
      }
    } catch (err) {
      console.log('\x1b[35m' + item.filePath + '\t上传失败\x1b[0m')
      console.log(err)
      process.exit(1)
    }
  }
}
// 读出所有的文件
function findAllFile(uploadDir, relativePath) {
  let dirExist = fs.existsSync(uploadDir)
  if (dirExist) {
    let res = fs.readdirSync(uploadDir)
    if (res.length === 0) {
      return
    }
    for (let item of res) {
      if (fs.statSync(uploadDir + path.sep + item).isDirectory()) {
        findAllFile(uploadDir + path.sep + item, relativePath + item + path.sep)
      } else {
        let localPath = uploadDir + path.sep + item
        fileList.push({
          filePath: localPath,
          remotePath: relativePath + item,
          size: fs.statSync(localPath).size
        })
      }
    }
  }
}

findAllFile(sourcefolder, rootpath)
if (fileList.length === 0) {
  console.log('\x1b[31m没有要上传的资源\x1b[0m')
} else {
  uploadFileList(fileList, client)
}
