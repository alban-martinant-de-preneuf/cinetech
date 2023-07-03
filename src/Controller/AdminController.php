<?php

namespace App\Controller;

use App\Model\UserModel;

class AdminController
{
    public function __construct()
    {
        if (!isset($_SESSION['user'])) {
            header("HTTP/1.1 400 No user connected");
            die();
        }

        if ($_SESSION['user']['id_user'] !== 1) {
            header("HTTP/1.1 403 Forbidden");
            die();
        }
    }

    public function getUsers()
    {
        $userModel = new UserModel();
        $users = $userModel->getUsers();
        echo json_encode($users);
    }

    public function modifyUser($id, $user)
    {
        $userModel = new UserModel();
        $userModel->modifyUser($id, $user);
    }

    public function deleteUser($id)
    {
        $userModel = new UserModel();
        $userModel->deleteUser($id);
    }
}
