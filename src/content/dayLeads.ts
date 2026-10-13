// The opening of a daily reading: one entry per Ten God (see TEN_GODS in the glossary).
// `lift` is used on days that run with the reader, `care` on days that run against.
// {self} is the reader's element and {day} the element of the day's stem.
import type { Lead, Toned } from './types'

export const DAY_LEADS: Toned<Lead>[] = [
  // 0 Companion (比肩): the day's stem is your own element, same polarity
  {
    lift: [
      { title: "Your own two feet", text: "Today's {day} is your own element, met at full strength. It is like having a second pair of hands that happens to agree with you. Decisions come quickly and you need less reassurance than usual. Use the day for whatever you have been waiting for permission to do." },
      { title: "A day that takes your side", text: "{day} meets {day} today, yours and the calendar's. Nothing in the day argues with your nature, which is rarer than it sounds. You will work best alone, or beside someone who works the way you do. Pick one thing and see it through on your own terms." },
      { title: "In good company with yourself", text: "The day runs on your element, {self}, and in the same key. Confidence is steady and low on drama. It suits practice, repetition and the plain satisfaction of doing something you already know how to do well. Friends your own age are good company tonight." },
    ],
    care: [
      { title: "Sure of yourself, perhaps too sure", text: "Today doubles your {self}, and a double helping of yourself is a mixed blessing on a strained day. You will feel certain. Check whether you are also right. Hold your position where it matters and give way on everything else; there will be plenty of everything else." },
      { title: "Keep your own counsel", text: "The day's {day} mirrors your own, which makes you harder to shift at a moment when the day itself is uneasy. That firmness is useful if you spend it on one thing. Spread across every small disagreement, it only tires you. Choose the one." },
      { title: "Hold steady, hold less", text: "Your own {self} fills the day, and the day is a bumpy one. The temptation is to meet every bump with more of yourself: more insistence, more effort, more certainty. Try the opposite. Decide which one matter is truly yours and let the others sort themselves out." },
    ],
  },
  // 1 Rival (劫财): your own element, opposite polarity
  {
    lift: [
      { title: "A little competition", text: "Today's {day} is your own element in its other mood: the same strength, differently worn. It brings out the competitor in you, and the company you keep will be lively. Race someone, bargain, play to win. Just keep your wallet in your pocket while you do it." },
      { title: "Shoulder to shoulder", text: "The calendar's {day} matches your {self} with the polarity reversed, the classic sign of peers and rivals. People who do what you do are close by today. Some will help and some will measure themselves against you. Both are useful. Let them sharpen you." },
      { title: "Energy to spare", text: "There is more of your element around today than you can use alone. That is why the day suits teams, sport, group effort and anything where numbers help. Share the work and share the credit. The one thing to keep to yourself is the bill." },
    ],
    care: [
      { title: "Mind what leaves your hands", text: "Today's {day} is your element's twin, and on an uneasy day the twin borrows. Money, time and attention all tend to drift towards other people, usually with your consent. Be friendly and be slow to say yes. Anything lent today should be something you can do without." },
      { title: "Someone else's race", text: "Your own element arrives in its rival form today, and the day already has an edge. Comparison is the trap: someone will seem to be further ahead. They are running a different course. Put the competitive energy into a task and leave the person alone." },
      { title: "Crowded ground", text: "Today's {day} is your own element in rival form, and there is a lot of it about. Others want what you want, or seem to. On a day this unsettled, competing costs more than it wins. Keep your plans and your purse close, and let someone else be first through the door." },
    ],
  },
  // 2 Ease (食神): your element feeds the day, same polarity
  {
    lift: [
      { title: "An easy day, well used", text: "Your {self} feeds today's {day}, and it does so without strain. This is the gentlest of the creative days: things you make come out well, food tastes better and conversation is easy. Nothing needs forcing. Do the pleasant version of whatever is on your list." },
      { title: "Good appetite", text: "Today your element gives freely to the day's {day}. The old books link this pattern with appetite and contentment, and in practice it means you are easy to be around. Cook, write, tinker, talk. What you produce today has warmth in it, and people notice." },
      { title: "Let it come", text: "The day's {day} is what your {self} naturally produces, so your abilities sit close to the surface. You will get more done by enjoying the work than by pushing it. Leave room in the afternoon for something that has no purpose except that you like it." },
    ],
    care: [
      { title: "Comfort, in moderation", text: "Your {self} feeds today's {day}, which usually means pleasure, but the day has a weight to it and pleasure can turn into avoidance. A second helping, another episode, one more hour in bed. Enjoy something properly, once, and then go back to what needs you." },
      { title: "Small pleasures", text: "The day draws on your element gently, at a moment when you have less to give than usual. Keep the output modest: one good meal, one finished piece of work, one easy conversation. The day will forgive a short list. It has no reward for an ambitious one." },
      { title: "An easy day you may not feel", text: "Your {self} feeds today's {day}, the pattern of ease, but the rest of the day pulls the other way. Pleasure is available in small sizes only. Take it where you find it: a good lunch, ten minutes in the sun. Expect less of yourself and you will give it gladly." },
    ],
  },
  // 3 Spark (伤官): your element feeds the day, opposite polarity
  {
    lift: [
      { title: "Sharp and bright", text: "Your {self} pours into today's {day}, and it comes out pointed. Ideas arrive fast and so do opinions. It is a fine day for anything that rewards originality: pitching, performing, redesigning, solving the problem everyone else gave up on. Your tongue is quicker than your judgement, so aim it." },
      { title: "Say the clever thing", text: "Today's {day} is your element's output in its bolder form. You will see at a glance what is wrong with the room, the plan and the menu, and much of it will be true. Spend that clarity on work, where it earns something, and ration it in conversation." },
      { title: "Make something new", text: "The day takes what your {self} produces and turns the volume up. Rules will feel like suggestions. For creative work that is exactly right: break the habit, try the odd approach, publish the thing. Where the rules belong to someone else, smile and comply until tomorrow." },
    ],
    care: [
      { title: "Quick tongue, thin ice", text: "Your {self} feeds today's {day} in the form the old books call a challenge to authority, and the day is in no mood to forgive. You will be right about what is wrong. Whether to say so, today, to that person, is a separate question. Write it down. Send nothing." },
      { title: "Hold the edit", text: "Today sharpens your critical eye and shortens your patience. Everything looks improvable, including the people you love. Put the energy where criticism is welcome: your own draft, your own cupboard, your own plan. Other people's can wait for a kinder day." },
      { title: "Brilliant, and better kept quiet", text: "Your {self} turns into today's {day} with an edge on it, and the day is already on edge. Every observation you make will be accurate and unwelcome. Save them. Put the restlessness into something solitary and physical, and let today's opinions cool overnight." },
    ],
  },
  // 4 Windfall (偏财): your element masters the day, same polarity
  {
    lift: [
      { title: "Luck walks in sideways", text: "Your {self} masters today's {day}, and it arrives in its loose, moving form: the money and luck that come through people and chance, never through a payslip. Say yes to the invitation. Answer the unknown number. Something useful is circulating, and it will not come to your desk." },
      { title: "An open hand", text: "Today's {day} is an element your {self} commands, in its sociable form. Opportunity today looks like a conversation: a favour offered, a name mentioned, a spare ticket. Be generous first. This kind of luck tends to return to whoever kept it moving." },
      { title: "Worth a try", text: "The day puts something within reach of your {self}, though in a form you cannot plan for. Side projects, small gambles and loose ends all have more life in them than usual. Follow up the lead you nearly forgot. Keep the stakes at a level you can laugh about." },
    ],
    care: [
      { title: "Tempting, far from certain", text: "Your {self} reaches for today's {day}, the element of quick gains, on a day that will not stand still for you. Offers will sound better than they are. Listen to all of them and sign none. A good idea will still be a good idea on a calmer day." },
      { title: "Spend carefully, promise less", text: "Today's {day} brings chances and expenses in roughly equal numbers, and the day's footing is unsure. Generosity is easy to overdo: the round you never meant to buy, the favour that grows. Enjoy the company. Agree to nothing with a number in it." },
      { title: "More offers than answers", text: "Today's {day} dangles opportunity in front of your {self}, and the day is too unsteady to tell the real from the hopeful. Treat everything as an introduction and nothing as a deal. Collect names, ask questions, and promise only to come back to it later in the week." },
    ],
  },
  // 5 Harvest (正财): your element masters the day, opposite polarity
  {
    lift: [
      { title: "Honest work, fair return", text: "Your {self} masters today's {day}, and it comes in its steady, countable form. Think earned money, kept promises and results you can point to. Effort and reward sit unusually close together today, so do the task with the clearest outcome first." },
      { title: "A day that adds up", text: "Today's {day} is the element your {self} shapes, in its patient form. Nothing dramatic is on offer. Progress is. Clear the invoices, tidy the accounts, finish the practical job. You will end the day with more than you started, and know exactly where it came from." },
      { title: "What you have built", text: "The day hands your {self} something solid to work on. It favours care over speed and the thing in your hand over the thing in your head. Look after what you already own: maintain it, mend it, pay for it. People who depend on you will notice the attention." },
    ],
    care: [
      { title: "Count twice", text: "Your {self} works on today's {day}, the element of steady gain, but the day has a wobble in it. The fundamentals are sound and the details are unreliable. Read the small print, check the total, confirm the time. Careful beats quick today by a wide margin." },
      { title: "Keep to the budget", text: "Today's {day} rewards diligence even on a day that is otherwise uneven. So be diligent and expect no more than that. Do the necessary, plain work and leave the bigger purchase or commitment where it is. It will keep, and your patience will be worth more than any bargain." },
      { title: "Slow and exact", text: "Your {self} has steady work to do on today's {day}, and a day that keeps interrupting it. Progress will be real but smaller than planned. Protect one unbroken hour for the task that pays, and treat everything else as a bonus." },
    ],
  },
  // 6 Pressure (七杀): the day masters your element, same polarity
  {
    lift: [
      { title: "Rise to it", text: "Today's {day} presses on your {self}, and it does so head-on. The tradition treats this as the hardest of the ten day-types and also the one that makes people. You have the strength for it today. Take the difficult thing first, while your nerve is up, and do it quickly." },
      { title: "A test you can pass", text: "The day's {day} is the element that cuts your {self}, in its direct form. Expect demands, deadlines or one blunt conversation. With the rest of the day behind you, this is pressure of the useful sort. Decide fast, act once, and let the adrenaline do some of the lifting." },
      { title: "Courage, briefly", text: "Something will ask more of you than is comfortable today. That is what happens when {day} meets {self} this way, and you are equal to it. What looks like opposition is mostly just a clock. Meet it early and the rest of the day goes surprisingly quiet." },
    ],
    care: [
      { title: "Under the hammer", text: "Today's {day} bears down on your {self}, and little else in the day softens it. Pressure will feel personal, though it rarely is. Do the one thing that cannot wait, do it properly, and decline the rest. Today is for endurance. Save the heroics for a day that pays for them." },
      { title: "One battle only", text: "The day's {day} is the element that overcomes yours, in its rough form, and the day gives you less cover than usual. Tempers are short, yours included. Slow your replies. Skip the argument you could win. Get through the essentials and go home on time." },
      { title: "Bend with it", text: "Today's {day} comes down hard on your {self}, and the day offers no shelter. Force will get you nowhere today. Outlasting it will. Do what is required, say little, and keep something back for yourself. Tomorrow's version of this problem will be smaller." },
    ],
  },
  // 7 Duty (正官): the day masters your element, opposite polarity
  {
    lift: [
      { title: "Do it properly", text: "Today's {day} governs your {self} in its orderly form: the pressure that comes with a title, a rule or a reputation. It favours whoever is prepared. Turn up on time, do what you said you would, and be seen doing it. Someone in a position to help is paying attention." },
      { title: "Good standing", text: "The day's {day} is the element that shapes yours, the way a trellis shapes a vine. Structure helps you today. Meetings with managers, officials and clients go better than usual, and a tidy, correct piece of work will count for more than a brilliant one." },
      { title: "The reliable one", text: "Today asks your {self} to work inside the lines, and rewards it for doing so. Responsibilities are clear and so is the path through them. Keep your promises, answer the formal letter and take the role that is offered. Respect is being handed out." },
    ],
    care: [
      { title: "Mind the rules", text: "Today's {day} holds your {self} to account on a day that is short of goodwill. Small lapses get noticed: the late arrival, the missing form, the casual remark to the wrong person. Be correct and a little dull. Nobody will remember you today, which is exactly the outcome to aim for." },
      { title: "Carrying the weight", text: "The day's {day} puts duties on your {self} and offers little in return. Obligations feel heavier than they are. Take them in order, starting with whichever involves someone senior, and volunteer for nothing more. The credit for today's work arrives later than the work." },
      { title: "By the book, all day", text: "Today's {day} sets rules for your {self}, and the day is quick to punish a slip. It is tedious, and it is temporary. Do each thing properly in the order it is asked, keep your opinions of the process to yourself, and let correctness be your only ambition." },
    ],
  },
  // 8 Insight (偏印): the day feeds your element, same polarity
  {
    lift: [
      { title: "A quiet kind of knowing", text: "Today's {day} feeds your {self}, but by an indirect road: through hunches, odd sources and things half noticed. Your mind is working well beneath the surface. Give it something to chew on, a problem or a book or a long walk, and ask it for no explanations until evening." },
      { title: "Off the usual path", text: "The day's {day} nourishes yours in its unconventional form. Ordinary routes feel flat and the strange ones are interesting. Read outside your subject. Ask the question that seems irrelevant. You are well placed to see what the obvious approach has been missing." },
      { title: "Your own company", text: "Today your {self} is fed by {day} in the way that favours study, research and solitude. You may feel unsociable, and that is allowed. An hour alone with a difficult idea will give you more than a day of meetings. Keep a notebook nearby." },
    ],
    care: [
      { title: "Too much in your head", text: "Today's {day} feeds your {self} through the back door, the route of intuition, and on a restless day intuition slides into suspicion. You may read meanings into silences that are only silences. Check your theory with one trusted person before you act on it." },
      { title: "Come up for air", text: "The day turns you inward at a moment when the outside world is already hard to read. Thinking will feel like progress while mostly going in circles. Eat a proper meal, since this pattern is known for forgetting to, and set a time to stop turning it over." },
      { title: "Foggy, with clear patches", text: "Today's {day} feeds your {self} through intuition, and a difficult day blurs the signal. Some hunches are sound and some are only worry. You will not be able to tell which until later, so act on none of them yet. Write them down and look again in two days." },
    ],
  },
  // 9 Support (正印): the day feeds your element, opposite polarity
  {
    lift: [
      { title: "Looked after", text: "Today's {day} feeds your {self} directly, the way rain feeds a field. It is the most supportive of the ten day-types. Help is close and learning sticks. Ask the question, accept the offer, take the rest. You are allowed to receive today without earning it first." },
      { title: "A day that gives back", text: "The day's {day} is the element that nourishes yours. Energy refills. People older or steadier than you are well disposed towards you, and their advice is worth having. Read, plan, recover. What you take in today will be working for you by next week." },
      { title: "Shelter", text: "Your {self} is being fed today, quietly and thoroughly. Nothing is asking you to prove anything. It suits study, paperwork that protects you, and time with whoever makes you feel safe. Call your mother, or whoever plays that part in your life." },
    ],
    care: [
      { title: "Rest is the work", text: "Today's {day} feeds your {self}, which is a kindness, because the day asks a lot elsewhere. The support is real but quiet, and you will only feel it if you slow down. Do less and do it gently. An early night will repair more than extra effort would." },
      { title: "Take the help", text: "The day is uneven, but it carries the element that nourishes yours. Someone will offer a hand or a word of advice, and your instinct may be to manage alone. Resist that. Accepting help is the whole lesson of this day-type, and today you could use it." },
      { title: "Shelter from the day", text: "Today's {day} nourishes your {self}, and you will need it, because the rest of the day is draining. Think of it as a roof in bad weather. Stay under it. Keep to people and places that restore you, and put off whatever can only go badly today." },
    ],
  },
]

