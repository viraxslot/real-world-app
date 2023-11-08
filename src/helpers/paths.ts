export enum PageName {
  Home = 'Home',
  Login = 'Sign in',
  Register = 'Sign up',
  Editor = 'New Article',
  Settings = 'Settings',
  Profile = 'Profile',
}

export const Paths = {
  [PageName.Home]: `/`,
  [PageName.Login]: `/login`,
  [PageName.Register]: `/register`,
  [PageName.Editor]: `/editor`,
  [PageName.Settings]: `/settings`,
  [PageName.Profile]: (username: string) => `/profile/${username}`,
};
