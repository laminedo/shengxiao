// The monthly reading.
// {self} is the reader's element, {month} the element of the month's stem, {animal} the
// month's animal, {sign} the reader's year sign and {seat} their day sign.
import type { Relation } from './dayNotes'
import type { Lead, Level } from './types'

// One entry per Ten God: what the month is, then how to use it.
export const MONTH_THEMES: { title: string; text: [string, string] }[] = [
  {
    title: "Your own ground",
    text: [
      "This month's {month} is your own element. For a few weeks the calendar is made of the same stuff as you, and it shows as a firmer sense of who you are and what you will no longer put up with. Confidence rises without needing a reason.",
      "Use it for the things that depend on you alone: a decision long postponed, a project with your name on it, a return to form. Peers and old friends matter more than usual. The one caution is money, which tends to leave in the company of friends. Be generous with your time instead.",
    ],
  },
  {
    title: "Good company, strong opinions",
    text: [
      "The month carries your own element with the polarity reversed, the pattern of peers and rivals. Expect a sociable, competitive few weeks. People who do what you do come closer, some to help and some to compete, and both push you to raise your game.",
      "It is a fine month for teamwork, joint efforts and anything that needs numbers. It is a leaky one for money: shared bills, impulsive rounds, loans to friends. Keep accounts clear and agreements written. Point the competitive streak at your own targets, where it does the most good.",
    ],
  },
  {
    title: "A month with room to breathe",
    text: [
      "Your {self} feeds this month's {month}, gently and in the same polarity. Tradition calls this the star of appetite and ease. Abilities you already have flow without effort, and life offers more ordinary pleasures than usual: good meals, good talk, work that goes well.",
      "Make things. Whatever your craft is, this is the month to practise it and to let people see the results. Income tends to follow quietly from doing what you do well. Guard only against drifting: a pleasant month can pass without leaving a mark unless you choose one thing to finish.",
    ],
  },
  {
    title: "Ideas ahead of the room",
    text: [
      "Your {self} pours into this month's {month} in its sharper form. Wit, originality and impatience all rise together. You will see better ways to do almost everything, and you will find it hard to keep quiet about them.",
      "Give the energy a proper outlet: a creative project, a redesign, a performance, a bold proposal. This is when your most original work gets made. Handle authority with care, because rules and managers will irritate you more than they deserve. Say the critical thing in private, with a solution attached, or save it for next month.",
    ],
  },
  {
    title: "Open doors",
    text: [
      "Your {self} masters this month's {month}, and it comes in its mobile, sociable form: money and luck that travel through people. The month is lively. Invitations multiply, chance meetings lead somewhere, and opportunities appear from the side.",
      "Say yes more often than usual and follow up quickly, because these openings will not wait. Side ventures, sales and negotiations are all favoured, and generosity tends to come back. The risk is scattering yourself, or staking too much on a hunch. Keep the bets small and the diary realistic.",
    ],
  },
  {
    title: "Steady gains",
    text: [
      "Your {self} masters this month's {month} in its patient, countable form. This is the month of earned results. Effort converts into something you can measure, whether that is money, finished work or a household in better order.",
      "Put your attention on practical matters: budgets, contracts, maintenance, the plain tasks that secure your position. Commitments made now tend to be kept, in love as much as in business. There is little glamour in it and a good deal of satisfaction. Avoid only the temptation to work straight through your rest.",
    ],
  },
  {
    title: "A month that tests you",
    text: [
      "This month's {month} bears directly on your {self}. Tradition names this the hardest of the ten influences, and also the one behind most real achievement. Demands increase. Deadlines, rivals or a difficult person may press on you.",
      "Meet it with discipline instead of defiance. Decide quickly, act firmly and keep your word, and the same pressure that wears others down will lift you. Look after your body, because stress will try to settle in it: sleep, exercise and an hour off each day are part of the strategy. Avoid needless risks and needless fights.",
    ],
  },
  {
    title: "In good standing",
    text: [
      "This month's {month} governs your {self} in its orderly form. Responsibility, reputation and the people you answer to all come into focus. It is a month that rewards whoever does things properly.",
      "Formal matters go well: applications, reviews, contracts, anything official. If you want recognition or a promotion, this is a sound time to earn it and to ask. Keep to the rules, including the dull ones, and be punctual. The weight of obligation may feel heavy at times. Carry it steadily and it turns into respect.",
    ],
  },
  {
    title: "The inward month",
    text: [
      "This month's {month} feeds your {self} by the indirect route, the one tradition associates with intuition, unusual knowledge and solitude. Your mind works deeply and a little apart. You may want less company and more time to think.",
      "Honour that. Study, research and specialist work thrive now, and a hunch followed carefully can lead somewhere valuable. Watch for the shadow side: overthinking, suspicion, skipped meals and broken routines. Keep one or two people close enough to tell you when you have gone round the same thought too many times.",
    ],
  },
  {
    title: "A month that looks after you",
    text: [
      "This month's {month} feeds your {self} directly. It is the most supportive of the ten influences. Help arrives when you need it, older or wiser people are well disposed, and your own reserves refill.",
      "Use the month to learn, to plan and to recover. Courses, qualifications and paperwork that protects you are all favoured, and so is time with family. Accept what is offered. The only way to waste a month like this is to coast through it; let the comfort prepare you for what comes next.",
    ],
  },
]

