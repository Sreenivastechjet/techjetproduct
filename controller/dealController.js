const Deal = require("../model/dealModel");

const dealController = {
  createdeal: async (req, res) => {
    try {
      const data = req.body;
      const deal = await Deal.create(data);
      deal.stage = "Advance Payment"
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
  getSingelDeal: async (req, res) => {
    try {
      let deal = await Deal.findById({ _id: req.params.id });
      res.status(200).json({ deal });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
  getDealsByDates: async (req, res) => {
    const { period } = req.params;
    let startDate, endDate;
    if (period === "today") {
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0); // Beginning of the day
      endDate = new Date();
    } else if (period === "this-month") {
      const now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } else if (period === "this-year") {
      const now = new Date();
      startDate = new Date(now.getFullYear(), 0, 1);
      endDate = new Date(now.getFullYear(), 11, 31);
    } else {
      return res.status(400).json({ error: "Invalid time period" });
    }

    try {
      const count = await Deal.countDocuments({
        createdAt: { $gte: startDate, $lte: endDate }, // Find leads within the specified time period
      });
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getDealforChart: async (req, res) => {
    try {
      const year = parseInt(req.params.year);
      // Get monthly by date
      const data = await Deal.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(year, 0, 1),
              $lt: new Date(year + 1, 0, 1),
            },
          },
        },
        {
          $group: {
            _id: { $month: "$createdAt" },
            count: { $sum: 1 },
          },
        },
      ]);

      const monthlyData = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        const countData = data.find((item) => item._id === month);
        return { month, monthCount: countData ? countData.count : 0 };
      });

      const totalCount = monthlyData.reduce(
        (total, monthData) => total + monthData.monthCount,
        0
      );
      // Get monthly status for leadstage
      const monthlyStatusData = await Deal.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(year, 0, 1),
              $lt: new Date(year + 1, 0, 1),
            },
            leadstage: { $ne: "Completed" },
          },
        },
        {
          $group: {
            _id: { $month: "$createdAt" },
            count: { $sum: 1 },
          },
        },
      ]);

      const totalMonthlyStatus = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        const statusData = monthlyStatusData.find((item) => item._id === month);
        return { month, statusCount: statusData ? statusData.count : 0 };
      });

      const totalActiveCount = totalMonthlyStatus.reduce(
        (total, monthData) => total + monthData.statusCount,
        0
      );

      res
        .status(200)
        .json({ monthlyData, totalCount, totalMonthlyStatus, totalActiveCount });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
};

module.exports = dealController;
