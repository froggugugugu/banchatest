// {{{ BE.view.Viewport

Ext.define('BE.view.Viewport', {

    // {{{ requires

    requires: [
        'BE.view.Usergrid'
    ],

    // }}}
    // {{{ extend

    extend: 'Ext.container.Viewport',

    // }}}
    // {{{ layout

    layout: {
        type: 'border',
        padding: 5
    },

    // }}}
    // {{{ items

    items: [{

        region: 'center',
        //html: 'hoge'
        xtype: 'usergrid'

    }/*,{
        region: 'east',
        html: 'hoge'
    }*/]

    // }}}

});

// }}}
