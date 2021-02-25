// miniprogram/pages/liwei/map.js

var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var _mapSdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    longitude: '',
    latitude: '',
    textData: {},
    dome:false
  },

  /**
   * 获取当前位置
   */
  GetLocation() {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: (result) => {
        console.log('获取当前位置成功：', result);

        that.setData({
          latitude: result.latitude,
          longitude: result.longitude
        })
        var marker = [{
          longitude: result.longitude,
          latitude: result.latitude,
          iconPath: "../../liwei/map/mark.png",
          //自定义气泡
          callout: {
            content: "你的位置\n......",
            color: "#FFFFFF",
            fontSize: 14,
            borderRadius: 10,
            bgColor: "#FF0000",
            textAlign: "center" ,
            padding: 5,
            display: 'ALWAYS'
          }
        }]

        that.setData({
          markers: marker
        });
        that.setData({
          dome: true
        });
      },
      fail: (result) => {
        console.log('获取当前位置失败：', result);
      },
      complete: (result) => {

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var mac = options.mac;
    console.log('收到的设备的MAC地址：' + mac);
    //腾讯地图API核心类
    _mapSdk = new QQMapWX({
      key: 'YOWBZ-ZSKKW-DPKRE-O2OUU-57RC5-NVFCW'
    });
    this.GetLocation();
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
    //调用腾讯地图的接口
    _mapSdk.search({
      keyword: '*',
      success: function (options) {
        console.log(options);
      },
      fail: function (options) {
        console.log(options);
      },
      complete: function (options) {
        console.log(options);
      }
    });
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