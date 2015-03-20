<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Items extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model("item");
	}

	public function index()
	{
		$this->load->view("items");
	}

	public function get_pages()
	{
		$items_count = $this->item->get_items_count();
		$items_per_page = $_GET["page_limit"];
		$total_pages = $items_count / $items_per_page;

		$pages = "";

		for($ctr = 1; $ctr <= $total_pages; $ctr++)
		{
			$pages .= "<li data-offset='". ($ctr - 1) ."'>". $ctr ."</li>";
		}

		$view_data["pages"] = $pages;

		echo json_encode($view_data);
	}

	public function fetch_items()
	{
		$items = $this->item->get_items($_GET["offset"],$_GET["limit"]);
		$items_html = "";

		foreach($items as $item)
		{
			$items_html .= "<tr>
								<td>". $item['id'] ."<td>
								<td>". $item['name'] ."<td>
								<td>". $item['description'] ."<td>
								<td>". $item['code'] ."<td>
							</tr>";
		}

		$view_data["items"] = $items_html;

		echo json_encode($view_data);
	}
}





//end of items controller