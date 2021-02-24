// miniprogram/pages/liwei/gpsDevice/gpsDevice.js
Page({

  data: {
    list_device: []
  },

  onSuccess: function (res) { //onSuccess回调
    wx.hideLoading();
    console.log(res);

    if (res.locCode != 100) {
      console.log(res.message);
      this.show({
        iconToast: '', // 对：icon-dui, 错：icon-cuo,警告：icon-warning
        imageToast: '',
        textToast: res.message,
        duration: 100,
      })
      if (res.locCode == 110) {
        wx.redirectTo({
        })
      }
    } else {
      this.setData({
        items: res.data.ActivityProduct, //请求结果数据
        activity: res.data.activity,
        points: res.data.Points
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.request({
      url: 'http://101.132.102.203:8080/GPRS_Web/Device/FindAll',
      header: { 'content-type': 'application/json' },
      method: 'POST',
      timeout: 10 * 1000,
      success: (result) => {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        console.log('设备列表：');
        console.log(result.data);
        _this.setData({
          list_device: result.data
        })
      },
      fail: (res) => {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      },
      complete: (res) => {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      },
    })
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
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
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