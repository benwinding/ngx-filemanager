import { CoreTypes } from 'ngx-filemanager-core/public_api';

function blankUserClaim(): CoreTypes.UserCustomClaims {
  return {
    groups: []
  };
}

function blankPermissionsObj(): CoreTypes.PermissionsObject {
  return {
    unix: '777',
    groups: [],
    users: []
  };
}

export const permsFactory = {
  blankPermissionsObj,
  blankUserClaim,
};
