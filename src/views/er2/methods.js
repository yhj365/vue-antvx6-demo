import '@antv/x6-vue-shape';
import { Graph,Cell,Shape,Addon,FunctionExt} from '@antv/x6';
  // import { Graph, Cell, Shape } from '@antv/x6'

// 拖拽生成四边形或者圆形
export const startDragToGraph  = (graph,type,e) =>{
    const node =
    type === 'Rect'
    ? graph.createNode({
      width: 100,
      height: 60,
      attrs: {
        label: {
          text: '正方形节点',
          fill: '#000000',
          fontSize: 14,
          textWrap: {
            width: -10,
            height: -10,
            ellipsis: true,
          },
        },
        body: {
          stroke: '#000000',
          strokeWidth: 1,
          fill: '#ffffff',
        }
      },
      ports: ports
    })
  : type === 'Circle'?graph.createNode({
      shape: 'ellipse',
      width: 100,
      height: 100,
      attrs: {
        label: {
          text: '圆形节点',
          fill: '#000000',
          fontSize: 14,
          textWrap: {
            width: -20,
            height: -10,
            ellipsis: true,
          },
        },
        body: {
          stroke: '#000000',
          strokeWidth: 1,
          fill: '#ffffff',
        }
      },
      ports: ports
    }):type === 'polygon'?
    graph.createNode({
      shape: 'polygon',
      x: 40,
      y: 40,
      width: 120,
      height: 120,
      attrs: {
        label: {
          text: '条件节点',
          fill: '#000000',
          fontSize: 14,
          textWrap: {
            width: -50,
            height: '70%',
            ellipsis: true,
          },
        },
        body: {
          fill: '#ffffff',
          stroke: '#000000',
          refPoints: '0,10 10,0 20,10 10,20',
          strokeWidth: 1,
        },
      },
      ports: ports
    }):createER(graph)

    const dnd = new Addon.Dnd({target:graph})
    dnd.start(node,e)
}
const ports = {
    groups: {
      // 输入链接桩群组定义
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#2D8CF0',
            strokeWidth: 2,
            fill: '#fff',
          },
        },
      },
      // 输出链接桩群组定义
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#2D8CF0',
            strokeWidth: 2,
            fill: '#fff',
          },
        },
      },
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#2D8CF0',
            strokeWidth: 2,
            fill: '#fff',
          },
        },
      },
      right: {
        position: 'right',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#2D8CF0',
            strokeWidth: 2,
            fill: '#fff',
          },
        },
      },
    },
    items: [
      {
        id: 'port1',
        group: 'top',
      },
      {
        id: 'port2',
        group: 'bottom',
      },
      {
        id: 'port3',
        group: 'left',
      },
      {
        id: 'port4',
        group: 'right',
      }
    ],
}

const ERData = [
  {
    "id": "1",
    "shape": "er-rect",
    "label": "学生",
    "width": 150,
    "height": 24,
    "position": {
      "x": 24,
      "y": 150
    },
    "ports": [
      {
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
      },
      {
        "id": "1-2",
        "group": "list",
        "attrs": {
          "portNameLabel": {
            "text": "Name"
          },
          "portTypeLabel": {
            "text": "STRING"
          }
        }
      },
      {
        "id": "1-3",
        "group": "list",
        "attrs": {
          "portNameLabel": {
            "text": "Class"
          },
          "portTypeLabel": {
            "text": "NUMBER"
          }
        }
      },
      {
        "id": "1-4",
        "group": "list",
        "attrs": {
          "portNameLabel": {
            "text": "Gender"
          },
          "portTypeLabel": {
            "text": "BOOLEAN"
          }
        }
      }
    ]
  },
  {
    "id": "2",
    "shape": "er-rect",
    "label": "课程",
    "width": 150,
    "height": 24,
    "position": {
      "x": 250,
      "y": 210
    },
    "ports": [
      {
        "id": "2-1",
        "group": "list",
        "attrs": {
          "portNameLabel": {
            "text": "ID"
          },
          "portTypeLabel": {
            "text": "STRING"
          }
        }
      },
      {
        "id": "2-2",
        "group": "list",
        "attrs": {
          "portNameLabel": {
            "text": "Name"
          },
          "portTypeLabel": {
            "text": "STRING"
          }
        }
      },
      {
        "id": "2-3",
        "group": "list",
        "attrs": {
          "portNameLabel": {
            "text": "StudentID"
          },
          "portTypeLabel": {
            "text": "STRING"
          }
        }
      },
      {
        "id": "2-4",
        "group": "list",
        "attrs": {
          "portNameLabel": {
            "text": "TeacherID"
          },
          "portTypeLabel": {
            "text": "STRING"
          }
        }
      },
      {
        "id": "2-5",
        "group": "list",
        "attrs": {
          "portNameLabel": {
            "text": "Description"
          },
          "portTypeLabel": {
            "text": "STRING"
          }
        }
      }
    ]
  },
  {
    "id": "3",
    "shape": "er-rect",
    "label": "老师",
    "width": 150,
    "height": 24,
    "position": {
      "x": 480,
      "y": 350
    },
    "ports": [
      {
        "id": "3-1",
        "group": "list",
        "attrs": {
          "portNameLabel": {
            "text": "ID"
          },
          "portTypeLabel": {
            "text": "STRING"
          }
        }
      },
      {
        "id": "3-2",
        "group": "list",
        "attrs": {
          "portNameLabel": {
            "text": "Name"
          },
          "portTypeLabel": {
            "text": "STRING"
          }
        }
      },
      {
        "id": "3-3",
        "group": "list",
        "attrs": {
          "portNameLabel": {
            "text": "Age"
          },
          "portTypeLabel": {
            "text": "NUMBER"
          }
        }
      }
    ]
  },
  {
    "id": "4",
    "shape": "edge",
    "source": {
      "cell": "1",
      "port": "1-1"
    },
    "target": {
      "cell": "2",
      "port": "2-3"
    },
    "attrs": {
      "line": {
        "stroke": "#A2B1C3",
        "strokeWidth": 2
      }
    },
    "zIndex": 0
  },
  {
    "id": "5",
    "shape": "edge",
    "source": {
      "cell": "3",
      "port": "3-1"
    },
    "target": {
      "cell": "2",
      "port": "2-4"
    },
    "attrs": {
      "line": {
        "stroke": "#A2B1C3",
        "strokeWidth": 2
      }
    },
    "zIndex": 0
  }
]

function createER(graph){
  graph.createNode({
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
}
