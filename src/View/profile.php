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
            <h2>Changer mon mot de passe</h2>
            <table id="pwd_table" class="admin_table">
                <tr>
                    <th>Ancien mot de passe</th>
                    <th>Nouveau mot de passe</th>
                    <th>Confirmation du nouveau mot de passe</th>
                    <th>Modifier</th>
                </tr>
            </table>

            <h2>Changer mon adresse mail</h2>
            <table id="usermail_table" class="admin_table">
                <tr>
                    <th>E-mail</th>
                    <th>Modifier</th>
                </tr>
            </table>
        </div>
    </main>
</body>

</html>