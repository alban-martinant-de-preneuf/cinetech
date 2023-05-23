<?php

namespace App\Controller;

use App\Model\CommentModel;

class CommentController
{

    public function addMovieComment($idMovie, $comment)
    {
        if (isset($_SESSION['user'])) {
            $comment = htmlspecialchars($comment);
            $userModel = new CommentModel();
            $userModel->addMovieComment($idMovie, $comment, $_SESSION['user']['id_user']);
        } else {
            header("HTTP/1.1 400 No user connected");
        }
    }

    public function getMovieComments($id)
    {
        $commentModel = new CommentModel();
        $comments = $commentModel->getMovieComments($id);
        echo json_encode($comments);
    }

    public function addTvComment($id, $comment)
    {
        if (isset($_SESSION['user'])) {
            $comment = htmlspecialchars($comment);
            $userModel = new CommentModel();
            $userModel->addTvComment($id, $comment, $_SESSION['user']['id_user']);
        } else {
            header("HTTP/1.1 400 No user connected");
        }
    }

    public function getTvComments($id)
    {
        $commentModel = new CommentModel();
        $comments = $commentModel->getTvComments($id);
        echo json_encode($comments);
    }

    public function addResToCom($idItem, $idParentCom, $content, $itemType)
    {
        if (isset($_SESSION['user'])) {
            $idItem = htmlspecialchars($idItem);
            $idParentCom = htmlspecialchars($idParentCom);
            $content = htmlspecialchars($content);
            $itemType = htmlspecialchars($itemType);
            $commentModel = new CommentModel();
            $commentModel->addResToCom(
                $_SESSION['user']['id_user'],
                $idItem,
                $idParentCom,
                $content,
                $itemType
            );
        } else {
            header("HTTP/1.1 400 No user connected");
        }
    }
}
