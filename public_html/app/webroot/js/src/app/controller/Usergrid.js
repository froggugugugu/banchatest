// {{{ 'BE.controller.Usergrid',
/**
 * @class BE.controller.Usergrid
 * ユーザグリッドコントローラ
 */
Ext.define('BE.controller.Usergrid', {
    // {{{ extend

    extend : 'Ext.app.Controller',

    // }}}
    // {{{ refs インスタンス化されたViewへの参照提供 get([R]efname)

    refs: [{
        selector: 'usergrid',ref: 'crudgrid'
    }],

    // }}}
    // {{{ views クラスへの参照提供 get(Xxxx)View
/*
    views:[
    ],
*/
    // }}}
    // {{{ models クラスへの参照提供 get(Xxxx)Model
    // }}}
    // {{{ stores インスタンスへの参照提供 get(Xxxx)Store
/*
    stores: [
        'User'
    ],
*/
    // }}}

});
// }}}