// The season each month belongs to, by the month's branch (Rat first).
export const MONTH_SEASONS = [
  "The Rat month is the depth of winter and the time of the solstice, when the light begins its return. On the surface little moves. Underneath, the next year is being decided.",
  "The Ox month is the last of winter, the coldest and the most patient. It favours endurance, tidying up and finishing old business before spring arrives.",
  "The Tiger month opens spring in the old calendar. The ground is still cold, but everything in it has started to move. It is a month for first steps and bold intentions.",
  "The Rabbit month is the heart of spring, the time of the equinox. Growth is fast and tender. It favours gentleness, diplomacy and anything newly begun.",
  "The Dragon month closes spring with rain and restless weather. Change is in the air. It is a month for big plans, and for clearing the ground they need.",
  "The Snake month opens summer. Warmth returns and things quicken. It favours thinking before acting, and then acting precisely.",
  "The Horse month is high summer, the time of the solstice, when yang reaches its peak. Energy and tempers both run hot. It is a month for action and visibility.",
  "The Goat month is the last and warmest of summer. The fields are full and the pace slows. It favours care, company and bringing things gently to ripeness.",
  "The Monkey month opens autumn, though the heat lingers. The air sharpens and so do minds. It is a month for cleverness, movement and changes of plan.",
  "The Rooster month is the middle of autumn, the time of the equinox and the harvest moon. It favours precision, finishing touches and gathering in what you have grown.",
  "The Dog month closes autumn. Leaves fall, stores are filled, and doors are checked before winter. It is a month for loyalty, repairs and settling accounts.",
  "The Pig month opens winter. The year's work is largely done and the nights draw in. It favours rest, generosity and quiet planning.",
]

// The month's animal against the reader's year sign.
export const MONTH_SIGN: Record<Relation, Lead[]> = {
  clash: [
    { title: "A month of movement", text: "The {animal} month sits opposite your sign. For the {sign} this is traditionally the year's most unsettled month: plans change, journeys come up, and familiar arrangements shift. Stay flexible. It is better for adapting than for launching, so keep major commitments for next month if you can." },
    { title: "Against your sign", text: "This is the {animal}'s month, and the {animal} opposes the {sign}. Expect more interruptions than usual and at least one change you did not choose. Treat it as a clearing-out. What moves this month often needed to move; hold lightly to plans and avoid forcing outcomes." },
  ],
  six: [
    { title: "Your partner sign's month", text: "The {animal} is the {sign}'s secret friend, so this is one of your easiest months of the year. Helpful people appear, partnerships run smoothly, and requests are well received. It is a good month to mend a relationship or to begin one." },
    { title: "A friend in the calendar", text: "This month belongs to the {animal}, which pairs with the {sign}. Cooperation comes readily. Put joint projects, negotiations and introductions here, and look out for one person in particular who makes things easier." },
  ],
  three: [
    { title: "An allied month", text: "The {animal} belongs to the same family of signs as the {sign}. Months like this carry you along: people are willing, timing works out, and efforts started now attract support. Push your main project forward." },
    { title: "Wind in your favour", text: "It is the {animal}'s month, and the {animal} is a natural ally of the {sign}. You will find less resistance than usual. It suits group ventures, public efforts and asking for backing." },
  ],
  harm: [
    { title: "A month for plain speaking", text: "The {animal} sits awkwardly with the {sign}. The month is prone to small misunderstandings and the feeling of being quietly undermined. Most of it is noise. Be explicit about arrangements, put agreements in writing, and give people the benefit of the doubt." },
    { title: "Minor friction", text: "This is the {animal}'s month, and for the {sign} it brings a little grit: crossed wires, favours unreturned, a colleague in a mood. None of it runs deep. Keep things simple and check details." },
  ],
  same: [
    { title: "Your own month", text: "This is the {sign}'s own month. You are more visible and more yourself than at any other time of year, which amplifies both strengths and habits. It is a good month for personal resets, and one in which to move thoughtfully." },
    { title: "The {sign} in season", text: "The month shares your sign. Tradition reads this as a time of heightened presence: attention comes your way, wanted or not. Tend to your health and your plans, and take big steps deliberately." },
  ],
}

