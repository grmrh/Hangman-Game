requirejs.config ({
    baseUrl: 'assets/javascript',
    paths: {
        app: "app",
        jquery: 'https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous" '
    }
});

// load the main (game.js) module to start
requirejs(["game"]);