import { NativeModule, requireNativeModule } from 'expo'

import { DeviceInfoModuleEvents } from './DeviceInfo.types'

declare class DeviceInfoModule extends NativeModule<DeviceInfoModuleEvents> {
  getBatteryLevelAsync(): Promise<number>
  getDeviceModel(): string
  getThermalStateAsync(): Promise<string>
}

// This call loads the native module object from the JSI.
export default requireNativeModule<DeviceInfoModule>('DeviceInfo')
