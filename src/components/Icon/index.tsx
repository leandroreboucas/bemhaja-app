import {Pressable} from 'react-native';

import {AddEventIcon} from '@assets/icons/AddEventIcon';
import {AddUserIcon} from '@assets/icons/AddUserIcon';
import {AppleIcon} from '@assets/icons/AppleIcon';
import {ArrowLeftIcon} from '@assets/icons/ArrowLeftIcon';
import {ArrowRightIcon} from '@assets/icons/ArrowRightIcon';
import {CameraIcon} from '@assets/icons/CameraIcon';
import {CheckedIcon} from '@assets/icons/CheckedIcon';
import {EventsIcon} from '@assets/icons/EventsIcon';
import {EyeOffIcon} from '@assets/icons/EyeOffIcon';
import {EyeOnIcon} from '@assets/icons/EyeOnIcon';
import {FacebookIcon} from '@assets/icons/FacebookIcon';
import {FriendsIcon} from '@assets/icons/FriendsIcon';
import {GoogleIcon} from '@assets/icons/GoogleIcon';
import {GroupsIcon} from '@assets/icons/GroupsIcon';
import {HomeIcon} from '@assets/icons/HomeIcon';
import {NotificationIcon} from '@assets/icons/NotificationIcon';
import {PinIcon} from '@assets/icons/PinIcon';
import {PlayIcon} from '@assets/icons/PlayIcon';
import {PostIcon} from '@assets/icons/PostIcon';
import {SearchIcon} from '@assets/icons/SearchIcon';
import {WorldIcon} from '@assets/icons/WorldIcon';
import {RFValue} from 'react-native-responsive-fontsize';

import {useAppTheme} from '@hooks';
import {ThemeColors} from '@themes';

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
  arrowRight: ArrowRightIcon,
  facebook: FacebookIcon,
  google: GoogleIcon,
  apple: AppleIcon,
  camera: CameraIcon,
  addEvents: AddEventIcon,
  notification: NotificationIcon,
  search: SearchIcon,
  checked: CheckedIcon,
  play: PlayIcon,
  pin: PinIcon,
  post: PostIcon,
  world: WorldIcon,
  addUser: AddUserIcon,
};

type IconType = typeof iconRegistry;

export type IconNames = keyof IconType;
