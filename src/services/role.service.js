const Role = require("../modules/role.model");

const createRole = async ({ name, permissions, companyId }) => {
  const role = await Role.create({
    name,
    permissions,
    companyId
  });

  return role;
};

module.exports = {
  createRole
};