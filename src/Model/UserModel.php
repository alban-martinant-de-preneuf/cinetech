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

}
