const express = require("express");
const {
  getDomains,
  getDomainById,
  createDomain,
  updateDomain,
  updateImageUrl,
  deleteDomain,
  incrementVisitCount,
  getTrendingDomains,
  getNewestDomains,
} = require("../controllers/domainController");

const router = express.Router();

router.get("/", getDomains); // Tüm domainleri getir
router.get("/trending", getTrendingDomains); // Trending domainleri getir (ziyaret sayısına göre sıralı)
router.get("/newest", getNewestDomains); // En yeni domainleri getir
router.get("/:id", getDomainById); // Tek bir domain getir
router.post("/", createDomain); // Yeni domain oluştur
router.put("/:id", updateDomain); // Domain güncelle

router.put("/:id/update-image-url", updateImageUrl); // Image url güncelle
router.delete("/:id", deleteDomain); // Domain sil
router.patch("/:id/visit", incrementVisitCount); // Ziyaret sayısını artır

module.exports = router;
