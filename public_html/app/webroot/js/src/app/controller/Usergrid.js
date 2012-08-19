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

    views:[
    ],

    // }}}
    // {{{ models クラスへの参照提供 get(Xxxx)Model
    // }}}
    // {{{ stores インスタンスへの参照提供 get(Xxxx)Store

    stores: [
        'User'
    ],

    // }}}
    // {{{ init

    //アプリケーション起動時にコールされる特別なメソッド
    //ApplicationのLaunch前にコールされる
    init: function() {

        var me = this;
        me.control(me.bindItem);

    },

    // }}}
    // {{{ bindItem
    bindItem: {

        // 作成
        'usergrid button[action=create]' : {
            click: function(){
                var me = this;
                alert('create');
                me.getCrudgrid().fireEvent('create');
            }
        },
        // リセット
        'usergrid button[action=reset]' : {
            click: function(){
                var me = this;
                alert('reset');
                me.getCrudgrid().fireEvent('reset');
            }
        },
        // 保存
        'usergrid button[action=save]' : {
            click: function(){
                var me = this;
                alert('save');
                me.getCrudgrid().fireEvent('save');
            }
        },
        // 削除
        'usergrid actioncolumn' : {
            click: function(view,cell,row,col,e){
                var me = this;
                alert('delete');
                me.getCrudgrid().fireEvent('del',row);
            }
        }

    },
    // }}}
    // {{{
    onCreate: function() {
        var me = this;
        me.create();
    },
    onSave: function() {
        var me = this;
        me.save();
    },
    onDelete: function(rowIndex) {
        var me = this;
        me.del(rowIndex);
    },
    onReset: function() {
        var me = this;
        me.reset();
    },
    // }}}
    // {{{
    create: function() { // scope is a config object
        var me = this,
            grid = me.getCrudgrid(),
            edit = grid.getPlugin('cellplugin'),
            store = grid.getStore(),
            model = store.getProxy().getModel(),
            rec;

        // Cancel any active editing.
        edit.cancelEdit();

        // create new entry
        rec = Ext.create(Ext.ClassManager.getName(model),{});

        // add entry
        store.insert(0, rec);

        // start editing
        edit.startEditByPosition({
            row: 0,
            column: 0
        });
    },
    save: function() { // scope is the store
        var me = this,
            valid = true,
            msg = "",
            name,
            grid = me.getCrudgrid(),
            store = grid.getStore();

        // check if all changes are valid
        store.each(function(el) {
            if(!el.isValid()) {
                valid = false;
                name = el.get('name') || el.get('title') || (el.phantom ? "New entry" : el.getId());
                msg += "<br><br><b>"+name+":</b>";
                el.validate().each(function(error) {
                    msg += "<br>&nbsp;&nbsp;&nbsp;"+error.field+" "+error.message;
                });
            }
        });

        if(!valid) {
            Ext.MessageBox.show({
                title: 'Invalid Data',
                msg: '<div style="text-align:left; padding-left:50px;">There are errors in your data:'+msg+"</div>",
                icon: Ext.MessageBox.ERROR,
                buttons: Ext.Msg.OK
            });
        } else {
            // commit create and update
            store.sync();
        }
    },
    del: function (rowIndex) {
        var me = this,
            grid = me.getCrudgrid(),
            store = grid.getStore();
        rec = store.getAt(rowIndex),
        name = Ext.getClassName(rec);

        // instantly remove vom ui
        store.remove(rec);

        // sync to server
        // for before-ExtJS 4.1 the callbacks will be ignored,
        // since they were added in 4.1
        store.sync({
            success: function(record,operation) {

                Ext.MessageBox.show({
                    title: name + ' record deleted',
                    msg: name + ' record was successfully deleted.',
                    icon: Ext.MessageBox.INFO,
                    buttons: Ext.Msg.OK
                });
            },
            failure: function(record,operation) {

                // since it couldn't be deleted, add again
                store.add(rec);

                // inform user
                Ext.MessageBox.show({
                    title: name + ' record could not be deleted',
                    msg: operation.getError() || (name + ' record could not be deleted.'),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }); //eo store sync
    },
    reset: function() { // scope is the store
        // reject all changes
        var me = this,
            grid = me.getCrudgrid(),
            store = grid.getStore();

        store.each(function(rec) {
            if (rec.modified) {
                rec.reject();
            }
            if(rec.phantom) {
                store.remove(rec);
            }
        });
    }
});
// }}}