// One line to carry through the day.
export const DAY_COUNSEL: string[][] = [
  [
    "Trust the decision you would make if nobody were watching.",
    "Do one thing entirely your own way, and do it well.",
    "You need no second opinion today. You need a start.",
    "Stand where you are standing. It is a good spot.",
  ],
  [
    "Compete with yesterday's version of yourself and with nobody else.",
    "Be generous with your time and careful with your money.",
    "Share the work. Keep the receipt.",
    "A rival is only a teacher with worse manners.",
  ],
  [
    "Enjoy one thing slowly and completely.",
    "Whatever you make today, make it with pleasure or leave it for tomorrow.",
    "Feed someone, yourself included.",
    "The easy way is the right way today. Take it without guilt.",
  ],
  [
    "Say the brilliant thing to the page before you say it to the person.",
    "Break your own rules today and leave other people's intact.",
    "Aim the wit at the problem.",
    "Being right is cheap today. Being kind costs more and is worth it.",
  ],
  [
    "Say yes to the conversation and maybe to the offer.",
    "Give first and keep no tally.",
    "Follow the loose thread and see what it is tied to.",
    "Luck likes a moving target. Go out.",
  ],
  [
    "Finish the thing with the clearest result.",
    "Look after what is already yours.",
    "Small, certain and done beats large, possible and pending.",
    "Count it, write it down, put it away.",
  ],
  [
    "Do the hard thing before you have time to dread it.",
    "Short sentences, steady voice, one decision.",
    "Let the pressure shape you without letting it speed you up.",
    "You only have to be braver than the task, and only for an hour.",
  ],
  [
    "Be on time, be prepared, be brief.",
    "Keep the promise that is easiest to forget.",
    "Do it by the book today. The book is on your side.",
    "Let your work speak, and make sure it is spelled correctly.",
  ],
  [
    "Leave the phone in another room for one hour.",
    "Follow the hunch as far as the facts and no further.",
    "Read something nobody asked you to read.",
    "The answer is forming. Stop stirring it.",
  ],
  [
    "Let someone help you, and thank them plainly.",
    "Rest before you are tired.",
    "Ask the person who has done it before.",
    "Receive well today. You will have plenty of days for giving.",
  ],
]

