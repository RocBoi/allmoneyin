const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", require("./routes/user.routes"));
app.use("/api/nft", require("./routes/nft.routes"));
app.use("/api/payment", require("./routes/payment.routes"));
app.use("/api/upload", require("./routes/upload.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/subscriber", require("./routes/subscriber.routes"));

app.listen(PORT, () => {
  console.log(`🚀 GCode NFT Auction Server running at http://localhost:${PORT}`);
});
