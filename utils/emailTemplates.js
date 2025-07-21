export const welcomeEmail = (username = '') => `
  <h1>Welcome${username ? `, ${username}` : ''}!</h1>
  <p>Thanks for joining RocBoi Quez and GCode Publishing.</p>
  <p>Expect drops, invites, and unreleased heat!</p>
`;

export const nftSoldTemplate = (nftTitle, price) => `
  <h2>Your NFT "${nftTitle}" just sold!</h2>
  <p>You earned ${price} USD (or BTC equivalent).</p>
`;
