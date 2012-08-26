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
 * Validation rules
 *
 * @var array
 */
	public $validate = array(
		'created' => array(
			'datetime' => array(
				'rule' => array('datetime'),
				//'message' => 'Your custom message here',
				//'allowEmpty' => false,
				//'required' => false,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
		'modified' => array(
			'datetime' => array(
				'rule' => array('datetime'),
				//'message' => 'Your custom message here',
				//'allowEmpty' => false,
				//'required' => false,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
	);
}
