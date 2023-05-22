<?php

namespace App\Model;

class CommentModel {

    public function addMovieComment($idMovie, $content, $idUser)
    {
        $db = DbConnection::getDb();
        $sql_request = ("INSERT INTO comment (id_mov, id_user, content)
            VALUES (:id_mov, :id_user, :content)"
        );
        $statement = $db->prepare($sql_request);
        $statement->execute([
            ':id_mov' => $idMovie,
            ':id_user' => $idUser,
            ':content' => $content
        ]);
    }

    public function getMovieComments($id)
    {
        $db = DbConnection::getDb();
        $sql_request = ("SELECT * FROM comment
            INNER JOIN user ON comment.id_user = user.id_user
            WHERE id_mov = :id"
        );
        $statement = $db->prepare($sql_request);
        $statement->execute([
            ':id' => $id
        ]);
        $comments = $statement->fetchAll(\PDO ::FETCH_ASSOC);
        return $comments;
    }

    public function addTvComment($id, $content, $idUser)
    {
        $db = DbConnection::getDb();
        $sql_request = ("INSERT INTO comment (id_tv, id_user, content)
            VALUES (:id_tv, :id_user, :content)"
        );
        $statement = $db->prepare($sql_request);
        $statement->execute([
            ':id_tv' => $id,
            ':id_user' => $idUser,
            ':content' => $content
        ]);
    }

    public function getTvComments($id)
    {
        $db = DbConnection::getDb();
        $sql_request = ("SELECT * FROM comment
            INNER JOIN user ON comment.id_user = user.id_user
            WHERE id_tv = :id"
        );
        $statement = $db->prepare($sql_request);
        $statement->execute([
            ':id' => $id
        ]);
        $comments = $statement->fetchAll(\PDO ::FETCH_ASSOC);
        return $comments;
    }

}