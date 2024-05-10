// pages/central/central.js
// const mocking_device_lists = require('../../utils/mocking_data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    device_lists: [],
    cangotop: false,
    filter_config: {
      filter_label: "显示过滤设置",
      isFilterHidden: true,
      filter_by_name: true,
      filter_by_addr: true,
      filter_by_rssi: true,
      min_rssi: -50,
      displayNameOnly:true
    },
    showToastBox: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    for (let i = 0; i < 20; i++) {
      let device = {
        name: `Device ${i}`,
        addr: `AA:BB:CC:DD:EE:F${i % 0xf}`,
        rssi: `-${i}`,
        connectable: i % 2 == 0
      }
      this.data.device_lists.push(device)
    }
    this.setData({
      device_lists: this.data.device_lists
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  showActionSheet() {
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  onPageScroll: function(e) {
    console.log("当前滚动距离:", e.scrollTop)
    this.setData({
      cangotop: e.scrollTop > wx.getSystemInfoSync().windowHeight ? true: false
    });
  },

  goTop: function(e) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低'
      })
    }
  },
  
  showDetailAdv: function(e) {
    console.log("showDetailAdv:", e)
    this.setData({
      showToastBox: true
    })
  },

  doConnect: function(e) {
    console.log("Try to connect!")
    wx.navigateTo({
      url: '../service/service',
    })
  },

  doScan: function(e) {
    console.log("doScan")
    this.goTop()
  },

  setFilter: function(e) {
    console.log("setFilter")

    this.data.filter_config.isFilterHidden = !this.data.filter_config.isFilterHidden

    if (this.data.filter_config.isFilterHidden) {
      this.data.filter_config.filter_label = "显示过滤设置"
    } else {
      this.data.filter_config.filter_label = "隐藏过滤设置"
    }

    this.setData({
      filter_config: this.data.filter_config
    })    
    this.goTop()
  },

  sliderChanging: function(e) {
    console.log(e.detail.value)
    this.data.filter_config.min_rssi = e.detail.value
    this.setData({
      filter_config: this.data.filter_config
    })
  },
  toast_touch_move: function(e) {
    console.log("toast_touch_move")
  },

  toast_confirm: function(e) {
    this.setData({
      showToastBox: false
    })
  }
})