<?php

namespace App\Controller;

use App\Model\CommentModel;

class CommentController {

    function addMovieComment($idMovie, $comment)
    {
        if (isset($_SESSION['user'])) {
            $comment = htmlspecialchars($comment);
            $userModel = new CommentModel();
            $userModel->addMovieComment($idMovie, $comment, $_SESSION['user']['id_user']);

        } else {
            header("HTTP/1.1 400 No user connected");
        }
    }

    function getMovieComments($id)
    {
        $commentModel = new CommentModel();
        $comments = $commentModel->getMovieComments($id);
        echo json_encode($comments);
    }

}