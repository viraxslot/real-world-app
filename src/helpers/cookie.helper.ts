import Cookies from 'js-cookie';
type CookieNames = 'jwt-token' | 'selected-tags' | 'active-feed';

function get(name: CookieNames) {
  return Cookies.get(name);
}

function set(name: CookieNames, value: string, options?: Cookies.CookieAttributes | undefined) {
  return Cookies.set(name, value, options);
}

function remove(name: CookieNames) {
  return Cookies.remove(name);
}

export default {
  get,
  set,
  remove,
};
