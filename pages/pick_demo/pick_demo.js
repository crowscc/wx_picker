import dataList1 from './data1'
import dataList2 from './data2'
import dataList3 from './data3'

const app = getApp()
var that
Page({
  data: {
    nowMajor: '',
  },

  onLoad: function() {
    that = this
    that.setData({
      dataList1: dataList1,
      dataList2: dataList2,
      dataList3: dataList3,
    })
  },

  /**
   * 调用自定义pick
   * 在这里处理回调
   * 
   */
  pickConfrim(e) {
    console.log("父页面", e.detail)
  },
})