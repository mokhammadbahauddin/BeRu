module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Only include nativewind/babel in non-test environments if it causes issues
      process.env.NODE_ENV !== 'test' ? "nativewind/babel" : null,
      "react-native-reanimated/plugin"
    ].filter(Boolean),
  };
};
