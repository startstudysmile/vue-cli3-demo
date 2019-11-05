<template>
  <div class="exp-photo-manage">
    <container>
      <top-title slot="title" :titleName="titleName" :pathText="pathText"> </top-title>
      <div slot="content">
        <!-- 搜索 -->
        <div class="search-wrap">
          <div class="search-list">
            <div class="search-item">
              <span class="label">样片类型</span>
              <el-select clearable v-model="searchData.product" placeholder="请选择样片类型" style="width:200px" @change="changeProduct">
                <el-option v-for="item in searchData.productArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
            <div class="btn-wrap">
              <el-upload style="display:inline-block;margin-right:20px;" v-model="path" :action="actionUrl" :data="upyInfo" :file-list="fileList" :show-file-list="false" :multiple="false" :on-success="handleAvatarSuccess" accept="image/jpeg,image/png,image/gif">
                <el-button type="primary">上传样片</el-button>
              </el-upload>
              <el-button v-if="permissionObj['website.photo.create']" @click="saveTableData">保存排序</el-button>
            </div>
          </div>
        </div>
        <!-- 表格 -->
        <div class="table-wrap">
          <el-table class="table loading" :data="tableData" stripe>
            <el-table-column width="100px" type="index" :index="indexMethod"></el-table-column>
            <el-table-column prop="photo" label="照片" align="center">
              <img style="height:40px" :key="scope.row.photo" slot-scope="scope" v-lazy="upyHost + scope.row.photo" />
            </el-table-column>
            <el-table-column fixed="right" align="center" label="操作">
              <el-dropdown slot-scope="scope">
                <label class="theme-color">操作</label>
                <el-dropdown-menu>
                  <el-dropdown-item @click.native="setSort(scope.row)">设置排序</el-dropdown-item>
                  <el-dropdown-item v-if="permissionObj['website.photo.delete'] && scope.row.id" @click.native="delExpPhoto(scope.row)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-table-column>
          </el-table>
        </div>
        <!-- 设置排序弹出框 -->
        <el-dialog title="设置排序" width="390px" top="0" :visible.sync="setSortPopCisible">
          <el-form :model="sortForm" :rules="sortFormRule" ref="sortForm">
            <el-form-item required prop="index">
              <el-input v-model="sortForm.index" placeholder="请输入序号"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <button class="btn btn-cancel" @click="setSortPopCisible = false">
              取 消
            </button>
            <button class="btn btn-confirm" @click="confirmSet('sortForm')">确 定</button>
          </span>
        </el-dialog>
        <!-- 删除弹出框 -->
        <el-dialog title="提示" width="390px" top="0" :visible.sync="delPopVisible">
          <span class="warning-content">
            <i class="el-icon-warning dialog-icon warning-icon"></i>
            是否删除该样片
          </span>
          <span slot="footer" class="dialog-footer">
            <button class="btn btn-cancel" @click="delPopVisible = false">
              取 消
            </button>
            <button class="btn btn-confirm" @click="confirmDel">确 定</button>
          </span>
        </el-dialog>
      </div>
    </container>
  </div>
</template>

<script>
// 样片管理
import { mapActions, mapState } from 'vuex'
import Container from '@/components/Container.vue'
import TopTitle from '@/components/TopTitle.vue'
import { ACTION_HOST } from '@/common/Data/index.js'
import { VALIDATE_INDEX } from '@/common/Enum/validate.js'
import { DelExpPhoto, SaveExpPhoto } from '@/api/expPhoto.js'

export default {
  name: 'expPhotoManage',
  components: {
    Container,
    TopTitle
  },
  data() {
    return {
      // title
      titleName: '样片管理',
      pathText: '网站设置/样片管理',
      // 搜索
      searchData: {
        product: '',
        productArr: []
      },
      path: '',
      fileList: [],
      // 表格
      activeRow: {},
      tableData: [],
      // 弹出框
      setSortPopCisible: false,
      sortForm: {
        index: ''
      },
      sortFormRule: {
        index: [{ required: true, message: '请输入序号', trigger: 'blur' }, { validator: VALIDATE_INDEX }]
      },
      delPopVisible: false
    }
  },
  computed: {
    ...mapState({
      permissionObj: state => state.common.userInfo.permissionObj,
      upyInfo: state => state.common.upyInfo,
      upyHost: state => state.common.upyHost,
      productList: state => state.product.productList,
      expPhotoList: state => state.webSet.expPhotoList,
      expPhotoTotal: state => state.webSet.expPhotoTotal
    }),
    actionUrl() {
      return `${ACTION_HOST}/${this.upyInfo.bucket}`
    }
  },
  methods: {
    ...mapActions('product', ['getProductList']),
    ...mapActions('webSet', ['getExpPhotoList']),
    // 索引
    indexMethod(index) {
      return index + 1
    },
    // 切换产品
    changeProduct(val) {
      if (val) {
        this.getExpPhotoList({
          product_id: val
        }).then(() => {
          this.tableData = this.expPhotoList
        })
      }
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      this.path = file.response.url
      this.tableData.push({
        photo: this.path
      })
    },
    // 设置排序
    setSort(row) {
      this.activeRow = row
      this.setSortPopCisible = true
    },
    // 确认设置
    confirmSet(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.sortForm.index > this.tableData.length) {
            this.$message.warning('输入的序号不得大于整体长度')
            return false
          }
          let selfIndex = this.tableData.indexOf(this.activeRow) + 1
          let sortIndex = +this.sortForm.index
          if (sortIndex === selfIndex) {
            this.$message.warning('设置顺序不能于当前顺序一样')
            return false
          }

          if (sortIndex > selfIndex) {
            this.tableData.splice(this.sortForm.index, 0, this.activeRow)
            this.tableData.splice(selfIndex - 1, 1)
          }

          if (sortIndex < selfIndex) {
            this.tableData.splice(this.sortForm.index - 1, 0, this.activeRow)
            this.tableData.splice(selfIndex, 1)
          }
          this.$refs[formName].resetFields()
          this.setSortPopCisible = false
        }
      })
    },
    // 删除样片
    delExpPhoto(row) {
      this.activeRow = row
      this.delPopVisible = true
    },
    // 确认删除
    confirmDel() {
      DelExpPhoto({
        photo_id: this.activeRow.id
      }).then(() => {
        this.$message.success('删除成功')
        this.getExpPhotoList({
          product_id: this.searchData.product
        }).then(() => {
          this.tableData = this.expPhotoList
        })
        this.delPopVisible = false
      })
    },
    // 保存数据
    saveTableData() {
      SaveExpPhoto({
        product_id: this.searchData.product,
        photos: this.tableData.map(item => {
          return item.photo
        })
      }).then(() => {
        this.$message.success('保存成功')
        this.getExpPhotoList({
          product_id: this.searchData.product
        }).then(() => {
          this.tableData = this.expPhotoList
        })
      })
    }
  },
  async created() {
    await this.getProductList()
    this.searchData.product = this.productList[0].id
    this.searchData.productArr = this.productList
    await this.getExpPhotoList({
      product_id: this.searchData.product
    })
    this.tableData = this.expPhotoList
  }
}
</script>
