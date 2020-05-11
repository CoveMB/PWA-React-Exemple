const webpackMerge = require('webpack-merge');
const buildValidations = require('./webpack/build-validations');
const commonConfig = require('./webpack/webpack.common');

const addons = (/* string | string[] */ addonsArg) => {

  const addons = [ ...[ addonsArg ] ] // Normalize array of addons (flatten)
    .filter(Boolean); // If addons is undefined, filter it out

  return addons.map((addonName) => require(`./webpack/addons/webpack.${addonName}.js`));

};

module.exports = (env) => {

  if (!env) {

    throw new Error(buildValidations.ERR_NO_ENV_FLAG);

  }

  const envConfig = require(`./webpack/webpack.${env.env}.js`);
  const mergedConfig = webpackMerge(
    commonConfig,
    envConfig,
    ...addons(env.addons)
  );

  return mergedConfig;

};
