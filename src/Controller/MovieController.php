<?php

namespace App\Controller;

class MovieController
{
    function getMovie($id) {
        require_once('src/View/details.php');
    }
}