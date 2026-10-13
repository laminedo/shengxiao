// The weekly reading.
import type { Area, Lead, Level } from './types'

/** The shape the seven daily scores make. */
export type Arc = 'rising' | 'falling' | 'peak' | 'dip' | 'even'
/** How the week's average stands. */
export type Height = 'bright' | 'steady' | 'careful'

export const WEEK_OVERVIEWS: Record<Arc, Record<Height, Lead[]>> = {
  rising: {
    bright: [
      { title: "A week that keeps improving", text: "The week starts well and gets better. Each day has a little more in it than the last, so there is no need to rush your best material out on the first morning. Lay the groundwork early, and save what matters most for the final days." },
      { title: "Building to a strong finish", text: "Energy climbs steadily through the week, and it starts from a good height. Use the opening days to prepare and the closing ones to act. Whatever you launch late in the week has the wind fully behind it." },
    ],
    steady: [
      { title: "A slow start, a better end", text: "The opening days are ordinary and a little flat. Momentum arrives as the week goes on. Treat the first half as preparation, keep expectations modest, and put the important conversations and decisions after the midpoint." },
      { title: "It gets easier", text: "Nothing is wrong with the start of this week; it simply has less lift than the end of it. Clear routine work out of the way first. By the closing days you will have more energy and fewer obstacles." },
    ],
    careful: [
      { title: "Uphill, then level ground", text: "The first days of this week ask for patience. Things are slower and people pricklier than you would like. It eases. Keep the early part small and simple, postpone what can be postponed, and let the later days carry the weight." },
      { title: "Hold on for the second half", text: "A week that begins against the grain and gradually comes round. Spend the hard days on things that only need doing, and keep decisions that need judgement for the end of the week, when yours will be clearer." },
    ],
  },
  falling: {
    bright: [
      { title: "Start strong", text: "The best of this week comes first. The opening days are bright and things move quickly, then the pace eases. Put the important things at the front: the ask, the launch, the difficult meeting. Later in the week, consolidate." },
      { title: "Use the early days", text: "A generous week that gives most at the beginning. Act on your priorities straight away, while everything is running your way. The closing days are still pleasant; they are simply better for finishing than for starting." },
    ],
    steady: [
      { title: "Front-load the week", text: "Energy is at its best in the first few days and thins out after that. Do the demanding work early. By the end of the week you will want a lighter list, so write one now." },
      { title: "A week that winds down", text: "The week opens steadily and loses a little pace each day. Nothing dramatic, but worth planning around. Schedule what needs your full attention before the midpoint and leave the end for loose ends and rest." },
    ],
    careful: [
      { title: "Do what matters first", text: "This is a week to handle gently, and the early days are the kindest part of it. Get the essential things done at the start. As the week goes on, do less, expect less, and protect your evenings." },
      { title: "Ease off as you go", text: "The week begins unevenly and grows heavier towards its close. Take the necessary steps early and decline anything optional later on. A quiet finish to the week is the goal." },
    ],
  },
  peak: {
    bright: [
      { title: "A high point midweek", text: "A good week with a clear summit in the middle. The days either side are fine; the midweek days are the ones to aim at. Put your most important business there, and use the start and end for preparation and follow-through." },
      { title: "Aim for the middle", text: "The week rises to its best around the midpoint and then settles. That gives you a natural shape: build up, act, tidy up. Whatever needs luck as well as effort belongs in the middle." },
    ],
    steady: [
      { title: "The middle of the week is yours", text: "The edges of this week are ordinary and the centre is good. Keep the opening days for routine, do the thing that matters at midweek, and let the last days be light." },
      { title: "One good stretch", text: "There is a window in the middle of this week when things go more easily. It is short, so decide in advance what you will use it for. The rest of the week is for steady, unambitious work." },
    ],
    careful: [
      { title: "A window in a difficult week", text: "Most of this week takes patience, but the middle of it opens up. Save anything delicate for those days. At either end, keep to essentials and give yourself more time than you think you need." },
      { title: "Wait for midweek", text: "A hard-edged week with a softer centre. Begin slowly, act at the midpoint, and withdraw again towards the end. One thing done well in the middle is a good week's work." },
    ],
  },
  dip: {
    bright: [
      { title: "A pause in the middle", text: "A strong week with a quieter stretch at its centre. The opening and closing days are the ones with real lift. Use the midweek lull to catch your breath and check your work, then finish strongly." },
      { title: "Two good ends", text: "The week is bright at the start and bright again at the finish, with a dip between. Split your plans accordingly: begin something early, leave it alone midweek, and complete it in the last days." },
    ],
    steady: [
      { title: "Mind the middle", text: "The start and the end of this week are steady. The middle sags. Avoid placing anything important at the midpoint; keep those days for maintenance, and pick things up again as the week closes." },
      { title: "A dip to plan around", text: "Energy drops in the centre of the week and recovers afterwards. Knowing that is most of the solution. Do the weighty things early, coast through the middle, and use the final days to catch up." },
    ],
    careful: [
      { title: "Go gently through the middle", text: "A week that needs care, most of all in the middle days. Keep those as empty as you can. What must be done is better done at the very start or the very end, when the going is a little easier." },
      { title: "Low tide midweek", text: "This week runs low and reaches its lowest at the centre. Nothing needs forcing. Reduce the list, look after yourself through the midpoint, and expect to feel distinctly better by the last day." },
    ],
  },
  even: {
    bright: [
      { title: "A good week from end to end", text: "Every day of this week has something going for it. With no weak stretch to plan around, you can afford to be ambitious. Spread your important business across the week instead of crowding it into one day." },
      { title: "Steadily bright", text: "The week holds a high, even level throughout. It is a week for sustained effort: start on the first day and keep the same pace to the last. Consistency will do more for you now than any single push." },
    ],
    steady: [
      { title: "An even keel", text: "No peaks and no troughs to speak of. Each day is much like the one before, which makes this a week for routine, steady progress and long tasks that need the same attention every day." },
      { title: "A level week", text: "The week runs at one sensible speed. Nothing will carry you and nothing will stop you. Choose a project that benefits from daily, unglamorous effort and give it the whole week." },
    ],
    careful: [
      { title: "A week to pace yourself", text: "The week is uniformly demanding, without a bright day to rescue it or a terrible one to dread. Go at three-quarters speed throughout. Keep commitments few, rest properly each night, and it will pass without incident." },
      { title: "Low and level", text: "Energy stays below its usual mark all week. The consistency is a kind of mercy: you know what each day will be. Plan less, finish what is in hand, and leave new ventures for a better stretch." },
    ],
  },
}

