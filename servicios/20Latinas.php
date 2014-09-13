<?php 

header("Content-type: application/json ; charset = UTF-8");

class ioTranslateException extends Exception { }

try{



 $query = "http://olimpicastereo.com.co/20-latinas/";


 
 	 
$html = file_get_contents($query);


libxml_use_internal_errors(true); 
$doc = new DomDocument("1.0","UTF-8");
$doc->loadHTML(utf8_decode($html));
$xpath = new DOMXPath($doc);


$temas = $xpath->query('//*/section[contains(@class, "latinas")]/ul/li');


$html = array();

foreach ($temas as $tema) {

	$divs = $xpath->query('div', $tema);	
	$count = 0;

	foreach ($divs as $el) {

		if($count === 0)
	    {
	    	$artista = $xpath->query('p',$el)->item(0)->nodeValue;
	    	$nombre = $xpath->query('p',$el)->item(1)->nodeValue;
	    }else
	    {
	    	$mp3 = $xpath->query('a/@href',$el)->item(0)->nodeValue;
	    }

	    $count++;
	}


	$_tema = array(
		  "img" => $xpath->query('img/@src', $tema)->item(0)->value,
		  "artista" => $artista,
		  "nombre" => $nombre,
		  "src" => $mp3		  
		);

	$html[] = $_tema;
	
	// parseamos los datos necesarios.

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
