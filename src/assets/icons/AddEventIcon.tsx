import {
  Svg,
  Path,
  G,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

import {IIcon} from '@components';

export function AddEventIcon({size = 24}: IIcon) {
  return (
    <Svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <G filter="url(#filter0_d_674_578)">
        <Circle cx="26" cy="24" r="22.5" fill="white" />
      </G>
      <Path
        d="M33.7885 21.5834V25.2719H18.2115V21.5834H33.7885ZM28.1383 15.7788V31.3558H23.8773V15.7788H28.1383Z"
        fill="url(#paint0_linear_674_578)"
      />
      <Defs>
        <filter
          id="filter0_d_674_578"
          x="0.5"
          y="0.5"
          width="51"
          height="51"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.19 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_674_578"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_674_578"
            result="shape"
          />
        </filter>
        <LinearGradient
          id="paint0_linear_674_578"
          x1="51.0962"
          y1="-1.09616"
          x2="-18.0889"
          y2="39.3163"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#02ECFE" />
          <Stop offset="0.106" stopColor="#04DFFE" />
          <Stop offset="0.3006" stopColor="#09BEFE" />
          <Stop offset="0.5605" stopColor="#1288FD" />
          <Stop offset="0.5845" stopColor="#1383FD" />
          <Stop offset="0.7137" stopColor="#1766D6" />
          <Stop offset="1" stopColor="#201F76" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
