<header>
    <div class="top">
        <a href="/cinetech">
            <img src="/cinetech/public/img/cinetech.png" alt="logo" id="img_logo">
        </a>
        <nav>
            <a id="link" href="">
                <div id="burger_div">
                    <span id="burger"></span>
                </div>
            </a>
            <ul class="list-menu">
                <?php if (isset($_SESSION['user'])) : ?>
                    <li><a href="/cinetech/profile" id="profile">Profil</a></li>
                    <li><a href="/cinetech/favorites" id="logout">Mes favories</a></li>
                    <li><a href="/cinetech/logout" id="logout">Se déconnecter</a></li>
                <?php else : ?>
                    <li><a href="" id="auth">Se connecter</a></li>
                <?php endif; ?>
                <li><a href="/cinetech/movies" id="movies">Films</a></li>
                <li><a href="/cinetech/tvs" id="tvs">Series</a></li>
            </ul>
        </nav>
    </div>
    </div>
    <div class="bottom">
        <label for="search">Rechercher : </label>
        <input type="text" name="search" id="search">
        <div id="search_results"></div>
    </div>
</header>