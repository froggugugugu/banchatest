// {{{ 'BE.store.User',
/**
 * @class BE.store.User
 * desctription
 */
Ext.define('BE.store.User', {
    // {{{ extend

    extend : 'Ext.data.Store',

    // }}}
    // {{{ model

    model: Bancha.getModel('User'),
    autoLoad: true

    // }}}
});
// }}}
