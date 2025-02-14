import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack, {WebpackPluginInstance} from 'webpack';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

import {ModuleFederationPlugin} from '@module-federation/enhanced/webpack';

import packageJson from '../package.json';

import {BuildOption} from './types/config';

function buildPlugins({
  paths,
  isDev,
  analyzerPort,
}: BuildOption): WebpackPluginInstance[] {
  const federationConfig = {
    // Это имя приложения
    name: 'mainApp',
    // Это имя файла для использования в качестве файла удаленной записи.
    filename: 'remoteEntry.js',
    // Это удаленные объекты, которые будет использовать это приложение.
    remotes: {
      firstApp: 'firstApp@http://localhost:3002/remoteEntry.js',
    },

    shared: {
      ...packageJson?.dependencies,
      react: {
        singleton: true,
        eager: true,
        requiredVersion: packageJson.dependencies.react,
      },
      'react-dom': {
        // Следует ли немедленно загружать общий модуль
        eager: true,
        // Разрешить ли только одну версию общего модуля в общей области действия (режим одиночного модуля)
        singleton: true,
        // Требуемая версия, которая может быть диапазоном версий. Значение по умолчанию — это версия зависимости текущего приложения
        requiredVersion: packageJson.dependencies['react-dom'],
      },
      '@mui/material': {
        singleton: true,
        eager: true,
        requiredVersion: packageJson.dependencies['@mui/material'],
      },
      '@mui/styled-engine-sc': {
        singleton: true,
        eager: true,
        requiredVersion: packageJson.dependencies['@mui/styled-engine-sc'],
      },
      'styled-components': {
        singleton: true,
        eager: true,
        requiredVersion: packageJson.dependencies['styled-components'],
      },
    },
  };
  return [
    new ModuleFederationPlugin({
      ...federationConfig,
      dts: {
        generateTypes: {
          deleteTypesFolder: true,
          extractThirdParty: true,
          extractRemoteTypes: true,
          generateAPITypes: true,
          compileInChildProcess: true,
        },
        consumeTypes: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: 'mainApp',
      template: paths.template,
      publicPath: '/',
      base: '/',
      chunks: ['main'],
      favicon: paths.favicon,
    }),
    new webpack.DefinePlugin({
      isDev: JSON.stringify(isDev),
      baseURL: JSON.stringify('http://localhost:3000/'),
    }),
    isDev ? new webpack.HotModuleReplacementPlugin() : undefined,
    isDev
      ? new BundleAnalyzerPlugin({
          openAnalyzer: false,
          analyzerMode: 'server',
          reportFilename: paths.analyzer,
          analyzerPort,
        })
      : undefined,
  ];
}

export default buildPlugins;
