import {Svg, Path} from 'react-native-svg';

import {IIcon} from '@components';

export function FriendsIcon({size = 24, color}: IIcon) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <Path
        id="Vector"
        d="M24.3422 22.3879C22.8188 19.6163 20.4399 17.4567 17.5886 16.2568C19.0065 15.1544 20.0539 13.6176 20.5824 11.8639C21.1108 10.1102 21.0936 8.22857 20.5331 6.48559C19.9726 4.74261 18.8973 3.22661 17.4594 2.15234C16.0216 1.07808 14.2941 0.5 12.5217 0.5C10.7492 0.5 9.02174 1.07808 7.58387 2.15234C6.14601 3.22661 5.07067 4.74261 4.51018 6.48559C3.94969 8.22857 3.93247 10.1102 4.46095 11.8639C4.98942 13.6176 6.03682 15.1544 7.45475 16.2568C4.60343 17.4567 2.22456 19.6163 0.701109 22.3879C0.60671 22.5452 0.543794 22.7206 0.5161 22.9037C0.488407 23.0867 0.496501 23.2737 0.539903 23.4534C0.583304 23.6332 0.661126 23.802 0.768743 23.95C0.876359 24.0979 1.01157 24.2219 1.16635 24.3146C1.32112 24.4073 1.49229 24.4668 1.66969 24.4895C1.84708 24.5123 2.02708 24.4978 2.19898 24.447C2.37087 24.3962 2.53116 24.3101 2.67032 24.1938C2.80947 24.0775 2.92464 23.9334 3.00899 23.7701C5.02242 20.1626 8.57814 18.011 12.5217 18.011C16.4652 18.011 20.0209 20.1637 22.0343 23.7701C22.2171 24.0747 22.5071 24.2938 22.8428 24.3809C23.1786 24.4681 23.5339 24.4164 23.8337 24.2369C24.1334 24.0574 24.354 23.7641 24.4489 23.4191C24.5438 23.074 24.5055 22.7042 24.3422 22.3879ZM6.74361 9.25723C6.74361 8.07263 7.08249 6.91464 7.71739 5.92968C8.35229 4.94473 9.25469 4.17705 10.3105 3.72372C11.3663 3.2704 12.5281 3.15179 13.6489 3.38289C14.7697 3.61399 15.7993 4.18443 16.6073 5.02207C17.4154 5.8597 17.9657 6.92691 18.1887 8.08875C18.4116 9.25058 18.2972 10.4549 17.8599 11.5493C17.4225 12.6437 16.682 13.5791 15.7318 14.2373C14.7816 14.8954 13.6644 15.2466 12.5217 15.2466C10.9898 15.2448 9.52112 14.6132 8.43791 13.4904C7.3547 12.3675 6.74537 10.8452 6.74361 9.25723Z"
        fill={color}
      />
    </Svg>
  );
}
