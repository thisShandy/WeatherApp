module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "^~(.+)": "./app/\\1",
          },
          extensions: [
            ".ios.js",
            ".android.js",
            ".js",
            ".jsx",
            ".json",
            ".tsx",
            ".ts",
            ".native.js",
          ],
        },
      ],
      [
        "react-native-reanimated/plugin",
        {
          relativeSourceLocation: true,
        },
      ]
    ],
  };
};

