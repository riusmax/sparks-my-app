import * as React from 'react';

import { DeviceInfoViewProps } from './DeviceInfo.types';

export default function DeviceInfoView(props: DeviceInfoViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
