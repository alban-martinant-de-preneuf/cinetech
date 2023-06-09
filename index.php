 <?php

  use App\Controller\HomeController;
  use App\Controller\MovieController;
  use App\Controller\AuthController;
  use App\Controller\UserController;
  use App\Controller\CommentController;
  use App\Controller\AdminController;

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

  $router->map('GET', '/admin', function () {
    $homeController = new HomeController();
    $homeController->getAdmin();
  });

  $router->map('GET', '/profile', function () {
    $homeController = new HomeController();
    $homeController->getProfile();
  });

  $router->map('POST', '/profile/changepwd', function () {
    $pwds = json_decode(file_get_contents('php://input'), true);
    $userController = new UserController();
    $userController->changePwd($pwds);
  });

  $router->map('GET', '/admin/users', function () {
    $adminController = new AdminController();
    $adminController->getUsers();
  });

  $router->map('POST', '/admin/users/modify/[i:id]', function ($id) {
    $user = json_decode(file_get_contents('php://input'), true);
    $adminController = new AdminController();
    $adminController->modifyUser($id, $user);
  });

  $router->map('GET', '/admin/users/delete/[i:id]', function ($id) {
    $adminController = new AdminController();
    $adminController->deleteUser($id);
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

  $router->map('GET', '/favorites/addmovie/[i:id]', function ($id) {
    $userController = new UserController();
    $userController->addFavoriteMovie($id);
  });

  $router->map('GET', '/favorites/addtv/[i:id]', function ($id) {
    $userController = new UserController();
    $userController->addFavoriteTv($id);
  });

  $router->map('GET', '/admin/comments', function () {
    $adminController = new AdminController();
    $adminController->getComments();
  });

  $router->map('GET', '/admin/comments/delete/[i:id]', function ($id) {
    $adminController = new AdminController();
    $adminController->deleteComment($id);
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

  $router->map('POST', '/tvs/restocom/[i:id]', function ($id) {
    $commentController = new CommentController();
    $commentController->addResToCom(
      $id,
      $_POST['id_parent'],
      $_POST['content_mes'],
      $_POST['item_type']
    );
  });

  $router->map('GET', '/user/isconnected', function () {
    $userController = new UserController();
    $userController->isConnected();
  });

  $router->map('GET', '/movies/getresponsestocom/[a:id]', function ($id) {
    $commentController = new CommentController();
    $commentController->getResponseToCom($id);
  });

  $router->map('GET', '/tvs/getresponsestocom/[a:id]', function ($id) {
    $commentController = new CommentController();
    $commentController->getResponseToCom($id);
  });

  // match current request url
  $match = $router->match();
  // call closure or throw 404 status
  if (is_array($match) && is_callable($match['target'])) {
    call_user_func_array($match['target'], $match['params']);
  } else {
    // redirect to home page
    header('Location: /cinetech', true, 301);
  }