// What a run of one or two days is about, by GROUPS in the glossary.
export const WEEK_PHASES: string[][] = [
  [
    "These are days for standing on your own feet. You will have opinions and the energy to act on them. Do the work only you can do, and make the decisions that have been waiting for you.",
    "Self-reliance is the theme. Other people's schedules matter less than usual and your own priorities matter more. Good for solo work, for training, and for time with friends who are your equals.",
    "The calendar hands you back to yourself. Expect a firmer sense of what you want, and some friction with anyone who wants otherwise. Use the confidence. Watch the purse when friends are around.",
    "Independence comes naturally here. Take the initiative on your own projects and let joint ones tick over. Peers are good company; rivals are good motivation.",
    "You will be more yourself than usual, strengths and stubbornness included. Put the strength to work early. The stubbornness can wait in the car.",
    "A stretch that favours going your own way. Set your own timetable where you can. It is a good moment to back your judgement, and a poor one to lend money.",
  ],
  [
    "Your talents come to the surface. Whatever you make, say or perform carries well. Give time to creative work, to teaching, and to pleasure for its own sake.",
    "The mood is expressive. Ideas want out, and so do opinions. Channel both into something made: a piece of writing, a meal, a plan, a pitch. Enjoy yourself along the way.",
    "This is when what you do looks effortless. Lean on skills you already have. Share them, show them, charge for them. Keep an eye on your tongue when you are being clever.",
    "A productive, pleasant stretch. You give out more than you take in, so eat well and rest properly. Good for anything with an audience, however small.",
    "Creative energy runs through this part of the week. Start with the task you would do for nothing. The pleasure you take in it will show in the result.",
    "A time for making things and saying things. Your wit is quick and your hands are sure. Aim both at work that deserves them, and spare your colleagues the commentary.",
  ],
  [
    "Money and tangible results come to the front. Whatever the mood of the days themselves, this is when to look at prices, invoices and what your effort is actually worth.",
    "Practical matters take over. This part of the week rewards anything with a measurable outcome: sales, budgets, finished jobs. Opportunities arrive through people, so answer your messages.",
    "The calendar turns commercial. You are better than usual at seeing what things are worth and at getting it. Negotiate, collect, close. Leave room for one piece of luck.",
    "This stretch is about what you can hold in your hand at the end of it. Finish, deliver, be paid. Generosity is also favoured, provided it is deliberate.",
    "Work that pays is the focus. Chase what you are owed and price what you offer. A side venture deserves an hour too. Avoid anything that promises a great deal for very little.",
    "Results are within reach here. Effort converts into something countable more directly than at other times. Choose the task with the clearest reward and put it first.",
  ],
  [
    "Responsibility arrives. Deadlines, obligations and the people you answer to are all more present. Meet them properly. Being reliable now builds a reputation that lasts.",
    "The pressure goes up a notch. Something will ask for discipline, perhaps courage. Deal with the hardest item first, keep your temper, and stay on the right side of every rule.",
    "This part of the week belongs to duty. It suits official business, difficult decisions and anything that has to be done correctly. Look after your body; tension will try to settle in it.",
    "A demanding stretch. The calendar puts weight on you and watches how you carry it. Prepare well, speak briefly, and pick no fights. Recognition follows, a little late.",
    "Structure is the theme, whether you welcome it or not. Use it: timetables, procedures and clear promises will all serve you. Save experiments and arguments for another part of the week.",
    "Expectations are high, including your own. Do one difficult thing well and let that be enough. Rest is part of the job.",
  ],
  [
    "The calendar eases off and offers support. This is a time for taking in: advice, information, sleep, good food. Plans made now are well founded. Let someone help you.",
    "A restoring stretch. Energy that has been going out starts to come back. Study, read, think, recover. If you need a favour from someone senior, ask here.",
    "Learning and protection are the themes. You will absorb things easily and be better looked after than usual. Use the time to prepare. Resist the pull towards doing nothing at all.",
    "A quieter part of the week by nature. The mind works well away from noise, and intuition is reliable. Give yourself room to think and somewhere comfortable to do it.",
    "Support is close by. Mentors, elders and old friends are well disposed towards you. Take their advice seriously, catch up on rest, and sort out the paperwork that keeps you safe.",
    "A pause in the week's demands. Nothing here needs force. Refill, reflect and get your information straight before the next push.",
  ],
]

