import { Question } from "../components/quiz/QuizQuestion";
import { BadgeInfo } from "../components/badges/BadgeCard";

// Mock quiz questions
export const mockQuestions: Question[] = [
  {
    id: '1',
    text: "What is our firm's current view on inflation trends for the next quarter?",
    options: [
      { id: '1a', text: "Increasing significantly above 4%", isCorrect: false },
      { id: '1b', text: "Moderating to 2-3% range", isCorrect: true },
      { id: '1c', text: "Steady at current levels", isCorrect: false },
      { id: '1d', text: "Declining to below 2%", isCorrect: false }
    ],
    explanation: "Our research indicates inflation will moderate to the 2-3% range in the coming quarter, primarily due to easing supply chain pressures and central bank policies.",
    category: "Market Insights"
  },
  {
    id: '2',
    text: "According to our latest research, which sector shows the strongest growth potential this year?",
    options: [
      { id: '2a', text: "Healthcare", isCorrect: false },
      { id: '2b', text: "Financial Services", isCorrect: false },
      { id: '2c', text: "Technology", isCorrect: true },
      { id: '2d', text: "Energy", isCorrect: false }
    ],
    explanation: "Our analysis points to technology as having the strongest growth potential this year, particularly in AI, cloud services, and cybersecurity subsectors.",
    category: "Sector Outlook"
  },
  {
    id: '3',
    text: "What is the current Fed Funds rate target range?",
    options: [
      { id: '3a', text: "3.75% - 4.00%", isCorrect: false },
      { id: '3b', text: "4.25% - 4.50%", isCorrect: false },
      { id: '3c', text: "4.75% - 5.00%", isCorrect: false },
      { id: '3d', text: "5.25% - 5.50%", isCorrect: true }
    ],
    explanation: "The Federal Reserve's current target range for the federal funds rate is 5.25% to 5.50%, which was set at their last meeting.",
    category: "Monetary Policy"
  },
  {
    id: '4',
    text: "What is our firm's recommended portfolio allocation to alternative investments for a moderate-risk investor?",
    options: [
      { id: '4a', text: "5-10%", isCorrect: false },
      { id: '4b', text: "10-20%", isCorrect: true },
      { id: '4c', text: "20-30%", isCorrect: false },
      { id: '4d', text: "30-40%", isCorrect: false }
    ],
    explanation: "For moderate-risk investors, our strategic asset allocation recommends 10-20% in alternatives to provide diversification and potential downside protection.",
    category: "Asset Allocation"
  },
  {
    id: '5',
    text: "Which investment strategy is our firm currently emphasizing for fixed income portfolios?",
    options: [
      { id: '5a', text: "Extending duration", isCorrect: false },
      { id: '5b', text: "Increasing credit quality", isCorrect: false },
      { id: '5c', text: "Barbell approach", isCorrect: true },
      { id: '5d', text: "All-in on high yield", isCorrect: false }
    ],
    explanation: "We're currently recommending a barbell approach in fixed income, combining short-term securities for liquidity with longer-dated bonds for yield, while maintaining a neutral duration overall.",
    category: "Fixed Income"
  }
];

// Morning Meeting challenge questions
export const mockMorningMeetingQuestions: Question[] = [
  {
    id: 'mm1',
    text: "Which tax benefit did Dave Frame emphasize most in today's morning meeting?",
    options: [
      { id: 'mm1a', text: "Roth IRA conversion opportunities", isCorrect: false },
      { id: 'mm1b', text: "Qualified Business Income (QBI) deductions", isCorrect: true },
      { id: 'mm1c', text: "Capital loss harvesting", isCorrect: false },
      { id: 'mm1d', text: "Charitable remainder trusts", isCorrect: false }
    ],
    explanation: "Dave Frame highlighted the importance of Qualified Business Income deductions for small business owners, noting recent IRS clarifications on eligibility requirements.",
    category: "Morning Meeting"
  },
  {
    id: 'mm2',
    text: "According to Paula Dolan's market update this morning, which sector is our firm currently overweighting?",
    options: [
      { id: 'mm2a', text: "Consumer Staples", isCorrect: false },
      { id: 'mm2b', text: "Utilities", isCorrect: false },
      { id: 'mm2c', text: "Technology", isCorrect: true },
      { id: 'mm2d', text: "Energy", isCorrect: false }
    ],
    explanation: "Paula Dolan's market update indicated our firm is currently overweighting Technology based on strong earnings growth and AI-driven innovation.",
    category: "Morning Meeting"
  }
];

