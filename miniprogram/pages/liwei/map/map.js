// miniprogram/pages/liwei/map.js

var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var DATE = new Date();

var _mapSdk;
var _address = 'Undefined';
var _that;
var _points = [];
var _mac;
var _startDate = DATE.getFullYear() + '-' + (DATE.getMonth() + 1) + '-' + DATE.getDate();
var _endDate = DATE.getFullYear() + '-' + (DATE.getMonth() + 1) + '-' + DATE.getDate();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    longitude: '',
    latitude: '',
    txt: {},
    update_flag: false,
    polyline: [],
    startDate: _startDate,
    endDate: _endDate,
  },

  BindDateChange: function (e) {
    var id = e.target.id;
    switch (id) {
      case 'startDate':
        _startDate = e.detail.value;
        break;
      case 'endDate':
        _endDate = e.detail.value;
        break;
    }
    _that.setData({
      startDate: _startDate,
      endDate: _endDate,
    })
    console.log('起始日期：', _startDate, '结束日期：', _endDate);
  },

  /**
   * 查询历史位置记录
   */
  QueryHistoryLocation() {
    wx.showLoading({
      title: '正在查询',
      //防止触摸穿透
      mask: true,
    })
    wx.request({
      url: 'http://129.204.165.206:8080/GPRS_Web/Location/FindByMac',
      data: {
        mac: _mac,
      },
      // header: { 'content-type': 'application/json' },
      //携带参数需要改成如下方式，原因暂时没研究
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      timeout: 10 * 1000,
      success: (result) => {
        console.log('查询历史位置记录成功：', result);
        let len = result.data.length;
        console.log('轨迹记录数：', len);
        if (len == 0) {
          wx.showToast({
            title: '该设备无数据',
            icon: 'error',
          })
          return;
        }
        for (let i = 0; i < len; i++) {
          if (result.data[i].lat > 90 || result.data[i].lat < -90) {
            console.log('latitude字段值有误：', result.data[i].lat);
            continue;
          }
          _points.push({
            latitude: result.data[i].lat,
            longitude: result.data[i].lot,
          });
        }
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        _that.setData({
          latitude: _points[0].latitude,
          longitude: _points[0].longitude,
          polyline: [{
            points: _points,
            color: '#FF0000DD',
            width: 4,
          }],
          update_flag: true,
        })
        wx.hideLoading({
          success: (res) => { },
        })
      },
      fail: (result) => {
        wx.showToast({
          title: '请与管理员联系',
          icon: 'error',
        })
      },
      complete: (result) => {
      },
    })
  },

  /**
   * 获取当前位置
   */
  QueryCurrentLocation() {
    wx.showLoading({
      title: '正在查询',
      //防止触摸穿透
      mask: true,
    })
    wx.getLocation({
      type: 'gcj02',
      success: (result) => {
        console.log('获取当前位置成功：', result);
        _that.setData({
          longitude: result.longitude,
          latitude: result.latitude
        })
        //坐标反查
        _mapSdk.reverseGeocoder({
          location: {
            latitude: this.data.latitude,
            longitude: this.data.longitude
          },
          //网络请求为异步操作，在请求执行完毕的回调中赋值
          success: function (result) {
            console.log('坐标反查成功：', result);
            _address = result.result.address;
            console.log('位置：', _address);
            //地图标记
            var marker = [{
              longitude: _that.data.longitude,
              latitude: _that.data.latitude,
              iconPath: '../../../images/mark.png',
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
            _that.setData({
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
        wx.hideLoading({
          success: (res) => { },
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _that = this;
    _mac = options.mac;
    console.log('收到的设备的MAC地址：' + _mac);
    //腾讯地图API核心类
    _mapSdk = new QQMapWX({
      key: 'YOWBZ-ZSKKW-DPKRE-O2OUU-57RC5-NVFCW'
    });
    //查询本机当前位置
    // this.QueryCurrentLocation();
    //查询该设备的历史轨迹
    this.QueryHistoryLocation();
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