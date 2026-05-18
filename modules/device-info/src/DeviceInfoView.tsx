import { requireNativeView } from 'expo';
import * as React from 'react';

import { DeviceInfoViewProps } from './DeviceInfo.types';

const NativeView: React.ComponentType<DeviceInfoViewProps> =
  requireNativeView('DeviceInfo');

export default function DeviceInfoView(props: DeviceInfoViewProps) {
  return <NativeView {...props} />;
}
