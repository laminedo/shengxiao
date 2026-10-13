// The year standing behind a monthly reading.
// {animal} is the year's animal, {sign} the reader's sign, {year} the element of the
// year's stem and {self} the reader's element.
import type { Relation } from './dayNotes'

export const YEAR_SIGN: Record<Relation | 'none', string> = {
  same: "This is a {sign} year, your own. Tradition calls it the year of one's birth sign and treats it with respect: you are under the calendar's eye for twelve months. It favours steady conduct over bold gambles. Many people wear something red through the year for luck.",
  clash: "The year belongs to the {animal}, which sits opposite the {sign}. An opposition year is a year of change: moves, new roles and rearranged plans are all more likely. It rewards flexibility. What shifts this year usually needed to.",
  six: "The year belongs to the {animal}, the {sign}'s secret friend. Years like this bring helpful people and smoother partnerships. It is a good year to commit, to collaborate and to accept support that is offered.",
  three: "The year belongs to the {animal}, one of the {sign}'s natural allies. The broad current runs your way: efforts find backing and timing tends to work out. A good year to push long-held plans.",
  harm: "The year belongs to the {animal}, which sits awkwardly with the {sign}. Expect a little more friction in dealings with others: misunderstandings, favours unreturned. Clear agreements and patience see it through.",
  none: "The year belongs to the {animal}, which has no particular quarrel or alliance with the {sign}. That leaves the year's tone to its element, and each month to speak for itself.",
}

// One entry per Ten God: the year's stem against the reader's own.
export const YEAR_THEMES = [
  "The year's {year} matches your own element. It is a year for self-reliance and for backing your own plans, with friends and peers close by.",
  "The year's {year} is your own element in rival form. Expect more competition and more company than usual, and keep a careful hand on shared money.",
  "Your {self} feeds the year's {year} gently. Skills flow and pleasures are close; it is a year to make things and to enjoy the making.",
  "Your {self} feeds the year's {year} in its sharp form. Ideas and ambition run high. It is a creative year, and one for tact with anyone in authority.",
  "Your {self} masters the year's {year} in its moving form. Opportunities come through people and chance; a year to circulate and to follow up.",
  "Your {self} masters the year's {year} in its steady form. Effort turns into results you can count; a year for building and saving.",
  "The year's {year} presses hard on your {self}. It is a demanding year that rewards discipline and courage, and asks you to look after your health.",
  "The year's {year} governs your {self} in orderly fashion. Responsibility and recognition both increase; a year to do things properly.",
  "The year's {year} feeds your {self} by the indirect route. It is a year for study, reflection and unconventional paths, with time to yourself.",
  "The year's {year} feeds your {self} directly. Support, learning and recovery are favoured; a year to prepare and to be helped.",
]

// What a month suits and what it punishes, one entry per Ten God.
export const MONTH_DOS: string[][] = [
  ["Finish a project that is yours alone", "Reconnect with an old friend", "Set a personal goal and measure it"],
  ["Join forces on something too big for one", "Enter the contest", "Meet people in your own field"],
  ["Complete one piece of work you are proud of", "Cook for people you like", "Take a proper break, however short"],
  ["Launch the original idea", "Show your work in public", "Learn a new technique"],
  ["Accept invitations", "Follow up within the day", "Start the side venture"],
  ["Clear debts and send invoices", "Review your savings and budget", "Repair or replace what is worn out"],
  ["Face the difficult matter first", "Exercise regularly and hard", "Put decisions in writing"],
  ["Apply, interview or ask for the review", "Meet your obligations early", "Put your papers in order"],
  ["Study something in depth", "Spend time alone on purpose", "Test a hunch against the facts"],
  ["Ask for advice and take it", "Begin a course or a qualification", "Rest properly at least one day a week"],
]

export const MONTH_DONTS: string[][] = [
  ["Lend money you cannot spare", "Refuse every compromise", "Decide for two without asking"],
  ["Guarantee anyone's loan", "Keep pace with a bigger spender", "Let gossip set your opinion of a colleague"],
  ["Let the month drift past", "Overindulge night after night", "Put off a necessary conversation"],
  ["Quarrel with a superior", "Break an agreement in a temper", "Criticise in writing"],
  ["Gamble with money you need", "Promise in haste", "Spread yourself across everything"],
  ["Work without days off", "Chase a quick profit", "Let small sums cause a quarrel"],
  ["Take physical or financial risks", "Rise to provocation", "Carry everyone's problems"],
  ["Bend a rule", "Turn up late", "Take on duties you cannot keep"],
  ["Withdraw from everyone", "Act on a suspicion", "Neglect meals and sleep"],
  ["Wait for others to act for you", "Turn down help", "Sink into comfort"],
]
