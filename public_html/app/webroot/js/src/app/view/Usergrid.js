// {{{ 'BE.view.Usergrid',
/**
 * @class BE.view.Usergrid
 * desctription
 */
Ext.define('BE.view.Usergrid', {
    // {{{ extend

    extend : 'Ext.grid.Panel',

    // }}}
    // {{{ alias

    alias : 'widget.usergrid',

    // }}}
    // {{{ requires

    requires : [
    ],

    // }}}
    // {{{ ui

    //ui : 'styleclass',

    // }}}
    // {{{ title

    title : 'Usergrid',

    // }}}
    // {{{ store ページング時はinitComponentで生成
    // }}}

    // {{{ items

    columns: [{
        id: 'id',
        header: 'id',
        dataIndex: 'id',
        width: 100
    },{
        id: 'username',
        header: 'username',
        dataIndex: 'username',
        width: 100,
        editor: {
            xtype: 'textfield'
        }
    },{
        id: 'password',
        header: 'password',
        dataIndex: 'password',
        width: 100,
        editor: {
            xtype: 'textfield'
        }

    },{
        id: 'first_name',
        header: 'first_name',
        dataIndex: 'first_name',
        width: 100,
        editor: {
            xtype: 'textfield'
        }

    },{
        id: 'last_name',
        header: 'last_name',
        dataIndex: 'last_name',
        width: 100,
        editor: {
            xtype: 'textfield'
        }

    },{
        xtype: 'actioncolumn',
        width: 50,
        items: [{
            xtype: 'button',
            icon: './js/src/resources/icons/delete.png',
            tooltip: 'Delete',
            text: 'delete',
            action: 'delete'
        }]
    }],



    // }}}
    // {{{ pageSize

    pageSize: 25,

    // }}}
    // {{{ initComponent

    initComponent : function(){

        var me = this;

        //同一store指定
        me.store = Ext.create('BE.store.User');
        me.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
            {
                xtype: 'button',
                text: 'Create',
                action: 'create'
            }, {
                xtype: 'button',
                text: 'Reset',
                action: 'reset'
            }, {
                xtype: 'button',
                text: 'Save',
                action: 'save',
            }]
        },{
            xtype: 'pagingtoolbar',
            store: me.store,
            dock: 'bottom',
            displayInfo: true
        }];

        me.callParent(arguments);
        me.selType = 'cellmodel';
        me.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 2,
                pluginId:'cellplugin'
            })
        ];

    }

    // }}}
});
// }}}
