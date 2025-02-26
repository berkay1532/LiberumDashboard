const mongoose = require("mongoose");

const domainSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // Domain adı
    owner: { type: String, required: true }, // Sahip (wallet address)
    nft_id: { type: String, required: true, unique: true }, // NFT ID (domain bir NFT'ye bağlı)
    expire_date: { type: Date, required: true }, // Domainin süresinin dolma tarihi
    visit_count: { type: Number, default: 0 }, // Domainin kaç defa ziyaret edildiği
    linkedContractAddress: { type: String, required: true, default: "" },
  },
  { timestamps: true }
);

const Domain = mongoose.model("Domain", domainSchema);
module.exports = Domain;
