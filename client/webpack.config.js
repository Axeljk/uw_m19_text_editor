const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html",
			title: "J.A.T.E."
		}),
		new InjectManifest({
			swSrc: "./src-sw.js",
			swDest: "service-worker.js"
		}),
		new WebpackPwaManifest({
			name: "JATE",
			short_name: "JATE",
			description: "Just another text editor.",
			background_color: "#008080",
			theme_color: "#008080",
			start_url: "./",
			publicPath: "./",
			icons: [
				{
					src: path.resolve("./src/images/logo.png"),
					sizes: [96, 128, 192, 256, 384, 512],
					destination: path.join('assets', 'icons')
				}
			]
		})
    ],

    module: {
      rules: [
		{
			test: /\.css$/i,
			use: ["style-loader", "css-loader"]
		},
		{
			test: /\.m?js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env"]
				}
			}
		}
      ],
    },
  };
};