// Why the week's strongest and weakest days are what they are.
// {weekday} is the day, {animal} its animal, {sign} the reader's sign, {el} an element,
// {god} the day-type's plain name, {hint} what it favours and {watch} what it risks.
export const WEEK_BEST: Record<'six' | 'three' | 'element' | 'theme', string[]> = {
  six: [
    "{weekday} is the day to aim at. It is a {animal} day, and the {animal} is the {sign}'s secret friend: people say yes more easily and plans tend to hold.",
    "The pick of the week is {weekday}. The {animal} governs it, and the {animal} pairs naturally with the {sign}. Put anything that needs another person's goodwill on that day.",
    "Circle {weekday}. A {animal} day is the friendliest of the twelve for a {sign}. Agreements, introductions and requests all go better than usual.",
    "Keep {weekday} for whatever matters most. It belongs to the {animal}, the {sign}'s partner sign, and on days like that the right person tends to say the right thing.",
  ],
  three: [
    "{weekday} stands out. It is a {animal} day, and the {animal} is one of the {sign}'s natural allies. Good for team efforts and for anything that needs support.",
    "Your strongest day is {weekday}. The {animal} is in harmony with the {sign}, so things started then find helpers. Schedule the group plan or the big ask there.",
    "{weekday} has the wind behind it. The day's {animal} and your {sign} belong to the same family of signs. Use it for whatever matters most this week.",
    "Put {weekday} at the centre of your week. It is a {animal} day, and the {animal} and the {sign} have always worked well together. Help turns up when you ask for it.",
    "{weekday} is the one to use. The {animal} is a natural ally of the {sign}, and on its day people tend to fall in with your plans. Ask, propose, begin.",
  ],
  element: [
    "{weekday} is the strongest day. It carries {el}, an element your chart is glad to have, and the difference will show in how easily things go.",
    "Aim for {weekday}. The day is rich in {el}, which your chart welcomes. It is the natural home for this week's most important piece of business.",
    "The best of the week is {weekday}, a {el} day. That element steadies your chart. Put the demanding or delicate thing there.",
    "{weekday} is your best day. {el} is an element your chart is glad of, and the day has plenty of it. Use it for something you care about.",
  ],
  theme: [
    "{weekday} is the pick of the week. It is a {god} day at full strength, good for {hint}.",
    "Your strongest day is {weekday}. The day's element sits well with yours; in the old terms it is a {god} day, which favours {hint}.",
    "Circle {weekday}. Nothing dramatic marks it out. It is simply a {god} day in good order, and the right place for {hint}.",
    "The strongest day is {weekday}, a {god} day with a clear run ahead of it. Use it for {hint}.",
  ],
}

