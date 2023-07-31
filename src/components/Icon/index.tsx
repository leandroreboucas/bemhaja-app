import { EventsIcon } from "@assets/icons/EventsIcon";
import { FriendsIcon } from "@assets/icons/FriendsIcon";
import { GroupsIcon } from "@assets/icons/GroupsIcon";
import { HomeIcon } from "@assets/icons/HomeIcon";
import { LogoIcon } from "@assets/icons/LogoIcon";
import { useAppTheme } from "@hooks/useAppTheme";
import { ThemeColors } from "@themes/index";

interface IconProps {
  name: IconNames;
  color?: ThemeColors;
  size?: number;
}

export function Icon({ name, color = "backgroundContrast", size }: IconProps) {
  const { colors } = useAppTheme();
  const SVGIcon = iconRegistry[name];
  return <SVGIcon color={colors[color]} size={size} />;
}

const iconRegistry = {
  logo: LogoIcon,
  home: HomeIcon,
  events: EventsIcon,
  friends: FriendsIcon,
  groups: GroupsIcon,
};

type IconType = typeof iconRegistry;

type IconNames = keyof IconType;
