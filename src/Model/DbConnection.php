<?php

namespace App\Model;

class DbConnection
{

    private static ?\PDO $_db = null;

    public static function getDb()
    {
        if (!self::$_db) {
            try {
                // get database infos from ini file in config folder
                $db_config = parse_ini_file('config' . DIRECTORY_SEPARATOR . 'db.ini');
                var_dump($db_config);
                // define PDO dsn with retrieved data
                self::$_db = new \PDO($db_config['type'] . ':dbname=' . $db_config['name']
                    . ';host=' . $db_config['host']
                    . ';charset=' . $db_config['charset'], $db_config['user'], $db_config['password']);
                var_dump(self::$_db);
                // prevent emulation of prepared requests
                self::$_db->setAttribute(\PDO::ATTR_EMULATE_PREPARES, false);
                var_dump(self::$_db);
            } catch (\PDOException $e) {
                header("HTTP/1.1 403 Acces refused to the database");
                die();
            }
        }
        return self::$_db;
    }
}


