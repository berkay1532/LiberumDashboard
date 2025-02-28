const Domain = require("../models/domainModel");

// 📌 Tüm domainleri getir
const getDomains = async (req, res) => {
  try {
    let limit = parseInt(req.query.limit) || 10; // Query param'dan limit al, yoksa varsayılan 10 kullan
    const totalMinted = await Domain.countDocuments();

    const domains = await Domain.find().limit(limit);
    res.json({ totalMinted, domains });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 📌 Tek bir domain getir
const getDomainById = async (req, res) => {
  try {
    const domain = await Domain.findById(req.params.id);
    if (!domain) {
      return res.status(404).json({ message: "Domain not found" });
    }
    res.json(domain);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 📌 Yeni bir domain oluştur
const createDomain = async (req, res) => {
  try {
    const {
      name,
      owner,
      nft_id,
      expire_date,
      linkedContractAddress,
      image_url,
    } = req.body;

    const domainExists = await Domain.findOne({ name });
    if (domainExists) {
      return res.status(400).json({ message: "Domain already exists" });
    }

    const domain = new Domain({
      name,
      owner,
      nft_id,
      expire_date,
      linkedContractAddress,
      image_url,
    });
    await domain.save();
    res.status(201).json(domain);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getDomainsByNames = async (req, res) => {
  try {
    const { domains } = req.body;

    if (!Array.isArray(domains)) {
      return res.status(400).json({ error: "domains should be an array" });
    }
    const foundDomains = await Domain.find({
      name: { $in: domains },
    });

    if (!foundDomains.length) {
      return res.status(404).json({ message: "No domains found" });
    }

    return res.status(200).json(foundDomains);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// 📌 Domain güncelleme
const updateDomain = async (req, res) => {
  try {
    const {
      name,
      owner,
      nft_id,
      expire_date,
      visit_count,
      linkedContractAddress,
      image_url,
    } = req.body;
    const domain = await Domain.findById(req.params.id);

    if (!domain) {
      return res.status(404).json({ message: "Domain not found" });
    }

    domain.name = name || domain.name;
    domain.owner = owner || domain.owner;
    domain.nft_id = nft_id || domain.nft_id;
    domain.expire_date = expire_date || domain.expire_date;
    domain.image_url = image_url || domain.image_url;
    domain.visit_count =
      visit_count !== undefined ? visit_count : domain.visit_count;
    domain.linkedContractAddress =
      linkedContractAddress || domain.linkedContractAddress;
    const updatedDomain = await domain.save();
    res.json(updatedDomain);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
// 📌 Domain silme

const updateImageUrl = async (req, res) => {
  try {
    const { image_url } = req.body;
    const domain = await Domain.findById(req.params.id);

    if (!domain) {
      return res.status(404).json({ message: "Domain not found" });
    }

    domain.image_url = image_url || domain.image_url;
    const updatedDomain = await domain.save();
    res.json(updatedDomain);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 📌 Domain silme
const deleteDomain = async (req, res) => {
  try {
    const domain = await Domain.findById(req.params.id);

    if (!domain) {
      return res.status(404).json({ message: "Domain not found" });
    }

    await domain.deleteOne();
    res.json({ message: "Domain deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 📌 Domain ziyaret sayısını artırma
const incrementVisitCount = async (req, res) => {
  try {
    const domain = await Domain.findOne({
      name: req.params.domain,
    });

    if (!domain) {
      return res.status(404).json({ message: "Domain not found" });
    }
    console.log(domain);
    domain.visit_count += 1;
    await domain.save();
    res.json({
      message: "Visit count updated",
      visit_count: domain.visit_count,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getTrendingDomains = async (req, res) => {
  try {
    const domains = await Domain.find().sort({ visit_count: -1 }).limit(10);
    res.json(domains);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getNewestDomains = async (req, res) => {
  try {
    const domains = await Domain.find().sort({ createdAt: -1 }).limit(10);
    res.json(domains);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getDomains,
  getDomainById,
  createDomain,
  updateDomain,
  updateImageUrl,
  deleteDomain,
  incrementVisitCount,
  getTrendingDomains,
  getNewestDomains,
  getDomainsByNames,
};