export const WEEK_LOW: Record<'clash' | 'harm' | 'element' | 'theme', string[]> = {
  clash: [
    "{weekday} needs a lighter touch. The {animal} sits opposite the {sign}, and days like that tend to rearrange themselves. Keep the diary loose and the big conversations for another day.",
    "Go carefully on {weekday}. It is a {animal} day, the {sign}'s opposite sign. Expect changes of plan. Avoid launches, long journeys and arguments if you have the choice.",
    "The day to watch is {weekday}. The {animal} clashes with the {sign}, which usually shows up as delay and short tempers. Plan little and you will lose little.",
    "Leave room around {weekday}. It is the {animal}'s day, and the {animal} stands opposite the {sign}. Things planned for it tend to move, so plan things that can.",
    "{weekday} is the unsettled one. A {animal} day pulls against a {sign}, and it shows as interruptions and second thoughts. Decide nothing important and you will be glad of it the day after.",
  ],
  harm: [
    "{weekday} is the awkward one. The {animal} rubs against the {sign}, so small misunderstandings are likelier. Say things plainly and confirm arrangements.",
    "Take {weekday} slowly. A {animal} day sits uneasily with a {sign}. Nothing serious; simply check details twice and take nothing personally.",
    "The low point is {weekday}, a {animal} day. For the {sign} that means minor friction with people nearby. Keep requests clear and expectations modest.",
    "Mind how you go on {weekday}. It is a {animal} day, which for the {sign} tends to mean crossed wires. Put things in writing and read messages twice before replying.",
  ],
  element: [
    "{weekday} is the heaviest day. It piles on {el}, which your chart already has too much of. Keep the schedule light and expect to tire sooner.",
    "Go easy on {weekday}. The day is thick with {el}, and that tips your chart off balance. Do the minimum well and leave the rest.",
    "The day to keep simple is {weekday}. Its {el} works against your chart's balance. Nothing need go wrong if you ask less of yourself.",
    "{weekday} asks the most of you. The day brings more {el} than your chart can comfortably use. Lower your sights for those hours and pick things up again afterwards.",
  ],
  theme: [
    "{weekday} is the day to take slowly. It is a {god} day at a low ebb, and the thing to watch is {watch}.",
    "The weakest day is {weekday}. In the old terms it is a {god} day without much support. Guard against {watch}, and keep plans small.",
    "Go gently on {weekday}, a {god} day with little behind it. The risk is {watch}. An early night will help.",
    "Keep {weekday} light. It is a {god} day with the wind against it. Watch for {watch}, do what is necessary, and stop.",
  ],
}

export const WEEK_FLAT = [
  "No single day stands far above or below the others, so plan around your own priorities instead of the calendar's.",
  "The days are closely matched this week. Pick your moments by what suits you; the calendar has no strong view.",
  "There is no clear best or worst day. That makes the week easy to plan: put things where they are convenient.",
]

