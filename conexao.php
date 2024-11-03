<?php
    $Hostname = "Localhost";
    $BD= "Catavento";
    $usuario = "Teste";
    $senha = "Teste";
    #Criação das variaveis para login no banco de dados#
    try{
        $pdo = new pdo("mysql:host=$Hostname;dbname=$BD",$usuario,$senha);
    }catch(PDOexception $e){
        echo $e-> getmessage(); 
    }
?>
