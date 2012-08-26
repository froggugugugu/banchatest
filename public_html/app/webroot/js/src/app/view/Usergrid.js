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

    // {{{ initComponent

    initComponent : function () {

        var me = this;

        me.callParent(arguments);

    },

    // }}}

    scaffold : {

        target : 'Bancha.model.User',

        afterBuild : function (gridconfig) {
            var i;
            for (i = 0; i< gridconfig.columns.length; i++ ){
                if (gridconfig.columns[i].xtype == 'actioncolumn'){
                    Ext.apply(gridconfig.columns[i].items[0],{icon:'js/src/resources/icons/delete.png'});
                }
            }
        }

    }
});
// }}}
