const Deal = require("../model/dealModel");

const dealController = {
  createdeal: async (req, res) => {
    try {
      const data = req.body;
      const deal = await Deal.create(data);
      await deal.save();
      res.status(200).json({ msg: "Deal created succesfully" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
  getalldeals: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 0;
      const pageSize = parseInt(req.query.pageSize) || 8;
      const searchKey = req.query.search || "";
      const searchRegex = new RegExp(searchKey, "i");

      const totalDeals = await Deal.countDocuments({
        $or: [
          { projectname: { $regex: searchRegex } },
          { email: { $regex: searchRegex } },
        ],
      });
      const skip = (page - 1) * pageSize;
      const limit = pageSize;

      const deals = await Deal.find({
        $or: [
          { projectname: { $regex: searchRegex } },
          { email: { $regex: searchRegex } },
        ],
      })
        .sort({ createdAt: 1 })
        .skip(skip)
        .limit(limit);
      const response = {
        deals: deals,
        page: page,
        pageSize: pageSize,
        totalDeals: totalDeals,
      };

      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
  getSingelDeal: async (req,res) => {
    try {
      let deal = await Deal.findById({ _id: req.params.id });
      res.status(200).json({ deal });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
};

module.exports = dealController;
