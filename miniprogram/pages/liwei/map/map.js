// miniprogram/pages/liwei/map.js

var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var _mapSdk;
var _address = 'Undefined';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    lot: '',
    lat: '',
    txt: {},
    update_flag: false,
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
          lot: result.longitude,
          lat: result.latitude
        })
        //坐标反查
        _mapSdk.reverseGeocoder({
          location: {
            latitude: this.data.lat,
            longitude: this.data.lot
          },
          //网络请求为异步操作，在请求执行完毕的回调中赋值
          success: function (result) {
            console.log('坐标反查成功：', result);
            _address = result.result.address;
            console.log('位置：', _address);
            //地图标记
            var marker = [{
              longitude: that.data.lot,
              latitude: that.data.lat,
              iconPath: '../../liwei/map/mark.png',
              //自定义气泡
              callout: {
                content: _address,
                color: '#FFFFFF',
                fontSize: 14,
                borderRadius: 10,
                bgColor: '#FF0000',
                textAlign: 'center',
                padding: 5,
                //ALWAYS常显，BYCLICK点击显示
                display: 'BYCLICK'
              }
            }]
            that.setData({
              markers: marker,
              update_flag: true
            });
          },
          fail: function (result) {
            console.log('坐标反查失败：', result);
            _address = 'Error';
          }
        })
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