// Specialized quiz questions (structured products)
export const mockStructuredProductsQuestions: Question[] = [
  {
    id: 'sp1',
    text: "Which typical payoff structure does a principal-protected note offer?",
    options: [
      { id: 'sp1a', text: "Guaranteed full return of principal with capped upside potential", isCorrect: true },
      { id: 'sp1b', text: "Leveraged exposure with no downside protection", isCorrect: false },
      { id: 'sp1c', text: "Unlimited upside with partial downside protection", isCorrect: false },
      { id: 'sp1d', text: "Fixed coupon with call features", isCorrect: false }
    ],
    explanation: "Principal-protected notes typically offer full return of principal at maturity regardless of underlying performance, but with capped upside potential in exchange for this protection.",
    category: "Structured Products"
  },
  {
    id: 'sp2',
    text: "What is the main risk associated with autocallable structured products?",
    options: [
      { id: 'sp2a', text: "Exchange rate risk", isCorrect: false },
      { id: 'sp2b', text: "Liquidity risk", isCorrect: false },
      { id: 'sp2c', text: "Interest rate risk", isCorrect: false },
      { id: 'sp2d', text: "Early redemption before maximum potential return", isCorrect: true }
    ],
    explanation: "Autocallable structured products have the risk of being 'called' or redeemed early when certain market conditions are met, potentially limiting the investor's returns compared to staying invested for the full term.",
    category: "Structured Products"
  },
  {
    id: 'sp3',
    text: "Which of the following best describes a reverse convertible structured product?",
    options: [
      { id: 'sp3a', text: "A product that converts from equity to fixed income exposure", isCorrect: false },
      { id: 'sp3b', text: "A high-coupon debt instrument with potential conversion to equity at maturity", isCorrect: true },
      { id: 'sp3c', text: "A product that provides leveraged returns on downward market movements", isCorrect: false },
      { id: 'sp3d', text: "An inflation-protected treasury note", isCorrect: false }
    ],
    explanation: "A reverse convertible typically offers a high coupon rate in exchange for the investor taking on the risk that, at maturity, they might receive shares of the underlying asset instead of cash if the asset's price falls below a predetermined level.",
    category: "Structured Products"
  }
];

// Specialized quiz questions (estate planning)
export const mockEstatePlanningQuestions: Question[] = [
  {
    id: 'ep1',
    text: "Which type of trust is best for estate tax mitigation when transferring appreciating assets?",
    options: [
      { id: 'ep1a', text: "Revocable Living Trust", isCorrect: false },
      { id: 'ep1b', text: "Charitable Remainder Trust", isCorrect: false },
      { id: 'ep1c', text: "Intentionally Defective Grantor Trust (IDGT)", isCorrect: true },
      { id: 'ep1d', text: "Qualified Personal Residence Trust", isCorrect: false }
    ],
    explanation: "An Intentionally Defective Grantor Trust (IDGT) allows the grantor to pay taxes on trust income while removing appreciating assets from their estate, making it especially effective for estate tax mitigation.",
    category: "Estate Planning"
  },
  {
    id: 'ep2',
    text: "Under current law, what is the annual gift tax exclusion amount per recipient for 2023?",
    options: [
      { id: 'ep2a', text: "$10,000", isCorrect: false },
      { id: 'ep2b', text: "$15,000", isCorrect: false },
      { id: 'ep2c', text: "$17,000", isCorrect: true },
      { id: 'ep2d', text: "$20,000", isCorrect: false }
    ],
    explanation: "The annual gift tax exclusion for 2023 is $17,000 per recipient, an increase from the previous $16,000 in 2022, allowing individuals to give up to this amount tax-free to any number of people each year.",
    category: "Estate Planning"
  },
  {
    id: 'ep3',
    text: "Which of the following estate planning tools provides asset protection from creditors?",
    options: [
      { id: 'ep3a', text: "Will", isCorrect: false },
      { id: 'ep3b', text: "Revocable Living Trust", isCorrect: false },
      { id: 'ep3c', text: "Durable Power of Attorney", isCorrect: false },
      { id: 'ep3d', text: "Domestic Asset Protection Trust", isCorrect: true }
    ],
    explanation: "A Domestic Asset Protection Trust (DAPT) is specifically designed to protect assets from future creditors while potentially allowing the grantor to remain a beneficiary, unlike revocable trusts which offer no creditor protection.",
    category: "Estate Planning"
  }
];

