export type HowItWorksStep = {
  id: string;
  number: number;
  navLabel: string;
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
};

export const howItWorksSteps: HowItWorksStep[] = [
  {
    id: "find-your-team",
    number: 1,
    navLabel: "Find your local Naptec team",
    title: "Find your local Naptec team",
    paragraphs: [
      "We have offices across the UK, each rooted in the communities they serve. Enter your postcode above or get in touch to find a care team near you.",
    ],
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
    imageAlt: "Naptec care team in the community",
  },
  {
    id: "initial-chat",
    number: 2,
    navLabel: "Arrange an initial chat",
    title: "Arrange an initial chat",
    paragraphs: [
      "Your care journey begins with an informal, no-pressure conversation with one of our friendly advisors. They will learn about your situation, understand your loved one's current challenges, and answer any questions you have about home care.",
    ],
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f0e?w=1200&q=80",
    imageAlt: "Advisor speaking with a family about care options",
  },
  {
    id: "home-visit",
    number: 3,
    navLabel: "Book your home visit",
    title: "Book your home visit",
    paragraphs: [
      "The home visit is our chance to understand your loved one's specific needs and how we can help. We will arrange a time to visit, get to know your family, and learn about personality and routines so we can suggest the best Care Professional.",
      "The same Care Professional, or a small consistent team, will usually visit regularly. We work hard to find someone who is a great match.",
    ],
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80",
    imageAlt: "Care professional visiting a client at home",
  },
  {
    id: "meet-care-professionals",
    number: 4,
    navLabel: "Meet your Care Professionals",
    title: "Meet your Care Professionals",
    paragraphs: [
      "When we have selected the best support team for your loved one's needs, we arrange an introduction in a relaxed setting so you can meet, ask questions, and lay the foundations of a strong care relationship.",
    ],
    image:
      "https://images.unsplash.com/photo-1516307365426-b304ed83931e?w=1200&q=80",
    imageAlt: "Client meeting their care professional",
  },
  {
    id: "get-to-know-each-other",
    number: 5,
    navLabel: "Get to know each other",
    title: "Get to know each other",
    paragraphs: [
      "We are committed to making sure you and your Care Professional feel completely comfortable with one another. In the first few weeks, it is about learning likes and dislikes, preferred routines, and building trust.",
      "Family involvement helps foster this process, and we stay in touch every step of the way to ensure a smooth transition and a lasting care relationship.",
    ],
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
    imageAlt: "Care professional and client enjoying time together at home",
  },
];
