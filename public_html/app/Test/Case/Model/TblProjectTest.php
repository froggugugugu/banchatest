<?php
App::uses('TblProject', 'Model');

/**
 * TblProject Test Case
 *
 */
class TblProjectTestCase extends CakeTestCase {
/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array('app.tbl_project');

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->TblProject = ClassRegistry::init('TblProject');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->TblProject);

		parent::tearDown();
	}

}
