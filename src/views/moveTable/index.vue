<template>
  <div style="padding: 20px">
    <div id="textid">
      log(
        <el-input v-model="input" style="width:100px;" placeholder="请输入内容"></el-input><el-input v-model="input" style="width:100px;" placeholder="请输入内容"></el-input>
      )
      <el-button type="">确定</el-button>
    </div>
    <div>
      +<el-input v-model="input" style="width:100px;" placeholder="请输入内容"></el-input>
      <el-button>确定</el-button>
    </div>
    <div>
      log(x,y)
    </div>
    <text id="test">pow(,)</text>
    <p style="text-align: center; font-size: 20px; margin-bottom: 50px">
      自定义表头样式和整列的拖动
    </p>
    <div style="display: flex" @mouseleave="moveTableOutside">
      <div class="data-overview">
        <span>数据概览</span>
      </div>
      <el-table
        size="small"
        class="drag_table hidden-tbody"
        :data="tableData"
        :cell-class-name="cellClassName"
        :header-cell-class-name="headerCellClassName"
      >
        <el-table-column
          v-for="(col, index) in tableHeader"
          min-width="120"
          :key="index"
          :prop="col.prop"
          :label="col.label"
          :column-key="index.toString()"
          :render-header="renderHeader"
        >
          <template slot-scope="scope">
            <span>{{ scope.row[col.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="display: flex;border:1px solid #000;border-radius: 8px;overflow: hidden;">
      <div class="data-overview">
        <el-table class="drag_table hidden-thead" :data="tableData">
          <el-table-column type="index" width="50"> </el-table-column>
        </el-table>
      </div>
      <el-table
        class="drag_table hidden-thead"
        :data="tableData"
        :cell-class-name="cellClassName"
        :header-cell-class-name="headerCellClassName"
      >
        <el-table-column
          v-for="(col, index) in tableHeader"
          :key="index"
          :prop="col.prop"
          :label="col.label"
          :column-key="index.toString()"
          :render-header="renderHeader"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row[col.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="display: flex">
      <div class="data-overview">
        <el-table class="drag_table hidden-thead" :data="tableData">
          <el-table-column type="index" width="50"> </el-table-column>
        </el-table>
      </div>
      <el-table
      ref="last-table"
        class="drag_table hidden-thead "
        :data="tableData"
        :cell-class-name="cellClassName"
        :header-cell-class-name="headerCellClassName"
      >
        <el-table-column
          v-for="(col, index) in tableHeader"
          :key="index"
          :prop="col.prop"
          :label="col.label"
          :column-key="index.toString()"
          :render-header="renderHeader"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row[col.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'movaTable',
  data() {
    return {
      input: '',
      tableData: [{
        name: '王小虎',
        date: '2016-05-02',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        name: '王老五',
        date: '2016-05-04',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        name: '王大锤',
        date: '2016-05-01',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        name: '王小龙',
        date: '2016-05-03',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        name: '王小龙',
        date: '2016-05-03',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        name: '王小龙',
        date: '2016-05-03',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      tableHeader: [{
        prop: 'name',
        label: '姓名'
      }, {
        prop: 'date',
        label: '时间'
      }, {
        prop: 'address',
        label: '地址'
      }, {
        prop: 'address',
        label: '地址2'
      }, {
        prop: 'address',
        label: '地址2'
      }, {
        prop: 'address',
        label: '地址2'
      }],
      dragState: {
        startIndex: -1, // 拖动起始元素的index
        endIndex: -1, // 拖动结束元素的index
        afterMoveIndex: -1, // 拖动后元素的index
        dragging: false, // 是否正在拖动
        direction: null, // 拖动方向
        moveTableOutsideBack: false // 拖出到table外之后又拖回来
      }
    }
  },
  mounted(){
    const bodyWrapper = this.$refs['last-table'].bodyWrapper
    bodyWrapper.addEventListener('scroll',()=>{
      let scrollLeft = bodyWrapper.scrollLeft
      console.log(scrollLeft);
      document.getElementsByClassName('el-table__header-wrapper')[0].scrollLeft = scrollLeft 
      document.getElementsByClassName('el-table__body-wrapper')[2].scrollLeft = scrollLeft 
    })
  },
  methods: {
    // drag_table在渲染表头时调用
    renderHeader(h, {
      column,
      $index
    }) {
      // 这里可以根据$index的值来对自身需求进行修改，
      return h('span', {
        'class': ['thead-cell'],
        style: {
          'display': 'block',
          'width': '100%',
          'cursor': 'move',
        },
        on: {
          mousedown: ($event) => {
            this.handleMouseDown($event, column)
          },
          mouseup: ($event) => {
            this.handleMouseUp($event, column)
          },
          mousemove: ($event) => {
            this.handleMouseMove($event, column)
          }
        }
      }, [
        h('span', [
          h('el-button',{
            props: {
              type: "text"
            }
          }, column.label),
          h('el-popover', {
            props: {
              placement: 'bottom',
              width: '80',
              trigger: 'hover',
            },
          }, [
            h('div',
              {
                class: ['flex', 'flex-direction', 'margin-bottom'],
                props: {
                },
              },
              [
                h('el-button',
                  {
                    props: {
                      type: "text"
                    },
                    on: {
                      click: () => {
                        console.log(column, $index)
                      }
                    }
                  },
                  '数据变换',
                ),
                h('el-button',
                  {
                    props: {
                      type: "text"
                    },
                    on: {
                      click: () => {
                        console.log(column, $index)
                      }
                    }
                  }, '删除'),
              ]),
            h('el-button',
              {
                props: {
                  type: "text"
                },
                class: 'el-icon-star-off',
                slot: "reference"
              })
          ]),
        ]),
        // 给每个表头添加一个class=virtual 是画虚线的类名。
        h('span', {
          'class': ['virtual']
        })
      ])
    },
    // 按下鼠标开始拖动 设置列的背景色
    handleMouseDown(e, column) {
      // 判断是鼠标左键
      if (e.button === 0) {
        this.dragState.dragging = true
        this.dragState.startIndex = parseInt(column.columnKey)
        console.log(`开始移动的位置 ${this.dragState.startIndex}`)
        // 给当前要拖动列的th设置class
        document.querySelectorAll('.drag_table table thead tr th')[this.dragState.startIndex].className += ' ' + 'dragging_column';
        // 给拖动时的虚拟容器添加宽高                    
        let table = document.getElementsByClassName('drag_table')[0]
        let virtual = document.getElementsByClassName('virtual')
        // 设置新插入的span.virtual的标签 每一列的宽度、高度
        for (let item of virtual) {
          item.style.height = table.clientHeight - 1 + 'px'
          item.style.width = item.parentElement.parentElement.clientWidth + 'px'
        }
        this.dragState.moveTableOutsideBack = false
      }
    },
    // 拖动中
    handleMouseMove(e, column) {
      // 判断是鼠标左键
      if (e.button === 0) {
        if (this.dragState.dragging) {
          let currentIndex = parseInt(column.columnKey) // 拖动的当前列index
          console.log(`移动到了${currentIndex}`)
          if (currentIndex !== this.dragState.startIndex) {
            this.dragState.direction = currentIndex - this.dragState.startIndex < 0 ? 'left' : 'right' // 判断拖动方向
            this.dragState.afterMoveIndex = currentIndex
          } else {
            this.dragState.direction = null
          }
        } else {
          return false
        }
      }
    },
    // 鼠标放开结束拖动
    handleMouseUp(e, column) {
      // 判断是鼠标左键
      if (e.button === 0) {
        // 拖出当前table外之后又拖回来，不再进行易位操作（拖出去时已处理）
        if (this.dragState.moveTableOutsideBack) {
          return false
        } else {
          this.dragState.endIndex = parseInt(column.columnKey) // 记录结束列index
          console.log(`结束移动的位置 ${this.dragState.endIndex}`)
          if (this.dragState.startIndex !== this.dragState.endIndex) {
            this.dragColumn(this.dragState)
          }
          this.finishDragInit()
        }
      }
    },
    // 拖动到当前table之外的处理
    moveTableOutside() {
      if (this.dragState.dragging) {
        this.dragState.endIndex = this.dragState.startIndex
        console.log(`已移动到table外，结束移动的位置 ${this.dragState.endIndex}`)
        if (this.dragState.startIndex !== this.dragState.endIndex) {
          this.dragColumn(this.dragState)
        }
        this.finishDragInit()
        this.dragState.moveTableOutsideBack = true
      }
    },
    // 拖动易位
    dragColumn({
      startIndex,
      endIndex,
      direction
    }) {
      console.log(`从${startIndex}移动到了${endIndex}`)
      // 排除掉鼠标点击table外面，然后拖入进table报错
      if (startIndex < 0) {
        return;
      }
      // 判断是向左移动还是向右移动
      // 把移动的列插在某个列前面或者后面，然后在删除移动的列
      if (direction === 'left') {
        this.tableHeader.splice(endIndex, 0, this.tableHeader[startIndex])
        this.tableHeader.splice(startIndex + 1, 1)
      } else {
        this.tableHeader.splice(endIndex + 1, 0, this.tableHeader[startIndex])
        this.tableHeader.splice(startIndex, 1)
      }
    },
    // 拖动完成后的初始化
    finishDragInit() {
      // 给当前要拖动列的th取消class
      for (var item of document.querySelectorAll('.drag_table table thead tr th')) {
        item.className = String(item.className).split("dragging_column").join("");
      }
      // 再次初始化拖动状态
      this.dragState = {
        startIndex: -1,
        endIndex: -1,
        afterMoveIndex: -1,
        dragging: false,
        direction: null,
        moveTableOutsideBack: false
      }
    },
    // 动态给表头单元格添加 class，实现拖动中的虚线效果
    /* 
        这个监听在table渲染的时候会执行一遍。 
        然后还会有两个条件会触发执行：
        1. 绑定的数据发生变化的时候(即为表格内容变化就触发)。header变化触发header-cell-class-name，表格数据变化触发cell-class-name.
        2. return返回值 如果绑定了data,如果此data变化也会触发执行。相当于对这个data进行了监听随之触发这个方法。
    */
    headerCellClassName({
      column,
      columnIndex
    }) {
      return columnIndex === this.dragState.afterMoveIndex ? `drag_active_${this.dragState.direction}` : ''
    },
    // 动态给表头单元格th添加class，实现拖动中的背景
    cellClassName({
      column,
      columnIndex
    }) {
      return (columnIndex === this.dragState.startIndex ? `dragging_column` : '')
    },

  }
}
</script>
<style scoped lang="scss">
* {
  padding: 0;
  margin: 0;
}
body {
  padding: 50px;
  overflow-x: hidden;
}
.thead-cell {
  position: relative;
}
.drag_table th {
  cursor: move;
}
.virtual {
  position: fixed;
  display: block;
  margin-top: -35px;
  margin-left: -11px;
}
.drag_active_left .virtual {
  border-left: 1px dotted #666;
  z-index: 99;
}
.drag_active_right .virtual {
  border-right: 1px dotted #666;
  z-index: 99;
}
/* 
            给选中要拖动的列添加背景色，如果在完整项目内部的组件，所以这个组件的style，不能加scoped,否则添加不上样式
            如果使用了sass或者less,可以加scoped 然后在用特殊手法处理样式
        */
.dragging_column {
  background-color: #e3e3e3 !important;
}
.hidden-tbody.el-table {
  height: 57px;
  box-sizing: border-box;
  >>> .el-table__body-wrapper {
    display: none !important;
    overflow: hidden;
  }
  >>> tbody {
    //隐藏上面表格的tbody
    display: none!important;
    overflow: hidden;
  }
}
.auto-scorll-table {
  height: calc(100% - 34px);
  overflow: hidden;
}
.hidden-thead {
  border-top: none; //防止边框重叠
  >>> .el-table__header-wrapper {
    display: none !important;
    overflow: hidden;
  }
  >>> thead {
    //隐藏下面表格的thead
    display: none !important;
    overflow: hidden;
  }
}
</style>