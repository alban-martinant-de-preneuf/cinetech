<?php

namespace App\Model;

class UserModel
{
    public function register($firstname, $lastname, $email, $password)
    {
        $db = DbConnection::getDb();
        $sql_request = ("INSERT INTO user (firstname, lastname, email, password)
            VALUES (:firstname, :lastname, :email, :password)"
        );
        $statement = $db->prepare($sql_request);
        $statement->execute([
            ':firstname' => $firstname,
            ':lastname' => $lastname,
            ':email' => $email,
            ':password' => $password
        ]);
        // create favorite list
        $userId = $db->lastInsertId();
        $this->createFavoriteList($userId);
    }

    public function createFavoriteList($userId)
    {
        $db = DbConnection::getDb();
        $sql_request = ("INSERT INTO favorite (id_user)
            VALUES (:id_user)"
        );
        $statement = $db->prepare($sql_request);
        $statement->execute([
            ':id_user' => $userId
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

    public function getUsers()
    {
        $db = DbConnection::getDb();
        $sql_request = ("SELECT * FROM user");
        $statement = $db->prepare($sql_request);
        $statement->execute();
        $users = $statement->fetchAll(\PDO ::FETCH_ASSOC);
        return $users;
    }

    public function modifyUser($id, $user)
    {
        $db = DbConnection::getDb();
        $sql_request = ("UPDATE user
            SET firstname = :firstname, lastname = :lastname, email = :email
            WHERE id_user = :id"
        );
        $statement = $db->prepare($sql_request);
        $statement->execute([
            ':id' => $id,
            ':firstname' => $user['firstname'],
            ':lastname' => $user['lastname'],
            ':email' => $user['email']
        ]);
    }

    public function deleteUser($id)
    {
        $db = DbConnection::getDb();
        $sql_request = ("DELETE FROM user
            WHERE id_user = :id"
        );
        $statement = $db->prepare($sql_request);
        $statement->execute([
            ':id' => $id
        ]);
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

    public function addFavoriteTv($favId, $id)
    {
        $db = DbConnection::getDb();
        $sql_request = ("INSERT INTO favorite_tv (id_fav, id_tv)
            VALUES (:id_fav, :id_tv)"
        );
        $statement = $db->prepare($sql_request);
        $statement->execute([
            ':id_fav' => $favId,
            ':id_tv' => $id
        ]);
    }

    public function removeFavoriteTv($favId, $id)
    {
        $db = DbConnection::getDb();
        $sql_request = ("DELETE FROM favorite_tv
            WHERE id_fav = :id_fav AND id_tv = :id_tv"
        );
        $statement = $db->prepare($sql_request);
        $statement->execute([
            ':id_fav' => $favId,
            ':id_tv' => $id
        ]);
    }

    public function changePwd($userId, $newPwd)
    {
        $db = DbConnection::getDb();
        $sql_request = ("UPDATE user
            SET password = :password
            WHERE id_user = :id"
        );
        $statement = $db->prepare($sql_request);
        $statement->execute([
            ':id' => $userId,
            ':password' => $newPwd
        ]);
    }

}