// Things the day suits and things it punishes. Two of each are shown.
export const DAY_DOS: string[][] = [
  ["Make the decision you have been circling", "Work on your own project", "Train, practise or rehearse", "See a friend who knew you years ago", "Set the terms before you agree to anything"],
  ["Join a team effort or a class", "Play a sport or a game to win", "Negotiate in person", "Introduce two people who should meet", "Split the task and share the credit"],
  ["Cook or eat something worth the time", "Make something with your hands", "Have a long, unhurried conversation", "Teach someone what you know", "Take the scenic route"],
  ["Pitch the bold idea", "Rewrite, redesign or rethink it", "Perform, present or publish", "Solve the problem nobody else wants", "Try the approach you were told would fail"],
  ["Accept the invitation", "Follow up an old lead", "Talk to a stranger", "Give a small, unexpected gift", "Put an hour into the side project"],
  ["Send the invoice or pay the bill", "Finish what is already started", "Review your budget", "Mend or maintain something you own", "Do the job with the clearest result first"],
  ["Tackle the task you have been avoiding", "Move your body hard for half an hour", "Make the difficult call early", "Set one firm boundary", "Decide and then stop revisiting it"],
  ["Meet the manager, client or official", "Arrive ten minutes early", "Answer the formal letter", "Tidy your desk and your diary", "Keep a promise you made a while ago"],
  ["Read, research or study alone", "Take a long walk without headphones", "Write down the idea before it fades", "Look into the thing you are curious about", "Spend an evening quietly"],
  ["Ask a mentor or elder for advice", "Rest properly, phone off", "Plan the next month", "Sort out insurance, records or renewals", "Call your family"],
]

