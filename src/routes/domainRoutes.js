const express = require("express");
const {
  getDomains,
  getDomainById,
  createDomain,
  updateDomain,
  deleteDomain,
  incrementVisitCount,
} = require("../controllers/domainController");

const router = express.Router();

router.get("/", getDomains); // Tüm domainleri getir
router.get("/:id", getDomainById); // Tek bir domain getir
router.post("/", createDomain); // Yeni domain oluştur
router.put("/:id", updateDomain); // Domain güncelle
router.delete("/:id", deleteDomain); // Domain sil
router.patch("/:id/visit", incrementVisitCount); // Ziyaret sayısını artır

module.exports = router;
