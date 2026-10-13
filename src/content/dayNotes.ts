// The shorter notes that sit beside a daily reading: how the day's animal meets the
// reader's signs, the element the day carries, the moon, the solar terms and the almanac.
// {animal} is the day's animal, {sign} the reader's year sign, {seat} their day sign.
import type { Lead } from './types'

export type Relation = 'same' | 'six' | 'three' | 'clash' | 'harm'

export const RELATION_TAGS: Record<Relation, string> = {
  same: 'Own sign',
  six: 'Secret friend',
  three: 'Ally',
  clash: 'Clash',
  harm: 'Friction',
}

export const SIGN_RELATIONS: Record<Relation, Lead[]> = {
  clash: [
    { title: "Across the wheel", text: "Today belongs to the {animal}, which sits directly opposite the {sign} on the zodiac wheel. Days like this rarely run to script: a meeting moves, a message lands badly, someone changes their mind late. None of it is aimed at you. Hold plans loosely." },
    { title: "Your opposite number", text: "It is a {animal} day, and the {animal} is the {sign}'s opposite. The tradition calls this a clash, which sounds worse than it is. In practice it means movement: plans shift, travel gets complicated, tempers shorten. Leave gaps in the diary and keep big launches for another day." },
    { title: "A day that pushes back", text: "The {animal} governs today and faces the {sign} head-on. Expect some resistance from the world, of the mild, daily kind: delays, changes, a person in an awkward mood. Go round obstacles instead of through them, and postpone what you can afford to postpone." },
  ],
  six: [
    { title: "Your secret friend", text: "It is a {animal} day, and the {animal} is the {sign}'s secret friend, the one sign that pairs with yours. Help tends to arrive quietly on days like this, often from one particular person. Notice who is being kind to you, and let them." },
    { title: "A natural pair", text: "Today belongs to the {animal}, the {sign}'s partner sign. Of the twelve, this is the day that fits you most easily. Agreements hold, introductions go well, and a favour asked is usually granted. Use it for anything that needs another person's yes." },
    { title: "Someone on your side", text: "The {animal} runs today, and in the old pairing of signs the {animal} and the {sign} belong together. Cooperation costs less effort than usual. If something has been stuck between you and another person, today it loosens." },
  ],
  three: [
    { title: "Among allies", text: "It is a {animal} day. The {animal} and the {sign} belong to the same family of three signs, which makes this a day when the current runs your way. Things started today find helpers. Push the project that needs other people behind it." },
    { title: "A friendly sign", text: "Today's {animal} is one of the {sign}'s two natural allies. You will find people easier to work with and luck a little closer. It is a good day for team efforts, group plans and asking for support." },
    { title: "Wind behind you", text: "The {animal} governs the day and stands in harmony with the {sign}. Nothing spectacular needs to happen for you to feel it: things simply take less effort. Spend the advantage on something that matters." },
  ],
  harm: [
    { title: "A grain of sand", text: "It is a {animal} day, and the {animal} sits awkwardly with the {sign}. The tradition calls this a harm: nothing so open as a clash, more the small, undermining kind. Misread messages, a slight nobody intended. Say things plainly and check that they were heard." },
    { title: "Slightly out of step", text: "Today's {animal} rubs against the {sign}. It is a minor friction, the sort that shows up as a misunderstanding with someone close or a favour that goes unthanked. Take nothing personally before noon, and double-check arrangements." },
    { title: "Small frictions", text: "The {animal} governs today and is not the {sign}'s easiest company. Expect one or two things to grate: a tone of voice, a detail overlooked. It passes quickly if you let it. Keep your requests clear and your expectations modest." },
  ],
  same: [
    { title: "Your own sign's day", text: "Today is a {sign} day: your own sign holds the calendar. You are more visible than usual, to yourself as well as to others. It is a good day to take stock and a sensitive one for big moves. Go about things thoughtfully." },
    { title: "The {sign} doubles", text: "The day shares your sign. Tradition treats this as a day of heightened presence: your strengths are louder and so are your habits. Lean on the first and keep an eye on the second. Quiet progress suits it better than a grand opening." },
    { title: "Seeing yourself", text: "It is a {sign} day, which holds up a mirror. Whatever is typical of you is turned up a notch. That makes it useful for personal matters, plans and reflection, and less suited to situations that need you to bend." },
  ],
}

