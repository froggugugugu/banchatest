Ext.ns('BE');

// Ext.Loader有効化
Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext': './ext/src',
        'BE': './js/src'
    }
});

//Bancha 初期化
Bancha.onModelReady('User',function(){

    //alert('hoge');

    // アプリケーション設定
    Ext.application({

        // Viewport自動生成
        autoCreateViewport: true,

        // アプリケーション名
        name: 'BE',

        // アプリケーションフォルダパス
        appFolder: './js/src/app',

        // 使用コントローラー定義
        controllers: [
        'Main',
        'Usergrid'
        ],

        // アプリケーション起動時イベントハンドラ
        launch: function() {

        }

    });
});

