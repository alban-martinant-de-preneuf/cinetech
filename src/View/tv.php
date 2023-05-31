<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <link rel="stylesheet" href="/cinetech/public/css/reset.css">
    <link rel="stylesheet" href="/cinetech/public/css/style.css">
    <title>Cinetech</title>
    <script type="module" src="/cinetech/public/js/item.js"></script>
    <script type="module" src="/cinetech/public/js/header.js"></script>
</head>
<body>
    <?php require_once('includes/header.php'); ?>

    <main>
        <div id="main_container">
            <div id="tv_div">
                <div id="details_div"></div>
                <?php if (isset($_SESSION['user'])) : ?>
                    <div id="tv_btns">
                        <button id="favorite_btn"></button>
                        <button id="comment_btn">Ajouter un commentaire</button>
                    </div>
                    <div id="form_comment_div">
                        <textarea name="comment" id="comment_content"></textarea>
                        <button id="add_comment">Evoyer</button>
                    </div>
                <?php endif; ?>
                <div id="comments_div"></div>
                <div id="reco_div"></div>
            </div>
        </div>
    </main>


</body>
</html>