// Adding new question sets to match the challenge categories

// Current Affairs questions
export const mockCurrentAffairsQuestions: Question[] = [
  {
    id: 'ca1',
    text: "Which recent economic indicator has most significantly impacted global markets?",
    options: [
      { id: 'ca1a', text: "CPI inflation data", isCorrect: true },
      { id: 'ca1b', text: "Manufacturing PMI", isCorrect: false },
      { id: 'ca1c', text: "Retail sales figures", isCorrect: false },
      { id: 'ca1d', text: "Housing starts", isCorrect: false }
    ],
    explanation: "Recent CPI inflation data has been the primary driver of market reactions, as it directly influences central bank policy decisions on interest rates.",
    category: "Current Affairs"
  },
  {
    id: 'ca2',
    text: "What was the main outcome of the recent G20 economic summit?",
    options: [
      { id: 'ca2a', text: "Agreement on global minimum corporate tax", isCorrect: false },
      { id: 'ca2b', text: "New climate finance commitments", isCorrect: true },
      { id: 'ca2c', text: "Tariff reductions between major economies", isCorrect: false },
      { id: 'ca2d', text: "Digital currency regulations", isCorrect: false }
    ],
    explanation: "The summit resulted in significant new climate finance commitments from developed nations to support emerging economies in their green transition efforts.",
    category: "Current Affairs"
  },
  {
    id: 'ca3',
    text: "Which geopolitical event is currently having the largest impact on energy markets?",
    options: [
      { id: 'ca3a', text: "Middle East tensions", isCorrect: true },
      { id: 'ca3b', text: "European Union policy changes", isCorrect: false },
      { id: 'ca3c', text: "Asian Pacific trade negotiations", isCorrect: false },
      { id: 'ca3d', text: "North American production agreements", isCorrect: false }
    ],
    explanation: "Ongoing tensions in the Middle East have created supply uncertainties and risk premiums in global energy markets, particularly affecting oil prices.",
    category: "Current Affairs"
  }
];

// Private Equity questions
export const mockPrivateEquityQuestions: Question[] = [
  {
    id: 'pe1',
    text: "What is the typical investment horizon for a traditional private equity fund?",
    options: [
      { id: 'pe1a', text: "1-3 years", isCorrect: false },
      { id: 'pe1b', text: "3-5 years", isCorrect: false },
      { id: 'pe1c', text: "5-10 years", isCorrect: true },
      { id: 'pe1d', text: "10-15 years", isCorrect: false }
    ],
    explanation: "Traditional private equity funds typically have an investment horizon of 5-10 years, allowing sufficient time for operational improvements and value creation before exit.",
    category: "Finance"
  },
  {
    id: 'pe2',
    text: "Which metric is most commonly used to evaluate performance in private equity investments?",
    options: [
      { id: 'pe2a', text: "Internal Rate of Return (IRR)", isCorrect: true },
      { id: 'pe2b', text: "Price-to-Earnings Ratio", isCorrect: false },
      { id: 'pe2c', text: "Dividend Yield", isCorrect: false },
      { id: 'pe2d', text: "Beta", isCorrect: false }
    ],
    explanation: "IRR is the primary performance metric in private equity as it measures the annualized return on investments over the life of the fund, accounting for the timing of cash flows.",
    category: "Finance"
  },
  {
    id: 'pe3',
    text: "What is a 'bolt-on acquisition' in private equity strategy?",
    options: [
      { id: 'pe3a', text: "Acquiring a competitor to eliminate market competition", isCorrect: false },
      { id: 'pe3b', text: "Purchasing smaller companies to add to an existing portfolio company", isCorrect: true },
      { id: 'pe3c', text: "Adding debt to increase returns", isCorrect: false },
      { id: 'pe3d', text: "Spinning off underperforming divisions", isCorrect: false }
    ],
    explanation: "A bolt-on acquisition strategy involves purchasing smaller companies to integrate into an existing portfolio company, creating synergies and accelerating growth.",
    category: "Finance"
  }
];