// The month's animal against the reader's day sign.
export const MONTH_SEAT: Record<Relation, Lead[]> = {
  clash: [
    { title: "Changes at home", text: "The {animal} month opposes your day sign, the {seat}, which speaks for home and partnership. Domestic life may be unsettled: a move, a change of routine, a partner under strain. Be patient indoors, and keep big personal decisions for a calmer month." },
    { title: "Unsettled close to home", text: "This month clashes with the {seat} in your day pillar. Private life is the part most likely to feel it. Give the people you live with extra room, and avoid ultimatums." },
  ],
  six: [
    { title: "Harmony at home", text: "The {animal} pairs with your day sign, the {seat}. Home and partnership are especially well favoured. It is a lovely month for commitment, for reconciliation, or simply for enjoying the person you chose." },
    { title: "Close relationships flourish", text: "This month is the natural partner of the {seat} in your day pillar. Affection is easy and understanding comes quickly. Make time for it." },
  ],
  three: [
    { title: "A warm household", text: "The {animal} is an ally of your day sign, the {seat}. Family life and close friendships are cooperative and good-humoured. A good month for shared plans and domestic projects." },
    { title: "Easy at home", text: "This month is in harmony with the {seat} in your day pillar. The people nearest to you are supportive. Use the goodwill to sort out anything practical you have both been putting off." },
  ],
  harm: [
    { title: "Care with those closest", text: "The {animal} rubs against your day sign, the {seat}. Small domestic irritations are likelier this month. Keep them small: say what you need plainly, and let the minor things go." },
    { title: "A little friction indoors", text: "This month sits uneasily with the {seat} in your day pillar. Watch for misunderstandings with a partner or family member. Check before assuming." },
  ],
  same: [
    { title: "Your day sign's month", text: "The month repeats your day sign, the {seat}. Matters of home, partnership and your own needs come forward. A good time to put your private life in order." },
    { title: "An echo at home", text: "This is the month of the {seat}, the sign of the day you were born. Personal questions feel more pressing. Give them proper attention instead of working around them." },
  ],
}

// {el} is an element the month carries.
export const MONTH_ELEMENT: { welcome: string[]; excess: string[] } = {
  welcome: [
    "The month carries {el}, which your chart welcomes. That gives the whole period a supportive undertone, whatever its details.",
    "{el} runs through this month, and your chart is glad of it. You will find you tire less and recover faster.",
  ],
  excess: [
    "The month is heavy with {el}, which your chart already has plenty of. Pace yourself, and simplify where you can.",
    "This month adds {el} to a chart that has enough. Expect to feel stretched at times; plan for more rest than usual.",
  ],
}

