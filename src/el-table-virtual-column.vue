<template>
  <el-table-column
    v-bind="{
      ...$attrs,
      type
    }"
    :class-name="isTree ? 'el-table__row--level' : ''">
    <!-- 列头部 -->
    <template #header="scope">
      <slot name="header" v-bind="scope">
        <!-- 多选类型-全选 -->
        <el-checkbox
          v-if="scope.column.type === 'v-selection'"
          v-model="isCheckedAll"
          :indeterminate="isCheckedImn"
          @change="onCheckAllRows">
        </el-checkbox>
        <template v-else>
          {{scope.column.label}}
        </template>
      </slot>
    </template>
    <!-- 列内容 -->
    <template v-slot="scope">
      <!-- v-tree类型 -->
      <template v-if="scope.column && scope.column.type === 'v-tree'">
        <span class="el-table__indent" :style="{ paddingLeft: `${(scope.row.$level - 1) * indent}px` }"></span>
        <div
          v-if="(scope.row.$v_hasChildren !== false)"
          class="el-table__expand-icon"
          :class="scope.row.$v_expanded ? 'el-table__expand-icon--expanded' : ''"
          @click="onTreeNodeExpand(scope.row)">
          <i class="el-icon is-loading" v-if="scope.row.$v_loading"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"></path></svg></i>
          <i class="el-icon" v-else><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"></path></svg></i>
        </div>
        <span v-else class="el-table__placeholder"></span>
      </template>
      <slot v-bind="scope">
        <!-- 多选类型 -->
        <el-checkbox
          v-if="scope.column.type === 'v-selection'"
          :model-value="scope.row.$v_checked"
          @change="onCheckRow(scope.row, !scope.row.$v_checked)">
        </el-checkbox>
        <!-- 单选类型 -->
        <el-radio
          v-if="scope.column.type === 'v-radio'"
          :label="true"
          :model-value="virtualScroll.curRow === scope.row"
          @change="onRadioChange(scope.row)">
          <span></span>
        </el-radio>
        <!-- v-index类型 -->
        <span v-else-if="scope.column.type === 'v-index'">
          {{getIndex(scope)}}
        </span>
        <template v-else>
          {{scope.row[scope.column.property]}}
        </template>
      </slot>
    </template>
  </el-table-column>
</template>

<script>
// import {
//   ElTableColumn,
//   ElCheckbox,
//   ElRadio
// } from 'element-plus'

export default {
  inheritAttrs: false,
  name: 'el-table-virtual-column',
  components: {
    // ElTableColumn,
    // ElCheckbox,
    // ElRadio
  },
  inject: ['virtualScroll'],
  props: {
    load: {
      type: Function
    },
    indent: {
      type: Number,
      default: 16
    }
  },
  data () {
    return {
      isCheckedAll: false, // 全选
      isCheckedImn: false, // 控制半选样式
      isTree: false,
      type: undefined
    }
  },
  methods: {
    // 选择表格所有行
    onCheckAllRows (val) {
      val = this.isCheckedImn ? true : val
      this.virtualScroll.checkAll(val)
      this.isCheckedAll = val
      this.isCheckedImn = false
    },
    // 选择表格某行
    onCheckRow (row, val) {
      this.virtualScroll.checkRow(row, val)
      this.syncCheckStatus()
    },
    // 同步全选、半选框状态
    syncCheckStatus () {
      const list = this.virtualScroll.data
      const checkedLen = list.filter(row => row.$v_checked === true).length
      if (checkedLen === 0) {
        this.isCheckedAll = false
        this.isCheckedImn = false
      } else if (checkedLen === list.length) {
        this.isCheckedAll = true
        this.isCheckedImn = false
      } else {
        this.isCheckedAll = false
        this.isCheckedImn = true
      }
    },
    onRadioChange (row) {
      this.virtualScroll.setCurrentRow(row)
    },
    // 获取索引值
    getIndex (scope) {
      const index = this.virtualScroll.start + scope.$index
      if (typeof this.$attrs.index === 'function') {
        return this.$attrs.index(index)
      }
      return index + 1
    },
    // 展开收起事件
    onTreeNodeExpand (row) {
      this.$set(row, '$v_expanded', !row.$v_expanded)
      if (row.$v_expanded) {
        this.loadChildNodes(row)
      } else {
        this.hideChildNodes(row)
      }
    },
    // 加载子节点
    loadChildNodes (row) {
      // 如果已经加载，则显示隐藏的字节点
      if (row.$v_loaded) {
        const list = this.virtualScroll.data
        const index = list.findIndex(item => item === row)
        if (index > -1) {
          this.virtualScroll.updateData([
            ...list.slice(0, index + 1),
            ...row.$v_hideNodes,
            ...list.slice(index + 1)
          ])
        }
        return
      }

      // 获取子节点数据并显示
      this.$set(row, '$v_loading', true)
      this.load && this.load(row, resolve.bind(this))

      function resolve (data) {
        if (Array.isArray(!data)) data = []

        this.$set(row, '$v_loading', false)
        this.$set(row, '$v_loaded', true)
        this.$set(row, '$v_hasChildren', !!data.length)
        data.forEach(item => {
          item.$level = typeof row.$level === 'number' ? row.$level + 1 : 2
        })
        // 所有子节点插入到当前同级节点下
        const list = this.virtualScroll.data
        const index = list.findIndex(item => item === row)
        if (index > -1) {
          this.virtualScroll.updateData([
            ...list.slice(0, index + 1),
            ...data,
            ...list.slice(index + 1)
          ])
        }
      }
    },
    // 隐藏子节点
    hideChildNodes (row) {
      const list = this.virtualScroll.data
      const index = list.findIndex(item => item === row)
      if (index === -1) return

      // 查找当前节点的所有子孙节点
      const hideNodes = []
      for (let i = index + 1; i < list.length; i++) {
        const curRow = list[i]
        if ((curRow.$level || 1) <= (row.$level || 1)) break
        hideNodes.push(curRow)
      }
      this.$set(row, '$v_hideNodes', hideNodes)
      // 隐藏所有子孙节点
      const newList = list.filter(item => !hideNodes.includes(item))
      this.virtualScroll.updateData(newList)
      this.virtualScroll.update()
    }
  },
  created () {
    this.$set = (data, key, value) => {
      data[key] = value
    }

    this.virtualScroll.addColumn(this)

    const { type } = this.$attrs
    if (['index', 'selection', 'radio', 'tree'].includes(type)) {
      this.type = 'v-' + type
    } else {
      this.type = type
    }

    if (type === 'tree') {
      this.isTree = true
    }
  },
  beforeUnmount () {
    this.virtualScroll.removeColumn(this)
  }
}
</script>

<style lang='less' scoped>
</style>
