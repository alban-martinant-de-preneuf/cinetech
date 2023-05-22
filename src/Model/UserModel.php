<?php

namespace App\Model;

class UserModel
{
    public function register($firstname, $lastname, $email, $password)
    {
        $db = DbConnection::getDb();
        var_dump($db);
        $sql_request = ("INSERT INTO user (firstname, lastname, email, password)
            VALUES (:firstname, :lastname, :email, :password)"
        );
        var_dump($sql_request);
        $statement = $db->prepare($sql_request);
        $statement->execute([
            ':firstname' => $firstname,
            ':lastname' => $lastname,
            ':email' => $email,
            ':password' => $password
        ]);
    }

    public function getUser($email)
    {
        $db = DbConnection::getDb();
        $sql_request = ("SELECT * FROM user
            WHERE email = :email"
        );
        $statement = $db->prepare($sql_request);
        $statement->execute([
            ':email' => $email
        ]);
        $user = $statement->fetch(\PDO ::FETCH_ASSOC);
        return $user;
    }

    public function getFavoritesMovies($id)
    {
        $db = DbConnection::getDb();
        $sql_request = ("SELECT id_mov FROM favorite_movie
            INNER JOIN favorite ON favorite_movie.id_fav = favorite.id_fav
            WHERE favorite.id_user = :id"
        );
        $statement = $db->prepare($sql_request);
        $statement->execute([
            ':id' => $id
        ]);
        $favorites = $statement->fetchAll(\PDO ::FETCH_COLUMN);
        return $favorites;
    }

    public function getFavoritesTvs($id)
    {
        $db = DbConnection::getDb();
        $sql_request = ("SELECT id_tv FROM favorite_tv
            INNER JOIN favorite ON favorite_tv.id_fav = favorite.id_fav
            WHERE favorite.id_user = :id"
        );
        $statement = $db->prepare($sql_request);
        $statement->execute([
            ':id' => $id
        ]);
        $favorites = $statement->fetchAll(\PDO ::FETCH_COLUMN);
        return $favorites;
    }

    public function getFavoriteId($userId) {
        $db = DbConnection::getDb();
        $sql_request = ("SELECT id_fav FROM favorite
            WHERE id_user = :id"
        );
        $statement = $db->prepare($sql_request);
        $statement->execute([
            ':id' => $userId
        ]);
        $favId = $statement->fetch(\PDO ::FETCH_COLUMN);
        return $favId;
    }

    public function addFavoriteMovie($favId, $movieId) {
        $db = DbConnection::getDb();
        $sql_request = ("INSERT INTO favorite_movie (id_fav, id_mov)
            VALUES (:id_fav, :id_mov)"
        );
        $statement = $db->prepare($sql_request);
        $statement->execute([
            ':id_fav' => $favId,
            ':id_mov' => $movieId
        ]);
    }

    public function removeFavoriteMovie($favId, $movieId) {
        $db = DbConnection::getDb();
        $sql_request = ("DELETE FROM favorite_movie
            WHERE id_fav = :id_fav AND id_mov = :id_mov"
        );
        $statement = $db->prepare($sql_request);
        $statement->execute([
            ':id_fav' => $favId,
            ':id_mov' => $movieId
        ]);
    }

}