export const DAY_DONTS: string[][] = [
  ["Dig in just to win a point", "Refuse help out of pride", "Lend money on impulse", "Mistake stubbornness for principle", "Make a joint decision alone"],
  ["Lend or borrow money", "Compare yourself with a colleague", "Gamble to impress anyone", "Pick up every bill at the table", "Let friends spend your day for you"],
  ["Have the extra helping, or the extra glass", "Put off the one necessary task", "Force a strict timetable", "Mistake comfort for rest", "Promise more hospitality than you can afford"],
  ["Argue with the boss", "Send the message you wrote while annoyed", "Criticise in public", "Break a rule that is not yours to break", "Correct someone who did not ask"],
  ["Stake more than you can lose", "Promise what you cannot deliver", "Sign anything in a hurry", "Buy on someone else's excitement", "Spread yourself over five plans"],
  ["Chase a shortcut", "Skip rest for one more task", "Split hairs over small sums", "Buy the upgrade you do not need", "Leave a debt unanswered"],
  ["Pick a fight, or accept one", "Take a needless physical risk", "Drive or decide while angry", "Take on someone else's emergency", "Stay late to prove a point"],
  ["Cut a corner", "Turn up late", "Go over someone's head", "Joke about the rules in front of the person who made them", "Volunteer for one duty too many"],
  ["Shut yourself away all day", "Overthink a simple choice", "Act on a suspicion you have not checked", "Skip meals", "Read the worst into a short message"],
  ["Coast on other people's effort", "Turn down help to look capable", "Sleep the whole day away", "Put off a decision that is yours to make", "Smother someone with advice"],
]
