/**
 * QuickLogSheet Component
 * 快速記錄底部抽屜 - Her 的核心記錄體驗
 */

import React, { useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BottomSheet, BottomSheetRef } from '../ui/BottomSheet';
import { Button } from '../Button';
import { Chip } from '../ui/Chip';
import { theme } from '@theme';
import { FlowLevel, PainLevel, MoodType, SymptomTag } from '@types/log';
import type { DailyLog } from '@types/log';

export interface QuickLogSheetRef {
  open: () => void;
  close: () => void;
}

interface QuickLogSheetProps {
  onSave: (log: Partial<DailyLog>) => void;
}

export const QuickLogSheet = forwardRef<QuickLogSheetRef, QuickLogSheetProps>(
  ({ onSave }, ref) => {
    const bottomSheetRef = useRef<BottomSheetRef>(null);

    const [flow, setFlow] = useState<FlowLevel | undefined>();
    const [pain, setPain] = useState<PainLevel | undefined>();
    const [moods, setMoods] = useState<MoodType[]>([]);
    const [symptoms, setSymptoms] = useState<SymptomTag[]>([]);

    useImperativeHandle(ref, () => ({
      open: () => bottomSheetRef.current?.open(),
      close: () => bottomSheetRef.current?.close(),
    }));

    const toggleMood = (mood: MoodType) => {
      setMoods(prev =>
        prev.includes(mood) ? prev.filter(m => m !== mood) : [...prev, mood]
      );
    };

    const toggleSymptom = (symptom: SymptomTag) => {
      setSymptoms(prev =>
        prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
      );
    };

    const handleSave = () => {
      onSave({
        date: new Date(),
        flow,
        pain,
        moods,
        symptoms,
      });
      bottomSheetRef.current?.close();
      // Reset
      setFlow(undefined);
      setPain(undefined);
      setMoods([]);
      setSymptoms([]);
    };

    return (
      <BottomSheet ref={bottomSheetRef}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>How are you feeling today?</Text>
          <Text style={styles.subtitle}>記錄只需 10 秒</Text>

          {/* Flow */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Flow</Text>
            <View style={styles.chipRow}>
              {flowOptions.map(option => (
                <Chip
                  key={option.value}
                  label={option.label}
                  icon={option.icon}
                  selected={flow === option.value}
                  onPress={() => setFlow(option.value)}
                  size="md"
                  style={styles.chip}
                />
              ))}
            </View>
          </View>

          {/* Pain */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Pain</Text>
            <View style={styles.chipRow}>
              {painOptions.map(option => (
                <Chip
                  key={option.value}
                  label={option.label}
                  icon={option.icon}
                  selected={pain === option.value}
                  onPress={() => setPain(option.value)}
                  color={theme.colors.phases.menstrual.primary}
                  size="md"
                  style={styles.chip}
                />
              ))}
            </View>
          </View>

          {/* Moods */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Mood</Text>
            <View style={styles.chipGrid}>
              {moodOptions.map(option => (
                <Chip
                  key={option.value}
                  label={option.label}
                  icon={option.icon}
                  selected={moods.includes(option.value)}
                  onPress={() => toggleMood(option.value)}
                  color={option.color}
                  size="md"
                  style={styles.chipGridItem}
                />
              ))}
            </View>
          </View>

          {/* Symptoms */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Symptoms (Optional)</Text>
            <View style={styles.chipGrid}>
              {symptomOptions.map(option => (
                <Chip
                  key={option.value}
                  label={option.label}
                  icon={option.icon}
                  selected={symptoms.includes(option.value)}
                  onPress={() => toggleSymptom(option.value)}
                  color={theme.colors.phases.lutealLate.primary}
                  size="sm"
                  style={styles.chipGridItem}
                />
              ))}
            </View>
          </View>

          <View style={styles.actions}>
            <Button
              title="Save"
              onPress={handleSave}
              fullWidth
              size="lg"
            />
          </View>
        </ScrollView>
      </BottomSheet>
    );
  }
);

const flowOptions = [
  { value: FlowLevel.NONE, label: 'None', icon: '○' },
  { value: FlowLevel.LIGHT, label: 'Light', icon: '◔' },
  { value: FlowLevel.MEDIUM, label: 'Medium', icon: '◑' },
  { value: FlowLevel.HEAVY, label: 'Heavy', icon: '●' },
];

const painOptions = [
  { value: PainLevel.NONE, label: 'None', icon: '😊' },
  { value: PainLevel.MILD, label: 'Mild', icon: '😐' },
  { value: PainLevel.MODERATE, label: 'Moderate', icon: '😣' },
  { value: PainLevel.SEVERE, label: 'Severe', icon: '😖' },
];

const moodOptions = [
  { value: MoodType.HAPPY, label: 'Happy', icon: '😊', color: theme.colors.moods.happy },
  { value: MoodType.CALM, label: 'Calm', icon: '😌', color: theme.colors.moods.calm },
  { value: MoodType.ENERGETIC, label: 'Energetic', icon: '⚡', color: theme.colors.moods.energetic },
  { value: MoodType.ANXIOUS, label: 'Anxious', icon: '😰', color: theme.colors.moods.anxious },
  { value: MoodType.SAD, label: 'Sad', icon: '😢', color: theme.colors.moods.sad },
  { value: MoodType.IRRITABLE, label: 'Irritable', icon: '😤', color: theme.colors.moods.irritable },
  { value: MoodType.TIRED, label: 'Tired', icon: '😴', color: theme.colors.moods.tired },
];

const symptomOptions = [
  { value: SymptomTag.HEADACHE, label: 'Headache', icon: '🤕' },
  { value: SymptomTag.LOW_ENERGY, label: 'Low Energy', icon: '🔋' },
  { value: SymptomTag.CRAVINGS, label: 'Cravings', icon: '🍫' },
  { value: SymptomTag.BLOATING, label: 'Bloating', icon: '💨' },
  { value: SymptomTag.TENDER_BREASTS, label: 'Tender', icon: '💔' },
  { value: SymptomTag.ACNE, label: 'Acne', icon: '🔴' },
  { value: SymptomTag.INSOMNIA, label: 'Insomnia', icon: '🌙' },
  { value: SymptomTag.BACK_PAIN, label: 'Back Pain', icon: '🔙' },
  { value: SymptomTag.NAUSEA, label: 'Nausea', icon: '🤢' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: theme.spacing['4xl'],
  },
  title: {
    ...theme.typography.styles.h3,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.md,
  },
  subtitle: {
    ...theme.typography.styles.body2,
    color: theme.colors.text.tertiary,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xl,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionLabel: {
    ...theme.typography.styles.caption,
    fontWeight: '600',
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: theme.spacing.md,
  },
  chipRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  chip: {
    flex: 1,
  },
  chipGridItem: {
    marginBottom: 0,
  },
  actions: {
    marginTop: theme.spacing.lg,
  },
});