// Retirement Planning questions
export const mockRetirementPlanningQuestions: Question[] = [
  {
    id: 'rp1',
    text: "What is the annual contribution limit for a 401(k) plan for individuals under 50 in 2023?",
    options: [
      { id: 'rp1a', text: "$19,500", isCorrect: false },
      { id: 'rp1b', text: "$20,500", isCorrect: false },
      { id: 'rp1c', text: "$22,500", isCorrect: true },
      { id: 'rp1d', text: "$23,000", isCorrect: false }
    ],
    explanation: "The IRS set the 2023 contribution limit for 401(k) plans at $22,500 for individuals under 50, an increase from the previous year's limit.",
    category: "Planning"
  },
  {
    id: 'rp2',
    text: "Which retirement income strategy aims to preserve principal while living off investment income?",
    options: [
      { id: 'rp2a', text: "4% Rule", isCorrect: false },
      { id: 'rp2b', text: "Income Flooring", isCorrect: false },
      { id: 'rp2c', text: "Systematic Withdrawal", isCorrect: false },
      { id: 'rp2d', text: "Endowment Approach", isCorrect: true }
    ],
    explanation: "The Endowment Approach focuses on preserving principal and generating income through dividends, interest, and other income-producing investments without depleting the principal balance.",
    category: "Planning"
  },
  {
    id: 'rp3',
    text: "What age does the IRS define as Required Minimum Distribution (RMD) age for retirement accounts?",
    options: [
      { id: 'rp3a', text: "59½", isCorrect: false },
      { id: 'rp3b', text: "65", isCorrect: false },
      { id: 'rp3c', text: "70½", isCorrect: false },
      { id: 'rp3d', text: "73", isCorrect: true }
    ],
    explanation: "Following the SECURE 2.0 Act, the age when RMDs must begin is 73 (as of 2023), and it will increase to 75 in 2033.",
    category: "Planning"
  }
];

// Economic Theory questions
export const mockEconomicTheoryQuestions: Question[] = [
  {
    id: 'et1',
    text: "Which economic concept describes the trade-off between inflation and unemployment?",
    options: [
      { id: 'et1a', text: "Supply-side economics", isCorrect: false },
      { id: 'et1b', text: "Monetarism", isCorrect: false },
      { id: 'et1c', text: "Phillips Curve", isCorrect: true },
      { id: 'et1d', text: "Laffer Curve", isCorrect: false }
    ],
    explanation: "The Phillips Curve illustrates the inverse relationship between unemployment rates and inflation, suggesting that lower unemployment may come at the cost of higher inflation.",
    category: "General"
  },
  {
    id: 'et2',
    text: "What does Modern Monetary Theory (MMT) suggest about government spending and deficits?",
    options: [
      { id: 'et2a', text: "They should always be minimized", isCorrect: false },
      { id: 'et2b', text: "They are limited only by inflation", isCorrect: true },
      { id: 'et2c', text: "They must be balanced annually", isCorrect: false },
      { id: 'et2d', text: "They should only increase during economic growth", isCorrect: false }
    ],
    explanation: "MMT proposes that governments issuing their own currency can spend freely until reaching the economy's productive capacity, with inflation being the primary constraint rather than debt levels.",
    category: "General"
  },
  {
    id: 'et3',
    text: "Which of the following best describes the concept of 'creative destruction' in economic theory?",
    options: [
      { id: 'et3a', text: "Government intervention to restructure failing industries", isCorrect: false },
      { id: 'et3b', text: "The process by which new innovations replace older technologies", isCorrect: true },
      { id: 'et3c', text: "Deliberate dismantling of monopolies", isCorrect: false },
      { id: 'et3d', text: "Economic collapse leading to new system formation", isCorrect: false }
    ],
    explanation: "Creative destruction, coined by economist Joseph Schumpeter, describes how the economy evolves when new innovations displace established methods and businesses, driving economic growth while causing disruption.",
    category: "General"
  }
];

