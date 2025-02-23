const Domain = require("../models/domainModel");

const visitSocketHandler = (socket) => {
  socket.on("visitDomain", async (domainName) => {
    try {
      const domain = await Domain.findOne({ name: domainName });
      if (!domain) return;

      domain.visit_count += 1;
      await domain.save();

      socket.emit("visitUpdated", {
        name: domainName,
        visit_count: domain.visit_count,
      });
    } catch (error) {
      console.error("Ziyaret sayacı hatası:", error);
    }
  });
};

module.exports = visitSocketHandler;
