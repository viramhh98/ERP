const companyService = require("../services/company.service");

const createCompany = async (req, res) => {
  try {
    const userId = req.user.userId;

    const company = await companyService.createCompany(
      req.body,
      userId
    );
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: "Error creating company" });
  }
};




module.exports = createCompany;
