<template>
  <div
    class="el-table-virtual-scroll"
    :class="[isHideAppend ? 'hide-append' : '', stopAmin ? 'no-row-amin' : '']">
    <slot></slot>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'

// 判断是否是滚动容器
function isScroller (el) {
  const style = window.getComputedStyle(el, null)
  const scrollValues = ['auto', 'scroll']
  return scrollValues.includes(style.overflow) || scrollValues.includes(style['overflow-y'])
}

// 获取容器滚动位置
function getScrollTop (el) {
  return el === window ? window.pageYOffset : el.scrollTop
}

// 获取容器滚动位置
function getScrollLeft (el) {
  return el === window ? window.pageXOffset : el.scrollLeft
}

// 设置容器滚动位置
function setScrollTop (el, pos) {
  return el === window ? window.scroll(window.pageXOffset, pos) : (el.scrollTop = pos)
}

// 设置容器滚动位置
function setScrollLeft (el, pos) {
  return el === window ? window.scroll(pos, window.pageYOffset) : (el.scrollLeft = pos)
}

// 获取容器高度
function getOffsetHeight (el) {
  return el === window ? window.innerHeight : el.offsetHeight
}

// 滚动到某个位置
function scrollToY (el, y) {
  if (el === window) {
    window.scroll(0, y)
  } else {
    el.scrollTop = y
  }
}

// 是否为空 undefine or null
function isEmpty (val) {
  return typeof val === 'undefined' || val === null
}

// 表格body class名称
const TableBodyClassNames = ['.el-table__body-wrapper .el-scrollbar__view']

let checkOrder = 0 // 多选：记录多选选项改变的顺序

