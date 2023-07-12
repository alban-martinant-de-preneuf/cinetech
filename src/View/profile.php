<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <link rel="stylesheet" href="/cinetech/public/css/reset.css">
    <link rel="stylesheet" href="/cinetech/public/css/style.css">
    <title>User Profil</title>
    <script type="module" src="/cinetech/public/js/header.js"></script>
    <script type="module" src="/cinetech/public/js/profile.js"></script>
</head>

<body>
    <?php require_once('includes/header.php'); ?>

    <main>
        <?php
        if (!isset($_SESSION['user'])) {
            header('Location: /cinetech');
        }
        ?>

        <div id="main_container">
            <h1>Mon Profil</h1>
            <h2>Mes informations</h2>
            <p>
                <ul>
                    <li>Nom : <span id="user_name"><?= $_SESSION['user']['lastname'] ?></span></li>
                    <li>Prénom : <span id="user_firstname"><?= $_SESSION['user']['firstname'] ?></span></li>
                    <li>Email : <span id="user_email"><?= $_SESSION['user']['email'] ?></span></li>
                </ul>
            </p>
            <h2>Changer mon mot de passe</h2>
            <p id="pwd_msg"></p>
            <table id="pwd_table" class="admin_table">
                <tr>
                    <th>Ancien mot de passe</th>
                    <th>Nouveau mot de passe</th>
                    <th>Confirmation du nouveau mot de passe</th>
                    <th>Modifier</th>
                </tr>
                <tr>
                    <td><input type="password" id="old_pwd"></td>
                    <td><input type="password" id="new_pwd"></td>
                    <td><input type="password" id="new_pwd_confirm"></td>
                    <td><input type="submit" value="Modifier" id="edit_pwd_btn"></td>
                </tr>
            </table>
        </div>
    </main>
</body>

</html>