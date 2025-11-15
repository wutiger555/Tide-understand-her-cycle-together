/**
 * 階段描述與建議
 * Phase descriptions and suggestions
 */

import { CyclePhase } from '@types/cycle';

/**
 * 階段資訊（給 Her）
 */
export interface PhaseInfo {
  name: string;
  nameZh: string;
  description: string;
  commonFeelings: string[];
  selfCareTips: string[];
  emoji: string;
}

/**
 * 獲取階段資訊（Her 版本）
 */
export function getPhaseInfo(phase: CyclePhase): PhaseInfo {
  switch (phase) {
    case CyclePhase.MENSTRUAL:
      return {
        name: 'Menstrual Phase',
        nameZh: '月經期',
        description: 'Your body is shedding the uterine lining. Energy may be lower, and rest is important.',
        commonFeelings: [
          'Lower energy levels',
          'Possible cramps or discomfort',
          'Need for more rest',
          'Emotional sensitivity'
        ],
        selfCareTips: [
          'Get plenty of rest',
          'Stay hydrated',
          'Use heat for cramps',
          'Gentle movement like walking or yoga',
          'Eat iron-rich foods'
        ],
        emoji: '🌊',
      };

    case CyclePhase.FOLLICULAR:
      return {
        name: 'Follicular Phase',
        nameZh: '濾泡期',
        description: 'Estrogen is rising. You may feel more energetic and optimistic.',
        commonFeelings: [
          'Increasing energy',
          'Positive mood',
          'Better focus',
          'More social'
        ],
        selfCareTips: [
          'Good time for challenging tasks',
          'Try new activities',
          'Connect with friends',
          'Build healthy habits'
        ],
        emoji: '🌱',
      };

    case CyclePhase.OVULATORY:
      return {
        name: 'Ovulatory Phase',
        nameZh: '排卵期',
        description: 'Peak fertility. Energy and confidence are often at their highest.',
        commonFeelings: [
          'High energy',
          'Confident',
          'Outgoing',
          'Peak physical performance'
        ],
        selfCareTips: [
          'Great time for important meetings',
          'Intense workouts',
          'Social gatherings',
          'Creative projects'
        ],
        emoji: '✨',
      };

    case CyclePhase.LUTEAL_EARLY:
      return {
        name: 'Early Luteal Phase',
        nameZh: '黃體前期',
        description: 'Progesterone is rising. You may feel calm and productive.',
        commonFeelings: [
          'Steady energy',
          'Nesting instinct',
          'Detail-oriented',
          'Productive'
        ],
        selfCareTips: [
          'Focus on completing projects',
          'Organize your space',
          'Moderate exercise',
          'Balanced nutrition'
        ],
        emoji: '🌾',
      };

    case CyclePhase.LUTEAL_LATE:
      return {
        name: 'Late Luteal Phase',
        nameZh: '黃體後期',
        description: 'Hormone levels drop. PMS symptoms may appear. Extra self-care is important.',
        commonFeelings: [
          'Lower energy',
          'Emotional sensitivity',
          'Possible PMS symptoms',
          'Need for alone time',
          'Food cravings'
        ],
        selfCareTips: [
          'Be gentle with yourself',
          'Say no to extra commitments',
          'Gentle exercise',
          'Comfort foods in moderation',
          'Early bedtime',
          'Journaling'
        ],
        emoji: '🌙',
      };

    default:
      return getPhaseInfo(CyclePhase.MENSTRUAL);
  }
}

/**
 * 伴侶建議
 */
export interface PartnerGuidance {
  phaseExplanation: string;
  whatToExpect: string[];
  suggestedActions: string[];
  thingsToAvoid: string[];
}

/**
 * 獲取伴侶指導（Partner 版本）
 */
