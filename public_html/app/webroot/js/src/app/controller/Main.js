// {{{ 'BE.controller.Main',
/**
 * @class BE.controller.Main
 * メインコントローラ
 */
Ext.define('BE.controller.Main', {
    // {{{ extend

    extend : 'Ext.app.Controller',

    // }}}
    // {{{ refs インスタンス化されたViewへの参照提供 get([R]efname)
    /*
    refs: [{
        selector: 'xtype..',ref: 'localname'
    }],
    */
    /*
    // }}}
    // {{{ views クラスへの参照提供 get(Xxxx)View

    views:[
        'Views'
    ],

    // }}}
    // {{{ models クラスへの参照提供 get(Xxxx)Model

    models:[
        'Models'
    ],

    // }}}
    // {{{ stores インスタンスへの参照提供 get(Xxxx)Store

    stores: [
        'Store'
    ],

    // }}}*/
    // {{{ init

    //アプリケーション起動時にコールされる特別なメソッド
    //ApplicationのLaunch前にコールされる
    init: function() {

        //alert('hoge');
        var me = this;
        me.control(me.bindItem);

    },
    // {{{ bindItem
    bindItem: {

        // 作成
        'usergrid' : {
            create: function(){
                var me = this;
                alert('create dispatch');
                me.getController('Usergrid').onCreate();
            },
            reset: function(){
                var me = this;
                alert('reset dispatch');
                me.getController('Usergrid').onReset();
            },
            save: function(){
                var me = this;
                alert('save dispatch');
                me.getController('Usergrid').onSave();
            },
            del: function(rowIndex){
                var me = this;
                alert('save dispatch');
                me.getController('Usergrid').onDelete(rowIndex);
            }

            /*
            hoge: function(){
                var me = this;
                me.getController('Hoge').onHoge();
            },*/
        }

    }
/*
    // }}}
    // }}}
    // {{{ onXXXX

    onXXXX: function() {
        console.log('hoge');
    }
*/
    // }}}

});
// }}}
