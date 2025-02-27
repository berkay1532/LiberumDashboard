// const Domain = require("../models/domainModel");

// const searchSocketHandler = (socket) => {
//   socket.on("searchDomains", async (query) => {
//     try {
//       if (!query) {
//         socket.emit("searchResults", []);
//         return;
//       }

//       // MongoDB'de domainleri arama (case insensitive)
//       const domains = await Domain.find({
//         name: { $regex: query, $options: "i" },
//       });

//       socket.emit("searchResults", domains);
//     } catch (error) {
//       console.error("Arama hatası:", error);
//     }
//   });
// };

// module.exports = searchSocketHandler;

const Domain = require("../models/domainModel");

const searchSocketHandler = (socket) => {
  socket.on("searchDomains", async (query) => {
    try {
      if (!query) {
        socket.emit("searchResults", []);
        return;
      }

      // Case insensitive tam eşleşen domaini bul
      const exactMatch = await Domain.findOne({
        name: { $regex: `^${query}$`, $options: "i" },
      });

      // İçinde geçenleri ara (tam eşleşme dahil)
      const domains = await Domain.find({
        name: { $regex: query, $options: "i" },
      });

      // Eğer tam olarak aynı isimde bir domain yoksa, öneri olarak ".lib" ekle
      if (!exactMatch) {
        domains.push({
          name: `${query}.lib`,
          available: true, // Kullanıcının kaydedebileceğini belirtmek için
        });
      }

      socket.emit("searchResults", domains);
    } catch (error) {
      console.error("Arama hatası:", error);
    }
  });
};

module.exports = searchSocketHandler;
