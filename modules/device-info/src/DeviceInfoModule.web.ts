import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './DeviceInfo.types';

type DeviceInfoModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class DeviceInfoModule extends NativeModule<DeviceInfoModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(DeviceInfoModule, 'DeviceInfoModule');
