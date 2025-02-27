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

      // MongoDB'de domainleri arama (case insensitive)
      const domains = await Domain.find({
        name: { $regex: query, $options: "i" },
      });

      // Eğer sonuç yoksa öneri olarak ".lib" uzantılı domain ekle
      if (domains.length === 0) {
        domains.push({
          name: `${query}.lib`,
        });
      }

      socket.emit("searchResults", domains);
    } catch (error) {
      console.error("Arama hatası:", error);
    }
  });
};

module.exports = searchSocketHandler;
