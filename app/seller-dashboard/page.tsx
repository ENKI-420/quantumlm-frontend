'use client'

/**
 * Seller Dashboard
 * Analytics and insights for marketplace sellers
 * ΛΦ = 2.176435×10⁻⁸ s⁻¹
 */

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Brain, DollarSign, TrendingUp, Users, Download, Star,
  Package, AlertCircle, ArrowUp, ArrowDown, Calendar,
  BarChart3, Eye, ShoppingCart, RefreshCw, Plus
} from 'lucide-react'

export default function SellerDashboard() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d')

  const stats = {
    totalRevenue: 12847.50,
    revenueChange: 23.5,
    totalSales: 156,
    salesChange: 12.3,
    totalProducts: 8,
    avgRating: 4.8,
    downloads: 1247,
    downloadsChange: 34.2,
    pendingPayouts: 3421.80
  }

  const products = [
    {
      id: '1',
      name: 'Pharma Molecular Binding Dataset',
      price: 499,
      sales: 45,
      revenue: 22455,
      rating: 4.9,
      downloads: 234,
      views: 2341,
      conversionRate: 10.0
    },
    {
      id: '2',
      name: 'Portfolio Optimization Algorithm',
      price: 199,
      sales: 38,
      revenue: 7562,
      rating: 4.7,
      downloads: 156,
      views: 1876,
      conversionRate: 8.3
    },
    {
      id: '3',
      name: 'Battery Material Simulator',
      price: 299,
      sales: 28,
      revenue: 8372,
      rating: 4.8,
      downloads: 89,
      views: 1234,
      conversionRate: 7.2
    }
  ]

  const recentSales = [
    {
      product: 'Pharma Molecular Binding Dataset',
      buyer: 'dr.sarah.chen@mit.edu',
      amount: 499,
      date: '2 hours ago',
      status: 'completed'
    },
    {
      product: 'Portfolio Optimization Algorithm',
      buyer: 'michael.torres@quantumpharma.com',
      amount: 199,
      date: '5 hours ago',
      status: 'completed'
    },
    {
      product: 'Battery Material Simulator',
      buyer: 'aisha.patel@gs.com',
      amount: 299,
      date: '1 day ago',
      status: 'pending'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-gray-900/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-400 animate-pulse" />
              <span className="text-xl font-bold font-mono">DNALang</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/marketplace">
                <Button variant="ghost">Marketplace</Button>
              </Link>
              <Link href="/seller-dashboard">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                  Seller Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Seller Dashboard</h1>
            <p className="text-gray-400">Track your sales, revenue, and product performance</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-md"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="all">All Time</option>
            </select>
            <Button variant="outline" className="border-gray-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Link href="/marketplace/sell/new-product">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Plus className="w-4 h-4 mr-2" />
                New Product
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30 p-6">
            <div className="flex items-start justify-between mb-4">
              <DollarSign className="w-8 h-8 text-green-400" />
              <Badge className={`${stats.revenueChange > 0 ? 'bg-green-600' : 'bg-red-600'}`}>
                {stats.revenueChange > 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                {Math.abs(stats.revenueChange)}%
              </Badge>
            </div>
            <div className="text-3xl font-bold text-green-400 mb-1">
              ${stats.totalRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Total Revenue</div>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30 p-6">
            <div className="flex items-start justify-between mb-4">
              <ShoppingCart className="w-8 h-8 text-blue-400" />
              <Badge className={`${stats.salesChange > 0 ? 'bg-green-600' : 'bg-red-600'}`}>
                {stats.salesChange > 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                {Math.abs(stats.salesChange)}%
              </Badge>
            </div>
            <div className="text-3xl font-bold text-blue-400 mb-1">
              {stats.totalSales}
            </div>
            <div className="text-sm text-gray-400">Total Sales</div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 p-6">
            <div className="flex items-start justify-between mb-4">
              <Download className="w-8 h-8 text-purple-400" />
              <Badge className={`${stats.downloadsChange > 0 ? 'bg-green-600' : 'bg-red-600'}`}>
                {stats.downloadsChange > 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                {Math.abs(stats.downloadsChange)}%
              </Badge>
            </div>
            <div className="text-3xl font-bold text-purple-400 mb-1">
              {stats.downloads.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Total Downloads</div>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/30 p-6">
            <div className="flex items-start justify-between mb-4">
              <Star className="w-8 h-8 text-yellow-400" />
              <Badge className="bg-yellow-600">{stats.totalProducts} products</Badge>
            </div>
            <div className="text-3xl font-bold text-yellow-400 mb-1">
              {stats.avgRating}
            </div>
            <div className="text-sm text-gray-400">Average Rating</div>
          </Card>
        </div>

        {/* Pending Payouts */}
        <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <DollarSign className="w-12 h-12 text-blue-400" />
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  ${stats.pendingPayouts.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">Pending Payouts</div>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-500">
              Request Payout
            </Button>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Performance */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Product Performance</h2>
            {products.map((product) => (
              <Card key={product.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 p-6 hover:border-blue-500/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold mb-2">{product.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        {product.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        {product.downloads}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {product.views}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-400">
                      ${product.revenue.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">{product.sales} sales</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Conversion Rate</span>
                    <span className="font-mono">{product.conversionRate}%</span>
                  </div>
                  <Progress value={product.conversionRate * 10} className="h-2" />
                </div>

                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" className="border-gray-700 flex-1">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-700 flex-1">
                    Edit Product
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Recent Sales */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Recent Sales</h2>
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 p-6">
              <div className="space-y-4">
                {recentSales.map((sale, idx) => (
                  <div key={idx} className="pb-4 border-b border-gray-700 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-semibold mb-1">{sale.product}</div>
                        <div className="text-sm text-gray-400">{sale.buyer}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-400">${sale.amount}</div>
                        <Badge className={`mt-1 ${sale.status === 'completed' ? 'bg-green-600' : 'bg-yellow-600'}`}>
                          {sale.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">{sale.date}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Seller Tips */}
            <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 p-6 mt-6">
              <BarChart3 className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="font-bold mb-3">Tips to Increase Sales</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  Add detailed product descriptions with use cases
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  Respond quickly to customer questions
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  Offer volume discounts for enterprise customers
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  Keep products updated with latest features
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
