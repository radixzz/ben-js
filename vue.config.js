const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const rucksack = require('rucksack-css');
const rupture = require('rupture');
const nib = require('nib');
const lost = require('lost');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  assetsDir: 'assets',
  outputDir: 'docs',
  pages: {
    index: {
      entry: resolve('src/main.js'),
      template: resolve('src/hbs/index.hbs'),
    },
  },
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['javascript', 'html'],
      }),
      new CopyPlugin([
        { from: 'static', to: './' },
      ]),
      new WebappWebpackPlugin({
        logo: resolve('favicon/favicon_template.png'),
      }),
    ],
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
    },
  },
  css: {
    loaderOptions: {
      stylus: {
        use: [nib(), rupture()],
        import: ['~nib/lib/nib/index.styl', '~rupture/rupture/index.styl'],
      },
      postcss: {
        plugins: [
          rucksack({
            autoprefixer: false,
            fallbacks: false,
          }),
          lost(),
        ],
      },
    },
  },
  chainWebpack: (config) => {
    const { alias } = config.resolve;
    alias.set('@', resolve('src'));
    alias.set('src', resolve('src'));
    alias.set('assets', resolve('src/assets'));
    alias.set('styles', resolve('src/styles'));
  },
};
