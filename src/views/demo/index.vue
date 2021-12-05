<template>
  <div class="container_warp">
    <div id="">
      <button type="button" @click="createGraph">创建表</button>
    </div>
    <div ref="containerRef" id="containerChart"></div>
  </div>
</template>

<script>
  import {
    Graph,
    Cell,
    Shape
  } from '@antv/x6'
 import dataJson from './data.js'
  export default {
    data() {
      return {
        graph: null,
        grid:{ // 网格设置
          size: 20,      // 网格大小 10px
          visible: true, // 渲染网格背景
          type: 'mesh',
          args: {
            color: '#D0D0D0',
            thickness: 1,     // 网格线宽度/网格点大小
            factor: 10,
          },
        }
      }
    },
    mounted(){
      this.initX6()
    },
    methods:{
      initX6(){
        const LINE_HEIGHT = 24
        const NODE_WIDTH = 150

        Graph.registerPortLayout(
          'erPortPosition',
          (portsPositionArgs) => {
            return portsPositionArgs.map((_, index) => {
              return {
                position: {
                  x: 0,
                  y: (index + 1) * LINE_HEIGHT,
                },
                angle: 0,
              }
            })
          },
          true,
        )

        Graph.registerNode(
          'er-rect',
          {
            inherit: 'rect',
            markup: [
              {
                tagName: 'rect',
                selector: 'body',
              },
              {
                tagName: 'text',
                selector: 'label',
              },
            ],
            attrs: {
              rect: {
                strokeWidth: 1,
                stroke: '#5F95FF',
                fill: '#5F95FF',
              },
              label: {
                fontWeight: 'bold',
                fill: '#ffffff',
                fontSize: 12,
              },
            },
            ports: {
              groups: {
                list: {
                  markup: [
                    {
                      tagName: 'rect',
                      selector: 'portBody',
                    },
                    {
                      tagName: 'text',
                      selector: 'portNameLabel',
                    },
                    {
                      tagName: 'text',
                      selector: 'portTypeLabel',
                    },
                  ],
                  attrs: {
                    portBody: {
                      width: NODE_WIDTH,
                      height: LINE_HEIGHT,
                      strokeWidth: 1,
                      stroke: '#5F95FF',
                      fill: '#EFF4FF',
                      magnet: true,
                    },
                    portNameLabel: {
                      ref: 'portBody',
                      refX: 6,
                      refY: 6,
                      fontSize: 10,
                    },
                    portTypeLabel: {
                      ref: 'portBody',
                      refX: 95,
                      refY: 6,
                      fontSize: 10,
                    },
                  },
                  position: 'erPortPosition',
                },
              },
            },
          },
          true,
        )
        const _that = this
        const containerRef = this.$refs.containerRef
        this.graph = new Graph({
          // container: document.getElementById('containerChart'),
          container: containerRef,
          width: 1700,
          height: '100%',
          grid: _that.grid,
          connecting: {
            router: {
              name: 'er',
              args: {
                offset: 25,
                direction: 'H',
              },
            },
            createEdge() {
              return new Shape.Edge({
                attrs: {
                  line: {
                    stroke: '#A2B1C3',
                    strokeWidth: 2,
                  },
                },
              })
            },
          },
        })
        const graph = this.graph
        const cells = []
        // dataJson.forEach((item) => {
        //   if (item.shape === 'edge') {
        //     cells.push(graph.createEdge(item))
        //   } else {
        //     cells.push(graph.createNode(item))
        //   }
        // })
        // graph.resetCells(cells)
        graph.zoomToFit({ padding: 10, maxScale: 1 })
        // fetch('./data.json')
        //   .then((response) => response.json())
        //   .then((data) => {
        //     const cells = []
        //     dataJson.forEach((item) => {
        //       if (item.shape === 'edge') {
        //         cells.push(graph.createEdge(item))
        //       } else {
        //         cells.push(graph.createNode(item))
        //       }
        //     })
        //     graph.resetCells(cells)
        //     graph.zoomToFit({ padding: 10, maxScale: 1 })
        //   })
      },
      createGraph(){
        console.log('createGraph')
        const cells = []
        const graph = this.graph
        const node = this.graph.createNode({
          "id": "11",
          "shape": "er-rect",
          "label": "表名",
          "width": 150,
          "height": 24,
          "position": {
            "x": 10,
            "y": 15
          },
          "ports": [{
            "id": "1-1",
            "group": "list",
            "attrs": {
              "portNameLabel": {
                "text": "ID"
              },
              "portTypeLabel": {
                "text": "STRING"
              }
            }
          }]
        })
        cells.push(node)
        graph.resetCells(cells)
        graph.zoomToFit({ padding: 10, maxScale: 1 })
      }
    }

  }
</script>

<style lang="less">
  @import '../index.less';
</style>
