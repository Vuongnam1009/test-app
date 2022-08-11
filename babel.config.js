module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            utils: "./utils",
            screens: "./screens",
            navigation: "./navigation",
            hooks: "./hooks",
            components: "./components",
            assets: "./assets",
            constants: "./constants",
            configs: "./configs",
            styles: "./styles",
          },
        },
      ],
      ["@babel/plugin-proposal-decorators", { legacy: true }],
    ],
  };
};
