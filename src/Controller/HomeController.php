<?php

namespace App\Controller;

class HomeController
{
    function getHome() {
        require_once('src/View/home.php');
    }

    function getMovies() {
        require_once('src/View/movies.php');
    }
}