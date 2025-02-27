const Domain = require("../models/domainModel");

// 📌 Tüm domainleri getir
const getDomains = async (req, res) => {
  try {
    let limit = parseInt(req.query.limit) || 10; // Query param'dan limit al, yoksa varsayılan 10 kullan
    const totalMinted = await Domain.countDocuments();


    const domains = await Domain.find().limit(limit);
    res.json({totalMinted, domains});
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
    const { name, owner, nft_id, expire_date, linkedContractAddress } =
      req.body;

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
    });
    await domain.save();
    res.status(201).json(domain);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
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
    } = req.body;
    const domain = await Domain.findById(req.params.id);

    if (!domain) {
      return res.status(404).json({ message: "Domain not found" });
    }

    domain.name = name || domain.name;
    domain.owner = owner || domain.owner;
    domain.nft_id = nft_id || domain.nft_id;
    domain.expire_date = expire_date || domain.expire_date;
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
    const domain = await Domain.findById(req.params.id);

    if (!domain) {
      return res.status(404).json({ message: "Domain not found" });
    }

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
    const domains = await Domain.find().sort({createdAt: -1}).limit(10);
    res.json(domains);
  }catch(error){
    res.status(500).json({message: "Server Error", error: error.message});

  }

};



module.exports = {
  getDomains,
  getDomainById,
  createDomain,
  updateDomain,
  deleteDomain,
  incrementVisitCount,
  getTrendingDomains,
  getNewestDomains,
};
