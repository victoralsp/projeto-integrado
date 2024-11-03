<?php
    require("conexao.php");
    if(isset($_POST)){
        $nome =$_POST['nome'];
        $Email =$_POST['Email'];
        $senha = $_POST['Senha'];
        $query = "INSERT INTO user_events(Nome,Senha,Email,CNPJ) values ('$nome','$senha','$Email','06372772772')";
        $stmt =$pdo->Prepare($query);
        $stmt->execute();
    }
    Echo "<H1>Usuário cadastrado com sucesso</H1>";
?>