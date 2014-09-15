<?php 

header("Content-type: application/json ; charset = UTF-8");

class ioTranslateException extends Exception { }

try{



 $query = "http://olimpicastereo.com.co/category/noticia";


 
 	 
$html = file_get_contents($query);

libxml_use_internal_errors(true); 
$doc = new DomDocument("1.0","UTF-8");
$doc->loadHTML(utf8_decode($html));
$xpath = new DOMXPath($doc);

$rs = $xpath->query('//*/section[contains(@class, "results")]/article[contains(@class, "result")]');


$html = array();



foreach ($rs as $result) {
	$html[] = htmlentities(utf8_decode($result->c14n()));

}





$json = array(
	"http_code" => 200,
	"rs" => $html,
	"length" => count($html)
	);


 if(!isset($_GET["callback"])){
    echo json_encode($json);
   }
 else
 	{
 		if($_GET["callback"] != "?")
 		echo "{$_GET["callback"]}(" . json_encode($json) . ")";
 	    else
        echo json_encode($json);

 	}



}catch(ioTranslateException $e){


	$json = array(
	"http_code" => 400,
	"rs" => array(
			"error_message" => "Bad request: " . $e->getMessage()			
		)
	);

 if(!isset($_GET["callback"])){
    echo json_encode($json);
   }
 else
 	{
 		if($_GET["callback"] != "?")
 		echo "{$_GET["callback"]}(" . json_encode($json) . ")";
 	    else
        echo json_encode($json);

 	}	

}

catch(Exception $e){


	$json = array(
	"http_code" => 400,
	"rs" => array(
			"error_message" => "Bad request: Malformed URL"			
		)
	);

 if(!isset($_GET["callback"])){
    echo json_encode($json);
   }
 else
 	{
 		if($_GET["callback"] != "?")
 		echo "{$_GET["callback"]}(" . json_encode($json) . ")";
 	    else
        echo json_encode($json);

 	}	

}
