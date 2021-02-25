// miniprogram/pages/liwei/login/login.js

Page({

  /**
   * 登录
   */
  Login: function () {
    wx.navigateTo({
      url: '../../index/index',
    })
  },

  /**
   * 微信登录
   */
  ThirdLogin: function () {
    //navigateTo：保留当前页面，跳转到指定页面，左上角有返回按钮
    //redirecTo：关闭当前页面，跳转到指定页面，左上角没有返回按钮
    wx.navigateTo({
      url: '../../liwei/gpsDevice/gpsDevice',
    })
  },

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }

})