// Financial History questions
export const mockFinancialHistoryQuestions: Question[] = [
  {
    id: 'fh1',
    text: "Which event triggered the 2008 global financial crisis?",
    options: [
      { id: 'fh1a', text: "Asian currency crisis", isCorrect: false },
      { id: 'fh1b', text: "Dot-com bubble burst", isCorrect: false },
      { id: 'fh1c', text: "U.S. subprime mortgage collapse", isCorrect: true },
      { id: 'fh1d', text: "European sovereign debt crisis", isCorrect: false }
    ],
    explanation: "The collapse of the U.S. subprime mortgage market led to massive defaults, affecting financial institutions globally and triggering the worst financial crisis since the Great Depression.",
    category: "General"
  },
  {
    id: 'fh2',
    text: "What was the first major stock market crash in modern financial history?",
    options: [
      { id: 'fh2a', text: "Wall Street Crash of 1929", isCorrect: false },
      { id: 'fh2b', text: "Dutch Tulip Mania of 1637", isCorrect: true },
      { id: 'fh2c', text: "South Sea Bubble of 1720", isCorrect: false },
      { id: 'fh2d', text: "Panic of 1873", isCorrect: false }
    ],
    explanation: "Dutch Tulip Mania of 1637 is considered the first documented financial bubble and crash, where tulip bulb prices reached extraordinary heights before collapsing dramatically.",
    category: "General"
  },
  {
    id: 'fh3',
    text: "Which landmark legislation was created in response to the Great Depression to regulate the securities industry?",
    options: [
      { id: 'fh3a', text: "Dodd-Frank Act", isCorrect: false },
      { id: 'fh3b', text: "Sarbanes-Oxley Act", isCorrect: false },
      { id: 'fh3c', text: "Glass-Steagall Act", isCorrect: true },
      { id: 'fh3d', text: "Gramm-Leach-Bliley Act", isCorrect: false }
    ],
    explanation: "The Glass-Steagall Act of 1933 separated commercial and investment banking activities to prevent the speculative activities that contributed to the 1929 crash and subsequent depression.",
    category: "General"
  }
];

// Mock badges data
export const mockBadges: BadgeInfo[] = [
  {
    id: '1',
    name: 'Inflation Expert',
    description: 'Earned by answering 10 inflation questions correctly',
    icon: 'https://img.icons8.com/fluency/48/inflation.png',
    category: 'Subject Mastery',
    unlocked: true,
    unlockedAt: 'May 15, 2023',
  },
  {
    id: '2',
    name: 'Streak Master',
    description: 'Complete quizzes for 7 days in a row',
    icon: 'https://img.icons8.com/fluency/48/fire-element.png',
    category: 'Participation',
    unlocked: true,
    unlockedAt: 'June 2, 2023',
  },
  {
    id: '3',
    name: 'Speed Demon',
    description: 'Answer all questions correctly in under 30 seconds',
    icon: 'https://img.icons8.com/fluency/48/speed.png',
    category: 'Performance',
    unlocked: true,
    unlockedAt: 'June 10, 2023',
  },
  {
    id: '4',
    name: 'Market Sage',
    description: 'Correctly answer 20 market outlook questions',
    icon: 'https://img.icons8.com/fluency/48/bonds.png',
    category: 'Subject Mastery',
    unlocked: false,
    progress: 65,
  },
  {
    id: '5',
    name: 'Perfect Week',
    description: 'Score 100% on all quizzes for a full week',
    icon: 'https://img.icons8.com/fluency/48/prize.png',
    category: 'Achievement',
    unlocked: false,
    progress: 40,
  },
  {
    id: '6',
    name: 'Economics Guru',
    description: 'Master 15 economic theory questions',
    icon: 'https://img.icons8.com/fluency/48/economy.png',
    category: 'Subject Mastery',
    unlocked: false,
  },
  {
    id: '7',
    name: 'Rising Star',
    description: 'Rank in the top 10 for three consecutive days',
    icon: 'https://img.icons8.com/fluency/48/star.png',
    category: 'Achievement',
    unlocked: false,
  },
  {
    id: '8',
    name: 'Alternatives Ace',
    description: 'Answer all alternative investment questions correctly',
    icon: 'https://img.icons8.com/fluency/48/gold-bars.png',
    category: 'Subject Mastery',
    unlocked: false,
    progress: 20,
  },
  {
    id: '9',
    name: 'Consistency King',
    description: 'Maintain a 30-day login streak',
    icon: 'https://img.icons8.com/fluency/48/calendar.png',
    category: 'Participation',
    unlocked: false,
    progress: 15,
  },
  {
    id: '10',
    name: 'Morning Meeting Maven',
    description: 'Complete 10 consecutive Morning Meeting challenges',
    icon: 'https://img.icons8.com/fluency/48/conference-call.png',
    category: 'Special Achievement',
    unlocked: false,
    progress: 60,
  },
  {
    id: '11',
    name: 'Structured Products Pro',
    description: 'Score 100% on the Structured Products challenge',
    icon: 'https://img.icons8.com/fluency/48/stocks-growth.png',
    category: 'Subject Mastery',
    unlocked: false,
    progress: 33,
  },
  {
    id: '12',
    name: 'Estate Planning Expert',
    description: 'Answer all Estate Planning questions correctly',
    icon: 'https://img.icons8.com/fluency/48/will.png',
    category: 'Subject Mastery',
    unlocked: false,
  }
];

