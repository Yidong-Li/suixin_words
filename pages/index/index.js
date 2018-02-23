//index.js
//获取应用实例
const app = getApp()
var wordsList = wx.getStorageSync('suixin_words');
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    words_list:'',
    key:'suixin_words'
  },
  
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.getWords();
  },

  onShow: function(){
    this.getWords();
  },

  getWords :function(){
    var that = this;
    wx.getStorage({
      key:that.data.key,
      success: function(res){
        // for(var i in res.data){
        //   res.data[i].words = res.data[i].words.replace(/\n/g, '');
        //   console.log(res.data[i].words);
        // }
        that.setData({
          words_list:res.data
        },function(){
          wordsList = that.data.words_list;
        });
      },
      fail: function(res){
        that.setData({
          words_list: ''
        },function(){
          wordsList = that.data.words_list;
        })
      }
    })
  },

  detail: function(e){
    console.log(e);
    wx.navigateTo({
      url: '../detail/detail?idx='+e.currentTarget.dataset.idx+'&modify=1',
    })
  },

  nothing: function(){
    
  },

  deleteWords: function(e){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '你真的要删除这条笔记？',
      cancelText: '取消',
      confirmText: '确定',
      success: function(res){
        if(res.confirm){
          wordsList.splice(e.currentTarget.dataset.idx,1);
          if(wordsList.length == 0){
            wx.removeStorage({
              key: that.data.key,
              success: function(res) {
                that.getWords();
              },
            })
          }
          else{
            wx.setStorage({
              key: that.data.key,
              data: wordsList,
              success: function () {
                that.getWords();
              },
              fail: function (res) {
                wx.showModal({
                  title: '提示',
                  content: '不好意思删除失败了，笔记君会去努力找原因的！',
                })
              }
            });
          }
          
        }
      }
    })
  },
  
  addWords: function(){
    wx.navigateTo({
      url: '../detail/detail?modify=0',
    })
  }
})