// What each Ten God's day is good for, and what it risks. Both complete a sentence.
export const GOD_HINTS = [
  "decisions that are yours alone",
  "team efforts and friendly competition",
  "making things and enjoying them",
  "bold ideas and performances",
  "chance meetings and quick deals",
  "steady work and money matters",
  "the hard task, done fast",
  "official business and first impressions",
  "study and quiet thinking",
  "rest, advice and learning",
]

export const GOD_WATCH = [
  "stubbornness",
  "rivalry and loose spending",
  "idling",
  "sharp words",
  "overpromising",
  "fussing over small sums",
  "pressure and short tempers",
  "red tape",
  "overthinking",
  "inertia",
]

// The week in each part of life. {best} is that area's best day and {hint} what the day suits.
export const WEEK_AREAS: Record<Area, Record<Level, string[]>> = {
  love: {
    strong: [
      "A warm week for close relationships. People are easier to reach and you are easier to like. If there is a conversation you have been saving, have it. {best} is the best day, and it favours {hint}.",
      "Affection flows without much effort this week. Make plans, accept invitations, say the kind thing out loud. Keep {best} free if you can: it suits {hint}.",
      "Love is well starred. Single or settled, you will find people responsive. Take the initiative at least once. The high point is {best}, a day for {hint}.",
      "Relationships are a source of strength this week. Lean on them and feed them. Plan something for {best}, which is made for {hint}.",
    ],
    steady: [
      "Relationships tick along this week without drama. Small attentions count for more than grand plans. {best} is the warmest day; use it for {hint}.",
      "An ordinary week for love, in the good sense. Keep in touch, keep your promises, and go looking for no problems. If you want to plan one thing, plan it for {best}: the day suits {hint}.",
      "Neither fireworks nor friction. It is a week for the everyday kindnesses that hold things together. {best} has the most warmth in it and favours {hint}.",
      "Steady going in close relationships. Listen a little more than you speak. The best evening of the week is {best}, good for {hint}.",
      "Close relationships hold their usual shape this week, and that is worth something. Do one thoughtful thing that nobody asked for. {best} is the natural day for it, since it suits {hint}.",
      "Love asks for nothing special this week and offers a quiet sort of comfort. Keep the small rituals going. If you want an occasion, make it {best}, a day for {hint}.",
      "An unremarkable week in matters of the heart, and no worse for that. Be reliable and be kind. {best} carries the most warmth and is good for {hint}.",
      "Affection runs at its ordinary level. Nothing needs fixing and nothing needs proving. Put a little extra into {best}, which favours {hint}.",
    ],
    soft: [
      "Close relationships need patience this week. Moods are uneven, yours included. Avoid ultimatums and long late-night talks. {best} is the gentlest day; keep it for {hint}.",
      "A testing week for love. Misunderstandings come cheaply. Give people room, and say less when you are tired. If something needs discussing, {best} is the day, since it favours {hint}.",
      "Affection is there but harder to hear over the week's noise. Lower the stakes: small gestures, no tests. {best} is the kindest day, and the one for {hint}.",
      "Go gently with the people closest to you. This week magnifies small slights. Be the first to let one pass. {best} is your best day for {hint}.",
    ],
  },
  work: {
    strong: [
      "A productive week. Effort is noticed and things you push will move. Take on the task that stretches you. {best} is the strongest day at work, and it favours {hint}.",
      "Work goes well. You have both the energy and the cooperation you need, so aim higher than usual. Put the key item on {best}, a day for {hint}.",
      "Momentum is with you at work this week. Decisions come easily and colleagues are receptive. Use {best} for {hint}.",
      "This is a week to get things done and be seen doing them. Volunteer, present, deliver. {best} stands out, and it suits {hint}.",
      "You are more effective than usual this week, and it will be noticed. Tackle the item that has been sitting at the bottom of the list. {best} is the peak, and it favours {hint}.",
      "Work has a following wind. Ask for what you need, propose what you have in mind, and finish what is nearly done. {best} is the day for {hint}.",
    ],
    steady: [
      "Work is steady. Progress comes from showing up and keeping at it. Nothing will fall into your lap, and nothing will block you. {best} is the most useful day, good for {hint}.",
      "A normal working week. Clear what is on your desk before adding to it. If you have one important thing to do, do it on {best}, which favours {hint}.",
      "Reliable, unspectacular progress. Keep to your list and your hours. {best} has a little extra in it and suits {hint}.",
      "The week rewards routine. Do the ordinary things properly and leave reinvention for later. {best} is the day for {hint}.",
      "An average week at work, which means a useful one. Steady output now saves a scramble later. {best} is the day with most promise and suits {hint}.",
      "Work proceeds at its ordinary pace. Keep your commitments modest and meet all of them. For the one thing that needs to go well, choose {best}, a day for {hint}.",
    ],
    soft: [
      "Work is uphill this week. Things take longer and people are harder to pin down. Shorten the list and protect your concentration. {best} is the best day you have; use it for {hint}.",
      "Expect friction at work: delays, changed minds, extra demands. Keep records and keep calm. Hold the important item for {best}, which suits {hint}.",
      "A week for small moves at work. Maintain, repair and finish. If something must be decided, {best} is the day, since it favours {hint}.",
      "The working week asks for patience. Do less, do it carefully, and volunteer for nothing. {best} offers the clearest run and is good for {hint}.",
    ],
  },
  money: {
    strong: [
      "Money matters go well this week. Income is favoured over spending, and your judgement about value is sound. Ask, invoice, negotiate. {best} is the day for it, and it suits {hint}.",
      "A good week for your finances. Opportunities are real and your instincts are reliable. Follow up on anything that pays. {best} is the strongest day and favours {hint}.",
      "The week leans in your favour financially. Deal with money actively instead of leaving it alone. Use {best} for {hint}.",
      "Finances are well supported. It is a sensible week for a planned purchase or a request for more. {best} stands out as the day for {hint}.",
    ],
    steady: [
      "Money is stable. Nothing remarkable comes in and nothing alarming goes out. Keep to your budget and pay things on time. {best} is the best day for financial business, especially {hint}.",
      "An even week for finances. Small economies add up, and so do small leaks. If there is one money task to do, put it on {best}, which favours {hint}.",
      "Steady going. Look after the routine side: bills, transfers, receipts. {best} has the best prospects and suits {hint}.",
      "No surprises with money this week, pleasant or otherwise. A good moment to check where you stand. {best} is the day for {hint}.",
      "Finances hold their usual course. It is a week for keeping records straight and leaving big moves alone. {best} is the most favourable day, good for {hint}.",
      "Money neither helps nor hinders this week. Spend as planned and save as planned. If something financial needs your attention, give it that on {best}, which suits {hint}.",
    ],
    soft: [
      "Be careful with money this week. It is easier to lose than to gain, mostly through small, unplanned spending. Postpone big purchases and lend nothing. If you must decide something, {best} is safest, and it suits {hint}.",
      "Finances need watching. Unexpected costs are possible and good deals are scarcer than they look. Hold on to what you have. {best} is the steadiest day, good for {hint}.",
      "A week to avoid financial risks. Read before you sign and wait before you buy. {best} is the best of the week for money matters, particularly {hint}.",
      "Money is tight in feeling if not in fact. Keep spending plain and decisions few. Use {best} for {hint} and leave the rest.",
      "Money slips through the fingers a little more easily this week. Keep cards in your wallet and decisions for later. If something cannot wait, deal with it on {best}, which is good for {hint}.",
    ],
  },
  well: {
    strong: [
      "You have good energy this week. Your body will respond to whatever you ask of it, so ask for something worthwhile. {best} is the best day physically, and it suits {hint}.",
      "Vitality is high. A good week to raise your level of activity or to start a habit you mean to keep. {best} favours {hint}.",
      "Body and mood are both in good order. Sleep comes easily and you recover fast. Make use of it. {best} is ideal for {hint}.",
      "A strong week for wellbeing. You feel capable, and you are. Spend some of that energy outdoors. {best} is the day for {hint}.",
    ],
    steady: [
      "Energy is moderate and dependable. Keep your usual routines and you will feel fine. {best} is your best day physically and suits {hint}.",
      "An ordinary week for wellbeing. Regular meals, regular sleep, a little movement each day. If you want to do more, do it on {best}, which favours {hint}.",
      "You will get out of your body what you put in this week, no more and no less. {best} has the most energy in it; use it for {hint}.",
      "Steady health, steady mood. Nothing to fix. Protect your sleep and keep moving. {best} is good for {hint}.",
      "Your energy is about average this week. Spend it evenly and it will last. {best} is the day with most to spare, and it suits {hint}.",
      "Nothing much to report from the body, which is good news. Keep the basics in place. If you want to add something, add it on {best}, a day for {hint}.",
      "You will feel much as usual this week. Treat that as permission to keep going with whatever is working. {best} is the best day for {hint}.",
      "A level week for health and mood. Sleep, food and movement in their ordinary amounts will do. {best} has the most go in it; use it for {hint}.",
    ],
    soft: [
      "Energy runs low this week. Tiredness arrives earlier and stress lingers longer. Be strict about sleep and generous with breaks. {best} is your strongest day; keep it for {hint}.",
      "Look after yourself. The week draws on your reserves more than it refills them. Cancel something. {best} is the best day for {hint}.",
      "A week to stay well inside your limits. Eat properly, rest early, and move gently. {best} offers the most energy and suits {hint}.",
      "You may feel below par for no clear reason. It is the week, and it passes. Lower the bar and keep warm. {best} is the day for {hint}.",
    ],
  },
}

