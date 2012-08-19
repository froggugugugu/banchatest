<?php
/**
 * TblProjectFixture
 *
 */
class TblProjectFixture extends CakeTestFixture {
/**
 * Table name
 *
 * @var string
 */
	public $table = 'tbl_Projects';

/**
 * Fields
 *
 * @var array
 */
	public $fields = array(
		'Id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'length' => 20, 'key' => 'primary'),
		'Name' => array('type' => 'string', 'null' => false, 'default' => NULL, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'PlanFrom' => array('type' => 'datetime', 'null' => false, 'default' => NULL),
		'PlanTo' => array('type' => 'datetime', 'null' => false, 'default' => NULL),
		'DoFrom' => array('type' => 'datetime', 'null' => false, 'default' => NULL),
		'DoTo' => array('type' => 'datetime', 'null' => false, 'default' => NULL),
		'PlanCost' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'length' => 20),
		'DoCost' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'length' => 20),
		'Created' => array('type' => 'datetime', 'null' => false, 'default' => NULL),
		'CreatedId' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'length' => 20),
		'indexes' => array('PRIMARY' => array('column' => 'Id', 'unique' => 1)),
		'tableParameters' => array('charset' => 'utf8', 'collate' => 'utf8_general_ci', 'engine' => 'InnoDB')
	);

/**
 * Records
 *
 * @var array
 */
	public $records = array(
		array(
			'Id' => 1,
			'Name' => 'Lorem ipsum dolor sit amet',
			'PlanFrom' => '2012-08-08 02:13:28',
			'PlanTo' => '2012-08-08 02:13:28',
			'DoFrom' => '2012-08-08 02:13:28',
			'DoTo' => '2012-08-08 02:13:28',
			'PlanCost' => 1,
			'DoCost' => 1,
			'Created' => '2012-08-08 02:13:28',
			'CreatedId' => 1
		),
	);
}
