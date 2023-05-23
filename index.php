 <?php

  use App\Controller\HomeController;
  use App\Controller\MovieController;
  use App\Controller\AuthController;
  use App\Controller\UserController;
  use App\Controller\CommentController;
use App\Model\CommentModel;

  session_start();

  require_once 'vendor/autoload.php';

  $router = new AltoRouter();

  $router->setBasePath('/cinetech');

  $router->map('GET', '/', function () {
    $homeController = new HomeController();
    $homeController->getHome();
  });

  $router->map('GET', '/movies', function () {
    $homeController = new HomeController();
    $homeController->getMovies();
  });

  $router->map('GET', '/movies/[i:id]', function ($id) {
    $movieController = new MovieController();
    $movieController->pageMovie();
  });

  $router->map('POST', '/movies/addcomment/[i:id]', function ($id) {
    $comment = json_decode(file_get_contents('php://input'), true)['comment'];
    $commentController = new CommentController();
    $commentController->addMovieComment($id, $comment);
  });

  $router->map('POST', '/tvs/addcomment/[i:id]', function ($id) {
    $comment = json_decode(file_get_contents('php://input'), true)['comment'];
    $commentController = new CommentController();
    $commentController->addTvComment($id, $comment);
  });

  $router->map('GET', '/tvs', function () {
    $homeController = new HomeController();
    $homeController->getTvs();
  });

  $router->map('GET', '/tvs/[i:id]', function ($id) {
    $movieController = new MovieController();
    $movieController->pageTv();
  });

  $router->map('POST', '/login', function () {
    $authController = new AuthController();
    $authController->login($_POST['email'], $_POST['password']);
  });

  $router->map('POST', '/register', function () {
    $authController = new AuthController();
    var_dump($_POST);
    $authController->register($_POST['firstname'], $_POST['lastname'], $_POST['email'], $_POST['password'], $_POST['password2']);
  });

  $router->map('GET', '/logout', function () {
    session_destroy();
    header('Location: /cinetech');
  });

  $router->map('GET', '/favorites', function () {
    $movieController = new MovieController();
    $movieController->pageFavorites();
  });

  $router->map('GET', '/favoriteslist', function () {
    $userController = new UserController();
    $userController->getFavorites();
  });

  $router->map('GET', '/favorites/addMovie/[i:id]', function ($id) {
    $userController = new UserController();
    $userController->addFavoriteMovie($id);
  });

  $router->map('GET', '/favorites/addTv/[i:id]', function ($id) {
    $userController = new UserController();
    $userController->addFavoriteTv($id);
  });

  $router->map('GET', '/movies/getcomments/[i:id]', function ($id) {
    $commentController = new CommentController();
    $commentController->getMovieComments($id);
  });

  $router->map('GET', '/tvs/getcomments/[i:id]', function ($id) {
    $commentController = new CommentController();
    $commentController->getTvComments($id);
  });

  $router->map('GET', '/favorites/removemovie/[i:id]', function ($id) {
    $userController = new UserController();
    $userController->removeFavoriteMovie($id);
  });

  $router->map('GET', '/favorites/removetv/[i:id]', function ($id) {
    $userController = new UserController();
    $userController->removeFavoriteTv($id);
  });

  $router->map('POST', '/movies/restocom/[i:id]', function ($id) {
    $commentController = new CommentController();
    $commentController->addResToCom(
      $id,
      $_POST['id_parent'],
      $_POST['content_mes'],
      $_POST['item_type']
    );
  });

  // match current request url
  $match = $router->match();
  // call closure or throw 404 status
  if (is_array($match) && is_callable($match['target'])) {
    call_user_func_array($match['target'], $match['params']);
  } else {
    // no route was matched
    header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
  }
