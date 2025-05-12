
"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import useUser from "@/hooks/useUser"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  Calendar,
  PlusCircle,
  User,
  Home,
  BookOpen,
  Star,
  Clock,
  MapPin,
  Heart,
  Award,
  Sun,
  Cloud,
  MessageCircle,
  Camera,
  Mic,
  Gift,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MomentsTogether() {
  const [activeTab, setActiveTab] = useState("home")
  const [currentView, setCurrentView] = useState("home")
  const [theme, setTheme] = useState("dark-romantic") // Options: dark-romantic, light-playful, seasonal
  const [coupleLevel, setCoupleLevel] = useState(3)
  const [couplePoints, setCouplePoints] = useState(320)
  const [weather, setWeather] = useState("sunny")

  //const session = useUser()
  const router = useRouter()
  //const [loading, setLoading] = useState(true)

  //const isClient = typeof window !== 'undefined'

  const { session, loading } = useUser()

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login")
    }
  }, [session, loading, router])

  // Simulate weather data fetch
  useEffect(() => {
    const weathers = ["sunny", "cloudy", "rainy"]
    const randomWeather = weathers[Math.floor(Math.random() * weathers.length)]
    setWeather(randomWeather)
  }, [])

  const renderView = () => {
    switch (currentView) {
      case "memory":
        return <MemoryVaultDetail onBack={() => setCurrentView("home")} />
      case "activity":
        return <ActivityDetail onBack={() => setCurrentView("home")} />
      case "add":
        return <AddActivity onBack={() => setCurrentView("home")} />
      case "memories":
        return <MemoriesView onViewMemory={() => setCurrentView("memory")} onBack={() => setCurrentView("home")} />
      default:
        return (
          <HomeScreen
            onViewActivity={() => setCurrentView("activity")}
            onViewMemory={() => setCurrentView("memory")}
            onAddActivity={() => setCurrentView("add")}
            weather={weather}
            coupleLevel={coupleLevel}
            couplePoints={couplePoints}
          />
        )
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col h-screen text-gray-100 transition-colors duration-500",
        theme === "dark-romantic" && "bg-gradient-to-b from-gray-900 to-gray-950",
        theme === "light-playful" && "bg-gradient-to-b from-purple-100 to-pink-100 text-gray-800",
        theme === "seasonal" && "bg-gradient-to-b from-amber-800 to-orange-900",
      )}
    >
      {renderView()}
      <BottomNavigation
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab)
          if (tab === "memories") setCurrentView("memories")
          else if (tab === "add") setCurrentView("add")
          else setCurrentView("home")
        }}
      />
    </div>
  )
}

