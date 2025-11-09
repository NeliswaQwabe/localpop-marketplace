import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function SellerAnalytics() {
  const { token } = useContext(AuthContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/seller/analytics', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Analytics fetch error:', err);
      }
    };
    fetchStats();
  }, [token]);

  if (!stats) return <p className="px-4 py-8 text-gray-600 dark:text-gray-300">Loading analytics...</p>;

  return (
    <div className="min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Seller Analytics</h1>
      <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
        <li>🛍️ Products Listed: <strong>{stats.productCount}</strong></li>
        <li>📦 Purchases: <strong>{stats.purchaseCount}</strong></li>
        <li>💰 Total Revenue: <strong>R{stats.totalRevenue}</strong></li>
        <li>❤️ Wishlist Saves: <strong>{stats.wishlistCount}</strong></li>
        <li>🚩 Flagged Products: <strong>{stats.flaggedCount}</strong></li>
      </ul>
    </div>
  );
}

export default SellerAnalytics;