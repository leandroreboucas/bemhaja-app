import {Pressable} from 'react-native';

import {AppleIcon} from '@assets/icons/AppleIcon';
import {ArrowLeftIcon} from '@assets/icons/ArrowLeftIcon';
import {CameraIcon} from '@assets/icons/CameraIcon';
import {EventsIcon} from '@assets/icons/EventsIcon';
import {EyeOffIcon} from '@assets/icons/EyeOffIcon';
import {EyeOnIcon} from '@assets/icons/EyeOnIcon';
import {FacebookIcon} from '@assets/icons/FacebookIcon';
import {FriendsIcon} from '@assets/icons/FriendsIcon';
import {GoogleIcon} from '@assets/icons/GoogleIcon';
import {GroupsIcon} from '@assets/icons/GroupsIcon';
import {HomeIcon} from '@assets/icons/HomeIcon';
import {useAppTheme} from '@hooks/useAppTheme';
import {ThemeColors} from '@themes/index';
import {RFValue} from 'react-native-responsive-fontsize';

interface IconProps {
  name: IconNames;
  color?: ThemeColors;
  size?: number;
  onPress?: () => void;
}

export function Icon({
  name,
  color = 'backgroundContrast',
  size = 24,
  onPress,
}: IconProps) {
  const {colors} = useAppTheme();
  const SVGIcon = iconRegistry[name];

  if (onPress) {
    return (
      <Pressable onPress={onPress} hitSlop={RFValue(10)}>
        <SVGIcon color={colors[color]} size={RFValue(size)} />
      </Pressable>
    );
  }
  return <SVGIcon color={colors[color]} size={RFValue(size)} />;
}

const iconRegistry = {
  home: HomeIcon,
  events: EventsIcon,
  friends: FriendsIcon,
  groups: GroupsIcon,
  eyeOn: EyeOnIcon,
  eyeOff: EyeOffIcon,
  arrowLeft: ArrowLeftIcon,
  facebook: FacebookIcon,
  google: GoogleIcon,
  apple: AppleIcon,
  camera: CameraIcon,
};

type IconType = typeof iconRegistry;

type IconNames = keyof IconType;
