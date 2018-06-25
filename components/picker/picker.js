Component({
  options: {
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    // 数据
    dataList: { // 属性名
      type: Array, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      // value: [1,2] // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    // 列数
    columns: {
      type: Number,
      value: 2
    },
    // 列数
    textLength: {
      type: Number,
      value: 15
    }
  },
  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    multiArray: [],
    multiIndex: [],
    text: '',
    lmap:{},
  },
  ready() {
    let d = this.data
    let lmap = d.lmap
    // 初始化map
    for (let item of d.dataList) {
      if (!lmap[item.parent]) {
        lmap[item.parent] = [item]
      } else {
        lmap[item.parent].push(item)
      }
    }
    // 生成初始数据
    let pickData = []
    // 第一列是必须有的
    pickData.push(lmap['0'])
    // 后面几列动态生成
    // 其实可以遍历树的深度，考虑效率优化暂时没有处理
    for (let i = 0; i < d.columns - 1; i++) {
      pickData.push(lmap[pickData[i][0].value])
    }

    // 初始化显示和选项数组
    let text = '';
    let multiIndex = [];
    for (let i = 0; i < d.columns; i++) {
      text += pickData[i][0].name + ' '
      multiIndex.push(0)
    }

    if (text.length > d.textLength) {
      text = text.substring(0, d.textLength) + '...'
    }

    this.setData({
      multiArray: pickData,
      multiIndex: multiIndex,
      text: text,
      lmap: lmap,
    })
  },
  attached: function () {

  },
  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    bindMultiPickerChange: function (e) {
      let eventDetail = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex,
        text: this.data.text
      }
      let text = '';
      for (let i = 0; i < this.data.columns; i++) {
        text += this.data.multiArray[i][this.data.multiIndex[i]].name + ' '
      }
      if (text.length > this.data.textLength) {
        text = text.substring(0, this.data.textLength) + '...'
      }
      this.setData({
        text: text,
        multiIndex: e.detail.value
      })

      this.triggerEvent('pickConfrim', eventDetail)
    },
    bindMultiPickerColumnChange: function (e) {
      let { multiIndex } = this.data

      let colNum = e.detail.column;
      let rowNum = e.detail.value;
      let pickData = this.data.multiArray
      let lmap = this.data.lmap
      multiIndex[e.detail.column] = e.detail.value;

      // 改变colNum后面列的数据
      for (let i = colNum + 1; i < this.data.columns; i++) {
        if (i != colNum + 1) {
          pickData[i] = lmap[pickData[i - 1][0].value]
        } else {
          pickData[i] = lmap[pickData[i - 1][rowNum].value]
        }
        // 将后面所有列的焦点置为第一个，模拟器暂时有点bug，就是有时候不触发绑定事件，真机暂时测试没问题
        multiIndex[i] = 0
      }
      this.setData({ multiArray: pickData, multiIndex: multiIndex });
    }
  }
})