const { withAndroidManifest, AndroidConfig } = require('expo/config-plugins');

const withDeviceInfo = (config) => {
  return withAndroidManifest(config, (cfg) => {
    AndroidConfig.Permissions.addPermission(
      cfg.modResults,
      'android.permission.BATTERY_STATS'
    );
    return cfg;
  });
};

module.exports = withDeviceInfo;