// What the best day for each part of life suits, by the GROUPS of that day.
export const AREA_HINTS: Record<Area, string[]> = {
  love: ["doing something side by side", "an easy, talkative evening", "a generous gesture", "a serious conversation, calmly held", "quiet company"],
  work: ["work you can own outright", "ideas, pitches and anything creative", "deals, clients and visible results", "deadlines and decisions", "learning and planning ahead"],
  money: ["investing in yourself", "earning from what you are good at", "collecting, selling and negotiating", "settling what is due", "advice and the long view"],
  well: ["your usual routine, done properly", "good food and gentle pleasures", "getting out and about", "hard exercise and an early finish", "deep rest"],
}

// One thing to aim at and one to drop, by the GROUPS of the middle of the week.
export const WEEK_FOCUS: string[][] = [
  ["Back your own judgement on one decision and carry it through.", "Finish something that is entirely yours.", "Set your own pace this week and keep it.", "Choose the one goal you would pursue with nobody's approval."],
  ["Make one thing you are proud of.", "Put your best idea in front of someone who can use it.", "Let enjoyment lead the work.", "Say clearly what you think, once, to the right person."],
  ["Turn one piece of effort into something you can count.", "Follow up every lead that has a person attached.", "Know what you are worth, and ask for it.", "Close what is open: the invoice, the deal, the loose end."],
  ["Do the hard thing properly, and early.", "Keep every promise you have made for this week.", "Meet the pressure with preparation.", "Let your reliability speak for you."],
  ["Learn one thing that will still be useful next year.", "Rest until you are actually rested.", "Ask for the advice you have been too proud to ask for.", "Prepare the ground and leave the planting for later."],
]

export const WEEK_LET_GO: string[][] = [
  ["The need to win every small point.", "Doing it all alone to prove that you can.", "Keeping score with friends.", "The idea that asking is weakness."],
  ["The urge to improve other people.", "The second helping.", "The clever remark that costs more than it earns.", "Perfecting what is already good."],
  ["The deal that sounds too good.", "Spending to impress.", "Counting small sums twice.", "Chasing every opening at once."],
  ["The argument you could win.", "Other people's emergencies.", "The belief that it all rests on you.", "Staying late to be seen."],
  ["Thinking it over one more time.", "Waiting to be told.", "Comfort that has stopped being rest.", "The suspicion you have not checked."],
]

// {weekday} is the day the moon turns.
export const WEEK_MOON: { new: string[]; full: string[] } = {
  new: [
    "The new moon falls on {weekday}, opening a lunar month. Begin something small then, and keep it to yourself for now.",
    "A new lunar month begins on {weekday}. It is the natural day for a fresh start or a quiet resolution.",
  ],
  full: [
    "The moon is full on {weekday}. Feelings and gatherings both run larger around it; make it a sociable evening.",
    "{weekday} brings the full moon, the high tide of the lunar month. A good night to finish something and to see friends.",
  ],
}
