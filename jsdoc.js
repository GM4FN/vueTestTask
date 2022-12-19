module.exports = {
  plugins: ["node_modules/jsdoc-vuejs"],
  recurseDepth: 10,
  source: {
    includePattern: "\\.(vue|js)$",
  },
  sourceType: "module",
  tags: {
    allowUnknownTags: true,
    dictionaries: ["jsdoc", "closure"],
  },
  templates: {
    cleverLinks: false,
    monospaceLinks: false,
  },
};