// A closing sentence in the voice of the reader's own sign: `ease` after a helpful
// relation, `strain` after a difficult one.
export const ANIMAL_LINES: { ease: string[]; strain: string[] }[] = [
  { // Rat
    ease: ["A Rat on a good day spots three openings before breakfast. Take the best one and let the others go.", "Your gift for reading a room is at full strength. Use it to ask for the thing you actually want."],
    strain: ["Rats cope by planning three moves ahead. Today, plan one and keep the other two loose.", "The urge to worry and stockpile will be loud. You have more in reserve than it says."],
  },
  { // Ox
    ease: ["An Ox rarely asks for help, which is why help offered today is worth accepting. It will not make you any less capable.", "Your steadiness is exactly what the day rewards. Keep the pace you set this morning and you will finish ahead."],
    strain: ["An Ox meets resistance by leaning harder. Today, try stepping aside instead; the obstacle will tire before you do.", "You will want to carry on exactly as planned. Change one thing willingly and the day will stop asking you to change three."],
  },
  { // Tiger
    ease: ["A Tiger with allies is hard to stop. Share the plan instead of charging ahead alone, and let people follow.", "Your boldness lands well today. Make the big ask, the one you would normally soften."],
    strain: ["Tigers answer a challenge by charging it. Today the better move is to watch from the long grass.", "Pride will want the last word. Let someone else have it and keep your energy for something worth the fight."],
  },
  { // Rabbit
    ease: ["Rabbits do well where there is goodwill, and there is plenty today. Step forward a little further than is comfortable.", "Your tact opens doors today. A gentle word in the right ear will do what a week of effort could not."],
    strain: ["A Rabbit's instinct is to go quiet and wait it out. That is right today, and it needs no apology.", "You will sense the tension before anyone names it. Stay kind, stay out of the middle, and keep your evening for yourself."],
  },
  { // Dragon
    ease: ["Dragons think big, and today the scale is justified. Describe the whole vision; people are ready to hear it.", "Your confidence is contagious today. Lead, and remember to say whose help got you there."],
    strain: ["A Dragon dislikes being slowed down. Today the delay is useful: it is showing you a gap in the plan.", "You may feel underestimated. Let it pass. A Dragon with nothing to prove is the most impressive kind."],
  },
  { // Snake
    ease: ["A Snake usually waits for certainty. Today you can move a little sooner; your reading of the situation is right.", "Your quiet charm works well today. Say less than the others and you will be the one they remember."],
    strain: ["Snakes see a motive behind every move. Today some of it is plain clumsiness. Keep watching, and hold your strike.", "Your instinct is to withdraw and calculate. Do the first and go easy on the second; the picture is incomplete."],
  },
  { // Horse
    ease: ["A Horse is happiest in open country. Today you have room to run, so cover ground while the going is good.", "Your enthusiasm carries people today. Start the thing, and they will catch you up."],
    strain: ["A Horse hates a closed gate, and today there are a few. Walk the fence calmly; one of them opens by evening.", "Impatience is your weak point on days like this. Slow to a trot, and finish one thing before you begin the next."],
  },
  { // Goat
    ease: ["A Goat thrives on kindness, and today it comes back to you. Ask for what you need without wrapping it in an apology.", "Your eye for what is beautiful and what is kind is valued today. Offer it freely; it is worth more than you charge for it."],
    strain: ["Goats take a harsh tone to heart. Today most of it has nothing to do with you. Let it go past, and stay near gentle company.", "Worry will offer you a long list. Pick the one item you can act on and hand the rest back."],
  },
  { // Monkey
    ease: ["A Monkey with a receptive audience can do almost anything. Try the clever idea out loud; today it will be taken seriously.", "Your quick thinking finds the shortcut today, and this time the shortcut is sound. Take it."],
    strain: ["Monkeys get out of trouble by being clever. Today, cleverness complicates things. The plain approach is the fast one.", "You will be tempted to juggle. Put two things down and hold one properly."],
  },
  { // Rooster
    ease: ["A Rooster's care over detail is noticed today and appreciated. Show your work; it stands up.", "Your straight talking is welcome today. Say it clearly and kindly, and people will thank you for the honesty."],
    strain: ["A Rooster sees the fault first. Today, mentioning it will cost more than the fault does. Fix your own corner and leave the rest.", "Things will be out of order and it will bother you. Tidy what is yours and let the day be imperfect."],
  },
  { // Dog
    ease: ["A Dog gives loyalty freely, and today it is returned. Let the people you look after do something for you.", "Your sense of fairness carries weight today. Speak up for what is right; you will be listened to."],
    strain: ["Dogs guard against trouble that has not arrived. Today, most of what you are bracing for will never come. Stand down a little.", "Something will strike you as unfair, and it may be. Note it, and choose a better day to take it up."],
  },
  { // Pig
    ease: ["A Pig's generosity makes friends everywhere, and today the friends are generous back. Enjoy it without counting.", "Your good nature smooths the day for everyone. Accept the invitation and the second helping of goodwill."],
    strain: ["Pigs trust easily. Today, check the detail before you agree, and keep your kindness for people who have earned it.", "You would rather keep the peace than make a point. Usually that is wise; today, one clear no will save you trouble."],
  },
]

