import {Svg, Path} from 'react-native-svg';

import {IIcon} from '@components';

export function PlayIcon({size = 24, color}: IIcon) {
  return (
    <Svg width={size} height={size} viewBox="0 0 21 26" fill="none">
      <Path
        d="M1.47206 0.640344C0.82212 0.247819 0 0.725235 0 1.49516V24.5048C0 25.2747 0.82212 25.7522 1.47206 25.3597L20.5221 13.8549C21.1593 13.47 21.1593 12.53 20.5221 12.1451L1.47206 0.640344Z"
        fill={color}
      />
    </Svg>
  );
}
