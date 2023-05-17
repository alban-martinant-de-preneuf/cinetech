<?php

namespace App\Controller;

class MovieController
{
    function getMovie() {
        require_once('src/View/movie.php');
    }

    function getTv() {
        require_once('src/View/tv.php');
    }
}