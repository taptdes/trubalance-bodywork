import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card/card'
import { Clock, Star, X, Sparkles, Heart, ChevronDown } from 'lucide-react'
import { Image } from '@/components/ui/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { services, packages } from '@/lib/data/index'

type DurationFilter = 'all' | '30' | '45' | '60' | '75' | '90';
type ModalityFilter = 'all' | 'massage' | 'energy' | 'trauma';
type SortOption = 'popular' | 'price-low' | 'price-high' | 'duration-short' | 'duration-long';

interface ServicesProps {
  onBookNow: () => void;
}

export function Services({ onBookNow }: ServicesProps) {
 const [durationFilter, setDurationFilter] = useState<DurationFilter>('all')
  const [modalityFilter, setModalityFilter] = useState<ModalityFilter>('all')
  const [sortBy, setSortBy] = useState<SortOption>('popular')

  const filteredAndSortedServices = useMemo(() => {
    // First filter
    let filtered = services.filter(service => {
      const matchesDuration = durationFilter === 'all' || service.durations.includes(Number(durationFilter))
      const matchesModality = modalityFilter === 'all' || service.modality === modalityFilter
      return matchesDuration && matchesModality
    })

    // Then sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.popularity - a.popularity
        case 'price-low':
          const minPriceA = Math.min(...Object.values(a.prices))
          const minPriceB = Math.min(...Object.values(b.prices))
          return minPriceA - minPriceB
        case 'price-high':
          const maxPriceA = Math.max(...Object.values(a.prices))
          const maxPriceB = Math.max(...Object.values(b.prices))
          return maxPriceB - maxPriceA
        case 'duration-short':
          return Math.min(...a.durations) - Math.min(...b.durations)
        case 'duration-long':
          return Math.max(...b.durations) - Math.max(...a.durations)
        default:
          return 0
      }
    })

    return sorted
  }, [services, durationFilter, modalityFilter, sortBy])

  return (
    <div className="min-h-screen pt-20 bg-linear-to-br from-stone-50 via-sage-100/30 to-teal-100/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-linear-to-br from-sage-200/20 to-teal-300/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-linear-to-br from-sky-200/15 to-sage-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-light text-stone-900 mb-6">
            Healing <span className="bg-linear-to-r from-sage-400 to-sage-700 bg-clip-text text-transparent font-medium">Services</span> & Pricing
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Personalized healing sessions designed to support your unique wellness journey. 
            Each service is crafted with intention, compassion, and deep respect for your healing process.
          </p>
        </div>

        {/* Individual Services */}
        <div className="mb-20">
           <div className="mb-10 sticky top-0 bg-linear-to-br from-gray-50 via-emerald-50/30 to-teal-50/50 z-10 py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
            
            {/* Duration Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-gray-300 transition-colors whitespace-nowrap text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Duration</span>
                  {durationFilter !== 'all' && (
                    <span className="ml-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                      {durationFilter} min
                    </span>
                  )}
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuRadioGroup value={durationFilter} onValueChange={(value) => setDurationFilter(value as DurationFilter)}>
                  <DropdownMenuRadioItem value="all">All Durations</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="30">30 minutes</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="45">45 minutes</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="60">60 minutes</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="75">75 minutes</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="90">90 minutes</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Service Type Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-gray-300 transition-colors whitespace-nowrap text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Service Type</span>
                  {modalityFilter !== 'all' && (
                    <span className="ml-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs capitalize">
                      {modalityFilter === 'massage' ? 'Massage' : modalityFilter === 'energy' ? 'Energy' : 'Trauma'}
                    </span>
                  )}
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuRadioGroup value={modalityFilter} onValueChange={(value) => setModalityFilter(value as ModalityFilter)}>
                  <DropdownMenuRadioItem value="all">All Types</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="massage">Massage Therapy</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="energy">Energy Healing</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="trauma">Trauma-Informed</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-gray-300 transition-colors whitespace-nowrap text-sm">
                  <span>Sort</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52">
                <DropdownMenuRadioGroup value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <DropdownMenuRadioItem value="popular">Most Popular</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-low">Price: Low to High</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-high">Price: High to Low</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="duration-short">Duration: Shortest First</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="duration-long">Duration: Longest First</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Clear Filters Button - only show if filters are active */}
            {(durationFilter !== 'all' || modalityFilter !== 'all') && (
              <button
                onClick={() => {
                  setDurationFilter('all')
                  setModalityFilter('all')
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-gray-300 transition-colors whitespace-nowrap text-sm text-gray-600 hover:text-gray-900"
              >
                <X className="w-4 h-4" />
                <span>Clear</span>
              </button>
            )}

            {/* Results count - aligned to right on desktop */}
            <div className="ml-auto text-sm text-gray-600 whitespace-nowrap pl-4">
              {filteredAndSortedServices.length} {filteredAndSortedServices.length === 1 ? 'service' : 'services'}
            </div>
          </div>
        </div>

        <style>{`
          .hide-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <div className="mb-20">
 {filteredAndSortedServices.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-linear-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-3">No services match your filters</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filter selections to see more options</p>
              <Button
                onClick={() => {
                  setDurationFilter('all')
                  setModalityFilter('all')
                }}
                variant="outlined"
                className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-full"
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedServices.map((service, index) => {
                // Get the display text for duration and pricing
                const priceText = service.durations.length === 1
                  ? `$${service.prices[service.durations[0]]}`
                  : service.durations.map(d => `$${service.prices[d]}`).join(' / ')

                return (
                  <Card key={index} className="group overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className={`absolute inset-0 bg-primary opacity-80`}></div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                        <div className="text-emerald-600 font-medium text-sm">{priceText}</div>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className={`w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg`}>
                          <div className="text-white">{service.icon}</div>
                        </div>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                      
                      {/* Duration Options */}
                      {service.durations.length > 1 && (
                        <div className="mb-4">
                          <p className="text-xs text-gray-500 mb-2">Available durations:</p>
                          <div className="flex flex-wrap gap-2">
                            {service.durations.map(duration => (
                              <div key={duration} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                                {duration} min - ${service.prices[duration]}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        onClick={onBookNow}
                        className={`w-full bg-primary hover:shadow-lg text-white transition-all duration-300 rounded-full`}
                      >
                        Book This Service
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>

        {/* Package Deals */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">Wellness Packages</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Commit to your healing journey with our specially designed packages that offer both savings and consistency
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <Card key={index} className="relative overflow-hidden bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group">
                <div className={`absolute top-0 left-0 right-0 h-2 bg-linear-to-r ${pkg.gradient}`}></div>
                
                <CardHeader className="text-center pb-6 pt-8">
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-linear-to-br ${pkg.gradient} text-white rounded-full mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Star className="w-10 h-10" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{pkg.title}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-3xl font-light text-emerald-600">{pkg.price}</div>
                    <div className="text-lg text-gray-400 line-through">{pkg.originalPrice}</div>
                    <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium">
                      {pkg.savings}
                    </div>
                  </div>
                  <div className="text-gray-500 mt-2">{pkg.sessions}</div>
                </CardHeader>
                
                <CardContent className="text-center px-8 pb-8">
                  <p className="text-gray-600 mb-8 leading-relaxed">{pkg.description}</p>
                  <Button 
                    onClick={onBookNow}
                    variant="outlined"
                    className={`w-full border-2 bg-linear-to-r ${pkg.gradient} bg-clip-text text-transparent hover:bg-linear-to-r hover:from-emerald-50 hover:to-teal-50 border-emerald-300 hover:border-emerald-400 transition-all duration-300 rounded-full py-3`}
                  >
                    Choose This Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Special Notes */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-emerald-100 shadow-lg">
          <h2 className="text-2xl font-light text-gray-900 mb-6 text-center">What's Included in Every Session</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                <Heart className="w-5 h-5 text-emerald-600 mr-2" />
                Your Complete Experience
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 shrink-0"></div>
                  Initial consultation and personalized intake assessment
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 shrink-0"></div>
                  Customized session plan based on your needs and goals
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 shrink-0"></div>
                  Post-session integration support and guidance
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 shrink-0"></div>
                  Personalized self-care recommendations for home
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                <Star className="w-5 h-5 text-emerald-600 mr-2" />
                Important Information
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 shrink-0"></div>
                  24-hour cancellation policy for all appointments
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 shrink-0"></div>
                  Deposits required for first-time clients and packages
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 shrink-0"></div>
                  Minors require parent/guardian consent and presence
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 shrink-0"></div>
                  Sliding scale pricing available upon request
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button 
              onClick={onBookNow}
              size="lg"
              className="bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-12 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Begin Your Healing Journey
            </Button>
          </div>
        </div>

      </div>
    </div>
    </div>
  )
}