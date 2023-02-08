<template>
  <div
    ref="wrapRef"
    class="el-table-virtual-scroll"
    :class="[isExpanding ? 'is-expanding' : '', isHideAppend ? 'hide-append' : '']">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, onUnmounted, watch } from 'vue'
import throttle from 'lodash/throttle'

// 判断是否是滚动容器
function isScroller (el: HTMLElement | Element | Window) {
  if (el === window) return true
  const style = window.getComputedStyle(el as HTMLElement, null)
  const scrollValues = ['auto', 'scroll']
  return scrollValues.includes(style.overflow) || scrollValues.includes(style['overflow-y'])
}

// 获取父层滚动容器
function getParentScroller (el: HTMLElement | Window | Document) {
  if (el === window || el === document || el === document.documentElement) return window

  let parent: HTMLElement | null = el as HTMLElement
  while (parent) {
    if (isScroller(parent)) {
      return parent
    }
    parent = parent.parentNode as HTMLElement
  }

  return parent || window
}

// 获取容器滚动位置
function getScrollTop (el: HTMLElement | Window) {
  return el === window ? window.pageYOffset : (el as HTMLElement).scrollTop
}

// 获取容器滚动位置
function getScrollLeft (el: HTMLElement | Window) {
  return el === window ? window.pageXOffset : (el as HTMLElement).scrollLeft
}

// 设置容器滚动位置
function setScrollTop (el: HTMLElement | Window, pos: number) {
  return el === window ? window.scroll(window.pageXOffset, pos) : ((el as HTMLElement).scrollTop = pos)
}

// 设置容器滚动位置
function setScrollLeft (el: HTMLElement | Window, pos: number) {
  return el === window ? window.scroll(pos, window.pageYOffset) : ((el as HTMLElement).scrollLeft = pos)
}

// 获取容器高度
function getOffsetHeight (el: HTMLElement | Window) {
  return el === window ? window.innerHeight : (el as HTMLElement).offsetHeight
}

// 滚动到某个位置
function scrollToY (el: HTMLElement | Window, y: number) {
  if (el === window) {
    window.scroll(0, y)
  } else {
    (el as HTMLElement).scrollTop = y
  }
}

// 表格body class名称
const TableBodyClassNames = ['.el-table__body-wrapper .el-scrollbar__wrap', '.el-table__fixed .el-table__fixed-body-wrapper', '.el-table__fixed-right .el-table__fixed-body-wrapper']

const checkOrder = 0 // 多选：记录多选选项改变的顺序

