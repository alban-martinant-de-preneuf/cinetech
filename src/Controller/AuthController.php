<?php

namespace App\Controller;

use App\Model\UserModel;

class AuthController
{

    public function register($firstname, $lastname, $email, $password, $password2)
    {
        $userModel = new UserModel();
        if ($password !== $password2) {
            header("HTTP/1.1 400 Passwords don't match");
            die();
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            header("HTTP/1.1 400 Invalid email");
            die();
        }
        if ($userModel->getUser($email)) {
            header("HTTP/1.1 400 Email already exists");
            die();
        }
        $password = password_hash($password, PASSWORD_DEFAULT);
        $userModel->register($firstname, $lastname, $email, $password);
    }

    public function login($email, $password)
    {
        $userModel = new UserModel();
        $user = $userModel->getUser($email);
        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user'] = $user;
            header("HTTP/1.1 200 OK");
            die();
        } else {
            header("HTTP/1.1 400 Invalid credentials");
            die();
        }
    }
}
