const UserCompanyRole = require("../models/userCompanyRole.model");

const getUserRoleContext = async ({ userId, companyId, branchId }) => {
  // 1. Try branch-specific role
  let userRole = await UserCompanyRole.findOne({
    userId,
    companyId,
    branchId
  }).populate("roleId");

  // 2. Fallback to global role
  if (!userRole) {
    userRole = await UserCompanyRole.findOne({
      userId,
      companyId,
      branchId: null
    }).populate("roleId");
  }

  return userRole;
};

module.exports =getUserRoleContext;