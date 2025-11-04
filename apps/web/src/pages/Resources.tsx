import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react'
import { Image } from '@/components/ui/image'

const articles = [
  {
    id: 1,
    title: "Understanding Spinal Health: A Comprehensive Guide",
    excerpt: "Learn about the importance of spinal alignment and how regular chiropractic care can improve your overall health and well-being.",
    category: "Spine Health",
    author: "Dr. Sarah Mitchell",
    date: "October 28, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1503429888457-07726f9469ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlyb3ByYWN0aWMlMjBzcGluZSUyMGhlYWx0aHxlbnwxfHx8fDE3NjE5NjAzOTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: true
  },
  {
    id: 2,
    title: "5 Stretches to Improve Your Flexibility",
    excerpt: "Discover simple stretching exercises you can do at home to enhance mobility and reduce tension in your muscles.",
    category: "Wellness",
    author: "Dr. Michael Chen",
    date: "October 25, 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1597079997686-87eeebe516d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzdHJldGNoaW5nJTIwd2VsbG5lc3N8ZW58MXx8fHwxNzYxOTYwMzk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: false
  },
  {
    id: 3,
    title: "Ergonomics: Setting Up Your Workspace",
    excerpt: "Proper desk setup can prevent chronic pain. Here's how to create an ergonomic workspace that supports your spine.",
    category: "Prevention",
    author: "Dr. Sarah Mitchell",
    date: "October 20, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1601284102769-8fed606537af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwcG9zdHVyZSUyMG9mZmljZXxlbnwxfHx8fDE3NjE5NjAzOTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: false
  },
  {
    id: 4,
    title: "Nutrition for Joint Health and Recovery",
    excerpt: "What you eat affects your joints and recovery. Learn which foods support optimal musculoskeletal health.",
    category: "Nutrition",
    author: "Dr. Emily Rodriguez",
    date: "October 15, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1670165088604-5a39f5c1be51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXRyaXRpb24lMjBoZWFsdGh5JTIwZm9vZHxlbnwxfHx8fDE3NjE5NjAzOTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: false
  }
]

const getCategoryColor = (category: string) => {
  const colors = {
    "Spine Health": "bg-blue-100 text-blue-700",
    "Wellness": "bg-green-100 text-green-700",
    "Prevention": "bg-purple-100 text-purple-700",
    "Nutrition": "bg-orange-100 text-orange-700"
  }
  return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700"
}

export default function Resources() {
  const featuredArticle = articles.find(a => a.featured)
  const otherArticles = articles.filter(a => !a.featured)

  return (
    <section id="resources" className="relative pt-50 pb-24 bg-linear-to-b from-white to-gray-50" style={{ zIndex: 10 }}>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <Badge variant="outlined" className="text-sm px-4 py-1">
              Resources & Articles
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6">
            Health & Wellness Resources
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights, tips, and guides to help you achieve optimal health and maintain a pain-free lifestyle.
          </p>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <Card className="mb-12 overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-4 left-4 bg-primary text-white">
                  Featured
                </Badge>
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <Badge className={`w-fit mb-4 ${getCategoryColor(featuredArticle.category)}`}>
                  {featuredArticle.category}
                </Badge>
                <h3 className="text-3xl mb-4">
                  {featuredArticle.title}
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span>{featuredArticle.author}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{featuredArticle.date}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{featuredArticle.readTime}</span>
                  </div>
                </div>
                <Button className="w-fit group">
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Other Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherArticles.map((article) => (
            <Card 
              key={article.id} 
              className="overflow-hidden flex-col border-0 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className={`absolute top-4 left-4 ${getCategoryColor(article.category)}`}>
                  {article.category}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {article.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Calendar className="h-4 w-4" />
                  <span>{article.date}</span>
                  <span>•</span>
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime}</span>
                </div>
                <div className="text-sm text-gray-600">{article.author}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button variant="outlined" size="lg" className="group">
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