// Mock specialized challenges data
export const mockSpecializedChallenges = [
  {
    id: 'sp',
    title: 'Structured Products',
    description: 'Test your knowledge on structured investment products',
    icon: 'https://img.icons8.com/fluency/48/stocks-growth.png',
    questionCount: 3,
    difficulty: 'Advanced',
    estimatedTime: '5 min',
    pointsReward: 100,
    badgeReward: 'Structured Products Pro'
  },
  {
    id: 'ep',
    title: 'Advanced Estate Planning',
    description: 'Challenge yourself on complex estate planning strategies',
    icon: 'https://img.icons8.com/fluency/48/will.png',
    questionCount: 3,
    difficulty: 'Expert',
    estimatedTime: '5 min',
    pointsReward: 120,
    badgeReward: 'Estate Planning Expert'
  }
];

// Mock leaderboard data
export const mockLeaderboardDaily = [
  {
    id: '1',
    name: 'Paula Dolan',
    avatar: 'https://ui-avatars.com/api/?name=Paula+Dolan&background=3b82f6&color=fff',
    position: 1,
    points: 120,
    streak: 9,
    isCurrentUser: false
  },
  {
    id: '2',
    name: 'Karen Donnelly',
    avatar: 'https://ui-avatars.com/api/?name=Karen+Donnelly&background=818cf8&color=fff',
    position: 2,
    points: 105,
    streak: 6,
    isCurrentUser: false
  },
  {
    id: '3',
    name: 'Dave Frame',
    avatar: 'https://ui-avatars.com/api/?name=Dave+Frame&background=a78bfa&color=fff',
    position: 3,
    points: 95,
    streak: 7,
    isCurrentUser: false
  },
  {
    id: '4',
    name: 'Alex Chen',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Chen&background=818cf8&color=fff',
    position: 4,
    points: 90,
    streak: 5,
    isCurrentUser: true
  },
  {
    id: '5',
    name: 'Casey Johnson',
    avatar: 'https://ui-avatars.com/api/?name=Casey+Johnson&background=a78bfa&color=fff',
    position: 5,
    points: 75,
    streak: 6,
    isCurrentUser: false
  },
  {
    id: '6',
    name: 'Riley Parker',
    avatar: 'https://ui-avatars.com/api/?name=Riley+Parker&background=3b82f6&color=fff',
    position: 6,
    points: 65,
    streak: 2,
    isCurrentUser: false
  },
  {
    id: '7',
    name: 'Jamie Williams',
    avatar: 'https://ui-avatars.com/api/?name=Jamie+Williams&background=818cf8&color=fff',
    position: 7,
    points: 60,
    streak: 1,
    isCurrentUser: false
  },
  {
    id: '8',
    name: 'Quinn Thompson',
    avatar: 'https://ui-avatars.com/api/?name=Quinn+Thompson&background=a78bfa&color=fff',
    position: 8,
    points: 55,
    streak: 3,
    isCurrentUser: false
  }
];

