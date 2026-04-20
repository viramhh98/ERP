const getUserRoleContext = require("../services/userCompanyRole.service");

const getMyRole = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { companyId, branchId } = req.query;
    const roleContext = await getUserRoleContext({
      userId,
      companyId,
      branchId
    });

    
    if (!roleContext) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.json(roleContext);
  } catch (error) {
    res.status(500).json({ message: "Error fetching role" });
  }
};

module.exports =getMyRole;