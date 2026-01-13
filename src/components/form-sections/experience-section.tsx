import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ExperienceProps } from '@/types/form-types';
import { Trash2, Plus, Briefcase, GripVertical } from 'lucide-react';
import type { FormApi } from '@/types/form-component-types';
import { useTranslation } from 'react-i18next';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ExperienceSectionProps {
  form: FormApi;
  addExperience: () => void;
  removeExperience: (index: number) => void;
  reorderExperiences: (oldIndex: number, newIndex: number) => void;
}

interface SortableExperienceItemProps {
  id: string;
  index: number;
  form: FormApi;
  removeExperience: (index: number) => void;
}

const SortableExperienceItem = ({ id, index, form, removeExperience }: SortableExperienceItemProps) => {
  const { t } = useTranslation();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    position: 'relative' as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-gradient-to-r from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800/50 p-6 rounded-xl space-y-4 border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-900/50 transition-shadow ${isDragging ? 'shadow-lg opacity-90' : ''}`}
    >
      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-center gap-2'>
          <button
            type='button'
            className='cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors touch-none'
            {...attributes}
            {...listeners}
          >
            <GripVertical className='h-5 w-5 text-gray-400' />
          </button>
          <h4 className='font-semibold text-lg text-gray-700 dark:text-gray-300'>
            {t('sections.experience.item', { number: index + 1 })}
          </h4>
        </div>
        <Button
          type='button'
          variant='ghost'
          size='sm'
          onClick={() => removeExperience(index)}
          className='text-red-500 hover:text-red-700 hover:bg-red-50'
        >
          <Trash2 className='h-4 w-4' />
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <form.Field name={`experiences[${index}].company`}>
          {(subField) => (
            <div className='space-y-2'>
              <Label htmlFor={subField.name}>{t('form.company')}</Label>
              <Input
                id={subField.name}
                name={subField.name}
                value={subField.state.value}
                onBlur={subField.handleBlur}
                onChange={(e) => subField.handleChange(e.target.value)}
                placeholder={t('placeholders.company')}
                className='focus:ring-green-500'
              />
            </div>
          )}
        </form.Field>

        <form.Field name={`experiences[${index}].position`}>
          {(subField) => (
            <div className='space-y-2'>
              <Label htmlFor={subField.name}>{t('form.position')}</Label>
              <Input
                id={subField.name}
                name={subField.name}
                value={subField.state.value}
                onBlur={subField.handleBlur}
                onChange={(e) => subField.handleChange(e.target.value)}
                placeholder={t('placeholders.position')}
                className='focus:ring-green-500'
              />
            </div>
          )}
        </form.Field>

        <form.Field name={`experiences[${index}].location`}>
          {(subField) => (
            <div className='space-y-2'>
              <Label htmlFor={subField.name}>{t('form.location')}</Label>
              <Input
                id={subField.name}
                name={subField.name}
                value={subField.state.value}
                onBlur={subField.handleBlur}
                onChange={(e) => subField.handleChange(e.target.value)}
                placeholder={t('placeholders.locationJob')}
                className='focus:ring-green-500'
              />
            </div>
          )}
        </form.Field>

        <form.Field name={`experiences[${index}].startDate`}>
          {(subField) => (
            <div className='space-y-2'>
              <Label htmlFor={subField.name}>{t('form.startDate')}</Label>
              <DatePicker
                id={subField.name}
                name={subField.name}
                value={subField.state.value}
                onChange={(date) =>
                  subField.handleChange(date ? date.toISOString() : '')
                }
              />
            </div>
          )}
        </form.Field>

        <form.Field name={`experiences[${index}].endDate`}>
          {(subField) => (
            <div className='space-y-2'>
              <Label htmlFor={subField.name}>{t('form.endDate')}</Label>
              <DatePicker
                id={subField.name}
                name={subField.name}
                value={subField.state.value}
                onChange={(date) =>
                  subField.handleChange(date ? date.toISOString() : '')
                }
                disabled={form.getFieldValue(`experiences[${index}].current`)}
              />
            </div>
          )}
        </form.Field>
      </div>

      <form.Field name={`experiences[${index}].current`}>
        {(subField) => (
          <div className='flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
            <Checkbox
              id={subField.name}
              name={subField.name}
              checked={subField.state.value}
              onCheckedChange={(checked) => subField.handleChange(!!checked)}
              className='border-blue-400'
            />
            <Label htmlFor={subField.name} className='text-blue-700 dark:text-blue-400 cursor-pointer'>
              {t('form.currentlyWorking')}
            </Label>
          </div>
        )}
      </form.Field>

      <form.Field name={`experiences[${index}].description`}>
        {(subField) => (
          <div className='space-y-2'>
            <Label htmlFor={subField.name}>{t('form.description')}</Label>
            <Textarea
              id={subField.name}
              name={subField.name}
              value={subField.state.value}
              onBlur={subField.handleBlur}
              onChange={(e) => {
                let value = e.target.value;
                // Add bullet point at the start if empty and user starts typing
                if (value.length === 1 && value !== '•') {
                  value = '• ' + value;
                }
                subField.handleChange(value);
              }}
              onPaste={(e) => {
                // Handle pasting into empty field - add bullet point
                if (!subField.state.value || subField.state.value.length === 0) {
                  const pastedText = e.clipboardData.getData('text');
                  if (pastedText && !pastedText.trimStart().startsWith('•')) {
                    e.preventDefault();
                    subField.handleChange('• ' + pastedText.trimStart());
                  }
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const target = e.target as HTMLTextAreaElement;
                  const { selectionStart, selectionEnd, value } = target;
                  const newValue = value.substring(0, selectionStart) + '\n• ' + value.substring(selectionEnd);
                  subField.handleChange(newValue);
                  // Set cursor position after the bullet point (requestAnimationFrame ensures DOM has updated)
                  requestAnimationFrame(() => {
                    target.selectionStart = target.selectionEnd = selectionStart + 3;
                  });
                }
              }}
              placeholder={t('placeholders.description')}
              className='focus:ring-green-500 min-h-[120px] resize-none'
            />
            <p className="text-xs text-gray-500">
              {t('sections.experience.bulletHint')}
            </p>
          </div>
        )}
      </form.Field>
    </div>
  );
};

export const ExperienceSection = ({ form, addExperience, removeExperience, reorderExperiences }: ExperienceSectionProps) => {
  const { t } = useTranslation();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const experiences = form.getFieldValue('experiences') as ExperienceProps[];
      const oldIndex = experiences.findIndex((_, i) => `experience-${i}` === active.id);
      const newIndex = experiences.findIndex((_, i) => `experience-${i}` === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        reorderExperiences(oldIndex, newIndex);
      }
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 dark:bg-gray-800 dark:shadow-gray-900/50">
      <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-green-600 dark:text-green-400" />
              <CardTitle className="text-xl dark:text-gray-100">{t('sections.experience.title')}</CardTitle>
            </div>
            <CardDescription className="mt-1 dark:text-gray-400">{t('sections.experience.description')}</CardDescription>
          </div>
          <Button
            type='button'
            onClick={addExperience}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t('sections.experience.add')}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form.Field name='experiences'>
          {(field) => (
            <div className='space-y-6'>
              {field.state.value.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                  <p>{t('sections.experience.empty')}</p>
                  <p className="text-sm mt-1">{t('sections.experience.emptyHint')}</p>
                </div>
              )}
              {field.state.value.length > 0 && (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={field.state.value.map((_: ExperienceProps, index: number) => `experience-${index}`)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className='space-y-6'>
                      {field.state.value.map((_: ExperienceProps, index: number) => (
                        <SortableExperienceItem
                          key={`experience-${index}`}
                          id={`experience-${index}`}
                          index={index}
                          form={form}
                          removeExperience={removeExperience}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          )}
        </form.Field>
      </CardContent>
    </Card>
  );
};
