<?php
App::uses('AppModel', 'Model');
/**
 * User Model
 *
 */
class User extends AppModel {

/**
* Bancha behaviour
*/
	public $actsAs = array('Bancha.BanchaRemotable');

    /**
 * Display field
 *
 * @var string
 */
	public $displayField = 'username';
}
