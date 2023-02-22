export default defineAppConfig({
    pages: [
        'pages/index/index'
    ],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'vapp',
        navigationBarTextStyle: 'black'
    },
    subpackages: [
        {
            root: 'subPages/test',
            name: 'test',
            pages: ['index'],
        }
    ],
    preloadRule: {
        'pages/index/index': {
            network: 'all',
            packages: ['__APP__', 'test'],
        }
    }
})
