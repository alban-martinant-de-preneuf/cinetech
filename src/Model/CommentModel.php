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

}