const props = defineProps({
  tableRef: {},
  // 总数据
  data: {
    type: Array<Object>,
    required: true
  },
  // 每一行的预估高度
  itemSize: {
    type: Number,
    default: 60
  },
  // 指定滚动容器
  scrollBox: {
    type: [String, Window]
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
  innerScroll: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits([
  'change',
  'current-change',
  'selection-change'
])

const sizes = ref<{[index: string]: number }>({}) // 尺寸映射（依赖响应式）
const startIdx = ref<number>(0)
const endIdx = ref<number>()
const curRow = ref<any>(null)
const isExpanding = ref(false)
const isHideAppend = ref(false)
const wrapRef = ref()

// 计算出每个item（的key值）到滚动容器顶部的距离
const offsetMap = computed(() => {
  const { dynamic, keyProp, itemSize, data } = props

  if (!dynamic) return {}

  const res = {}
  let total = 0
  for (let i = 0; i < data.length; i++) {
    const key = data[i][keyProp]
    res[key] = total

    const curSize = sizes.value[key]
    const size = typeof curSize === 'number' ? curSize : itemSize
    total += size
  }
  return res
})

const _this: {
  renderData: any[],
  top: number,
  bottom: number,
  toTop: number,
  isDeactivated: boolean,
  scrollPos: number[],
  scroller?: HTMLElement | Window,
  onScroll: any
} = {
  // 可视范围内显示数据
  renderData: [],
  // 页面可视范围顶端、底部
  top: 0,
  bottom: 0,
  // 设置表格到滚动容器的距离
  toTop: 0,
  // 组件是否deactivated状态
  isDeactivated: false,
  // 滚动容器滚动位置【0-滚动容器top；1-滚动容器left；2-表格滚动容器top；3-表格滚动容器left】
  scrollPos: [0, 0, 0, 0],
  scroller: undefined,
  onScroll: () => {}
}

// 初始化数据
function initData () {
  _this.scroller = getScroller()
  setToTop()
  // recordTablePos()

  // 初次执行
  setTimeout(() => {
    handleScroll()
  }, 100)

  // 监听事件
  _this.onScroll = !props.throttleTime ? handleScroll : throttle(handleScroll, props.throttleTime)
  _this.scroller?.addEventListener('scroll', _this.onScroll, { passive: true })
  window.addEventListener('resize', _this.onScroll)
}

function setToTop () {
  if (props.innerScroll) {
    _this.toTop = 0
  } else {
    _this.toTop = wrapRef.value.getBoundingClientRect().top - (_this.scroller === window ? 0 : (_this.scroller as HTMLElement).getBoundingClientRect().top) + getScrollTop(_this.scroller!)
  }
}

// 获取滚动元素
function getScroller () {
  if (props.scrollBox) {
    if (props.scrollBox === 'window' || props.scrollBox === window) return window

    const el = document.querySelector(props.scrollBox as string)
    if (!el) throw new Error(` scrollBox prop: '${props.scrollBox}' is not a valid selector`)
    if (!isScroller(el as HTMLElement)) console.warn(`Warning! scrollBox prop: '${props.scrollBox}' is not a scroll element`)
    return el
  }
  // 如果表格是固定高度，则获取表格内的滚动节点，否则获取父层滚动节点
  if (props.innerScroll) {
    return wrapRef.value.querySelector('.el-table__body-wrapper .el-scrollbar__wrap')
  } else {
    return getParentScroller(wrapRef.value)
  }
}

// 处理滚动事件
function handleScroll (shouldUpdate = true) {
  // 如果组件失活，则不再执行handleScroll；否则外部容器滚动情况下记录的scrollTop会是0
  if (_this.isDeactivated) return
  // 记录scrollPos
  _this.scrollPos[0] = getScrollTop(_this.scroller!)
  _this.scrollPos[1] = getScrollLeft(_this.scroller!)

  if (!props.virtualized) return

  removeHoverRows()
  // 更新当前尺寸（高度）
  updateSizes()
  // 计算renderData
  calcRenderData()
  // 计算位置
  calcPosition()
  shouldUpdate && updatePosition()
  // 触发事件
  emit('change', _this.renderData, startIdx.value, endIdx.value)
  // 设置表格行展开
  // this.setRowsExpanded()
}

// 移除多个hover-row
function removeHoverRows () {
  const hoverRows = wrapRef.value.querySelectorAll('.el-table__row.hover-row')
  if (hoverRows.length > 1) {
    Array.from(hoverRows).forEach((row: HTMLElement) => {
      row.classList.remove('hover-row')
    })
  }
}

// 更新尺寸（高度）
function updateSizes () {
  if (!props.dynamic) return
  let rows: NodeListOf<HTMLElement> = wrapRef.value.querySelectorAll('.el-table__body > tbody > .el-table__row')

  // 处理树形表格
  let isTree = false
  if (rows[0] && rows[0].classList.contains('el-table__row--level-0')) {
    isTree = true
    rows = wrapRef.value.querySelectorAll('.el-table__body > tbody > .el-table__row.el-table__row--level-0')
  }

  Array.from(rows).forEach((row, index) => {
    const item = _this.renderData[index]
    if (!item) return

    // 计算表格行的高度
    let offsetHeight = row.offsetHeight
    // 表格行如果有扩展行，需要加上扩展内容的高度
    if (row.classList.contains('expanded')) {
      offsetHeight += (row.nextSibling as HTMLElement)?.offsetHeight
    }
    // 表格行如果有子孙节点，需要加上子孙节点的高度
    if (isTree) {
      let next: any = row.nextSibling
      while (next && next.tagName === 'TR' && !next.classList.contains('el-table__row--level-0')) {
        offsetHeight += next.offsetHeight
        next = next.nextSibling
      }
    }

    const key = item[props.keyProp]
    if (sizes.value[key] !== offsetHeight) {
      sizes.value[key] = offsetHeight
    }
  })
}

 // 获取某条数据offsetTop
function getItemOffsetTop (index) {
  if (!props.dynamic) {
    return props.itemSize * index
  }

  const item = props.data[index]
  if (item) {
    return offsetMap.value[item[props.keyProp]] || 0
  }
  return 0
}

// 获取某条数据的尺寸
function getItemSize (index) {
  if (index <= -1) return 0
  const item = props.data[index]
  if (item) {
    const key = item[props.keyProp]
    return sizes.value[key] || props.itemSize
  }
  return props.itemSize
}

// 计算只在视图上渲染的数据
function calcRenderData () {
  const { data, buffer } = props
  // 计算可视范围顶部、底部
  const top = _this.scrollPos[0] - buffer - _this.toTop
  const bottom = _this.scrollPos[0] + getOffsetHeight(_this.scroller!) + buffer - _this.toTop

  let start
  let end
  if (!props.dynamic) {
    start = top <= 0 ? 0 : Math.floor(top / props.itemSize)
    end = bottom <= 0 ? 0 : Math.ceil(bottom / props.itemSize)
  } else {
    // 二分法计算可视范围内的开始的第一个内容
    let l = 0
    let r = data.length - 1
    let mid = 0
    while (l <= r) {
      mid = Math.floor((l + r) / 2)
      const midVal = getItemOffsetTop(mid)
      if (midVal < top) {
        const midNextVal = getItemOffsetTop(mid + 1)
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
      const offsetTop = getItemOffsetTop(i)
      if (offsetTop >= bottom) {
        end = i
        break
      }
    }
  }

  // 开始索引始终保持偶数，如果为奇数，则加1使其保持偶数【确保表格行的偶数数一致，不会导致斑马纹乱序显示】
  if (start % 2) {
    start = start - 1
  }

  _this.top = top
  _this.bottom = bottom
  startIdx.value = start
  endIdx.value = end
  _this.renderData = data.slice(start, end + 1)
}

// 计算位置
function calcPosition () {
  const last = props.data.length - 1
  // 计算内容总高度
  const wrapHeight = getItemOffsetTop(last) + getItemSize(last)
  // 计算当前滚动位置需要撑起的高度
  const offsetTop = getItemOffsetTop(startIdx.value)

  // 设置dom位置
  TableBodyClassNames.forEach(className => {
    const el = wrapRef.value.querySelector(className)
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
}

// 空闲时更新位置（触发时间：滚动停止后等待10ms执行）
// 滚动停止之后，偶尔表格的行发生高度变更，那么当前计算的渲染数据是不正确的；那么需要手动触发最后一次handleScroll来重新计算
let timer: number
function updatePosition () {
  timer && clearTimeout(timer)
  timer = window.setTimeout(() => {
    timer && clearTimeout(timer)
    // 传入false，避免一直循环调用
    handleScroll(false)
  }, props.throttleTime + 10)
}

// 渲染全部数据
function renderAllData () {
  _this.renderData = props.data
  emit('change', props.data, 0, props.data.length - 1)

  nextTick(() => {
    // 清除撑起的高度和位置
    TableBodyClassNames.forEach(className => {
      const el = wrapRef.value.querySelector(className)
      if (!el) return

      if (el.wrapEl) {
        // 设置高度
        el.wrapEl.style.height = 'auto'
        // 设置transform撑起高度
        el.innerEl.style.transform = `translateY(${0}px)`
      }
    })
  })
}

// 【外部调用】更新
function update () {
  // console.log('update')
  setToTop()
  handleScroll()
}

// 【外部调用】滚动到第几行
// （不太精确：滚动到第n行时，如果周围的表格行计算出真实高度后会更新高度，导致内容坍塌或撑起）
function scrollTo (index, stop = false) {
  const item = props.data[index]
  if (item && _this.scroller) {
    updateSizes()
    calcRenderData()

    nextTick(() => {
      const offsetTop = getItemOffsetTop(index)
      scrollToY(_this.scroller!, offsetTop)

      // 调用两次scrollTo，第一次滚动时，如果表格行初次渲染高度发生变化时，会导致滚动位置有偏差，此时需要第二次执行滚动，确保滚动位置无误
      if (!stop) {
        setTimeout(() => {
          scrollTo(index, true)
        }, 50)
      }
    })
  }
}

// 【外部调用】重置
function reset () {
  sizes.value = {}
  scrollTo(0, false)
}

// 执行update方法更新虚拟滚动，且每次nextTick只能执行一次【在数据大于100条开启虚拟滚动时，由于监听了data、virtualized会连续触发两次update方法：第一次update时，（updateSize）计算尺寸里的渲染数据（renderData）与表格行的dom是一一对应，之后会改变渲染数据（renderData）的值；而第二次执行update时，renderData改变了，而表格行dom未改变，导致renderData与dom不一一对应，从而位置计算错误，最终渲染的数据对应不上。因此使用每次nextTick只能执行一次来避免bug发生】
let hasDoUpdate = false
function doUpdate () {
  if (hasDoUpdate) return // nextTick内已经执行过一次就不执行
  if (!_this.scroller) return // scroller不存在说明未初始化完成，不执行

  // 启动虚拟滚动的瞬间，需要暂时隐藏el-table__append-wrapper里的内容，不然会导致滚动位置一直到append的内容处
  isHideAppend.value = true
  update()
  hasDoUpdate = true
  nextTick(() => {
    hasDoUpdate = false
    isHideAppend.value = false
  })
}

onMounted(() => {
  console.log('hahah')
  initData()
})

onUnmounted(() => {
  if (_this.scroller) {
    _this.scroller.removeEventListener('scroll', _this.onScroll)
    window.removeEventListener('resize', _this.onScroll)
  }
})

watch(() => props.data, () => {
  if (!props.virtualized) {
    renderAllData()
  } else {
    doUpdate()
  }
})

watch(() => props.virtualized, () => {
  if (!props.virtualized) {
    renderAllData()
  } else {
    doUpdate()
  }
}, { immediate: true })

defineExpose({
  update,
  scrollTo,
  reset
})
</script>

<style lang='less' scoped>
.is-expanding {
  :deep(.el-table__expand-icon) {
    transition: none;
  }
}
.hide-append {
  :deep(.el-table__append-wrapper) {
    display: none;
  }
}
</style>
