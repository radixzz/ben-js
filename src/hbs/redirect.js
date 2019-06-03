/* eslint-disable */

(function RestoreLocationFromRedirect() {
  var redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (redirect !== location.href) {
    history.replaceState(null, null, redirect);
  }
})();