const Company = require("../modules/company.model");
const Role = require("../modules/role.model");
const UserCompanyRole = require("../modules/userCompanyRole.model");

const createCompany = async (data, userId) => {
  // 1. Create company
  const company = await Company.create({
    ...data,
    owners: [userId]
  });

  // 2. Create OWNER role
  const ownerRole = await Role.create({
    name: "OWNER",
    companyId: company._id,
    permissions: [
      {
        module: "all",
        actions: ["create", "read", "update", "delete", "approve"]
      }
    ]
  });

  // 3. Assign role to user
  await UserCompanyRole.create({
    userId,
    companyId: company._id,
    branchId: null,
    roleId: ownerRole._id,
    limits: {}
  });

  return company;
};

module.exports = { createCompany };