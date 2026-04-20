const ALLOWED_MODULES = [
  "sales",
  "purchase",
  "inventory",
  "finance",
  "userManagement"
];

const ALLOWED_ACTIONS = [
  "create",
  "read",
  "update",
  "delete",
  "approve",
  "discount",
  "refund",
  "report"
];

const validateCreateRole = (req, res, next) => {
  const { name, permissions } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Role name is required" });
  }

  if (!permissions || !Array.isArray(permissions)) {
    return res.status(400).json({ message: "Permissions must be an array" });
  }

  for (const perm of permissions) {
    // check module
    if (!ALLOWED_MODULES.includes(perm.module)) {
      return res.status(400).json({
        message: `Invalid module: ${perm.module}`
      });
    }

    // check actions
    for (const action of perm.actions) {
      if (!ALLOWED_ACTIONS.includes(action)) {
        return res.status(400).json({
          message: `Invalid action: ${action}`
        });
      }
    }
  }

  next();
};

module.exports = {
  validateCreateRole
};