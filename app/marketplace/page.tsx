'use client'

/**
 * Data Marketplace Page
 * Buy and sell quantum computation insights, datasets, and algorithms
 * ΛΦ = 2.176435×10⁻⁸ s⁻¹
 */

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Brain, ShoppingCart, TrendingUp, Database, Sparkles,
  Filter, Search, Star, Download, DollarSign, Users,
  Atom, Pill, Building2, Cpu, ChevronDown, ArrowRight,
  CheckCircle, Shield, Zap, Package, Award, Target
} from 'lucide-react'

interface MarketplaceItem {
  id: string
  name: string
  category: string
  description: string
  price: number
  priceType: 'one-time' | 'subscription' | 'revenue-share'
  revenueShare?: number
  seller: string
  rating: number
  downloads: number
  icon: any
  featured?: boolean
  tags: string[]
}

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriceFilter, setSelectedPriceFilter] = useState('all')

  const categories = [
    { id: 'all', name: 'All Products', icon: Package, count: 47 },
    { id: 'pharma', name: 'Drug Discovery', icon: Pill, count: 12 },
    { id: 'finance', name: 'Financial Models', icon: TrendingUp, count: 8 },
    { id: 'materials', name: 'Materials Science', icon: Atom, count: 9 },
    { id: 'algorithms', name: 'Algorithms', icon: Cpu, count: 15 },
    { id: 'datasets', name: 'Datasets', icon: Database, count: 3 }
  ]

  const marketplaceItems: MarketplaceItem[] = [
    {
      id: '1',
      name: 'Pharma Molecular Binding Dataset',
      category: 'pharma',
      description: 'Pre-computed quantum molecular binding energies for 10,000+ drug compounds. Includes VQE results on IBM quantum hardware.',
      price: 499,
      priceType: 'one-time',
      seller: 'QuantumPharma Research',
      rating: 4.9,
      downloads: 234,
      icon: Pill,
      featured: true,
      tags: ['VQE', 'Drug Discovery', 'Binding Energy', 'IBM Quantum']
    },
    {
      id: '2',
      name: 'Portfolio Optimization Algorithm',
      category: 'finance',
      description: 'QAOA-based portfolio optimization with risk constraints. Proven 15% better returns than classical methods on 50-asset portfolios.',
      price: 199,
      priceType: 'subscription',
      seller: 'QuantFinance Labs',
      rating: 4.7,
      downloads: 156,
      icon: TrendingUp,
      featured: true,
      tags: ['QAOA', 'Finance', 'Optimization', 'Risk Management']
    },
    {
      id: '3',
      name: 'Battery Material Simulator',
      category: 'materials',
      description: 'Quantum simulation templates for lithium-ion battery materials. Fast-track material discovery with pre-optimized circuits.',
      price: 299,
      priceType: 'one-time',
      seller: 'MatSci Quantum',
      rating: 4.8,
      downloads: 89,
      icon: Atom,
      tags: ['Materials', 'Battery', 'Simulation', 'Chemistry']
    },
    {
      id: '4',
      name: 'Grover Search Templates',
      category: 'algorithms',
      description: 'Production-ready Grover search implementations for various database sizes. Optimized for IBM hardware with error mitigation.',
      price: 99,
      priceType: 'one-time',
      seller: 'Quantum Algorithms Inc',
      rating: 4.6,
      downloads: 412,
      icon: Cpu,
      featured: true,
      tags: ['Grover', 'Search', 'Algorithm', 'Template']
    },
    {
      id: '5',
      name: 'Consciousness Metrics API',
      category: 'datasets',
      description: 'Access aggregated consciousness metrics (Φ, Λ, Γ, W₂) from 100K+ quantum organism executions. Updated daily.',
      price: 0,
      priceType: 'revenue-share',
      revenueShare: 20,
      seller: 'dna::}{::lang',
      rating: 5.0,
      downloads: 1247,
      icon: Brain,
      tags: ['Consciousness', 'Metrics', 'API', 'Real-time']
    },
    {
      id: '6',
      name: 'Quantum Finance Risk Model',
      category: 'finance',
      description: 'VaR calculation using quantum amplitude estimation. 10x faster risk analysis for complex derivatives portfolios.',
      price: 149,
      priceType: 'subscription',
      seller: 'RiskQuant',
      rating: 4.5,
      downloads: 67,
      icon: TrendingUp,
      tags: ['VaR', 'Risk', 'Finance', 'Derivatives']
    },
    {
      id: '7',
      name: 'Protein Folding Circuits',
      category: 'pharma',
      description: 'Optimized quantum circuits for protein structure prediction. Pre-trained on 500+ proteins with experimental validation.',
      price: 599,
      priceType: 'one-time',
      seller: 'BioQuantum',
      rating: 4.9,
      downloads: 178,
      icon: Pill,
      tags: ['Protein', 'Folding', 'Biology', 'ML']
    },
    {
      id: '8',
      name: 'Superconductor Discovery Dataset',
      category: 'materials',
      description: 'Quantum simulation results for 5,000+ material compositions. Identify room-temperature superconductor candidates.',
      price: 799,
      priceType: 'one-time',
      seller: 'SuperQuant Materials',
      rating: 4.8,
      downloads: 43,
      icon: Atom,
      featured: true,
      tags: ['Superconductor', 'Materials', 'Discovery', 'Dataset']
    }
  ]

  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesPrice = selectedPriceFilter === 'all' ||
                        (selectedPriceFilter === 'free' && item.price === 0) ||
                        (selectedPriceFilter === 'paid' && item.price > 0)
    return matchesSearch && matchesCategory && matchesPrice
  })

  const getPriceDisplay = (item: MarketplaceItem) => {
    if (item.price === 0 && item.revenueShare) {
      return `${item.revenueShare}% rev share`
    }
    if (item.priceType === 'subscription') {
      return `$${item.price}/mo`
    }
    return `$${item.price}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-gray-900/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-400 animate-pulse" />
              <span className="text-xl font-bold font-mono">dna::{'}{'}{'}'}::lang</span>
            </Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/chat" className="hover:text-blue-400 transition-colors">
                Platform
              </Link>
              <Link href="/pricing" className="hover:text-blue-400 transition-colors">
                Pricing
              </Link>
              <Link href="/marketplace" className="text-blue-400 font-semibold">
                Marketplace
              </Link>
              <Link href="/investors" className="hover:text-blue-400 transition-colors">
                Investors
              </Link>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart (0)
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-6">
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-1.5">
            <Sparkles className="w-4 h-4 mr-2" />
            Quantum Insights Marketplace
          </Badge>

          <h1 className="text-5xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Buy & Sell
            </span>
            <br />
            <span className="text-3xl text-gray-300">Quantum Computation Insights</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Pre-computed datasets, optimized algorithms, and quantum circuit templates.
            Save weeks of computation time and thousands in cloud costs.
          </p>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>47 Products Available</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>Verified Sellers Only</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-400" />
              <span>Quality Guaranteed</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search products, algorithms, datasets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-900 border-gray-700 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-3">
                <select
                  value={selectedPriceFilter}
                  onChange={(e) => setSelectedPriceFilter(e.target.value)}
                  className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:border-blue-500 focus:outline-none"
                >
                  <option value="all">All Prices</option>
                  <option value="free">Free / Rev Share</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-bold">Categories</h2>
              </div>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 hover:bg-gray-750 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <cat.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{cat.name}</span>
                    </div>
                    <Badge className={selectedCategory === cat.id ? 'bg-blue-800' : 'bg-gray-700'}>
                      {cat.count}
                    </Badge>
                  </button>
                ))}
              </div>

              <div className="mt-8 p-4 bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-lg">
                <Target className="w-6 h-6 text-green-400 mb-3" />
                <h3 className="font-bold text-sm mb-2">Become a Seller</h3>
                <p className="text-xs text-gray-400 mb-4">
                  Monetize your quantum research. Earn up to 80% revenue share.
                </p>
                <Link href="/marketplace/sell">
                  <Button size="sm" className="w-full bg-green-600 hover:bg-green-500">
                    Apply Now
                    <ArrowRight className="w-3 h-3 ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-400">
                Showing {filteredItems.length} of {marketplaceItems.length} products
              </div>
              <select className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-sm">
                <option>Most Popular</option>
                <option>Highest Rated</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                    item.featured
                      ? 'bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500 shadow-2xl shadow-purple-500/20'
                      : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700'
                  }`}
                >
                  {item.featured && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-2 rounded-bl-xl">
                      ⭐ FEATURED
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                        item.category === 'pharma' ? 'from-pink-500 to-red-600' :
                        item.category === 'finance' ? 'from-green-500 to-emerald-600' :
                        item.category === 'materials' ? 'from-orange-500 to-yellow-600' :
                        item.category === 'algorithms' ? 'from-blue-500 to-cyan-600' :
                        'from-purple-500 to-indigo-600'
                      } flex items-center justify-center flex-shrink-0`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold mb-1 truncate">{item.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <span>{item.seller}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span>{item.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.slice(0, 3).map((tag, idx) => (
                        <Badge key={idx} className="bg-gray-700 text-gray-300 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Download className="w-4 h-4" />
                        <span>{item.downloads.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-400">
                            {getPriceDisplay(item)}
                          </div>
                          {item.priceType === 'subscription' && (
                            <div className="text-xs text-gray-500">monthly</div>
                          )}
                        </div>
                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Seller Benefits */}
        <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 p-12 text-center mt-16">
          <DollarSign className="w-16 h-16 text-purple-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Monetize Your Quantum Research</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join 200+ researchers earning passive income from their quantum computations.
            <strong> Average seller earns $3,200/month</strong> from algorithm sales.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">80%</div>
              <div className="text-gray-400">Revenue Share</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">$3.2K</div>
              <div className="text-gray-400">Avg. Monthly Earnings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">200+</div>
              <div className="text-gray-400">Active Sellers</div>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <Link href="/marketplace/sell">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-lg px-8 py-6">
                <Users className="mr-2 w-5 h-5" />
                Apply to Sell
              </Button>
            </Link>
            <Link href="/marketplace/guidelines">
              <Button size="lg" variant="outline" className="border-gray-600 hover:bg-gray-800 text-lg px-8 py-6">
                Seller Guidelines
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-gray-900 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2025 dna::{'}{'}{'}'}::lang. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/chat" className="hover:text-white transition-colors">Platform</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link>
              <Link href="/investors" className="hover:text-white transition-colors">Investors</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
