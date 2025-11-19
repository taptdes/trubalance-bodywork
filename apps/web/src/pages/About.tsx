import { Award, Heart, Sparkles, Activity } from 'lucide-react'
import brendenHeadshot from '@/assets/images/hero-runner.webp'
import brendenRunning from '@/assets/images/hero-lilypad.webp'

export function About() {
  return (
    <div className="min-h-screen pt-30 bg-linear-to-br from-gray-50 via-emerald-50/30 to-teal-50/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-linear-to-br from-emerald-200/20 to-teal-300/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-linear-to-br from-blue-200/15 to-emerald-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-gray-900 mb-6">
            Meet <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-medium">Brenden Heywood</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Dedicated to creating healing spaces where transformation and wellness flourish naturally
          </p>
        </div>

        {/* Main Content with Image and Journey/Living Wellness */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-8">
          
          {/* Professional Photo - Left side, spans both sections */}
          <div className="relative group">
            <img
              src={brendenHeadshot}
              alt="Brenden Heywood - Licensed Massage Therapist and Reiki Master"
              className="w-full h-[600px] object-cover rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 to-teal-600/10 rounded-3xl group-hover:from-emerald-500/5 group-hover:to-teal-600/5 transition-all duration-500"></div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl flex items-center justify-center">
              <Heart className="w-12 h-12 text-white" />
            </div>
          </div>
          
          {/* Right side content - Journey and Living Wellness stacked */}
          <div className="space-y-8">
            
            {/* My Journey to Healing - Smaller width */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
              <h2 className="text-3xl font-light text-gray-900 mb-6">My Journey to Healing</h2>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  My path to bodywork began with my own healing journey. After experiencing the profound 
                  impact of therapeutic touch and energy work in my life, I felt called to share these 
                  gifts with others.
                </p>
                
                <p>
                  What drives me is the belief that every person deserves to feel safe, seen, and supported 
                  in their healing journey. Whether you're seeking relief from physical tension, emotional 
                  release, or spiritual alignment, I'm here to hold space for whatever emerges.
                </p>

                <p>
                  My approach is trauma-informed and client-centered, meaning you are always in control 
                  of your experience. We'll work together to create sessions that honor your boundaries, 
                  needs, and healing goals.
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
                  Beyond my practice, I'm passionate about living an active, balanced life. You might find me 
                  training for races, exploring nature trails, or practicing the same mindfulness techniques 
                  I share with clients. This personal commitment to wellness informs everything I bring to our sessions together.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  I understand firsthand the challenges of maintaining balance in our busy world, and I bring 
                  that real-world experience to help you find sustainable paths to wellness that fit your unique lifestyle.
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
              <p className="text-gray-600 leading-relaxed">State licensed with over 10 years of dedicated practice in therapeutic bodywork and wellness</p>
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
                <Heart className="w-10 h-10 text-white" />
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
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-medium text-gray-900 mb-3">Safety First</h3>
              <p className="text-gray-600 leading-relaxed">Creating secure, non-judgmental spaces where healing can naturally unfold</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-medium text-gray-900 mb-3">Client-Centered</h3>
              <p className="text-gray-600 leading-relaxed">Your needs, boundaries, and goals guide every aspect of our work together</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="w-16 h-16 bg-linear-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-medium text-gray-900 mb-3">Holistic Approach</h3>
              <p className="text-gray-600 leading-relaxed">Addressing body, mind, and spirit as interconnected aspects of your wellness</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-medium text-gray-900 mb-3">Continuous Growth</h3>
              <p className="text-gray-600 leading-relaxed">Ongoing education and personal practice to serve you with excellence</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}