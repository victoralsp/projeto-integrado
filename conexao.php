<?php
    #Criação das variaveis para login no banco de dados#
    $Hostname = "Localhost";
    $BD= "Catavento";
    $usuario = "Teste";
    $senha = "Teste";
    #Conexão com o banco de dados#
    try{
        $pdo = new pdo("mysql:host=$Hostname;dbname=$BD",$usuario,$senha);
    }catch(PDOexception $e){
        $e->getmessage();
    #buscar possiveis mensagens de erros no BD#
    }
?>
