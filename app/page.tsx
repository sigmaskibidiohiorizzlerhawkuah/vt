"use client"

import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { TopicCard } from "@/components/topic-card"
import { DetailPanel } from "@/components/detail-panel"
import { ScrollArea } from "@/components/ui/scroll-area"

const topics = [
  {
    id: "dubai",
    title: "DUBAI AS AN EMIRATE, NOT A COUNTRY! 😅",
    image: "/dubai-skyline-with-burj-khalifa-at-sunset.jpg",
    category: "Political Geography",
    readTime: "4 min read",
    publishDate: "September 23, 2025",
    description: (
      <>
        Many people often mistake Dubai for being a city — the capital of the UAE (United Arab Emirates) at that — or
        even worse, a country. But no… Dubai ain't a country, and as much as it is a city, it is not the capital of the
        UAE. The actual capital is Abu Dhabi, which is the largest city, while Dubai is simply the capital of the
        Emirate of Dubai in the UAE.
        <br />
        <br />
        <strong>WHAT'S AN EMIRATE?</strong>
        <br />
        An emirate is a region or territory governed by an emir, which is an Arabic term for a ruler or prince. It is
        more of a semi-autonomous monarchy.
        <br />
        <br />
        <strong>STRUCTURE WITHIN THE UAE</strong>
        <br />
        The UAE is a federation of seven emirates: Abu Dhabi, Dubai, Sharjah, Ras Al Khaimah, Fujairah, Umm Al Quwain,
        and Ajman. Each maintains its own ruler (emir), its own local laws, and so on.
        <br />
        <br />⇾ The capital of the UAE is Abu Dhabi, which is also the largest emirate by area. Abu Dhabi hosts the
        federal government, including the offices of the President and the Federal National Council, making it the
        political and administrative center of the nation.
        <br />
        <br />⇾ Dubai is one of the seven emirates that make up the UAE and is both an emirate and a city. It serves as
        the administrative, economic, and cultural center of the Emirate of Dubai.
      </>
    ),
    facts: [
      {
        text: (
          <>
            The <strong>United Arab Emirates</strong> was officially formed on <strong>2 December 1971</strong>, when{" "}
            <strong>six</strong> emirates united to create a <strong>federal state</strong>, with{" "}
            <strong>Ras Al Khaimah</strong> joining as the <strong>seventh</strong> emirate on{" "}
            <strong>10 February 1972</strong>.
          </>
        ),
        publishDate: "",
      },
      {
        text: (
          <>
            The <strong>President of the UAE</strong> is traditionally the <strong>ruler of Abu Dhabi</strong>, and the{" "}
            <strong>Prime Minister</strong> is often the <strong>ruler of Dubai</strong>.
          </>
        ),
        publishDate: "",
      },
    ],
    didYouKnow: {
      image: "/sheikha-mahra-instagram-post.png",
      text: (
        <>
          Sheikha Mahra bint Mohammed bin Rashid Al Maktoum, one of the 26 children of Dubai's emir and the Vice
          President and Prime Minister of the UAE, announced her divorce from her husband on Instagram in a post that
          said:
          <br />
          <br />
          <em>
            "Dear Husband, as you are occupied with other companions, I hereby declare our divorce. I divorce you, I
            divorce you, I divorce you. Take care. Your ex-wife."
          </em>
          <br />
          <br />
          This post references the Islamic practice of triple talaq, where a spouse can declare divorce three times.
          Although traditionally invoked by husbands, Mahra's use of it was seen as a bold and rare reversal of custom,
          attracting widespread attention.
        </>
      ),
    },
  },
  {
    id: "blood-falls",
    title: "BLOOD FALLS, ANTARCTICA",
    image: "/blood-falls-antarctica-1.jpg",
    category: ["Physical Geography", "Natural Science"],
    readTime: "2 min read",
    publishDate: "October 1, 2025",
    carouselImages: [
      "/blood-falls-antarctica-1.jpg",
      "/blood-falls-antarctica-2.jpg",
      "/blood-falls-antarctica-3.jpg",
      "/blood-falls-antarctica-4.jpg",
    ],
    carouselLabels: [
      "Blood Falls, Antarctica",
      "Taylor Glacier seep, East Antarctica",
      "McMurdo Dry Valleys ice face",
      "Iron-rich brine outflow",
    ],
    description: (
      <>
        BLOOD FALLS, ANTARCTICA
        <br />
        <br />
        <span className="text-xs inline-block bg-muted px-2 py-1 rounded">
          <strong>(brine)</strong>: water strongly impregnated with salt.
        </span>
        <br />
        <br />
        Many people think Antarctica is just a frozen, lifeless wasteland — endless white ice and snow as far as the
        eye can see. But then there’s Blood Falls, a strange waterfall that looks like the ice itself is bleeding.
        Worry not, tho… it’s not real blood. The deep red flow comes from iron-rich water seeping out of the Taylor
        Glacier and rusting as soon as it touches the air, creating one of the most bizarre sights on the planet.
        <br />
        <br />
        <strong>WHAT IS BLOOD FALLS?</strong>
        <br />
        Blood Falls is a crimson-red waterfall on the edge of the Taylor Glacier in East Antarctica's McMurdo Dry
        Valleys. Its shocking color comes from iron-rich saltwater that has been trapped beneath the glacier for
        millions of years.
        <br />
        <br />
        <strong>WHY IS THE WATER RED?</strong>
        <br />
        The water originates from an ancient hypersaline lake that was sealed off by the advancing Taylor Glacier
        roughly 1.5 to 5 million years ago. Because of its extremely high salt content, the brine never freezes, even
        under Antarctica’s brutal cold.
        <br />
        <br />
        When this brine finally seeps out and meets oxygen in the air, the iron inside oxidizes — basically, it rusts
        — turning the water a dramatic shade of red.
        <br />
        <br />
        ⇾ Early explorers initially suspected the color was caused by red algae, but this theory was later disproven by
        chemical analysis.
      </>
    ),
    facts: [
      {
        text: (
          <>
            The <strong>brine</strong> at <strong>Blood Falls</strong> is about <strong>2–3 times saltier than normal
            seawater</strong> and packed with dissolved iron.
          </>
        ),
        publishDate: "",
      },
      {
        text: (
          <>
            Despite having <strong>no sunlight</strong> and <strong>almost no oxygen</strong>, <strong>microbes</strong>
            still live in this <strong>extreme environment</strong>. They survive through <strong>chemosynthesis</strong>,
            drawing energy from iron and sulfur compounds in the water instead of light.
          </>
        ),
        publishDate: "",
      },
    ],
  },
]

