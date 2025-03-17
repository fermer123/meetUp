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
  port,
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
      //Настройка генерации типов
      dts: {
        generateTypes: {
          deleteTypesFolder: true,
          // Удалять ли созданную папку типа
          extractThirdParty: true,
          // Когда содержимое производителя exposes содержит модуль,
          //  содержащий antd, а у потребителя он не antdустановлен,
          //  то extractThirdParty: trueможно гарантировать, что потребитель может нормально получить модуль exposesтипа производителя
          extractRemoteTypes: true,
          // Когда контент производителя exposesимеет собственный remotesмодуль,
          //  который реэкспортирует себя, то extractRemoteTypes: trueможно гарантировать,
          //  что потребитель может нормально получить тип модуля производителя.exposes
          generateAPITypes: true,
          // Генерировать ли loadRemoteтип вFederation Runtime
          compileInChildProcess: true,
          // Выдавать ли ошибку при возникновении проблемы во время генерации типа
        },
        //используется для управления Module Federationповедением типа потребления (загрузки)
        consumeTypes: {
          consumeAPITypes: true,
          // Генерировать ли тип loadRemoteAPI среды выполнения
          deleteTypesFolder: true,
          // Перед загрузкой файлов типа «Удалять ли ранее загруженный typesFolderкаталог»
          maxRetries: 3,
          // Максимальное количество повторных попыток при неудачной загрузке
        },
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
      baseURL: JSON.stringify(port),
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