// The month in three ten-day stretches. {best} and {low} are days within the stretch.
export const MONTH_THIRDS: Record<'opening' | 'middle' | 'closing', Record<Level, string[]>> = {
  opening: {
    strong: [
      "The month opens at its best. The first ten days have the most energy in them, and {best} is the pick. Start what you mean to finish, and make your important requests early.",
      "Begin briskly. The opening third is the strongest part of the month, with {best} standing out. Whatever matters most belongs here.",
      "The early days carry real momentum. Use them: {best} in particular is a day to act. Things set in motion now have the whole month to grow.",
    ],
    steady: [
      "The month begins on level ground. The first ten days are for settling in and getting organised. {best} is the most useful of them.",
      "An even start. Nothing in the opening third demands much or offers much, so lay foundations. If you need a good day, {best} is it.",
      "The first stretch is steady and unremarkable, which makes it right for preparation. Keep {best} for anything that needs a little lift.",
      "The first ten days set an ordinary pace. Use them to get your bearings. {best} stands a little above the rest, and {low} a little below.",
      "No strong pull either way as the month opens. Start the routine things and keep the important ones for {best}.",
    ],
    soft: [
      "The month starts slowly. The first ten days are the weakest part, and {low} is the one to keep clear. Ease in; nothing is lost by waiting.",
      "Expect a heavy opening. Energy is low at the start, most of all around {low}. Hold your plans back until the month finds its feet.",
      "The early days take patience. Keep commitments light, on {low} especially, and save your best efforts for later in the month.",
    ],
  },
  middle: {
    strong: [
      "The middle of the month is the high ground. From the 11th to the 20th things run your way, and {best} is the best day of all. Put the centrepiece of your month here.",
      "Mid-month brings the lift. The second ten days are the strongest, peaking around {best}. Act, ask and decide in this stretch.",
      "The heart of the month is where the energy is. Schedule what matters between the 11th and the 20th, with {best} as first choice.",
    ],
    steady: [
      "The middle ten days hold steady. Keep working at what you started. {best} is the day with the most in it.",
      "Mid-month is even-tempered. It suits continuing more than beginning. For anything important, choose {best}.",
      "Nothing dramatic through the middle of the month. Routine carries you. {best} is worth marking.",
      "The middle stretch carries on much as the first. Keep your rhythm. Mark {best} for anything that needs goodwill, and go quietly on {low}.",
      "From the 11th to the 20th the going is even. It is a stretch for persistence. {best} is the day to ask for something.",
    ],
    soft: [
      "The month sags in the middle. Between the 11th and the 20th, do less and expect less; {low} is the low point. Use the time for maintenance.",
      "Mid-month is the stretch to handle gently. Energy dips, most noticeably around {low}. Avoid placing anything crucial here.",
      "The central days are the hardest going. Keep them simple, and treat {low} as a rest day if you can.",
    ],
  },
  closing: {
    strong: [
      "The month finishes well. The last third is its strongest, and {best} is the day to aim for. Hold something important back so that you can place it here.",
      "Things come good towards the end. From the 21st the going is easier, with {best} the best of it. Close deals and finish projects in this stretch.",
      "The final days carry the most energy. If the earlier part of the month felt slow, this is where it pays off. Mark {best}.",
    ],
    steady: [
      "The month closes quietly. The last third is steady; use it to tie things off. {best} is the best of the remaining days.",
      "An even finish. From the 21st, finish what is open and prepare for next month. {best} has a little extra in it.",
      "The closing days are calm and workable. Nothing needs rushing. Keep {best} for whatever still matters.",
      "The last third keeps a level course. Finish what you can and line up what is next. {best} is the best of these days, and {low} the one to keep light.",
      "The month ends as evenly as it ran. Use the final days to close loops. If one thing still needs a good day, give it {best}.",
    ],
    soft: [
      "The month tires towards its end. From the 21st, wind down; {low} is the day to keep empty. Finish early what you can.",
      "Energy fades in the last third, reaching its lowest near {low}. Leave no important business for the final week.",
      "The closing days are the heaviest. Plan a light finish, treat {low} with care, and rest before the new month begins.",
    ],
  },
}

// One line to carry through the month, two per Ten God.
export const MONTH_COUNSEL: string[][] = [
  ["Decide what is yours to do this month, and do that.", "Trust your own footing, and keep your hand off your wallet."],
  ["Let good rivals make you better.", "Share the work, split the credit, guard the purse."],
  ["Do what you do well, and enjoy doing it.", "Finish one thing made with pleasure."],
  ["Put the brilliance into the work and keep it out of the argument.", "Make something new. Offend no one who signs things."],
  ["Go out, say yes, and follow up.", "Keep luck moving, and keep the stakes small."],
  ["Look after what you have built.", "Plain work, properly done, is this month's fortune."],
  ["Be braver than the pressure and calmer than the room.", "One hard thing at a time, and rest between."],
  ["Do it properly and let it be seen.", "Keep your word, especially the small ones."],
  ["Think deeply, then come up for air.", "Follow the hunch as far as the facts."],
  ["Receive well, and get ready.", "Let yourself be helped, then use the strength."],
]
