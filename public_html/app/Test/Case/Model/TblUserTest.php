<?php
App::uses('TblUser', 'Model');

/**
 * TblUser Test Case
 *
 */
class TblUserTestCase extends CakeTestCase {
/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array('app.tbl_user');

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->TblUser = ClassRegistry::init('TblUser');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->TblUser);

		parent::tearDown();
	}

}
