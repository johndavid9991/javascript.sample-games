<?php

class Item extends CI_Model {

	public function __construct()
	{
		parent::__construct();
	}

	public function get_items($offset, $limit)
	{
		return $this->db->query("SELECT * 
								 FROM items 
								 LIMIT ". $offset .",". $limit)->result_array();
	}

	public function get_items_count()
	{
		$items = $this->db->query("SELECT count(*) AS items_count
								   FROM items")->row_array();

		return $items["items_count"];
	}
}