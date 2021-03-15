// miniprogram/pages/liwei/gpsDevice/gpsDevice.js

Page({

  data: {
    list_device: [
      // {
      //   name: 'tex上t1',
      //   mac: 'AA:BB:CC:DD:EE:FF'
      // },
      // {
      //   name: '11门口1',
      //   mac: '551030006334'
      // },
      // {
      //   name: '3䏌33',
      //   mac: '业余爱好零用'
      // },
      // {
      //   name: '555二月份',
      //   mac: '月报表后'
      // },
      // {
      //   name: '777',
      //   mac: 'wefwef使用者䏌3'
      // },
      // {
      //   name: '999',
      //   mac: 'awef23324二月份'
      // },
      // {
      //   name: 'xx仴x',
      //   mac: '零用34根'
      // },
      // {
      //   name: 'te门口xt2',
      //   mac: '促膝长谈'
      // },
      // {
      //   name: 'text2',
      //   mac: '使用过'
      // },
      // {
      //   name: 'text3',
      //   mac: ''
      // },
      // {
      //   name: 'text3',
      //   mac: '330.9'
      // },
      // {
      //   name: 'text3',
      //   mac: '330.9'
      // },
      // {
      //   name: 'text3',
      //   mac: '信用报告怕我遥入胉'
      // },
    ]
  },

  /**
   * item点击事件
   * 
   * @param {} options 
   */
  ItemClick(options) {
    var $data = options.currentTarget.dataset;
    var mac = $data.bean.mac;
    console.log("MAC地址：" + mac);
    wx.navigateTo({
      url: '../../liwei/map/map?mac=' + mac,
    })
  },

  /**
   * 查询设备列表
   */
  QueryDeviceList() {
    wx.request({
      url: 'http://129.204.165.206:8080/GPRS_Web/Device/FindAll',
      header: { 'content-type': 'application/json' },
      method: 'POST',
      timeout: 10 * 1000,
      success: (result) => {
        console.log('设备列表：');
        console.log(result.data);
        this.setData({
          list_device: result.data
        })
        this.EndRefresh();
      },
      fail: (res) => {
      },
      complete: (res) => {
      },
    })
  },

  /**
   * 结束下拉刷新
   */
  EndRefresh() {
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryDeviceList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.QueryDeviceList();
    this.EndRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('用户分享......');
  }

})