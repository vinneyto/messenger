import postcssPresetEnv from 'postcss-preset-env';
import postcssNormalize from 'postcss-normalize';

export default {
  plugins: [postcssNormalize(), postcssPresetEnv()],
};
