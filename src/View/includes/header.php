<header>
    <div class="top">
        <a href="/cinetech">
            <img src="/cinetech/public/img/cinetech.png" alt="logo" id="img_logo">
        </a>
        <div id="menu">
            <nav>
                <a id="link" href="">
                    <div id="burger_div">
                        <span id="burger"></span>
                    </div>
                </a>
                <ul id="list-menu">
                    <?php if (isset($_SESSION['user'])) : ?>
                        <?php if ($_SESSION['user']['id_user'] == 1) : ?>
                            <li><a href="/cinetech/admin" id="admin">Admin</a></li>
                        <?php else : ?>
                            <li><a href="/cinetech/profile" id="profile">Mon profil</a></li>
                        <?php endif; ?>
                        <li><a href="/cinetech/favorites" id="logout">Mes favoris</a></li>
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
    </div>
    <div class="bottom">
        <div id="search_div">
            <div id="magnifying"><i class="fa-solid fa-magnifying-glass"></i></div>
            <input type="search" name="search" id="search">
        </div>
        <div>
            <div id="search_results"></div>
        </div>
    </div>
</header>