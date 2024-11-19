const PATH = '../app/components/';

const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';
const webpackConfig = require(`../internals/webpack/webpack.${env}.babel`);

const buttonPath = button => `${PATH}Controls/Buttons/${button}Button/index.js`;

module.exports = {
  pagePerSection: true,
  title: 'Swiftgrade',
  webpackConfig,
  sections: [
    {
      name: 'Documentation',
    },
    {
      name: 'Components',
      sections: [
        {
          name: 'Buttons',
          components: [buttonPath('Default'), buttonPath('Icon')],
          exampleMode: 'expand',
          usageMode: 'expand',
        },
      ],
      sectionDepth: 0,
    },
  ],
};
