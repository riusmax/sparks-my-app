import ExpoModulesCore

public class DeviceInfoModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('DeviceInfo')` in JavaScript.
    Name("DeviceInfo")

    AsyncFunction("getBatteryLevelAsync") { () -> Int in
      UIDevice.current.isBatteryMonitoringEnabled = true
      let level = UIDevice.current.batteryLevel
      return Int((level >= 0 ? level : 1.0) * 100)
    }

    Function("getDeviceModel") { () -> String in
      return UIDevice.current.model
    }

    AsyncFunction("getThermalStateAsync") { () -> String in
      let state = ProcessInfo.processInfo.thermalState
      switch state {
      case .nominal: return "nominal"
      case .fair: return "fair"
      case .serious: return "serious"
      case .critical: return "critical"
      @unknown default: return "nominal"
      }
    }
    
  }
}