export default {
  inheritAttrs: false,
  name: 'el-table-virtual-scroll',
  props: {
    // 总数据
    data: {
      type: Array,
      required: true
    },
    // 每一行的预估高度
    itemSize: {
      type: Number,
      default: 60
    },
    // 指定滚动容器
    scrollBox: {
      type: String
    },
    // 顶部和底部缓冲区域，值越大显示表格的行数越多
    buffer: {
      type: Number,
      default: 200
    },
    // key值，data数据中的唯一id
    keyProp: {
      type: String,
      default: 'id'
    },
    // 滚动事件的节流时间
    throttleTime: {
      type: Number,
      default: 10
    },
    // 是否获取表格行动态高度
    dynamic: {
      type: Boolean,
      default: true
    },
    // 是否开启虚拟滚动
    virtualized: {
      type: Boolean,
      default: true
    },
    // 表格行合并时，合并在一起的行返回相同的key值
    rowSpanKey: {
      type: Function
    }
  },
  provide () {
    return {
      virtualScroll: this
    }
  },
  data () {
    return {
      sizes: {}, // 尺寸映射（依赖响应式）
      start: 0,
      end: undefined,
      curRow: null, // 表格单选：选中的行
      isExpanding: false, // 列是否正在展开
      columnVms: [], // virtual-column 组件实例
      isHideAppend: false,
      stopAmin: false // 是否停止row过渡动画
    }
  },
  computed: {
    // 计算出每个item（的key值）到滚动容器顶部的距离
    offsetMap ({ keyProp, itemSize, sizes, data }) {
      if (!this.dynamic) return {}

      const res = {}
      let total = 0
      for (let i = 0; i < data.length; i++) {
        const key = data[i][keyProp]
        res[key] = total

        const curSize = sizes[key]
        const size = typeof curSize === 'number' ? curSize : itemSize
        total += size
      }
      return res
    }
  },
  methods: {
    // 初始化数据
    initData () {
      // 可视范围内显示数据
      this.renderData = []
      // 页面可视范围顶端、底部
      this.top = undefined
      this.bottom = undefined
      // 截取页面可视范围内显示数据的开始和结尾索引
      this.start = 0
      this.end = undefined
      // 设置表格到滚动容器的距离
      this.toTop = 0
      // 组件是否deactivated状态
      this.isDeactivated = false
      // 滚动容器滚动位置【0-滚动容器top；1-滚动容器left；2-表格滚动容器top；3-表格滚动容器left】
      this.scrollPos = [0, 0, 0, 0]

      this.scroller = this.getScroller()
      this.setToTop()
      this.recordTablePos()

      // 初次执行
      setTimeout(() => {
        this.handleScroll()
      }, 100)

      // 监听事件
      this.onScroll = !this.throttleTime ? this.handleScroll : throttle(this.handleScroll, this.throttleTime)
      this.scroller.addEventListener('scroll', this.onScroll, { passive: true })
      window.addEventListener('resize', this.onScroll)
    },

    // 获取滚动元素
    getScroller () {
      let el
      if (this.scrollBox) {
        if (this.scrollBox === 'window' || this.scrollBox === window) return window

        el = document.querySelector(this.scrollBox)
        if (!el) throw new Error(` scrollBox prop: '${this.scrollBox}' is not a valid selector`)
        if (!isScroller(el)) console.warn(`Warning! scrollBox prop: '${this.scrollBox}' is not a scroll element`)
        return el
      } else {
        this.innerScroll = true
        return this.$el.querySelector('.el-table__body-wrapper .el-scrollbar__wrap')
      }
    },

    // 设置表格到滚动容器的距离
    setToTop () {
      if (this.innerScroll) {
        this.toTop = 0
      } else {
        this.toTop = this.$el.getBoundingClientRect().top - (this.scroller === window ? 0 : this.scroller.getBoundingClientRect().top) + getScrollTop(this.scroller)
      }
    },

    // 处理滚动事件
    handleScroll (shouldUpdate = true) {
      this.stopAmin = true
      this.$nextTick(() => {
        this.stopAmin = false
      })

      // 如果组件失活，则不再执行handleScroll；否则外部容器滚动情况下记录的scrollTop会是0
      if (this.isDeactivated) return
      // 记录scrollPos
      this.scrollPos[0] = getScrollTop(this.scroller)
      this.scrollPos[1] = getScrollLeft(this.scroller)

      if (!this.virtualized) return

      // 更新当前尺寸（高度）
      this.updateSizes()
      // 计算renderData
      this.calcRenderData()
      // 计算位置
      this.calcPosition()
      shouldUpdate && this.updatePosition()
      // 触发事件
      this.$emit('change', this.renderData, this.start, this.end)
    },

    // 更新尺寸（高度）
    updateSizes () {
      if (!this.dynamic) return
      let rows = this.$el.querySelectorAll('.el-table__body > tbody > .el-table__row')

      // 处理树形表格
      let isTree = false
      if (rows[0] && rows[0].classList.contains('el-table__row--level-0')) {
        isTree = true
        rows = this.$el.querySelectorAll('.el-table__body > tbody > .el-table__row.el-table__row--level-0')
      }

      Array.from(rows).forEach((row, index) => {
        const item = this.renderData[index]
        if (!item) return

        // 计算表格行的高度
        let offsetHeight = row.offsetHeight
        // 表格行如果有扩展行，需要加上扩展内容的高度
        const next = row.nextSibling
        if (next.tagName === 'TR' && next.querySelector('.el-table__expanded-cell')) {
          offsetHeight += next.offsetHeight
        }
        // 表格行如果有子孙节点，需要加上子孙节点的高度
        if (isTree) {
          let next = row.nextSibling
          while (next && next.tagName === 'TR' && !next.classList.contains('el-table__row--level-0')) {
            offsetHeight += next.offsetHeight
            next = next.nextSibling
          }
        }

        const key = item[this.keyProp]
        if (this.sizes[key] !== offsetHeight) {
          this.sizes[key] = offsetHeight
        }
      })
    },

    // 获取某条数据offsetTop
    getItemOffsetTop (index) {
      if (!this.dynamic) {
        return this.itemSize * index
      }

      const item = this.data[index]
      if (item) {
        return this.offsetMap[item[this.keyProp]] || 0
      }
      return 0
    },

    // 获取某条数据的尺寸
    getItemSize (index) {
      if (index <= -1) return 0
      const item = this.data[index]
      if (item) {
        const key = item[this.keyProp]
        return this.sizes[key] || this.itemSize
      }
      return this.itemSize
    },

    // 计算只在视图上渲染的数据
    calcRenderData () {
      const { scroller, data, buffer } = this
      // 计算可视范围顶部、底部
      const top = this.scrollPos[0] - buffer - this.toTop
      const bottom = this.scrollPos[0] + getOffsetHeight(scroller) + buffer - this.toTop

      let start
      let end
      if (!this.dynamic) {
        start = top <= 0 ? 0 : Math.floor(top / this.itemSize)
        end = bottom <= 0 ? 0 : Math.ceil(bottom / this.itemSize)
      } else {
        // 二分法计算可视范围内的开始的第一个内容
        let l = 0
        let r = data.length - 1
        let mid = 0
        while (l <= r) {
          mid = Math.floor((l + r) / 2)
          const midVal = this.getItemOffsetTop(mid)
          if (midVal < top) {
            const midNextVal = this.getItemOffsetTop(mid + 1)
            if (midNextVal > top) break
            l = mid + 1
          } else {
            r = mid - 1
          }
        }

        // 计算渲染内容的开始、结束索引
        start = mid
        end = data.length - 1
        for (let i = start + 1; i < data.length; i++) {
          const offsetTop = this.getItemOffsetTop(i)
          if (offsetTop >= bottom) {
            end = i
            break
          }
        }
      }

      if (this.isRowSpan()) {
        // 计算包含合并行的开始结束区间（⚠️注意：合并行不支持使用斑马纹，因为不能100%确定合并行的开始行是偶数，可能会向上找一直到第一行，导致渲染非常多行，浪费性能）
        [start, end] = this.calcRenderSpanData(start, end)
      } else {
        // 开始索引始终保持偶数，如果为奇数，则加1使其保持偶数【确保表格行的偶数数一致，不会导致斑马纹乱序显示】
        if (start % 2) start = start - 1
      }

      this.top = top
      this.bottom = bottom
      this.start = start
      this.end = end
      this.renderData = data.slice(start, end + 1)
    },

    // 如果存在合并行的情况，渲染的数据范围扩大到包含合并行
    calcRenderSpanData (start, end) {
      // 从开始节点向上查找是否有合并行
      let prevKey
      while (start > 0) {
        const curRow = this.data[start]
        const curkey = this.rowSpanKey(curRow, start)
        // 如果不存在key，说明当前行不属于合并行
        if (isEmpty(curkey)) break

        // 如果当前行与后面一行的key不相同，说明则当前行不属于合并行，从后一行开始截断
        if (!isEmpty(prevKey) && prevKey !== curkey) {
          start++
          break
        }

        prevKey = curkey
        start--
      }

      // 从末端节点向下查找是否有合并行
      const len = this.data.length
      prevKey = undefined
      while (end < len) {
        const curRow = this.data[end]
        const curkey = this.rowSpanKey(curRow, end)
        // 如果不存在key，说明当前行不属于合并行
        if (!curkey) break

        // 如果当前行与前面一行的key不相同，说明则当前行不属于合并行，从前一行开始截断
        if (prevKey && prevKey !== curkey) {
          end--
          break
        }

        prevKey = curkey
        end++
      }

      return [start, end]
    },

    // 是否是合并行
    isRowSpan () {
      return typeof this.rowSpanKey === 'function'
    },

    // 计算位置
    calcPosition () {
      const last = this.data.length - 1
      // 计算内容总高度
      const wrapHeight = this.getItemOffsetTop(last) + this.getItemSize(last)
      // 计算当前滚动位置需要撑起的高度
      const offsetTop = this.getItemOffsetTop(this.start)

      // 设置dom位置
      TableBodyClassNames.forEach(className => {
        const el = this.$el.querySelector(className)
        if (!el) return

        // 创建wrapEl、innerEl
        if (!el.wrapEl) {
          const wrapEl = document.createElement('div')
          const innerEl = document.createElement('div')
          wrapEl.appendChild(innerEl)
          innerEl.appendChild(el.children[0])
          el.insertBefore(wrapEl, el.firstChild)
          el.wrapEl = wrapEl
          el.innerEl = innerEl
        }

        if (el.wrapEl) {
          // 设置高度
          el.wrapEl.style.height = wrapHeight + 'px'
          // 设置transform撑起高度
          el.innerEl.style.transform = `translateY(${offsetTop}px)`
          // 设置paddingTop撑起高度
          // el.innerEl.style.paddingTop = `${offsetTop}px`
        }
      })
    },

    // 空闲时更新位置（触发时间：滚动停止后等待10ms执行）
    // 滚动停止之后，偶尔表格的行发生高度变更，那么当前计算的渲染数据是不正确的；那么需要手动触发最后一次handleScroll来重新计算
    updatePosition () {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.timer && clearTimeout(this.timer)
        // 传入false，避免一直循环调用
        this.handleScroll(false)
      }, this.throttleTime + 10)
    },

    // 渲染全部数据
    renderAllData () {
      this.renderData = this.data
      this.$emit('change', this.data, 0, this.data.length - 1)

      this.$nextTick(() => {
        // 清除撑起的高度和位置
        TableBodyClassNames.forEach(className => {
          const el = this.$el.querySelector(className)
          if (!el) return

          if (el.wrapEl) {
            // 设置高度
            el.wrapEl.style.height = 'auto'
            // 设置transform撑起高度
            el.innerEl.style.transform = `translateY(${0}px)`
          }
        })
      })
    },

    // 【外部调用】更新
    update () {
      // console.log('update')
      this.setToTop()
      this.handleScroll()
    },

    // 【外部调用】滚动到第几行
    // （不太精确：滚动到第n行时，如果周围的表格行计算出真实高度后会更新高度，导致内容坍塌或撑起）
    scrollTo (index, stop = false) {
      const item = this.data[index]
      if (item && this.scroller) {
        this.updateSizes()
        this.calcRenderData()

        this.$nextTick(() => {
          const offsetTop = this.getItemOffsetTop(index)
          scrollToY(this.scroller, offsetTop)

          // 调用两次scrollTo，第一次滚动时，如果表格行初次渲染高度发生变化时，会导致滚动位置有偏差，此时需要第二次执行滚动，确保滚动位置无误
          if (!stop) {
            setTimeout(() => {
              this.scrollTo(index, true)
            }, 50)
          }
        })
      }
    },
    // 【外部调用】重置
    reset () {
      this.sizes = {}
      this.scrollTo(0, false)
    },

    // 添加virtual-column实例
    addColumn (vm) {
      this.columnVms.push(vm)
    },
    // 移除virtual-column实例
    removeColumn (vm) {
      this.columnVms = this.columnVms.filter(item => item !== vm)
    },
    // 多选：选中所有列
    checkAll (val) {
      this.data.forEach(row => this.checkRow(row, val, false))
      this.emitSelectionChange()

      if (val === false) checkOrder = 0 // 取消全选，则重置checkOrder
    },
    // 多选：选中某一列
    checkRow (row, val, emit = true) {
      if (row.$v_checked === val) return

      row.$v_checked = val
      row.$v_checkedOrder = val ? checkOrder++ : undefined
      emit && this.emitSelectionChange()
    },
    // 多选：兼容表格selection-change事件
    emitSelectionChange () {
      const selection = this.data.filter(row => row.$v_checked).sort((a, b) => a.$v_checkedOrder - b.$v_checkedOrder)
      this.$emit('selection-change', selection)
    },
    // 多选：兼容表格clearSelection方法
    clearSelection () {
      this.checkAll(false)
      this.columnVms.forEach(vm => vm.syncCheckStatus())
    },
    // 多选：兼容表格toggleRowSelection方法
    toggleRowSelection (row, selected) {
      const val = typeof selected === 'boolean' ? selected : !row.$v_checked
      this.checkRow(row, val)
      this.columnVms.forEach(vm => vm.syncCheckStatus())
    },
    // 单选：设置选中行
    setCurrentRow (row) {
      this.curRow = row
      this.$emit('current-change', row)
    },
    // 更新数据
    updateData (data) {
      this.$emit('update:data', data)
    },
    // 执行update方法更新虚拟滚动，且每次nextTick只能执行一次【在数据大于100条开启虚拟滚动时，由于监听了data、virtualized会连续触发两次update方法：第一次update时，（updateSize）计算尺寸里的渲染数据（renderData）与表格行的dom是一一对应，之后会改变渲染数据（renderData）的值；而第二次执行update时，renderData改变了，而表格行dom未改变，导致renderData与dom不一一对应，从而位置计算错误，最终渲染的数据对应不上。因此使用每次nextTick只能执行一次来避免bug发生】
    doUpdate () {
      if (this.hasDoUpdate) return // nextTick内已经执行过一次就不执行
      if (!this.scroller) return // scroller不存在说明未初始化完成，不执行

      // 启动虚拟滚动的瞬间，需要暂时隐藏el-table__append-wrapper里的内容，不然会导致滚动位置一直到append的内容处
      this.isHideAppend = true
      this.update()
      this.hasDoUpdate = true
      this.$nextTick(() => {
        this.hasDoUpdate = false
        this.isHideAppend = false
      })
    },

    // 记录表格x、y轴滚动位置
    recordTablePos () {
      if (this.innerScroll || this.isDeactivated) return

      this.tableBodyEl = this.$el.querySelector('.el-table__body-wrapper')
      this.onTableScroll = throttle(() => {
        this.scrollPos[2] = getScrollTop(this.tableBodyEl)
        this.scrollPos[3] = getScrollLeft(this.tableBodyEl)
      }, 100)
      this.tableBodyEl.addEventListener('scroll', this.onTableScroll, { passive: true })
    },

    // 恢复y轴滚动位置（仅支持表格内部滚动）
    restoreScrollY () {
      if (!this.scroller) return

      // 恢复滚动容器滚动位置
      const [top, left, top2, left2] = this.scrollPos

      if (this.innerScroll) {
        // 表格内部滚动需要等待一段时间才执行恢复滚动位置，是因为表格需要等待一段时间才设置滚动容器高度，此时设置scrollTop才会生效
        setTimeout(() => {
          setScrollTop(this.scroller, top)
          setScrollLeft(this.scroller, left)
          // 内部滚动且固定列，则固定列也需要恢复y轴滚动位置
          const leftScroller = document.querySelector(TableBodyClassNames[1])
          const rightScroller = document.querySelector(TableBodyClassNames[2])
          if (leftScroller) setScrollTop(leftScroller, top)
          if (rightScroller) setScrollTop(rightScroller, top)
        }, 50)
      } else {
        setScrollTop(this.scroller, top)
        setScrollLeft(this.scroller, left)
        // 恢复表格内滚动位置
        setScrollTop(this.tableBodyEl, top2)
        setScrollLeft(this.tableBodyEl, left2)
      }
    }
  },
  watch: {
    data () {
      if (!this.virtualized) {
        this.renderAllData()
      } else {
        this.doUpdate()
      }
    },
    'data.length' () {
      if (!this.virtualized) {
        this.renderAllData()
      } else {
        this.doUpdate()
      }
    },
    virtualized: {
      immediate: true,
      handler (val) {
        if (!val) {
          this.renderAllData()
        } else {
          this.doUpdate()
        }
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.initData()
    })
  },
  beforeUnmount () {
    if (this.scroller) {
      this.scroller.removeEventListener('scroll', this.onScroll)
      window.removeEventListener('resize', this.onScroll)
    }
  },
  activated () {
    this.isDeactivated = false
    this.restoreScrollY()
  },
  deactivated () {
    this.isDeactivated = true
  }
}
</script>

<style lang='less' scoped>
.hide-append {
  :deep(.el-table__append-wrapper) {
    display: none;
  }
}

.no-row-amin {
  :deep(.hover-row td.el-table__cell) {
    background: inherit !important;
  }
}
</style>
