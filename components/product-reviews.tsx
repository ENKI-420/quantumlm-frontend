'use client'

/**
 * Product Reviews Component
 * Star ratings and user feedback system
 * ΛΦ = 2.176435×10⁻⁸ s⁻¹
 */

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Star, ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react'

interface Review {
  id: string
  author: string
  authorTitle: string
  rating: number
  date: string
  comment: string
  helpful: number
  verified: boolean
}

interface ProductReviewsProps {
  productId: string
  averageRating: number
  totalReviews: number
}

export function ProductReviews({ productId, averageRating, totalReviews }: ProductReviewsProps) {
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      author: 'Dr. Sarah Chen',
      authorTitle: 'Quantum Researcher, MIT',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Exceptional quality dataset. Saved our team months of computation time. The VQE results are well-documented and reproducible. Highly recommend for anyone in drug discovery.',
      helpful: 47,
      verified: true
    },
    {
      id: '2',
      author: 'Michael Torres',
      authorTitle: 'CTO, QuantumPharma',
      rating: 5,
      date: '1 month ago',
      comment: 'Worth every penny. The molecular binding energies are accurate and the dataset is comprehensive. Customer support was excellent when we had questions about the methodology.',
      helpful: 32,
      verified: true
    },
    {
      id: '3',
      author: 'Dr. Aisha Patel',
      authorTitle: 'Research Scientist, GSK',
      rating: 4,
      date: '1 month ago',
      comment: 'Very useful dataset. Would have liked more coverage of edge cases, but overall quality is top-notch. Integration with our pipeline was smooth.',
      helpful: 21,
      verified: true
    }
  ])

  const ratingDistribution = [
    { stars: 5, count: 45, percentage: 75 },
    { stars: 4, count: 10, percentage: 17 },
    { stars: 3, count: 3, percentage: 5 },
    { stars: 2, count: 2, percentage: 3 },
    { stars: 1, count: 0, percentage: 0 }
  ]

  return (
    <div className="space-y-6">
      {/* Rating Overview */}
      <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-400 mb-2">{averageRating}</div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-400">{totalReviews} reviews</div>
          </div>

          <div className="space-y-2">
            {ratingDistribution.map((dist) => (
              <div key={dist.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm">{dist.stars}</span>
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                </div>
                <Progress value={dist.percentage} className="flex-1 h-2" />
                <span className="text-sm text-gray-400 w-8">{dist.count}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 p-6 hover:border-blue-500/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold">
                  {review.author[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <div className="font-bold">{review.author}</div>
                    {review.verified && (
                      <Badge className="bg-green-600 text-xs">Verified Purchase</Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-400">{review.authorTitle}</div>
                </div>
              </div>
              <div className="text-sm text-gray-500">{review.date}</div>
            </div>

            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-600'
                  }`}
                />
              ))}
            </div>

            <p className="text-gray-300 mb-4">{review.comment}</p>

            <div className="flex items-center gap-4 text-sm">
              <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors">
                <ThumbsUp className="w-4 h-4" />
                Helpful ({review.helpful})
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                <MessageCircle className="w-4 h-4" />
                Reply
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Write Review CTA */}
      <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30 p-8 text-center">
        <MessageCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-3">Share Your Experience</h3>
        <p className="text-gray-300 mb-6">
          Help others make informed decisions by writing a review
        </p>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          Write a Review
        </Button>
      </Card>
    </div>
  )
}
