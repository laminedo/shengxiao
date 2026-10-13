// The month in each part of life, one entry per Ten God.
import type { Area } from './types'

export const MONTH_AREAS: Record<Area, string>[] = [
  // 0 Companion
  {
    love: "You are clear about what you want this month, which simplifies things and occasionally bruises them. Relationships between equals do best. If you are single, friends and people your own age are the likeliest route to someone new. If you are settled, do things side by side, and resist the urge to win small arguments.",
    work: "Independent work is favoured. You will get most done where you set the direction yourself, and you may chafe under close supervision. It is a good month to take ownership of a project or to act on your own initiative. Colleagues at your level are valuable allies; treat them as such instead of as competition.",
    money: "Money holds steady but is inclined to leave through friendship: shared costs, loans, generosity under social pressure. Decide your limits before the occasion arises. The best use of spare funds this month is on yourself, in the form of skills, tools or health.",
    well: "Vitality is good and largely self-generated. Regular exercise suits you now, especially anything you can do alone and measure. The risk is over-reliance on willpower; you will push through tiredness more than is wise. Keep ordinary hours, and let stubbornness take one day off a week.",
  },
  // 1 Rival
  {
    love: "Social life is lively and romance is tangled up with it. Group occasions bring introductions, and also a little competition for attention. In an established relationship, outside voices carry more weight than usual, whether friends, family or an ex, so keep your decisions between the two of you. A shared activity will do more for you than a serious talk.",
    work: "Teamwork and competition both intensify. You will achieve a good deal with others this month, provided roles and credit are agreed at the start. Expect rivals to be active, and treat it as useful information about your field. Networking pays. Office politics costs.",
    money: "This is the month to watch your wallet. Tradition links the pattern with money slipping away through other people: lending, splitting, keeping up. Put off large joint purchases, lend nothing you need back, and settle shared accounts promptly. Your income is safe enough; it is the outgoings that need watching.",
    well: "You have energy to burn, and it burns best in company. Team sports, classes and training partners will keep you going. Late nights are the hazard, along with competitive overexertion. Set your own limits and keep to them whoever else is in the room.",
  },
  // 2 Ease
  {
    love: "A sweet month for affection. You are relaxed and good-humoured, and it draws people to you. Shared meals, unhurried evenings and small kindnesses are the language of the month. If you are single, you are likely to meet someone while enjoying yourself, so go and enjoy yourself.",
    work: "Work flows when it draws on what you already do well. This is a month for craft: producing, refining, teaching, serving clients with care. You may lack appetite for conflict or for long strategic meetings, and that is fine. Deliver good work at an even pace and let it speak.",
    money: "Tradition says this influence gives rise to wealth, meaning that money follows from skill used with pleasure. Income is gently favoured, especially from your own talents. Spending on comfort will be tempting and mostly harmless. Keep an eye on the total.",
    well: "The body is content. Appetite, digestion and sleep are all good, and you recover easily. It is a month to enjoy food and rest without guilt, and to choose gentle, pleasurable movement. The only danger is too much of a good thing: portions and sofas both expand in months like this.",
  },
  // 3 Spark
  {
    love: "You are magnetic this month and a little sharp. Wit and candour make you exciting company; they can also cut. Flirtation comes easily. In a long relationship, try something new together and keep criticism to a minimum. What feels to you like honesty may land as a verdict.",
    work: "Your most inventive month of the ten. Problems that defeated others give way, and you can see improvements everywhere. Pitch, design, perform, publish. The friction point is authority: you will find rules and superiors hard to tolerate. Present your ideas as help, never as correction, and choose your moment.",
    money: "Ideas can be turned into income now, particularly through creative or freelance work. Ask for the higher fee. Be wary of impulsive spending dressed up as self-expression, and of disputes over payments: put terms in writing first, and keep your temper if they are tested.",
    well: "Mental energy is high and nervous energy higher. You need outlets: movement, music, making things. Without them, expect restlessness and poor sleep. Go easy on stimulants, and give yourself a firm wind-down every evening.",
  },
  // 4 Windfall
  {
    love: "Charm and generosity are both running high. It is a flirtatious, sociable month in which meetings happen by chance. If you are single, accept invitations. If you are attached, bring some of that charm home: take your partner out, surprise them. Avoid promising more than you intend to give.",
    work: "Opportunity arrives through people. Clients, contacts and chance conversations open doors, and commercial instincts are sharp. It is an excellent month for sales, negotiations and new ventures. The discipline required is follow-through; choose the two best openings and see them properly through.",
    money: "The most fortunate influence for unexpected money: bonuses, refunds, side income, a good deal. Stay alert and act on real opportunities quickly. The same influence favours speculation, and that is where it turns. Set a firm limit on anything risky, and bank part of whatever comes in.",
    well: "You will be busy, out and about, and enjoying it. That is good for the spirits and hard on routines. Meals get skipped and sleep gets shortened. Keep two or three fixed points in the week that nothing is allowed to move: a workout, an early night, a proper Sunday.",
  },
  // 5 Harvest
  {
    love: "Love takes a practical, dependable form this month. Commitments deepen through deeds: plans made, promises kept, help given without being asked. It is a good month for couples to discuss money, home and the future. If you are single, look for sincerity over sparkle.",
    work: "Steady effort is rewarded in full. Clear the backlog, hit the targets and attend to detail. The month favours administration, finance and any task with a measurable result. Advancement comes through reliability more than through brilliance, and people are noticing who delivers.",
    money: "The best month of the ten for earned income and sound management. Money owed tends to arrive. Budget, save and make the careful purchase you have researched. Nothing spectacular is promised, only solid gain, which is the kind that stays.",
    well: "Health benefits from regularity. Fixed mealtimes, consistent sleep and a routine of moderate exercise will serve you better than any burst of enthusiasm. Overwork is the one risk: you will be tempted to treat rest as a reward to be earned. Schedule it instead.",
  },
  // 6 Pressure
  {
    love: "Feelings are intense this month, for better and worse. Attraction can be sudden and strong; so can arguments. In an existing relationship, outside stress is the real opponent. Say so, and face it as a team. Avoid power struggles, and leave lasting decisions until the heat has gone out of them.",
    work: "Demands rise sharply. You may face tight deadlines, a tough superior or direct competition. It is also a month in which reputations are made, because decisive action under pressure gets noticed. Prioritise ruthlessly, keep records, and stay strictly professional in any conflict.",
    money: "Money is under some strain: unexpected bills, urgent costs, or pressure to commit funds quickly. Keep a reserve and avoid new debt or risk. On the positive side, it is a good month to face financial problems squarely and to cut what no longer earns its place.",
    well: "Stress is the month's main question. Your body will carry tension unless you give it somewhere to go, so exercise hard, sleep properly and take real breaks. Be more careful than usual with physical risks. If you are run down at the start of the month, lighten the load early.",
  },
  // 7 Duty
  {
    love: "Relationships become more serious and more defined. It is a favourable month for commitment, for meeting families and for any formal step. Respect and reliability matter more than excitement. If something has been left vague between you and another person, expect it to be clarified.",
    work: "A strong month for career. Superiors are paying attention, and proper conduct is rewarded with trust and sometimes with promotion. Interviews, appraisals and official applications go well. Take on responsibility where it is offered, and be meticulous about procedure.",
    money: "Income through regular, legitimate channels is favoured: salary, contracts, entitlements. Put your tax, pension and insurance in order. Avoid shortcuts of any kind. Obligations may absorb some of your funds, and it is right that they come first.",
    well: "Disciplined habits come easily, so it is a good time to begin a sensible regime. The burden to watch is responsibility itself, which sits in the neck, the shoulders and your sleep. Build small releases into each day and take your full days off.",
  },
  // 8 Insight
  {
    love: "You turn inward this month and may seem distant. You are thinking, and it helps to say so. Depth matters more to you than company; one honest conversation will satisfy more than a busy social calendar. Guard against reading too much into small things, and ask before you assume.",
    work: "Research, analysis, strategy and specialist skills come to the fore. You will do your best work alone or in a very small group. Unconventional ideas are worth developing. The danger is isolation and delay: share drafts early, and set deadlines for your own thinking.",
    money: "This is a cautious month, and caution serves you. Investigate before you buy, read contracts closely, and be sceptical of complicated offers. Unusual or niche sources of income may be worth exploring. Avoid letting prudence turn into paralysis over small sums.",
    well: "The mind is busy and the body is easily forgotten. Appetite and sleep can both become irregular. Keep simple anchors: meals at fixed times, a daily walk, lights out at a set hour. Quiet practices such as meditation or slow breathing suit you well now.",
  },
  // 9 Support
  {
    love: "A tender, protective month. You are well cared for, and family ties are warm. It favours settled affection over new adventure: time at home, shared routines, being looked after and looking after in turn. If you are single, the people who already love you may introduce someone suitable.",
    work: "Support is plentiful. Mentors and senior colleagues are generous, and you learn quickly. It is an ideal month for training, qualifications and long-range planning. Initiative may be lower than usual; that is acceptable, provided you use the time to prepare for your next move.",
    money: "Security is favoured over gain. Help may come from family or from someone more experienced, and advice received this month is worth following. Attend to long-term matters: savings, property, insurance, documents. Keep your own eye on what is yours instead of leaving it to others.",
    well: "The most restorative influence of the ten. Sleep is deep and recovery is quick; long-standing tiredness can lift. Rest, eat well and accept care. Keep some gentle activity going, so that comfort does not thicken into lethargy.",
  },
]
