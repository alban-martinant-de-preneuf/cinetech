<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/cinetech/public/css/reset.css">
    <link rel="stylesheet" href="/cinetech/public/css/style.css">
    <title>Cinetech</title>
    <script type="module" src="/cinetech/public/js/movie.js"></script>
    <script type="module" src="/cinetech/public/js/header.js"></script>
</head>
<body>
    <?php require_once('includes/header.php'); ?>

    <main>
        <div id="main_container"></div>
        <button id="addToFavorite">Ajouter aux favories</button>
        <button id="addComment">Commenter</button>
    </main>
    
</body>
</html>