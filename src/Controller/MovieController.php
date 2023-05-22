<?php

namespace App\Controller;

use App\Model\UserModel;

class MovieController
{
    function pageMovie()
    {
        require_once('src/View/movie.php');
    }

    function pageTv()
    {
        require_once('src/View/tv.php');
    }

    function pageFavorites()
    {
        require_once('src/View/favorites.php');
    }
}
