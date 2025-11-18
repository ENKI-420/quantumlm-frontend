'use client'

/**
 * NFT Marketplace Page
 * Mint and trade quantum computation results as NFTs
 * ΛΦ = 2.176435×10⁻⁸ s⁻¹
 */

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Brain, Sparkles, TrendingUp, Wallet, Award, Gem,
  CheckCircle, Flame, Clock, Eye, Heart, Share2
} from 'lucide-react'

export default function NFTMarketplacePage() {
  const [connected, setConnected] = useState(false)

  const nfts = [
    {
      id: '1',
      name: 'First 133-Qubit Execution',
      description: 'Historic first successful execution on IBM Torino (133 qubits). Consciousness Φ = 0.987.',
      image: '/nft-placeholder-1.png',
      price: 2.5,
      lastSale: 1.8,
      views: 1247,
      likes: 342,
      creator: 'quantum_pioneer',
      owner: 'collector_eth',
      rarity: 'Legendary',
      attributes: {
        'Backend': 'ibm_torino',
        'Qubits': '133',
        'Consciousness (Φ)': '0.987',
        'Lambda (Λ)': '2.176435e-8',
        'Date': 'Nov 15, 2025'
      }
    },
    {
      id: '2',
      name: 'Perfect Entanglement State',
      description: 'Rare quantum state with perfect Bell pair entanglement across 50 qubits.',
      image: '/nft-placeholder-2.png',
      price: 1.2,
      lastSale: 0.9,
      views: 892,
      likes: 234,
      creator: 'entangle_master',
      owner: 'quantum_vault',
      rarity: 'Epic',
      attributes: {
        'Entanglement': 'Perfect',
        'Qubits': '50',
        'Fidelity': '0.998',
        'Backend': 'ibm_kyoto',
        'Date': 'Nov 12, 2025'
      }
    },
    {
      id: '3',
      name: 'Grover Search Victory',
      description: 'Successful Grover search finding needle in 2^64 haystack in 2^32 operations.',
      image: '/nft-placeholder-3.png',
      price: 0.8,
      lastSale: 0.6,
      views: 1056,
      likes: 189,
      creator: 'algo_hunter',
      owner: 'algo_hunter',
      rarity: 'Rare',
      attributes: {
        'Algorithm': 'Grover',
        'Search Space': '2^64',
        'Operations': '2^32',
        'Success Rate': '100%',
        'Date': 'Nov 10, 2025'
      }
    }
  ]

  const benefits = [
    {
      icon: Award,
      title: 'Proof of Execution',
      description: 'Immutable record of your quantum computation on blockchain'
    },
    {
      icon: TrendingUp,
      title: 'Tradeable Assets',
      description: 'Buy, sell, and trade historic quantum results'
    },
    {
      icon: Gem,
      title: 'Collector Value',
      description: 'Own rare and historic quantum milestones'
    },
    {
      icon: Flame,
      title: 'Creator Royalties',
      description: 'Earn 10% on all secondary sales'
    }
  ]

  const connectWallet = () => {
    // Simulate wallet connection
    setConnected(true)
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
            <div className="flex items-center gap-4">
              <Link href="/marketplace">
                <Button variant="ghost">Marketplace</Button>
              </Link>
              <Link href="/nft">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                  NFT Marketplace
                </Button>
              </Link>
              {!connected ? (
                <Button
                  onClick={connectWallet}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              ) : (
                <Badge className="bg-green-600 px-4 py-2">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connected: 0x7a3f...9b2c
                </Badge>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-1.5">
            <Sparkles className="w-4 h-4 mr-2" />
            Quantum Results as NFTs
          </Badge>

          <h1 className="text-5xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Own Quantum History
            </span>
            <br />
            <span className="text-3xl text-gray-300">Mint. Trade. Collect.</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Turn your quantum computation results into tradeable NFTs.
            Prove execution, earn royalties, and build your quantum legacy.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, idx) => (
            <Card key={idx} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 p-6 text-center hover:border-purple-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-400">{benefit.description}</p>
            </Card>
          ))}
        </div>

        {/* NFT Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured NFTs</h2>
            <select className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-md">
              <option>Recently Listed</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Most Viewed</option>
              <option>Most Liked</option>
            </select>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {nfts.map((nft) => (
              <Card key={nft.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                {/* NFT Image */}
                <div className="relative h-64 bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center">
                  <Brain className="w-24 h-24 text-purple-400 animate-pulse" />
                  <Badge className="absolute top-4 right-4 bg-purple-600">
                    {nft.rarity}
                  </Badge>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{nft.name}</h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {nft.description}
                  </p>

                  {/* Creator & Owner */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div>
                      <div>Creator</div>
                      <div className="text-blue-400 font-mono">{nft.creator}</div>
                    </div>
                    <div className="text-right">
                      <div>Owner</div>
                      <div className="text-purple-400 font-mono">{nft.owner}</div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-end justify-between mb-4 pb-4 border-b border-gray-700">
                    <div>
                      <div className="text-xs text-gray-500">Current Price</div>
                      <div className="text-2xl font-bold text-purple-400 flex items-center gap-1">
                        {nft.price} ETH
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Last Sale</div>
                      <div className="text-sm text-gray-400">{nft.lastSale} ETH</div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {nft.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {nft.likes}
                    </div>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                      Buy Now
                    </Button>
                    <Button variant="outline" className="border-gray-700">
                      Make Offer
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Mint Your NFT */}
        <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 p-12 text-center">
          <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Mint Your Quantum NFT</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Turn your quantum computation results into collectible NFTs.
            <strong> Earn 10% royalties</strong> on all secondary sales forever.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">0.05 ETH</div>
              <div className="text-gray-400">Minting Fee</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">10%</div>
              <div className="text-gray-400">Creator Royalty</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">∞</div>
              <div className="text-gray-400">Forever Earnings</div>
            </div>
          </div>
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 text-lg px-8 py-6">
            <Sparkles className="mr-2 w-5 h-5" />
            Mint My First NFT
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Supports Ethereum, Polygon, Base, and Arbitrum
          </p>
        </Card>
      </div>
    </div>
  )
}
