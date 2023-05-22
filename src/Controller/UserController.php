<?php

namespace App\Controller;

use App\Model\UserModel;

class UserController
{

    function getFavorites()
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

    function addFavoriteMovie($id)
    {
        if (isset($_SESSION['user'])) {
            $userModel = new UserModel();
            $favId = $userModel->getFavoriteId($_SESSION['user']['id_user']);
            var_dump($favId);
            if ($favId) {
                $userModel->addFavoriteMovie($favId, $id);
            } else {
                header("HTTP/1.1 400 No favorite list");
                die();
            }
        }
    }
}
