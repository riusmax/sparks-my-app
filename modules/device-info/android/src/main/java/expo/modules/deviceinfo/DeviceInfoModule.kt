package expo.modules.deviceinfo

import android.content.Context
import android.os.Build
import android.os.PowerManager
import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class DeviceInfoModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('DeviceInfo')` in JavaScript.
    Name("DeviceInfo")

    AsyncFunction("getBatteryLevelAsync") { promise: Promise ->
      try {
        val context = appContext.reactContext ?: throw Exception("ReactContext not found")
        val batteryManager = context.getSystemService(Context.BATTERY_SERVICE) as android.os.BatteryManager
        val level = batteryManager.getIntProperty(android.os.BatteryManager.BATTERY_PROPERTY_CAPACITY)
        promise.resolve(level)
      } catch (e: Exception) {
        promise.resolve(100)
      }
    }

    Function("getDeviceModel") {
      return@Function Build.MODEL
    }

    AsyncFunction("getThermalStateAsync") { promise: Promise ->
      try {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
          val context = appContext.reactContext ?: throw Exception("ReactContext not found")
          val powerManager = context.getSystemService(Context.POWER_SERVICE) as PowerManager
          val headroom = powerManager.getThermalHeadroom(0)
          val state = when {
            headroom < 0.0f -> "critical"
            headroom < 0.1f -> "serious"
            headroom < 0.5f -> "fair"
            else -> "nominal"
          }
          promise.resolve(state)
        } else {
          promise.resolve("nominal")
        }
      } catch (e: Exception) {
        promise.resolve("nominal")
      }
    }
  }
}
