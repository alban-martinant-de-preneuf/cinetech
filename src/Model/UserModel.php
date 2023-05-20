<?php

namespace App\Model;

class UserModel {

    public function login() {
        $db = DbConnection::getDb();
        var_dump($db);
        echo 'login';
    }

}