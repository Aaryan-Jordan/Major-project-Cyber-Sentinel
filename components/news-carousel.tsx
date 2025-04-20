"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface NewsItem {
  source: string
  title: string
  url: string
  imageUrl: string
  category: string
  date: string
  excerpt: string
}

interface NewsCarouselProps {
  title: string
  news: NewsItem[]
  className?: string
  singleRow?: boolean
}

export function NewsCarousel({ title, news, className, singleRow = false }: NewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024)
  const itemsToShow = singleRow ? 1 : windowWidth >= 1024 ? 3 : windowWidth >= 768 ? 2 : 1
  const maxIndex = Math.max(0, news.length - itemsToShow)

  // Custom hook to get window size
  useEffect(() => {
    if (typeof window === "undefined") return

    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const goToPrevious = () => {
    if (isAnimating || currentIndex <= 0) return
    setIsAnimating(true)
    setCurrentIndex((prev) => Math.max(0, prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToNext = () => {
    if (isAnimating || currentIndex >= maxIndex) return
    setIsAnimating(true)
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    } catch (e) {
      return dateString
    }
  }

  // Auto-scroll the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < maxIndex) {
        goToNext()
      } else {
        setCurrentIndex(0)
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [currentIndex, maxIndex])

  if (singleRow) {
    return (
      <div className={cn("relative", className)}>
        <div className="mb-4 flex items-center justify-between">
          {title && <h2 className="text-2xl font-bold text-primary">{title}</h2>}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              disabled={currentIndex <= 0}
              className="h-8 w-8 rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              disabled={currentIndex >= maxIndex}
              className="h-8 w-8 rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-500 ease-in-out snap-x snap-mandatory overflow-x-auto pb-4 scrollbar-hide"
            style={{ transform: `translateX(-${currentIndex * 320}px)` }}
          >
            {news.map((item, index) => (
              <div key={index} className="min-w-[300px] flex-shrink-0 snap-start">
                <Card className="group h-full overflow-hidden border-border/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback image if the original fails to load
                        ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=200&width=400"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 text-xs font-medium text-primary">{item.source}</div>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block hover:underline">
                      <h3 className="mb-2 line-clamp-2 text-base font-bold group-hover:text-primary">{item.title}</h3>
                    </a>
                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{item.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{formatDate(item.date)}</span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary transition-colors hover:text-primary/80"
                      >
                        Read more
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="mt-4 flex justify-center gap-1">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex ? "w-6 bg-primary" : "w-2 bg-muted"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            disabled={currentIndex <= 0}
            className="h-8 w-8 rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className="h-8 w-8 rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="relative flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
      >
        {news.map((item, index) => (
          <div
            key={index}
            className={`w-full flex-shrink-0 px-2 transition-opacity duration-300 md:w-1/2 lg:w-1/3`}
            style={{
              opacity: index >= currentIndex && index < currentIndex + itemsToShow ? 1 : 0.5,
              pointerEvents: index >= currentIndex && index < currentIndex + itemsToShow ? "auto" : "none",
            }}
          >
            <Card className="group h-full overflow-hidden border-border/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback image if the original fails to load
                    ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=200&width=400"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="mb-2 text-xs font-medium text-primary">{item.source}</div>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="block hover:underline">
                  <h3 className="mb-2 line-clamp-2 text-base font-bold group-hover:text-primary">{item.title}</h3>
                </a>
                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{item.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatDate(item.date)}</span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary transition-colors hover:text-primary/80"
                  >
                    Read more
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Carousel indicators */}
      <div className="mt-4 flex justify-center gap-1">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex ? "w-6 bg-primary" : "w-2 bg-muted"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
