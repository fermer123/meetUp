import {RuleSetRule} from 'webpack';

function buildLoaders(): RuleSetRule[] {
  const typescriptLoader = {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    options: {
      transpileOnly: true,
    },
    exclude: /node_modules/,
  };

  return [typescriptLoader];
}

export default buildLoaders;
