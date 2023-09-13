import {IIcon} from '@components/Icon/IIcon';
import {Svg, Path, Circle, G} from 'react-native-svg';

export function CameraIcon({size = 24, color}: IIcon) {
  return (
    <Svg width={size} height={size} viewBox="0 0 140 140" fill="none">
      <G id="Group 5">
        <Circle id="Ellipse 1" cx="70" cy="70" r="70" fill={color} />
        <Path
          id="Union"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M53.0324 53.7541L59.8079 44.72H79.2749L86.0505 53.7541C87.6739 55.9187 90.2218 57.1926 92.9275 57.1926H94.4866C96.6274 57.1926 98.3628 58.928 98.3628 61.0689V92.2503C98.3628 94.3912 96.6275 96.1266 94.4866 96.1266H44.5963C42.4554 96.1266 40.72 94.3912 40.72 92.2503V61.0689C40.72 58.928 42.4555 57.1926 44.5963 57.1926H46.1554C48.8611 57.1926 51.4089 55.9186 53.0324 53.7541ZM59.5634 40C58.2317 40 56.9777 40.627 56.1787 41.6924L49.2564 50.922L49.2564 50.9221C48.5243 51.8981 47.3754 52.4726 46.1554 52.4726H44.5963C39.8487 52.4726 36 56.3213 36 61.0689V92.2503C36 96.998 39.8487 100.847 44.5963 100.847H94.4866C99.2342 100.847 103.083 96.998 103.083 92.2503V61.0689C103.083 56.3213 99.2343 52.4726 94.4866 52.4726H92.9275C91.7074 52.4726 90.5585 51.8981 89.8265 50.9221L88.0256 52.2727L89.8265 50.9221L82.9042 41.6924C82.1053 40.627 80.8514 40 79.5195 40H59.5634ZM69.5414 58.7089C61.3496 58.7089 54.7089 65.3498 54.7089 73.5414C54.7089 81.7331 61.3496 88.374 69.5414 88.374C77.7331 88.374 84.374 81.7331 84.374 73.5414C84.374 65.3498 77.7331 58.7089 69.5414 58.7089ZM59.4289 73.5414C59.4289 67.9565 63.9564 63.4289 69.5414 63.4289C75.1263 63.4289 79.654 67.9565 79.654 73.5414C79.654 79.1263 75.1263 83.654 69.5414 83.654C63.9564 83.654 59.4289 79.1263 59.4289 73.5414Z"
          fill="white"
        />
      </G>
    </Svg>
  );
}
