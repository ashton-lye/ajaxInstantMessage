<?php
    $username = $_POST['uname'];
    $password = $_POST['pword'];

    require_once('connect.php');

    $query = "SELECT * FROM users WHERE username = '$username' && password = '$password'";

    $result = $con->query($query);

    echo $result;
?>