// The day's animal against the reader's day sign, which speaks for home and close partners.
export const SEAT_RELATIONS: Record<Relation, Lead[]> = {
  clash: [
    { title: "Close to home", text: "Today's {animal} opposes the {seat}, your day sign, which speaks for home and for the person nearest to you. Domestic plans may shift and a partner may be out of sorts. Be easy to live with tonight and leave serious talks for another evening." },
    { title: "A restless day indoors", text: "The {animal} clashes with your day sign, the {seat}. That part of a chart covers private life, so the unsettled feeling is likelier at home than at work. Keep arrangements simple and be patient with whoever shares your roof." },
  ],
  six: [
    { title: "Warmth at home", text: "Today's {animal} pairs with the {seat}, your day sign, the part of your chart that speaks for home and partnership. Close relationships are at their easiest. If there is something to ask of someone you love, ask today." },
    { title: "In step with those nearest", text: "The {animal} is the natural partner of your day sign, the {seat}. Private life runs smoothly, and understanding comes without much explaining. A good evening to spend with one particular person." },
  ],
  three: [
    { title: "Easy company", text: "Today's {animal} is an ally of the {seat}, your day sign. Home and close friendships carry a pleasant, cooperative mood. Shared tasks go well, so do the thing that needs two pairs of hands." },
    { title: "A friendly household", text: "The {animal} stands in harmony with your day sign, the {seat}. People close to you are in a helpful frame of mind. It is a good day for family plans and for mending anything that was left frayed." },
  ],
  harm: [
    { title: "Handle with care", text: "Today's {animal} sits uneasily with the {seat}, your day sign. Between you and someone close, a small thing could be taken the wrong way. Say what you mean in full sentences, and assume good intentions on both sides." },
    { title: "A crossed wire at home", text: "The {animal} rubs against your day sign, the {seat}, which covers private life. Watch for misunderstandings about plans or chores. Confirm the arrangement instead of assuming it." },
  ],
  same: [
    { title: "An echo of your birthday", text: "Today is a {seat} day, the same sign as the day you were born. Feelings about home and about yourself are a little amplified. Useful for an honest conversation; less so for a hasty decision." },
    { title: "Your day sign returns", text: "The calendar repeats your own day sign, the {seat}. Private matters come to the front of your mind. Tend to them quietly: put something in order at home, and give your own needs a hearing." },
  ],
}

// Shown when the day carries an element the reader's chart welcomes or has too much of. {el} is the element.
export const ELEMENT_NOTES: { welcome: Lead[]; excess: Lead[] } = {
  welcome: [
    { title: "An element you need", text: "The day carries {el}, one of the elements your chart runs short of. Days like this top you up. You may notice it as nothing more than things taking less effort." },
    { title: "{el} in your favour", text: "Your chart welcomes {el}, and today supplies it. Whatever else the day brings, the ground under it is friendly. Do something that matters to you while it lasts." },
    { title: "Well supplied", text: "Today is rich in {el}, which your chart is glad to have. It lends a steadiness to the whole day. Lean on it for whatever you find hardest." },
  ],
  excess: [
    { title: "More than you need", text: "The day carries {el}, the element your chart already has in excess. It is like salt in a dish that was seasoned enough: everything is a little too much. Do less, and simplify where you can." },
    { title: "Too much {el}", text: "Your chart has all the {el} it can use, and today adds more. You may feel crowded or overextended without an obvious cause. Keep the schedule light and the expectations ordinary." },
    { title: "Against the grain", text: "Today is heavy with {el}, which tips your chart further from balance. It is a passing weight, and it responds to pacing. Take one thing at a time, and take breaks seriously." },
  ],
}

