export default defineAppConfig({
  pages: ['pages/index/index', 'pages/category/index', 'pages/message/index', 'pages/cart/index', 'pages/me/index'],
  window: {
    backgroundTextStyle: 'light',
    backgroundColor: '#F5F6F7',
    navigationBarBackgroundColor: '#fff',
    navigationStyle: 'custom',
  },
  tabBar: {
    color: '#8a8a8a',
    selectedColor: '#d81e06',
    backgroundColor: 'white',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/img/index.png',
        selectedIconPath: 'assets/img/index_s.png',
      },
      {
        pagePath: 'pages/category/index',
        text: '分类',
        iconPath: 'assets/img/category.png',
        selectedIconPath: 'assets/img/category_s.png',
      },
      {
        pagePath: 'pages/message/index',
        text: '消息',
        iconPath: 'assets/img/message.png',
        selectedIconPath: 'assets/img/message_s.png',
      },
      {
        pagePath: 'pages/cart/index',
        text: '购物车',
        iconPath: 'assets/img/cart.png',
        selectedIconPath: 'assets/img/cart_s.png',
      },
      {
        pagePath: 'pages/me/index',
        text: '我的',
        iconPath: 'assets/img/me.png',
        selectedIconPath: 'assets/img/me_s.png',
      },
    ],
  },
  // 子包
  subPackages: [
    {
      root: 'sub/',
      name: 'test',
      pages: ['pages/test/index'],
    },
  ],
  // 分包预下载
  preloadRule: {
    'pages/index/index': {
      network: 'all',
      packages: ['test'],
    },
  },
})