function HomeScreen({
  onViewActivity,
  onViewMemory,
  onAddActivity,
  weather,
  coupleLevel,
  couplePoints,
}: {
  onViewActivity: () => void
  onViewMemory: () => void
  onAddActivity: () => void
  weather: string
  coupleLevel: number
  couplePoints: number
}) {
  return (
    <main className="flex-1 overflow-auto pb-20">
      {/* Header with Profile Stats */}
      <header className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Things With You
          </h1>
          <div className="flex items-center">
            <div className="mr-3 text-right">
              <div className="text-xs text-gray-400">Level {coupleLevel}</div>
              <div className="text-sm font-medium">{couplePoints} pts</div>
            </div>
            <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
              <User size={20} className="text-gray-300" />
            </button>
          </div>
        </div>

        {/* Couple Progress */}
        <div className="bg-gray-800/40 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center">
              <Award size={16} className="text-purple-400 mr-1" />
              <span className="text-sm font-medium">Adventurous Couple</span>
            </div>
            <span className="text-xs text-gray-400">{couplePoints}/500 to Level 4</span>
          </div>
          <Progress value={couplePoints / 5} className="h-2 bg-gray-700">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
          </Progress>
          <div className="flex mt-2 gap-2">
            <Badge variant="outline" className="bg-gray-800/50 text-xs py-0 border-purple-500/30">
              <Award size={10} className="mr-1 text-purple-400" />
              Foodie Lvl 2
            </Badge>
            <Badge variant="outline" className="bg-gray-800/50 text-xs py-0 border-purple-500/30">
              <Award size={10} className="mr-1 text-purple-400" />
              Explorer Lvl 3
            </Badge>
          </div>
        </div>
      </header>

      {/* Smart Suggestions */}
      <section className="px-4 py-2">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-100">Smart Suggestions</h2>
          <button className="text-sm text-purple-400">Refresh</button>
        </div>

        <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-2xl p-4 shadow-lg mb-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2">
            {weather === "sunny" && <Sun size={20} className="text-yellow-400" />}
            {weather === "cloudy" && <Cloud size={20} className="text-gray-400" />}
            {weather === "rainy" && <Cloud size={20} className="text-blue-400" />}
          </div>

          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">✨</span>
            <h2 className="text-lg font-semibold text-gray-100">Perfect for today's weather!</h2>
          </div>

          <p className="text-gray-300 mb-4">
            {weather === "sunny" && "Have a sunset picnic at your favorite local park"}
            {weather === "cloudy" && "Visit that cozy café you've been wanting to try"}
            {weather === "rainy" && "Indoor movie marathon with homemade popcorn"}
          </p>

          <div className="flex gap-2">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm">
              Add to List
            </Button>
            <Button variant="outline" className="border-purple-500/30 text-purple-400 rounded-full text-sm">
              Do It Today
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-800/40 rounded-xl p-3 relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <Gift size={16} className="text-pink-400" />
            </div>
            <h3 className="text-sm font-medium mb-1">Anniversary Coming</h3>
            <p className="text-xs text-gray-400 mb-2">In 2 weeks</p>
            <Button size="sm" variant="outline" className="w-full text-xs border-purple-500/30 text-purple-400">
              Plan Something
            </Button>
          </div>

          <div className="bg-gray-800/40 rounded-xl p-3 relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <Sparkles size={16} className="text-yellow-400" />
            </div>
            <h3 className="text-sm font-medium mb-1">Based on your interests</h3>
            <p className="text-xs text-gray-400 mb-2">Pottery class for two</p>
            <Button size="sm" variant="outline" className="w-full text-xs border-purple-500/30 text-purple-400">
              View Details
            </Button>
          </div>
        </div>
      </section>

      {/* Bucket List Categories */}
      <section className="px-4 py-2">
        <Tabs defaultValue="all">
          <TabsList className="bg-gray-800/40 p-1 mb-3">
            <TabsTrigger value="all" className="text-xs data-[state=active]:bg-gray-700">
              All
            </TabsTrigger>
            <TabsTrigger value="travel" className="text-xs data-[state=active]:bg-gray-700">
              Travel
            </TabsTrigger>
            <TabsTrigger value="food" className="text-xs data-[state=active]:bg-gray-700">
              Food
            </TabsTrigger>
            <TabsTrigger value="adventure" className="text-xs data-[state=active]:bg-gray-700">
              Adventure
            </TabsTrigger>
            <TabsTrigger value="cozy" className="text-xs data-[state=active]:bg-gray-700">
              Cozy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 gap-4">
              <BucketListCard
                title="Weekend in Paris"
                tag="Travel"
                icon={<MapPin size={16} />}
                progress={0}
                reactions={2}
                onClick={onViewActivity}
              />

              <BucketListCard
                title="Learn to dance together"
                tag="Skill"
                icon={<Star size={16} />}
                progress={30}
                reactions={5}
                onClick={onViewActivity}
              />

              <BucketListCard
                title="Stargazing night"
                tag="Adventure"
                icon={<Star size={16} />}
                progress={70}
                reactions={3}
                onClick={onViewActivity}
              />

              <BucketListCard
                title="Cook a 3-course meal"
                tag="Food"
                icon={<Star size={16} />}
                progress={100}
                completed
                reactions={8}
                onClick={onViewMemory}
              />
            </div>
          </TabsContent>

          <TabsContent value="travel" className="mt-0">
            <div className="grid grid-cols-1 gap-4">
              <BucketListCard
                title="Weekend in Paris"
                tag="Travel"
                icon={<MapPin size={16} />}
                progress={0}
                reactions={2}
                onClick={onViewActivity}
              />

              <BucketListCard
                title="Road trip along the coast"
                tag="Travel"
                icon={<MapPin size={16} />}
                progress={20}
                reactions={4}
                onClick={onViewActivity}
              />
            </div>
          </TabsContent>

          {/* Other tab contents would be similar */}
        </Tabs>
      </section>

      {/* Floating Add Button */}
      <button
        className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg animate-pulse"
        onClick={onAddActivity}
      >
        <PlusCircle size={24} className="text-white" />
      </button>
    </main>
  )
}

