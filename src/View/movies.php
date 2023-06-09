<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <link rel="stylesheet" href="/cinetech/public/css/reset.css">
    <link rel="stylesheet" href="/cinetech/public/css/style.css">
    <link rel="icon" type="image/png" href="public/img/favicon.png">
    <title>Les films</title>
    <script type="module" src="/cinetech/public/js/items.js"></script>
    <script type="module" src="/cinetech/public/js/header.js"></script>
</head>

<body>
    <?php require_once('includes/header.php'); ?>

    <main>

        <h1>Les films</h1>
        <div class="pagination">
            <button class="previous red">précédent</button>
            <button class="next red">suivant</button>
        </div>

        <div id="main_container"></div>

        <div class="pagination">
            <button class="previous red">précédent</button>
            <button class="next red">suivant</button>
        </div>

    </main>

</body>

</html>