export const MOON_NOTES: { new: string[]; full: string[] } = {
  new: [
    "The lunar month begins today. The sky is dark and the slate is clean. It is the traditional day to set an intention for the month ahead, privately, in one sentence.",
    "First day of a new lunar month. Nothing is visible yet, in the sky or in your plans, and that is as it should be. Begin something small and tell no one.",
    "The moon is new. In the old calendar this is the month's true first day. Clear one thing out and decide what the coming four weeks are for.",
  ],
  full: [
    "The moon is full tonight, the midpoint of the lunar month. What was begun two weeks ago shows its results now. Feelings run a little higher, and so does the appetite for company.",
    "Fifteenth day of the lunar month: full moon. It is a traditional evening for gathering and for gratitude. Eat with people you like, and step outside to look up.",
    "Tonight's full moon marks the month's high tide. Things come to a head, pleasantly or otherwise. Finish something, celebrate something, and sleep with the curtains open.",
  ],
}

// The twenty-four solar terms, keyed by their Chinese names.
export const TERM_NOTES: Record<string, string> = {
  立春: "Spring begins in the solar calendar, and with it the astrological year. The ground is still cold but the direction has changed. Decide what you are growing this year.",
  雨水: "Snow gives way to rain. Growth is starting under the surface. A good fortnight for watering what you planted: follow up, nurture, be patient.",
  惊蛰: "The first thunder wakes whatever was sleeping in the ground. Energy stirs, yours included. Start moving again, and deal with anything that has been dormant too long.",
  春分: "Day and night are equal. It is the year's point of balance, and a fair moment to check your own: work against rest, giving against receiving.",
  清明: "The air clears and the light sharpens. This is the season for remembering those who came before, and for clearing out what winter left behind.",
  谷雨: "The last rains of spring feed the grain. Effort put in now is well timed. Tend what you have started and it will carry through the summer.",
  立夏: "Summer begins. Growth turns from roots to height. Things you have been building quietly can start to be seen.",
  小满: "The grain is filling but is not yet full. A good reminder that nearly enough is a fine place to be. Keep going steadily; ripeness cannot be hurried.",
  芒种: "The busiest stretch of the farming year: harvest one crop, sow the next. If you are stretched, that is the season. Do first what will not wait.",
  夏至: "The longest day. Yang is at its height, and from here the light slowly turns. Enjoy the peak and take note of what it shows you.",
  小暑: "The heat builds. Pace matters more than force now. Work in the cool of the day and guard your temper in the warm.",
  大暑: "The hottest part of the year. Everything is at full stretch. Slow down, drink water, and leave the biggest efforts until the weather breaks.",
  立秋: "Autumn begins in the solar calendar, though the heat lingers. The year turns from growing to gathering. Start asking what is ready to be brought in.",
  处暑: "The heat withdraws. Evenings cool, and the mind clears with them. A good fortnight to return to plans you set aside in midsummer.",
  白露: "Dew settles white on the grass in the mornings. The air is cleaner and so is thought. Put your affairs in order while the days are still long.",
  秋分: "Day and night stand level again. It is the harvest's midpoint. Weigh up the year so far: keep what worked and release what did not.",
  寒露: "The dew turns cold. Autumn deepens and the year starts drawing in. Finish outdoor business, and turn some attention homeward.",
  霜降: "The first frost. It is the last step of autumn, when leaves fall and things are stored. Wrap up what belongs to this season before winter opens.",
  立冬: "Winter begins. The year's energy goes underground. It is time to conserve: do less in public and more in preparation.",
  小雪: "The first light snow. Cold settles in without yet biting. Stock the cupboard, literal or otherwise, and keep your circle close.",
  大雪: "Heavy snow, deep cold. Nature is resting completely, and you are allowed to as well. Quiet work done now is the seed of next spring.",
  冬至: "The longest night, and the turning point: from tomorrow the light returns. Families gather for this one. Rest, eat well, and mark the turn.",
  小寒: "The cold tightens. The year is at its stillest. Keep warm, keep routines simple, and use the quiet to think through what comes next.",
  大寒: "The coldest days, and the last of the solar year. Clear debts, finish old business and clean the house. Spring is two weeks away.",
}

