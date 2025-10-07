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
        <span className="text-xs inline-block bg-muted px-2 py-1 rounded">
          <strong>brine</strong>: water strongly impregnated with salt.
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
            Despite having <strong>no sunlight</strong> and <strong>almost no oxygen</strong>, <strong>microbes</strong> still
            live in this <strong>extreme environment</strong>. They survive through <strong>chemosynthesis</strong>,
            drawing energy from iron and sulfur compounds in the water instead of light.
          </>
        ),
        publishDate: "",
      },
    ],
  },
  {
    id: "gates-of-hell",
    title: "GATES OF HELL!😱",
    image: "/gates-of-hell.jpg",
    category: ["Physical Geography", "Geology"],
    readTime: "3 min read",
    publishDate: "October 8, 2025",
    carouselImages: [
      "/gates-of-hell.jpg",
      "/gates-of-hell-1.jpg",
      "/gates-of-hell-2.jpg",
      "/water-crater.jpg",
      "/mud-crater.png",
    ],
    carouselLabels: [
      "Darvaza Gas Crater, Karakum Desert",
      "Darvaza Gas Crater (close-up)",
      "Darvaza Gas Crater at night",
      "Water Crater",
      "Mud Crater",
    ],
    description: (
      <>
        <h2 className="text-base font-semibold mb-2">DARVAZA GAS CRATER</h2>
        <span className="text-xs inline-block bg-muted px-2 py-1 rounded mr-2 mb-2">
          <strong>cavern</strong>: a large cave or chamber in a cave.
        </span>
        <span className="text-xs inline-block bg-muted px-2 py-1 rounded mr-2 mb-2">
          <strong>coliseum</strong>: a large amphitheatre (= a circular or oval area with seats around it for watching sports and entertainments)
        </span>
        <span className="text-xs inline-block bg-muted px-2 py-1 rounded mr-2 mb-2">
          <strong>crater</strong>: a large bowl-shaped cavity in the ground or on a celestial object, typically one caused by an explosion or the impact of a meteorite.
        </span>
        <span className="text-xs inline-block bg-muted px-2 py-1 rounded mb-2">
          <strong>geologist</strong>: a scientist who studies the structure, composition, and history of Earth.
        </span>
        <br />
        <br />
        Think deserts are boring? Think again. In the heart of Turkmenistan, there’s a massive fiery pit known as the
        <strong> Darvaza Gas Crater</strong> — or, as locals like to call it, the <strong>Gate of Hell</strong>. This
        thing has been burning non-stop since the 1970s, turning the quiet desert nights into a scene that looks straight
        out of a fantasy movie.
        <br />
        <br />
        <strong>WHAT IS DARVAZA GAS CRATER?</strong>
        <br />
        The Darvaza gas crater, also known as the <strong>Door to Hell</strong> or <strong>Gates of Hell</strong>, officially the
        <strong> Shining of Karakum</strong>, is a burning natural gas field collapsed into a <strong>cavern</strong> near
        Darvaza, Turkmenistan. The site has been burning continuously since 1971, when it was accidentally ignited during a
        Soviet drilling operation.
        <br />
        <br />
        <strong>THE HISTORY BEHIND THE CRATER</strong>
        <br />
        In 1971, Soviet <strong>geologists</strong> had been drilling for gas at the site of a cavern. The cavern
        collapsed, releasing the gas. Fearing the release of toxic gases, the geologists set the crater on fire, hoping
        that the flames would burn off the gas within a few days or weeks. However, the fire has been burning continuously
        for over 50 years and has become a permanent feature of the desert landscape. There are no accurate records of the
        event, but the fact is that this gas cavern has been burning since then.
        <br />
        <br />⇾ The flames that burn within the crater are created by the combustion of methane gas. <strong>Methane</strong> is an
        odorless and colorless gas that’s highly flammable, and it’s released naturally as a byproduct of the decomposition
        of organic matter. The methane in the Darvaza Gas Crater is thought to have been trapped in a natural gas pocket
        beneath the desert floor, and the drilling accident released it into the atmosphere.
      </>
    ),
    facts: [
      {
        text: (
          <>
            <strong>Darvaza</strong> from Turkmen literally means <strong>"Gate"</strong>.
          </>
        ),
        publishDate: "",
      },
      {
        text: (
          <>
            The <strong>Darvaza Gas Crater</strong> is located in the <strong>Karakum Desert</strong> of
            <strong> Turkmenistan</strong>. Karakum desert makes up around <strong>70%</strong> of the country.
          </>
        ),
        publishDate: "",
      },
      {
        text: (
          <>
            The <strong>diameter</strong> of the crater is <strong>69 meters</strong> and the <strong>depth</strong> is
            <strong> 30</strong>.
          </>
        ),
        publishDate: "",
      },
      {
        text: (
          <>
            There are also <strong>two</strong> other similar big craters: a <strong>"Water Crater"</strong> where
            <strong> gas bubbles through water</strong> and a <strong>"Mud Crater"</strong> where
            <strong> natural gas churns up mud</strong>. Though not as impressive as the Darvaza crater, you can still visit
            them on the way.
          </>
        ),
        publishDate: "",
      },
    ],
    didYouKnow: {
      image: "/george.jpg",
      text: (
        <>
          In 2013, <strong>George Kourounis</strong> became the first person to set foot at the bottom of the crater; he was
          gathering soil samples for the Extreme Microbiome Project. The descent was sponsored by National Geographic and
          featured in an episode of the National Geographic Channel series <em>Die Trying</em>.
          <br />
          <br />
          <em>
            "I describe it as a coliseum of fire—just everywhere you look it's thousands of these small fires. The sound was
            like that of a jet engine, this roaring, high-pressure, gas-burning sound. And there was no smoke. It burns very
            cleanly, so there's nothing to obscure your view. You can just see every little lick of flame."
          </em>
          <br />
          <span className="font-bold">~ George Kourounis, Interview with National Geographic</span>
          <br />
          <br />
          Kourounis used a custom-made Kevlar harness and multiple Technora ropes attached to a full-body aluminized suit with
          a self-contained breathing apparatus. He has since wished to descend into the crater again, carrying more equipment
          for better profiling of the local biome.
        </>
      ),
    },
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

const pickupLines = [
  "I always thought happiness started with an \"H\" but it looks like it starts with \"U\".",
  "If X + U = 15, then I would assume X = 5 because U is definitely a 10",
  "Do you have a name? Or can I call you mine?",
  "On a scale of 1 to 10, you're a 9...because I'm the 1 you need.",
  "They say nothing lasts forever. Want to be my nothing?",
  "I think something's wrong with my phone. Cud you call it and see if it works?",
  "No pen, no paper but you still draw my attention.",
  "I don't even play cards yet I somehow drew the Queen of Hearts.",
  "Hey, how was heaven when you left it? ",
]

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<(typeof topics)[0] | null>(null)
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0)

  const isBloodFalls = selectedTopic?.id === "blood-falls"
  const quotes = isBloodFalls ? pickupLines : jokes

  useEffect(() => {
    setCurrentJokeIndex(0)
  }, [isBloodFalls])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJokeIndex((prev) => (prev + 1) % quotes.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [quotes.length])

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
              {!selectedTopic ? (
                <div className="py-6">
                  <div className="text-5xl mb-3 animate-bounce">👋🏽</div>
                  <h3 className="font-medium">Enjoy Your Read!</h3>
                </div>
              ) : (
                <>
                  <h3 className="font-medium mb-4">{isBloodFalls ? "Smooth Talk Collection - Pickup Lines😒" : "HAHAHA, sOo fUnNyYYyY…😒"}</h3>
                  <div className="min-h-[120px] flex items-center justify-center">
                    <p className="text-sm text-pretty leading-relaxed transition-all duration-500 ease-in-out">
                      {quotes[currentJokeIndex]}
                    </p>
                  </div>
                  <div className="flex justify-center gap-1 mt-4">
                    {quotes.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentJokeIndex ? "bg-primary" : "bg-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
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
