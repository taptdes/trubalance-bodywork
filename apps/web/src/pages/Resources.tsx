import { useState, useEffect } from 'react'
import { getArticles, type Article } from '@/lib/data/articles'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Image } from '@/components/ui/image'
import { ArticleDetail } from './ResourcesDetail'
import { Eye, Heart, MessageSquare, BookOpen, ArrowRight, Clock, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/context/formatDate'
import { LikeButton } from '@/lib/context/likeButton'

export function Resources() {
  const [articles, setArticles] = useState<Article[]>([])
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  useEffect(() => {
    setArticles(getArticles())
  }, [])

  if (selectedArticle) {
    return (
      <ArticleDetail
        article={selectedArticle}
        onBack={() => setSelectedArticle(null)}
      />
    )
  }
  const featuredArticles = articles.filter(a => a.featured).slice(0, 1)
  const regularArticles = articles.filter(a => !a.featured)



  const likedToggle = (current: number) => current + 1

  return (
    <section id="resources" className="relative pt-15 pb-24 bg-linear-to-b from-white to-gray-50" style={{ zIndex: 10 }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full mb-6">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-gray-900">Resources & Articles</span>
          </div>
          <h1 className="text-5xl font-light text-gray-900 mb-6">
            Health & Wellness{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-medium">
              Resources
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Expert insights, tips, and guides to help you achieve optimal health.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Article */}
        {featuredArticles.length > 0 && (
          <div className="mb-16">
            <Card
              className="overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer group"
              onClick={() => setSelectedArticle(featuredArticles[0])}
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-80 md:h-auto">
                  <Image
                    src={featuredArticles[0].imageUrl}
                    alt={featuredArticles[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-white">
                    Featured
                  </Badge>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <Badge className="inline-block w-fit bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium mb-4">
                    {featuredArticles[0].category}
                  </Badge>
                  <h2 className="text-3xl font-light text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                    {featuredArticles[0].title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                    {featuredArticles[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <span>{featuredArticles[0].authorName}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(featuredArticles[0].createdAt)}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredArticles[0].readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" /> {featuredArticles[0].views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" /> {featuredArticles[0].likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" /> {featuredArticles[0].commentCount}
                    </span>
                  </div>
                  <div className='flex justify-between items-end'>
                    <Button
                      onClick={(e) => { e.stopPropagation(); setSelectedArticle(featuredArticles[0]) }}
                      className="mt-4 w-fit group inline-flex"
                    >
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <LikeButton
                      articleId={featuredArticles[0].id}
                      initialLiked={false} // or determine from backend if user liked
                      onToggle={() => {
                        setArticles(prev =>
                          prev.map(a =>
                            a.id === featuredArticles[0].id
                              ? { ...a, likes: likedToggle(a.likes) } // function to increment/decrement
                              : a
                          )
                        )
                      }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Regular Articles Grid */}
        {regularArticles.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article) => (
              <Card
                key={article.id}
                className="group overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
                onClick={() => {
                  setSelectedArticle(article)
                  fetch(`${import.meta.env.VITE_BACKEND_URL}/articles/${article.id}/view`, {
                    method: "POST",
                  })
                }}
              >
                <div className="relative h-48">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute flex items-center justify-center top-4 left-4 bg-blue-100 px-3 py-1 rounded-full">
                    <span className="text-xs font-medium text-blue-600 h-fit">{article.category}</span>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {article.title}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    {formatDate(article.createdAt)}
                  </p>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {article.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" /> {article.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" /> {article.commentCount}
                      </span>
                    </div>
                  </div>
                  <div className='flex justify-between items-end'>
                    <Button
                      onClick={(e) => { e.stopPropagation(); setSelectedArticle(article) }}
                      className="mt-4 w-fit group inline-flex"
                    >
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <LikeButton
                      articleId={article.id}
                      initialLiked={false}
                      onToggle={() => {
                        setArticles(prev =>
                          prev.map(a =>
                            a.id === article.id
                              ? { ...a, likes: likedToggle(a.likes) }
                              : a
                          )
                        )
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}