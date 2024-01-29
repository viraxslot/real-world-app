import Cookies from 'js-cookie';
type CookieNames = 'jwt-token';

type CookieHelper = {
  get: (name: CookieNames) => string;
  remove: (name: CookieNames) => void;
  set: (
    name: CookieNames,
    value: string,
    options?: Cookies.CookieAttributes | undefined,
  ) => string | undefined;
};

function init(): CookieHelper {
  function get(name: CookieNames) {
    return Cookies.get(name);
  }

  function set(name: CookieNames, value: string, options?: Cookies.CookieAttributes | undefined) {
    return Cookies.set(name, value, options);
  }

  function remove(name: CookieNames) {
    return Cookies.remove(name);
  }

  return Object.create({
    get,
    set,
    remove,
  });
}

export default init();