function BucketListCard({
  title,
  tag,
  icon,
  progress,
  completed = false,
  reactions = 0,
  onClick,
}: {
  title: string
  tag: string
  icon: React.ReactNode
  progress: number
  completed?: boolean
  reactions?: number
  onClick: () => void
}) {
  return (
    <div
      className="bg-gray-800/50 rounded-xl p-3 shadow-md border border-gray-800 active:scale-[0.98] transition-transform"
      onClick={onClick}
    >
      <div className="flex mb-2">
        <div className="w-16 h-16 rounded-lg bg-gray-700 mr-3 overflow-hidden">
          <Image
            src="/placeholder.svg?height=64&width=64"
            width={64}
            height={64}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-100">{title}</h3>
          <div className="flex items-center text-xs text-gray-400 mt-1">
            <span className="flex items-center bg-gray-700/50 px-2 py-0.5 rounded-full">
              {icon}
              <span className="ml-1">{tag}</span>
            </span>
          </div>
          <div className="mt-2">
            {completed ? (
              <span className="text-xs text-green-400 flex items-center">
                <Star size={12} className="mr-1" />
                Completed
              </span>
            ) : (
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reactions and Comments */}
      <div className="flex justify-between items-center mt-1 pt-1 border-t border-gray-700/50">
        <div className="flex items-center">
          <Heart size={14} className="text-pink-400 mr-1" />
          <span className="text-xs text-gray-400">{reactions}</span>
        </div>
        <div className="flex items-center">
          <MessageCircle size={14} className="text-gray-400 mr-1" />
          <span className="text-xs text-gray-400">Add note</span>
        </div>
        {completed && (
          <div className="flex items-center">
            <Camera size={14} className="text-purple-400 mr-1" />
            <span className="text-xs text-gray-400">View</span>
          </div>
        )}
      </div>
    </div>
  )
}

function ActivityDetail({ onBack }: { onBack: () => void }) {
  const [showCalendar, setShowCalendar] = useState(false)

  return (
    <main className="flex-1 overflow-auto pb-20">
      {/* Header */}
      <header className="flex items-center p-4">
        <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3" onClick={onBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-300"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-xl font-bold">Weekend in Paris</h1>
      </header>

      {/* Activity Content */}
      <div className="px-4 py-2">
        <div className="w-full h-48 rounded-xl bg-gray-800 overflow-hidden mb-4">
          <Image
            src="/placeholder.svg?height=192&width=400"
            width={400}
            height={192}
            alt="Paris"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="bg-gray-800/50 rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <Badge className="bg-purple-500/20 text-purple-400 border-0">Travel</Badge>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Heart size={16} className="text-pink-400" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <MessageCircle size={16} className="text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Calendar size={16} className="text-gray-400" />
              </Button>
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-300 mb-4">
            A romantic weekend getaway to the City of Love. Visit the Eiffel Tower, enjoy French cuisine, and stroll
            along the Seine River.
          </p>

          <div className="flex justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-gray-400">Estimated Budget</h3>
              <p className="text-lg font-semibold">$1,200 - $1,800</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400">Duration</h3>
              <p className="text-lg font-semibold">2-3 days</p>
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            {showCalendar ? "Hide Calendar" : "Schedule This"}
          </Button>
        </div>

        {showCalendar && (
          <div className="bg-gray-800/50 rounded-xl p-4 mb-4 animate-fadeIn">
            <h2 className="text-lg font-semibold mb-2">Choose a Date</h2>
            <div className="bg-gray-900/50 rounded-lg p-3 grid grid-cols-7 gap-1">
              {/* Simplified calendar UI */}
              {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                <div key={i} className="text-center text-xs text-gray-400">
                  {day}
                </div>
              ))}
              {Array.from({ length: 31 }, (_, i) => (
                <button
                  key={i}
                  className={cn(
                    "h-8 w-8 rounded-full text-sm flex items-center justify-center",
                    i === 14 && "bg-purple-500 text-white",
                    i !== 14 && "hover:bg-gray-700",
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <Button className="flex-1 bg-purple-500">Confirm Date</Button>
              <Button variant="outline" className="flex-1 border-gray-700">
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="bg-gray-800/50 rounded-xl p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">Suggested Add-ons</h2>
          <div className="space-y-3">
            <div className="flex items-center p-2 bg-gray-700/30 rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-gray-700 mr-3 flex items-center justify-center">
                <Gift size={20} className="text-pink-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">Book a surprise dinner cruise</h3>
                <p className="text-xs text-gray-400">+100 couple points</p>
              </div>
              <Button variant="ghost" size="sm" className="text-purple-400">
                Add
              </Button>
            </div>

            <div className="flex items-center p-2 bg-gray-700/30 rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-gray-700 mr-3 flex items-center justify-center">
                <Camera size={20} className="text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">Professional photoshoot</h3>
                <p className="text-xs text-gray-400">+75 couple points</p>
              </div>
              <Button variant="ghost" size="sm" className="text-purple-400">
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function MemoryVaultDetail({ onBack }: { onBack: () => void }) {
  const [currentTab, setCurrentTab] = useState("photos")

  return (
    <main className="flex-1 overflow-auto pb-20">
      {/* Header */}
      <header className="flex items-center p-4">
        <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3" onClick={onBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-300"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-xl font-bold">Cook a 3-course meal</h1>
        <div className="ml-auto flex items-center">
          <Badge className="bg-green-500/20 text-green-400 border-0">Completed</Badge>
        </div>
      </header>

      {/* Memory Content */}
      <div className="px-4 py-2">
        <div className="w-full h-64 rounded-xl bg-gray-800 overflow-hidden mb-4 relative group">
          <Image
            src="/placeholder.svg?height=256&width=400"
            width={400}
            height={256}
            alt="Memory photo"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/30 text-white">
                <Heart size={16} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/30 text-white">
                <MessageCircle size={16} />
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/30 text-white">
              <Camera size={16} />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="details" className="mb-4">
          <TabsList className="bg-gray-800/40 p-1 w-full">
            <TabsTrigger value="details" className="flex-1 text-xs data-[state=active]:bg-gray-700">
              Details
            </TabsTrigger>
            <TabsTrigger value="photos" className="flex-1 text-xs data-[state=active]:bg-gray-700">
              Photos (3)
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex-1 text-xs data-[state=active]:bg-gray-700">
              Notes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-3">
            <div className="bg-gray-800/50 rounded-xl p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <Clock size={16} className="text-gray-400 mr-1" />
                  <span className="text-sm text-gray-400">April 15, 2023</span>
                </div>
                <div className="flex space-x-1">
                  <span className="text-lg">❤️</span>
                  <span className="text-lg">😋</span>
                  <span className="text-lg">🍽️</span>
                </div>
              </div>

              <p className="text-gray-300">
                We finally did it! Made a complete 3-course Italian dinner from scratch. The pasta was a bit overcooked
                but the tiramisu was perfect! Can't wait to try making something new together again.
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Points Earned</h3>
                  <p className="text-lg font-semibold text-purple-400">+75</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Badges</h3>
                  <div className="flex mt-1">
                    <Badge className="bg-purple-500/20 text-purple-400 border-0 mr-1">Foodie</Badge>
                    <Badge className="bg-pink-500/20 text-pink-400 border-0">Creative</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4">
              <h3 className="font-medium text-gray-100 mb-2">How it felt</h3>
              <div className="flex flex-wrap gap-2">
                {["Fun", "Challenging", "Romantic", "Satisfying", "Memorable"].map((tag) => (
                  <span key={tag} className="bg-gray-700/50 px-3 py-1 rounded-full text-sm text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="photos" className="mt-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="aspect-square rounded-lg bg-gray-800 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  width={200}
                  height={200}
                  alt="Memory photo 1"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="aspect-square rounded-lg bg-gray-800 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  width={200}
                  height={200}
                  alt="Memory photo 2"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="aspect-square rounded-lg bg-gray-800 overflow-hidden col-span-2">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  width={400}
                  height={200}
                  alt="Memory photo 3"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <Button variant="outline" className="w-full mt-3 border-dashed border-gray-700">
              <Camera size={16} className="mr-2" />
              Add More Photos
            </Button>
          </TabsContent>

          <TabsContent value="notes" className="mt-3">
            <div className="bg-gray-800/50 rounded-xl p-4 mb-3">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">
                  <User size={16} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Alex</h3>
                  <p className="text-xs text-gray-400">April 15, 2023</p>
                </div>
              </div>
              <p className="text-sm text-gray-300">
                The pasta sauce recipe we used was amazing! Saving it for next time.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4 mb-3">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center mr-2">
                  <User size={16} className="text-pink-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Jordan</h3>
                  <p className="text-xs text-gray-400">April 16, 2023</p>
                </div>
              </div>
              <p className="text-sm text-gray-300">Next time let's try making fresh pasta from scratch!</p>
            </div>

            <div className="flex items-center bg-gray-800/30 rounded-xl p-3">
              <input
                type="text"
                placeholder="Add a note..."
                className="flex-1 bg-transparent border-none outline-none text-sm"
              />
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <Mic size={16} className="text-gray-400" />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <Camera size={16} className="text-gray-400" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

function MemoriesView({ onViewMemory, onBack }: { onViewMemory: () => void; onBack: () => void }) {
  return (
    <main className="flex-1 overflow-auto pb-20">
      {/* Header */}
      <header className="flex items-center p-4">
        <h1 className="text-xl font-bold">Memory Vault</h1>
        <div className="ml-auto">
          <Badge className="bg-purple-500/20 text-purple-400 border-0">12 Memories</Badge>
        </div>
      </header>

      {/* Memories Grid */}
      <div className="px-4 py-2">
        <Tabs defaultValue="grid">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Your Memories</h2>
            <TabsList className="bg-gray-800/40 p-1">
              <TabsTrigger value="grid" className="h-8 w-8 p-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                  <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                  <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                  <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                </svg>
              </TabsTrigger>
              <TabsTrigger value="list" className="h-8 w-8 p-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M8 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M8 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M3 6H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M3 12H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid" className="mt-0">
            <div className="grid grid-cols-2 gap-3">
              <MemoryCard title="Cook a 3-course meal" date="Apr 15, 2023" tag="Food" onClick={onViewMemory} />
              <MemoryCard title="Sunrise hike" date="Mar 22, 2023" tag="Adventure" onClick={onViewMemory} />
              <MemoryCard title="Wine tasting" date="Feb 14, 2023" tag="Date Night" onClick={onViewMemory} />
              <MemoryCard title="Beach day" date="Jan 5, 2023" tag="Travel" onClick={onViewMemory} />
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <div className="space-y-3">
              <MemoryListItem title="Cook a 3-course meal" date="Apr 15, 2023" tag="Food" onClick={onViewMemory} />
              <MemoryListItem title="Sunrise hike" date="Mar 22, 2023" tag="Adventure" onClick={onViewMemory} />
              <MemoryListItem title="Wine tasting" date="Feb 14, 2023" tag="Date Night" onClick={onViewMemory} />
              <MemoryListItem title="Beach day" date="Jan 5, 2023" tag="Travel" onClick={onViewMemory} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

function MemoryCard({ title, date, tag, onClick }: { title: string; date: string; tag: string; onClick: () => void }) {
  return (
    <div
      className="aspect-square rounded-xl bg-gray-800/50 overflow-hidden relative group cursor-pointer"
      onClick={onClick}
    >
      <Image
        src="/placeholder.svg?height=200&width=200"
        width={200}
        height={200}
        alt={title}
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 flex flex-col justify-end">
        <Badge className="self-start mb-1 bg-purple-500/30 border-0 text-xs">{tag}</Badge>
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <p className="text-xs text-gray-300">{date}</p>
      </div>
    </div>
  )
}

function MemoryListItem({
  title,
  date,
  tag,
  onClick,
}: { title: string; date: string; tag: string; onClick: () => void }) {
  return (
    <div
      className="flex items-center p-3 bg-gray-800/50 rounded-xl cursor-pointer active:bg-gray-800/70"
      onClick={onClick}
    >
      <div className="w-12 h-12 rounded-lg bg-gray-700 mr-3 overflow-hidden">
        <Image
          src="/placeholder.svg?height=48&width=48"
          width={48}
          height={48}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-100">{title}</h3>
        <div className="flex items-center justify-between">
          <Badge className="bg-purple-500/20 text-purple-400 border-0 text-xs">{tag}</Badge>
          <span className="text-xs text-gray-400">{date}</span>
        </div>
      </div>
    </div>
  )
}

function AddActivity({ onBack }: { onBack: () => void }) {
  return (
    <main className="flex-1 overflow-auto pb-20">
      {/* Header */}
      <header className="flex items-center p-4">
        <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3" onClick={onBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-300"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-xl font-bold">Add New Activity</h1>
      </header>

      {/* Add Activity Form */}
      <div className="px-4 py-2">
        <div className="bg-gray-800/50 rounded-xl p-4 mb-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">Activity Title</label>
            <input
              type="text"
              placeholder="What do you want to do together?"
              className="w-full bg-gray-700/50 border border-gray-700 rounded-lg p-2 text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
            <div className="grid grid-cols-4 gap-2">
              {["Travel", "Food", "Adventure", "Cozy", "Skill", "Date Night", "Creative", "Other"].map((category) => (
                <button
                  key={category}
                  className={cn(
                    "p-2 rounded-lg text-center text-sm",
                    category === "Travel"
                      ? "bg-purple-500/30 text-purple-400 border border-purple-500/30"
                      : "bg-gray-700/50 text-gray-300 border border-gray-700",
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
            <textarea
              placeholder="Describe this activity..."
              className="w-full bg-gray-700/50 border border-gray-700 rounded-lg p-2 text-white h-24"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Estimated Budget</label>
              <input
                type="text"
                placeholder="$"
                className="w-full bg-gray-700/50 border border-gray-700 rounded-lg p-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Duration</label>
              <input
                type="text"
                placeholder="Hours/Days"
                className="w-full bg-gray-700/50 border border-gray-700 rounded-lg p-2 text-white"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">Add Photo</label>
            <button className="w-full h-32 bg-gray-700/50 border border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center">
              <Camera size={24} className="text-gray-400 mb-2" />
              <span className="text-sm text-gray-400">Tap to add a photo</span>
            </button>
          </div>

          <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">Add to Bucket List</Button>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-4 mb-4">
          <h2 className="text-lg font-semibold mb-3">Get Inspired</h2>
          <div className="space-y-3">
            <div className="flex items-center p-2 bg-gray-700/30 rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-gray-700 mr-3 flex items-center justify-center">
                <Sparkles size={20} className="text-yellow-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">Hot air balloon ride</h3>
                <p className="text-xs text-gray-400">Adventure • High budget</p>
              </div>
              <Button variant="ghost" size="sm" className="text-purple-400">
                Use
              </Button>
            </div>

            <div className="flex items-center p-2 bg-gray-700/30 rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-gray-700 mr-3 flex items-center justify-center">
                <Sparkles size={20} className="text-yellow-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">Learn to make sushi</h3>
                <p className="text-xs text-gray-400">Food • Medium budget</p>
              </div>
              <Button variant="ghost" size="sm" className="text-purple-400">
                Use
              </Button>
            </div>

            <div className="flex items-center p-2 bg-gray-700/30 rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-gray-700 mr-3 flex items-center justify-center">
                <Sparkles size={20} className="text-yellow-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">Stargazing picnic</h3>
                <p className="text-xs text-gray-400">Cozy • Low budget</p>
              </div>
              <Button variant="ghost" size="sm" className="text-purple-400">
                Use
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function BottomNavigation({
  activeTab,
  setActiveTab,
}: {
  activeTab: string
  setActiveTab: (tab: string) => void
}) {
  const tabs = [
    { id: "home", icon: <Home size={20} />, label: "Home" },
    { id: "memories", icon: <BookOpen size={20} />, label: "Memories" },
    { id: "add", icon: <PlusCircle size={20} />, label: "Add" },
    { id: "calendar", icon: <Calendar size={20} />, label: "Calendar" },
    { id: "profile", icon: <User size={20} />, label: "Profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md border-t border-gray-800 px-2 py-1">
      <div className="flex justify-between items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all",
              activeTab === tab.id ? "text-purple-400 scale-110" : "text-gray-500 hover:text-gray-300",
              tab.id === "add" && "relative -top-2",
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.id === "add" ? (
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                {tab.icon}
              </div>
            ) : (
              <>
                {tab.icon}
                <span className="text-xs mt-1">{tab.label}</span>
              </>
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}
