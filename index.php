 <?php

  use App\Controller\HomeController;
  use App\Controller\MovieController;
  use App\Controller\AuthController;

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

  $router->map('GET', '/tvs', function () {
    $homeController = new HomeController();
    $homeController->getTvs();
  });

  $router->map('GET', '/movies/[i:id]', function ($id) {
    $movieController = new MovieController();
    $movieController->getMovie();
  });

  $router->map('GET', '/tvs/[i:id]', function ($id) {
    $movieController = new MovieController();
    $movieController->getTv();
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


  // match current request url
  $match = $router->match();
  // call closure or throw 404 status
  if (is_array($match) && is_callable($match['target'])) {
    call_user_func_array($match['target'], $match['params']);
  } else {
    // no route was matched
    header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
  }
