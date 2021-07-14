export default {
  pages: [
    'pages/index/index',
    'pages/group/index',
    'pages/shop/index',
    'pages/message/index',
    'pages/me/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    backgroundColor: '#F5F6F7',
    navigationBarBackgroundColor: '#fff',
    navigationStyle: 'custom',
  },
  tabBar: {
    color: '#cdcdcd',
    selectedColor: '#2c2c2c',
    backgroundColor: 'white',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '',
        iconPath: 'assets/images/index.png',
        selectedIconPath: 'assets/images/index_s.png'
      },
      {
        pagePath: 'pages/group/index',
        text: '',
        iconPath: 'assets/images/group.png',
        selectedIconPath: 'assets/images/group_s.png'
      },
      {
        pagePath: 'pages/shop/index',
        text: '',
        iconPath: 'assets/images/shop.png',
        selectedIconPath: 'assets/images/shop_s.png'
      },
      {
        pagePath: 'pages/message/index',
        text: '',
        iconPath: 'assets/images/message.png',
        selectedIconPath: 'assets/images/message_s.png'
      },
      {
        pagePath: 'pages/me/index',
        text: '',
        iconPath: 'assets/images/me.png',
        selectedIconPath: 'assets/images/me_s.png'
      }
    ]
  },
  // 子包
  subPackages: [
    {
      root: "subPages/",
      name: "test",
      pages: [
        "pages/test/index"
      ]
    }
  ],
  // 分包预下载
  preloadRule: {
    'pages/index/index': {
      network: 'all',
      packages: ['test']
    }
  }
}
