exports.files = {
  javascripts: {
    joinTo: 'app.js'
  },
  stylesheets: { joinTo: 'app.css' },
};

exports.paths = {
  watched: ['static', 'scss', 'css', 'src', 'assets'],
  public: './build',
};

exports.conventions = {
  assets: /assets\/|static\//
};

exports.plugins = {
  babel: { presets: ['env', 'react'] },
  postcss: {
    ignore: /vendor.scss/,
    processors: [
      require('autoprefixer')(),
      require('lost')()
    ]
  },
  sass: {
    allowCache: true,
    options: {
      includePaths: ['node_modules/bootstrap/dist/css/bootstrap.css', 'node_modules/font-awesome/scss'],
      precision: 8
    }
  }
};

exports.modules = {
  autoRequire: {
    /**
     * Automatically load the main file.
     */
    'app.js': [
      'src/vendor',
      'src/app',
    ]
  }
};

exports.npm = {
  globals: { $: 'jquery' },
  static: [
    'node_modules/babel-polyfill/dist/polyfill.min.js'
  ]
};

exports.server = {
  port: 41818
};