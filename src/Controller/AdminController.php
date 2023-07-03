<?php

namespace App\Controller;

use App\Model\UserModel;

class AdminController
{
    public function getUsers()
    {
        if (isset($_SESSION['user']) && $_SESSION['user']['id_user'] == 1) {
            $userModel = new UserModel();
            $users = $userModel->getUsers();
            echo json_encode($users);
        }
    }

    public function modifyUser($id, $user)
    {
        if (isset($_SESSION['user']) && $_SESSION['user']['id_user'] == 1) {
            $userModel = new UserModel();
            $userModel->modifyUser($id, $user);
        }
    }

    public function deleteUser($id)
    {
        if (isset($_SESSION['user']) && $_SESSION['user']['id_user'] == 1) {
            $userModel = new UserModel();
            $userModel->deleteUser($id);
        }
    }
}