// The twelve day officers, in the order of OFFICERS in the glossary. Two notes each.
export const OFFICER_NOTES: string[][] = [
  [
    "The first of the twelve day-types. It favours setting out: starting a job, making a proposal, announcing a plan. Tradition holds back from digging and demolition today.",
    "A day with the energy of a first step. Begin things, introduce yourself, put a plan on paper. It is a poor day for tearing anything down.",
  ],
  [
    "A day for clearing away. Clean, declutter, cancel, end what is finished. Tradition also favours it for seeking treatment and for dropping a habit.",
    "Whatever you want less of, today is the day to remove it. Empty the drawer, close the account, wash everything. New things come more easily afterwards.",
  ],
  [
    "A day of plenty. It suits gatherings, celebrations and stocking up. Because the cup is already full, tradition avoids starting disputes or pressing claims.",
    "Abundance is the mood. Fill the fridge, host the dinner, enjoy what you have. Keep complaints and legal arguments for another date.",
  ],
  [
    "An even, ordinary day, and useful for that. It suits routine work, repairs, levelling out differences and making peace. Nothing grand, nothing risky.",
    "A level day. Good for smoothing things over, mending, and everyday business. Leave the ambitious launch for a day with more lift in it.",
  ],
  [
    "A day for fixing things in place: agreements, dates, engagements, plans. What is settled today tends to hold. Tradition avoids travel and legal fights.",
    "Stability is favoured. Sign, confirm, commit, arrange. It is less suited to moving about or to reopening what was already decided.",
  ],
  [
    "A day for keeping hold. Follow through, persist, build on what exists. Tradition favours repairs and planting, and holds back from moving house or setting out on a journey.",
    "The energy today grips. Stay with the task and finish it. It is a better day for keeping promises than for making new arrangements.",
  ],
  [
    "The day-type the almanac treats most warily. It suits demolition, clearing out and breaking a bad habit, and very little else. Avoid celebrations, contracts and new starts.",
    "A day for taking apart. Throw out, tear down, end it. Anything meant to last, a signing, an opening, a wedding, is better placed on another date.",
  ],
  [
    "The almanac asks for care today. Stay off ladders, literal and otherwise, and avoid needless risk. Quiet, careful work and acts of devotion are favoured.",
    "A day to go carefully. Nothing need go wrong; the tradition simply advises against heights, haste and gambles. Steady, attentive work is fine.",
  ],
  [
    "One of the best day-types. Things undertaken today tend to reach completion: openings, signings, weddings, the first day of a course. Tradition avoids only lawsuits.",
    "A day when efforts come to fruit. Launch it, sign it, celebrate it. Nearly everything is favoured, quarrels excepted.",
  ],
  [
    "A day for bringing in. Collect what is owed, close the deal, harvest results, put things into store. It is less suited to setting out on something new.",
    "Receiving is favoured. Chase the payment, accept the offer, gather your people. Hold back on big beginnings; today is for bringing in what is already yours.",
  ],
  [
    "A day of open doors. It favours new ventures, first days, travel, study and meeting people. One of the most generally fortunate of the twelve.",
    "Things open easily today. Start the business, begin the course, make the introduction. The tradition's only reservation concerns burials.",
  ],
  [
    "The last of the twelve. It favours closing, sealing, saving and rest: finish accounts, fill gaps, lock up. Tradition avoids openings and new starts.",
    "A day to shut the door behind you. Complete, store away, sleep. Anything that needs a beginning will do better tomorrow.",
  ],
]

// Why the lucky element is lucky, by how the day's stem stands to the reader's (see GROUPS).
// {lucky} is the lucky element, {day} the day's and {self} the reader's.
export const LUCKY_REASONS = [
  "The day doubles your {self}. {lucky} gives all that energy somewhere to go.",
  "Your {self} is feeding today's {day}. {lucky} is where that leads, and it turns effort into something you keep.",
  "{lucky} carries your {self} towards today's {day}, so what you reach for is easier to hold.",
  "{lucky} stands between today's {day} and your {self}, and turns pressure into support.",
  "Today's {day} already feeds your {self}. Your own element is the one to wear, to take it in fully.",
]
