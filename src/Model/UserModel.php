<?php

namespace App\Model;

class UserModel
{
    public function register($firstname, $lastname, $email, $password)
    {
        $db = DbConnection::getDb();
        var_dump($db);
        $sql_request = ("INSERT INTO user (firstname, lastname, email, password)
            VALUES (:firstname, :lastname, :email, :password)"
        );
        var_dump($sql_request);
        $statement = $db->prepare($sql_request);
        $statement->execute([
            ':firstname' => $firstname,
            ':lastname' => $lastname,
            ':email' => $email,
            ':password' => $password
        ]);
    }

    public function getUser($email)
    {
        $db = DbConnection::getDb();
        $sql_request = ("SELECT * FROM user
            WHERE email = :email"
        );
        $statement = $db->prepare($sql_request);
        $statement->execute([
            ':email' => $email
        ]);
        $user = $statement->fetch();
        return $user;
    }

}
