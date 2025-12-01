import {
  LoadingIcon,
  PhoneIcon,
  PhoneOutlinedIcon,
  MenuIcon,
  CloseIcon,
  LinkedinIcon,
  InstagramIcon,
  FacebookIcon,
  UserIcon,
  EmailIcon,
  HeartFilledIcon,
  HeartOutlinedIcon
} from '../icons'

const IconMapping = {
  loading: <LoadingIcon />,
  phone: <PhoneIcon />,
  phoneOutlined: <PhoneOutlinedIcon />,
  menu: <MenuIcon />,
  close: <CloseIcon />,
  linkedin: <LinkedinIcon />,
  facebook: <FacebookIcon />,
  instagram: <InstagramIcon />,
  user: <UserIcon />,
  email: <EmailIcon />,
  heartFilled: <HeartFilledIcon />,
  heartOutlined: <HeartOutlinedIcon />
}

type AvailableIcons = keyof typeof IconMapping

export { IconMapping }
export type { AvailableIcons }
