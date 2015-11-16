var minimist = require('minimist');
var pather = require('path');

var envOptions = {
    string: 'env',
    default: { env: process.env.NODE_ENV || 'development' } // NODE_ENVに指定がなければ開発モードをデフォルトにする
};
var options = minimist(process.argv.slice(2), envOptions);
var isProduction = (options.env == 'production');

console.log('[build env]', options.env, '[is production]', isProduction);

var path = {
    src: '_src',
    dest: 'public',
    ect: '_src/_ect',
    assets: 'public/assets',
    _assets: '_src/_assets'
};

module.exports = {
    IS_PRODUCTION: isProduction,
    defaultPath: path.dest,
    dest: '%env%',
    rsync: {
        root: path.dest,
        hostname: "133.242.152.69",
        port: 10022,
        destination: "html/works/beeshoney/aidma/project/",
        incremental: true,
        recursive: true,
        clean: true,
        progress: true,
        exclude: ['node_modules/']
    },
    copy: [
        {
            from: pather.join(path._assets, 'fonts', '**'),
            to: pather.join(path.assets, 'fonts')
        }
    ],
    css: {
        src:  pather.join(path._assets, 'css'),
        dest: pather.join(path.assets, 'css')
    },
    sass: {
        src:  pather.join(path._assets, 'sass'),
        dest: pather.join(path.assets, 'css'),
        options: {},
        please: {
            options: {
                minifier: isProduction,
                autoprefixer: { 'browsers': ['last 2 versions', 'ie 8', 'Android 2.3', 'iOS 4'] }
            }
        }
    },
    images: {
        src:  pather.join(path._assets, 'images'),
        dest: pather.join(path.assets, 'images')
    },
    bundle: {
        src: pather.join(path._assets, 'js'),
        dest: pather.join(path.assets, 'js'),
        bundle: 'bundle.es6',
        app: 'app.js',
        browserify: {
            debug: !isProduction,
            extensions: ['jsx', 'js', 'json', 'es6']
        },
        babelify: {
            //sourceMapRelative: '/assets/js'
        }
    },
    ect: {
        base: pather.join(path.ect),
        src: [''],
        dest: path.dest,
        variables: {
            env: options.env,
            url: ''
        }
    },
    browserSync: {
        open: false,
        port: 3040,
        browser: 'google chrome',
        notify: false,
        //proxy: ''
        server: {
            baseDir: path.dest
        }
    },
};