const assets = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', quantity: '0.1842 BTC', value: 12360.34, price: 67105.00 },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', quantity: '0.04 ETH', value: 120.21, price: 3005.25 },
];

const transactions = [
  { id: 'tx-demo-1', title: 'Bitcoin received', asset: 'BTC', amount: '+0.1842 BTC', status: 'completed', date: 'Today' },
  { id: 'tx-demo-2', title: 'Ethereum received', asset: 'ETH', amount: '+0.04 ETH', status: 'completed', date: 'Yesterday' },
];

export function getPortfolio(req, res) {
  res.json({ userId: req.user.id, totalBalance: 12480.55, change24h: 2.14, currency: 'USD', assets, transactions, demo: true });
}

export function getAssets(req, res) {
  res.json({ assets, currency: 'USD', demo: true });
}

export function getTransactions(req, res) {
  res.json({ transactions, demo: true });
}

export function getNetworks(req, res) {
  res.json({ networks: [{ id: 'ethereum', name: 'Ethereum', symbol: 'ETH', status: 'available' }, { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', status: 'available' }, { id: 'polygon', name: 'Polygon', symbol: 'MATIC', status: 'available' }], demo: true });
}