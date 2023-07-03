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

    function getTvs() {
        require_once('src/View/tvs.php');
    }

    function getAdmin() {
        require_once('src/View/admin.php');
    }
}