const jokes = [
  "I mustard the courage to tell my friend a joke about condiments, but it was too cheesy — I couldn't ketch-up.",
  "My cow went to therapy — it needed a little moo-tivation to get over feeling pasture-d.",
  "Did you hear about the crab who never shares? He's a little shellfish.",
  "Why did the tomato blush? Because it saw the salad dressing.",
  "I'm on a seafood diet. I see food and I eat it.",
  'I told my computer I needed a break. It said: "Error 404: Rest not found"',
  "I told a chemistry joke. There was no reaction.",
  "I stayed up all night to see where the sun went. Then it dawned on me.",
  "I once heard a joke about amnesia, but I forgot how it goes.",
  "Sleeping comes so naturally to me, I could do it with my eyes closed.",
]

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<(typeof topics)[0] | null>(null)
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJokeIndex((prev) => (prev + 1) % jokes.length)
    }, 5000) // increased from 3000ms to 5000ms to slow down auto-scroll

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-screen flex bg-background">
      {/* First Column - VOCABULARY TODAY */}
      <div className="w-80 border-r bg-card flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Go to home"
                title="Home"
                onClick={() => setSelectedTopic(null)}
                className="w-8 h-8 rounded flex items-center justify-center hover:opacity-80 transition"
              >
                <img src="/vt-logo-white.png" alt="VT Logo" className="w-6 h-6 object-contain dark:block hidden" />
                <img src="/vt-logo.png" alt="VT Logo" className="w-6 h-6 object-contain dark:hidden block" />
              </button>
              <ThemeToggle />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-balance">VOCABULARY TODAY</h1>
          <p className="text-sm text-muted-foreground mt-2 text-pretty">Expand your mind, one word at a time.</p>
        </div>

        <div className="flex-1 p-6">
          <div className="space-y-4">
            <div className="text-center p-8 text-muted-foreground">
              <h3 className="font-medium mb-4">HAHAHA, sOo fUnNyYYyY…😒</h3>
              <div className="min-h-[120px] flex items-center justify-center">
                <p className="text-sm text-pretty leading-relaxed transition-all duration-500 ease-in-out">
                  {jokes[currentJokeIndex]}
                </p>
              </div>
              <div className="flex justify-center gap-1 mt-4">
                {jokes.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentJokeIndex ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t text-center">
          <p className="text-xs text-muted-foreground">© 2025 VT. All rights reserved.</p>
        </div>
      </div>

      {/* Second Column - SERIES */}
      <div className="w-96 border-r bg-card flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">SERIES</h2>
          <p className="text-sm text-muted-foreground mt-1">All featured topics</p>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-4">
            {topics.map((topic) => (
              <TopicCard
                key={topic.id}
                title={topic.title}
                image={topic.image}
                isSelected={selectedTopic?.id === topic.id}
                onClick={() => setSelectedTopic(topic)}
              />
            ))}
            <div className="text-center pt-4">
              <p className="text-xs text-muted-foreground">More To Come</p>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Third Column - Detail Panel */}
      <div className="flex-1 bg-background">
        <div className="h-full">
          <DetailPanel topic={selectedTopic} />
        </div>
      </div>
    </div>
  )
}
