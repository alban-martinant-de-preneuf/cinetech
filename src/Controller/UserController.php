<?php

namespace App\Controller;

use App\Model\UserModel;

class UserController
{

    public function getFavorites()
    {
        if (isset($_SESSION['user'])) {
            $userModel = new UserModel();
            $favoritesMovies = $userModel->getFavoritesMovies($_SESSION['user']['id_user']);
            $favoritesTvs = $userModel->getFavoritesTvs($_SESSION['user']['id_user']);
            $favorites = [
                'movies' => $favoritesMovies,
                'tvs' => $favoritesTvs
            ];
            echo json_encode($favorites);
        }
    }

    public function addFavoriteMovie($id)
    {
        if (isset($_SESSION['user'])) {
            $userModel = new UserModel();
            $favId = $userModel->getFavoriteId($_SESSION['user']['id_user']);
            if ($favId) {
                $userModel->addFavoriteMovie($favId, $id);
            } else {
                header("HTTP/1.1 400 No favorite list");
                die();
            }
        }
    }

    public function removeFavoriteMovie($id)
    {
        if (isset($_SESSION['user'])) {
            $userModel = new UserModel();
            $favId = $userModel->getFavoriteId($_SESSION['user']['id_user']);
            if ($favId) {
                $userModel->removeFavoriteMovie($favId, $id);
            } else {
                header("HTTP/1.1 400 No favorite list");
                die();
            }
        }
    }

    public function addFavoriteTv($id)
    {
        if (isset($_SESSION['user'])) {
            $userModel = new UserModel();
            $favId = $userModel->getFavoriteId($_SESSION['user']['id_user']);
            if ($favId) {
                $userModel->addFavoriteTv($favId, $id);
            } else {
                header("HTTP/1.1 400 No favorite list");
                die();
            }
        }
    }

    public function removeFavoriteTv($id)
    {
        if (isset($_SESSION['user'])) {
            $userModel = new UserModel();
            $favId = $userModel->getFavoriteId($_SESSION['user']['id_user']);
            if ($favId) {
                $userModel->removeFavoriteTv($favId, $id);
            } else {
                header("HTTP/1.1 400 No favorite list");
                die();
            }
        }
    }

    public function changePwd($pwds)
    {
        if (isset($_SESSION['user'])) {
            $userModel = new UserModel();
            $user = $userModel->getUser($_SESSION['user']['email']);
            if (password_verify($pwds['oldPwd'], $user['password'])) {
                $userModel->changePwd($_SESSION['user']['id_user'], password_hash($pwds['newPwd'], PASSWORD_DEFAULT));
            } else {
                header("HTTP/1.1 400 L'ancien mot de passe est incorrect");
                die();
            }
        }
    }

    public function isConnected()
    {
        echo isset($_SESSION['user']) ? 'true' : 'false';
    }
}