export function getPartnerGuidance(phase: CyclePhase): PartnerGuidance {
  switch (phase) {
    case CyclePhase.MENSTRUAL:
      return {
        phaseExplanation: 'She\'s in her menstrual phase. Her body is working hard, and she may need extra rest and comfort.',
        whatToExpect: [
          'Lower energy levels',
          'Possible physical discomfort',
          'Need for more rest',
          'May prefer staying in'
        ],
        suggestedActions: [
          'Offer to handle chores',
          'Prepare a heating pad or hot water bottle',
          'Make her favorite comfort food',
          'Suggest a quiet evening at home',
          'Be patient and understanding',
          'Check in without being intrusive'
        ],
        thingsToAvoid: [
          'Planning active or demanding activities',
          'Expecting high energy',
          'Being dismissive of discomfort'
        ],
      };

    case CyclePhase.FOLLICULAR:
      return {
        phaseExplanation: 'She\'s in her follicular phase. Energy is rising, and she may feel more positive and social.',
        whatToExpect: [
          'Increasing energy',
          'Positive mood',
          'Open to new experiences',
          'More social'
        ],
        suggestedActions: [
          'Plan a fun activity together',
          'Support her new ideas',
          'Enjoy quality time',
          'Be spontaneous'
        ],
        thingsToAvoid: [
          'Being overly protective',
          'Limiting her activities'
        ],
      };

    case CyclePhase.OVULATORY:
      return {
        phaseExplanation: 'She\'s in her ovulatory phase. This is often when energy and confidence are highest.',
        whatToExpect: [
          'High energy',
          'Outgoing mood',
          'Confidence',
          'Social'
        ],
        suggestedActions: [
          'Plan special activities',
          'Celebrate achievements',
          'Enjoy active time together',
          'Be supportive of her goals'
        ],
        thingsToAvoid: [
          'Taking her energy for granted',
          'Overloading her schedule'
        ],
      };

    case CyclePhase.LUTEAL_EARLY:
      return {
        phaseExplanation: 'She\'s in the early luteal phase. Energy is steady, and she may focus on nesting and completing tasks.',
        whatToExpect: [
          'Productive mood',
          'Detail-oriented',
          'Steady energy',
          'May want to organize'
        ],
        suggestedActions: [
          'Help with projects around the home',
          'Appreciate her efforts',
          'Support her focus time',
          'Plan cozy evenings'
        ],
        thingsToAvoid: [
          'Creating unnecessary mess',
          'Interrupting her flow'
        ],
      };

    case CyclePhase.LUTEAL_LATE:
      return {
        phaseExplanation: 'She\'s in the late luteal phase. Hormones are dropping, which can bring PMS symptoms. Extra care and understanding are valuable now.',
        whatToExpect: [
          'Lower energy',
          'Emotional sensitivity',
          'Possible irritability',
          'May need space',
          'Food cravings'
        ],
        suggestedActions: [
          'Be extra patient and understanding',
          'Offer emotional support without fixing',
          'Help reduce her stress',
          'Respect if she needs alone time',
          'Surprise her with her favorite treat',
          'Handle extra responsibilities'
        ],
        thingsToAvoid: [
          'Taking mood changes personally',
          'Planning stressful activities',
          'Being critical',
          'Expecting high energy',
          'Dismissing her feelings'
        ],
      };

    default:
      return getPartnerGuidance(CyclePhase.MENSTRUAL);
  }
}

/**
 * 根據週期日獲取簡短的每日訊息（Her）
 */
export function getDailyMessageForHer(cycleDay: number, phase: CyclePhase): string {
  const phaseInfo = getPhaseInfo(phase);

  if (cycleDay === 1) {
    return `Day 1 of your cycle. Your period has started. ${phaseInfo.emoji} Be gentle with yourself today.`;
  }

  return `Day ${cycleDay} of your cycle (${phaseInfo.nameZh}). ${phaseInfo.emoji}`;
}

/**
 * 根據週期日獲取簡短的每日訊息（Partner）
 */
export function getDailyMessageForPartner(cycleDay: number, phase: CyclePhase): string {
  const phaseInfo = getPhaseInfo(phase);
  return `She's on Day ${cycleDay} of her cycle (${phaseInfo.name}). ${phaseInfo.emoji}`;
}
