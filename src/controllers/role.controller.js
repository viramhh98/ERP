const roleService = require("../services/role.service");

const createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const { companyId } = req.params;

    const role = await roleService.createRole({
      name,
      permissions,
      companyId
    });

    res.status(201).json(role);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Role already exists for this company"
      });
    }

    res.status(500).json({ message: "Error creating role", error: error.message });
  }
};


const Role = require("../models/role.model");

const getRolesByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    const roles = await Role.find({ companyId });

    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching roles" });
  }
};




module.exports = {
  createRole,
  getRolesByCompany
};
