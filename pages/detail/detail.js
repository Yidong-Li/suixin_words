// pages/detail/detail.js
var wordsList;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    details:'',
    key:'suixin_words',
    modify_flag:0,
    idx:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wordsList = wx.getStorageSync('suixin_words');
    if(options.idx){
      var arr = wordsList;
      this.setData({
        details: arr[options.idx].words,
        idx:options.idx
      })
    }
    this.setData({
      modify_flag:options.modify
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
    wordsList = wx.getStorageSync('suixin_words');
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
  
  },

  bindFormSubmit: function(e){
    var that = this;
    var arr = wordsList;
    var obj = {};
    var date = new Date();
    date = date.toLocaleDateString(); 
    obj.date = date;
    if (!e.detail.value.details){
      wx.showModal({
        title: '提示',
        content: '有内容才能保存～',
      })
    }
    else {
      if(this.data.modify_flag == 0){
        if (arr != '') {
          obj.words = e.detail.value.details;
          arr.unshift(obj);
        }
        else {
          arr = [];
          obj.words = e.detail.value.details;
          console.log(e.detail.value.details);
          arr.unshift(obj);
        }
        wx.setStorage({
          key: that.data.key,
          data: arr,
          success: function (res) {},
          fail: function () {
            wx.showModal({
              title: '提示',
              content: '不好意思没有保存成功,笔记君会去查找bug的！',
            })
          },
          complete: function () {
            // console.log(getCurrentPages());
            // wx.navigateBack();
          }
        });
      }
      else {
        if (arr != '') {
          obj.words = e.detail.value.details;
          arr[this.data.idx] = obj;
        }
        else {
          arr = [];
          obj.words = e.detail.value.details;
          arr.unshift(obj);
        }
      }
      wx.setStorage({
        key: that.data.key,
        data: arr,
        success: function () {},
        fail: function () {
          wx.showModal({
            title: '提示',
            content: '不好意思没有保存成功,笔记君会去查找bug的！',
          })
        },
        complete: function () {
          wx.navigateBack({
            delta: 1
          });
        }
      });
    }
  },

  cancel:function(){
    wx.navigateBack({
      delta: 1
    });
  }
})