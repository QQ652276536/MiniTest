// miniprogram/pages/liwei/gpsDevice/gpsDevice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArr: [
      {
        mac: 'text1',
        state: '正常'
      },
      {
        mac: '111',
        state: '异常'
      },
      {
        mac: '333',
        state: '正常'
      },
      {
        mac: '555',
        state: '正常'
      },
      {
        mac: '777',
        state: '异常'
      },
      {
        mac: '999',
        state: '正常'
      },
      {
        mac: 'xxx',
        state: '正常'
      },
      {
        mac: 'text2',
        state: '异常'
      },
      {
        mac: 'text2',
        state: '正常'
      },
      {
        mac: 'text3',
        state: '异常'
      },
      {
        mac: 'text3',
        state: '330.9'
      },
      {
        mac: 'text3',
        state: '330.9'
      },
      {
        mac: 'text3',
        state: '异常'
      },
    ]
  },

  onSuccess: function (res) { //onSuccess回调
    wx.hideLoading();
    console.log(res);

    if (res.stateCode != 100) {

      console.log(res.message);
      this.show({
        iconToast: '', // 对：icon-dui, 错：icon-cuo,警告：icon-warning
        imageToast: '',
        textToast: res.message,
        duration: 100,
      })
      if (res.stateCode == 110) {
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