export const mockLeaderboardWeekly = [
  {
    id: '2',
    name: 'Alex Chen',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Chen&background=818cf8&color=fff',
    position: 1,
    points: 450,
    streak: 5,
    isCurrentUser: true
  },
  {
    id: '1',
    name: 'Morgan Warren',
    avatar: 'https://ui-avatars.com/api/?name=Morgan+Warren&background=3b82f6&color=fff',
    position: 2,
    points: 425,
    streak: 7,
    isCurrentUser: false
  },
  {
    id: '5',
    name: 'Casey Johnson',
    avatar: 'https://ui-avatars.com/api/?name=Casey+Johnson&background=a78bfa&color=fff',
    position: 3,
    points: 390,
    streak: 6,
    isCurrentUser: false
  },
  {
    id: '3',
    name: 'Jordan Smith',
    avatar: 'https://ui-avatars.com/api/?name=Jordan+Smith&background=a78bfa&color=fff',
    position: 4,
    points: 380,
    streak: 4,
    isCurrentUser: false
  },
  {
    id: '4',
    name: 'Taylor Rodriguez',
    avatar: 'https://ui-avatars.com/api/?name=Taylor+Rodriguez&background=818cf8&color=fff',
    position: 5,
    points: 365,
    streak: 3,
    isCurrentUser: false
  },
  {
    id: '8',
    name: 'Quinn Thompson',
    avatar: 'https://ui-avatars.com/api/?name=Quinn+Thompson&background=a78bfa&color=fff',
    position: 6,
    points: 340,
    streak: 3,
    isCurrentUser: false
  },
  {
    id: '6',
    name: 'Riley Parker',
    avatar: 'https://ui-avatars.com/api/?name=Riley+Parker&background=3b82f6&color=fff',
    position: 7,
    points: 315,
    streak: 2,
    isCurrentUser: false
  },
  {
    id: '7',
    name: 'Jamie Williams',
    avatar: 'https://ui-avatars.com/api/?name=Jamie+Williams&background=818cf8&color=fff',
    position: 8,
    points: 290,
    streak: 1,
    isCurrentUser: false
  }
];

export const mockLeaderboardAllTime = [
  {
    id: '1',
    name: 'Morgan Warren',
    avatar: 'https://ui-avatars.com/api/?name=Morgan+Warren&background=3b82f6&color=fff',
    position: 1,
    points: 2750,
    streak: 7,
    isCurrentUser: false
  },
  {
    id: '5',
    name: 'Casey Johnson',
    avatar: 'https://ui-avatars.com/api/?name=Casey+Johnson&background=a78bfa&color=fff',
    position: 2,
    points: 2520,
    streak: 6,
    isCurrentUser: false
  },
  {
    id: '2',
    name: 'Alex Chen',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Chen&background=818cf8&color=fff',
    position: 3,
    points: 2340,
    streak: 5,
    isCurrentUser: true
  },
  {
    id: '3',
    name: 'Jordan Smith',
    avatar: 'https://ui-avatars.com/api/?name=Jordan+Smith&background=a78bfa&color=fff',
    position: 4,
    points: 2150,
    streak: 4,
    isCurrentUser: false
  },
  {
    id: '4',
    name: 'Taylor Rodriguez',
    avatar: 'https://ui-avatars.com/api/?name=Taylor+Rodriguez&background=818cf8&color=fff',
    position: 5,
    points: 1980,
    streak: 3,
    isCurrentUser: false
  },
  {
    id: '8',
    name: 'Quinn Thompson',
    avatar: 'https://ui-avatars.com/api/?name=Quinn+Thompson&background=a78bfa&color=fff',
    position: 6,
    points: 1850,
    streak: 3,
    isCurrentUser: false
  },
  {
    id: '6',
    name: 'Riley Parker',
    avatar: 'https://ui-avatars.com/api/?name=Riley+Parker&background=3b82f6&color=fff',
    position: 7,
    points: 1630,
    streak: 2,
    isCurrentUser: false
  },
  {
    id: '7',
    name: 'Jamie Williams',
    avatar: 'https://ui-avatars.com/api/?name=Jamie+Williams&background=818cf8&color=fff',
    position: 8,
    points: 1510,
    streak: 1,
    isCurrentUser: false
  }
];

export const mockUserData = {
  name: 'Alex Chen',
  avatar: 'https://ui-avatars.com/api/?name=Alex+Chen&background=818cf8&color=fff',
  stats: {
    totalQuizzes: 43,
    totalPoints: 2340,
    streakDays: 5,
    averageScore: "78%",
    fastestTime: "42 sec",
    quizzesThisMonth: 12
  }
};
