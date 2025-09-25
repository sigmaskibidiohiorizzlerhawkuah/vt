const adjectives = [
  "Curious",
  "Silent",
  "Brave",
  "Gentle",
  "Swift",
  "Clever",
  "Merry",
  "Calm",
  "Bright",
  "Nimble",
]

const animals = [
  "Fox",
  "Whale",
  "Panda",
  "Otter",
  "Falcon",
  "Dolphin",
  "Hawk",
  "Wolf",
  "Turtle",
  "Lynx",
]

export function generateAnonymousName(): string {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
  const animal = animals[Math.floor(Math.random() * animals.length)]
  return `${adj}${animal}`
}


