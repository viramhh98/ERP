const activeCompany = (req, res, next) => {
  const companyId = req.headers["activecompanyid"];

  req.user = {
    ...req.user,
    activeCompanyId: companyId || null
  };

  next();
};

module.exports = activeCompany;