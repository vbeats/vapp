export default {
  pages: [
    'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationStyle: 'custom',
  },
  subPackages: [
    {
      "root": "components/",
      "pages": [
        "login/index"
      ]
    }
  ]
}
