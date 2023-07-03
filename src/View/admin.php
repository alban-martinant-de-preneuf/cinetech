<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <link rel="stylesheet" href="/cinetech/public/css/reset.css">
    <link rel="stylesheet" href="/cinetech/public/css/style.css">
    <title>Cinetech administration</title>
    <script type="module" src="/cinetech/public/js/header.js"></script>
</head>

<body>
    <?php require_once('includes/header.php'); ?>

    <main>
        <div id="main_container">
            <h1>Administration</h1>
            <h2>Utilisateurs</h2>
            <table id="user_table">
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Supprimer</th>
                </tr>
            </table>
        </div>
    </main>

</body>

</html>