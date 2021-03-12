// miniprogram/pages/liwei/login/login.js

var _that;

Page({

  /**
   * 登录
   */
  Login: function (e) {
    let name = e.detail.value.name;
    let pwd = e.detail.value.pwd;
    if (!name && !pwd) {
      wx.showToast({
        title: '用户名或密码错误',
        icon: 'error',
      })
      return;
    }
    wx.showLoading({
      title: '正在登录',
      //防止触摸穿透
      mask: true,
    })
    wx.request({
      url: 'http://101.132.102.203:8080/GPRS_Web/User/Login',
      data: { userName: name, password: pwd },
      header: { 'content-type': 'application/json' },
      method: 'POST',
      timeout: 10 * 1000,
      success: (result) => {
        //隐藏耗时框
        wx.hideLoading({
          success: (res) => {
          },
        });
        console.log(result);
        let userId = result.data.userId;
        let phone = result.data.phoneNumber;
        console.log('用户ID：', userId, '，注册手机：', phone);
        if (typeof (userId) == 'undefined' || typeof (phone) == 'undefined') {
          wx.showToast({
            title: '用户名或密码错误',
            icon: 'error',
          })
          return;
        }
        //跳转
        wx.navigateTo({
          url: '../../liwei/gpsDevice/gpsDevice',
        });
      },
      fail: (result) => {
        wx.hideLoading({
          success: (res) => {
            wx.showToast({
              title: '请与管理员联系',
              icon: 'error',
            })
          },
        })
      },
      complete: (result) => {

      },
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
    _that = this;
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