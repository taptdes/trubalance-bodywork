import { Award, Heart, Sparkles, Activity, UserStar, HandHeart, HeartPlus, HeartHandshake } from 'lucide-react'
const backendUrl = import.meta.env.VITE_BACKEND_URL
const brendenHeadshot = `${backendUrl}/static-images/imgAboutHeadshot.webp`
const brendenRunning = `${backendUrl}/static-images/imgAboutRunning.webp`

export function About() {
  return (
    <div className="min-h-screen pt-30 bg-linear-to-br from-gray-50 via-emerald-50/30 to-teal-50/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-linear-to-br from-emerald-200/20 to-teal-300/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-linear-to-br from-blue-200/15 to-emerald-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-gray-900 mb-6">
            Meet <span className="bg-linear-to-r from-sage-500 to-mint-800 bg-clip-text text-transparent font-medium">Brenden Heywood</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Helping one heart, soul, body, and mind a single session at a time.
          </p>
        </div>

        {/* Main Content with Image and Journey/Living Wellness */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          
          {/* Professional Photo - Left side, spans both sections */}
          <div className="relative group h-full">
            <img
              src={brendenHeadshot}
              alt="Brenden Heywood - Licensed Massage Therapist and Reiki Master"
              className="w-full h-full object-cover rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 to-teal-600/10 rounded-3xl group-hover:from-emerald-500/5 group-hover:to-teal-600/5 transition-all duration-500"></div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl flex items-center justify-center">
              <Heart className="w-12 h-12 text-white" />
            </div>
          </div>
          
          {/* Right side content - Journey and Living Wellness stacked */}
          <div className="space-y-8 h-full">
            
            {/* My Journey to Healing - Smaller width */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
              <h2 className="text-3xl font-light text-gray-900 mb-6">My Wellness Journey</h2>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  With 13 years of experience in the industry I have honed my skills in techniques like myofascial release, cranial work, Reiki, and cupping to provide personalized care that promotes healing and balance.
                </p>
                
                <p>
                  I’m passionate about helping people feel their best, whether that means relieving chronic pain, easing tension, or supporting emotional well-being.
                </p>

                <p>
                  I look forward to working with you and being a part of your welling journey.
                </p>
              </div>
            </div>

            {/* Living Wellness */}
            <div className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">Living Wellness</h3>
                  <p className="text-gray-600">Practicing what I teach</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                I believe in living the wellness principles I share with my clients. Whether it's 
                maintaining an active lifestyle through running, practicing mindfulness, or continuing 
                my own healing work, I'm committed to walking this journey alongside you.
              </p>
            </div>

          </div>
        </div>

        {/* Wellness as a Way of Life - Full width section */}
        <div className="mb-16">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-xl">
            <div className="grid lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-3xl font-light text-gray-900">
                  Wellness as a <span className="text-emerald-600 font-medium">Way of Life</span>
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Beyond my practice, I'm passionate about living an active, balanced life. You might find me training for races, exploring nature trails, or practicing the same mindfulness techniques I share with clients. This personal commitment to wellness informs everything I bring to our sessions together.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  At TruBalance Bodywork, my mission is to promote health and well-being by providing intuitive and compassionate bodywork and energy healing. We aim to help clients experience significant relief and holistic balance, encouraging them to return for continued care.
                </p>
              </div>
              
              <div className="relative">
                <img
                  src={brendenRunning}
                  alt="Brenden participating in a community race, demonstrating his commitment to active wellness"
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 to-teal-600/10 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Qualifications */}
        <div className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-3xl p-12 mb-16 border border-emerald-100">
          <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">Qualifications & Training</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Licensed Massage Therapist</h3>
              <p className="text-gray-600 leading-relaxed">State licensed with over 13 years of dedicated practice in therapeutic bodywork and wellness</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-linear-to-br from-purple-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Reiki Master</h3>
              <p className="text-gray-600 leading-relaxed">Certified in traditional Usui Reiki healing with advanced training in energy alignment</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <HandHeart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Trauma-Informed Practitioner</h3>
              <p className="text-gray-600 leading-relaxed">Specialized training in trauma-sensitive bodywork and creating safe healing spaces</p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-12">Core Values & Approach</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <HeartPlus className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-medium text-gray-900 mb-3">Intuitive Healing</h3>
              <p className="text-gray-600 leading-relaxed">Utilizing an intuitive approach to bodywork, listening to both the body’s and energy’s cues to apply the necessary techniques for relief and balance.</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-medium text-gray-900 mb-3">Compassionate Care</h3>
              <p className="text-gray-600 leading-relaxed">Striving to be compassionate and empathetic, ensuring that every client feels heard, understood, and cared for.</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="w-16 h-16 bg-linear-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <UserStar className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-medium text-gray-900 mb-3">Personalized Attention</h3>
              <p className="text-gray-600 leading-relaxed">Prioritizing personalized care by actively listening, asking clarifying questions, and regularly checking in with clients to tailor each session to their unique needs.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}