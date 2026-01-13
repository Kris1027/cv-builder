import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { EducationProps } from '@/types/form-types';
import { Trash2, Plus, GraduationCap, GripVertical } from 'lucide-react';
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

interface EducationSectionProps {
  form: FormApi;
  addEducation: () => void;
  removeEducation: (index: number) => void;
  reorderEducation: (oldIndex: number, newIndex: number) => void;
}

interface SortableEducationItemProps {
  id: string;
  index: number;
  form: FormApi;
  removeEducation: (index: number) => void;
}

const SortableEducationItem = ({ id, index, form, removeEducation }: SortableEducationItemProps) => {
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
      className={`bg-gradient-to-r from-purple-50/50 to-white dark:from-purple-900/10 dark:to-gray-800/50 p-6 rounded-xl space-y-4 border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-900/50 transition-shadow ${isDragging ? 'shadow-lg opacity-90' : ''}`}
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
            {t('sections.education.item', { number: index + 1 })}
          </h4>
        </div>
        <Button
          type='button'
          variant='ghost'
          size='sm'
          onClick={() => removeEducation(index)}
          className='text-red-500 hover:text-red-700 hover:bg-red-50'
        >
          <Trash2 className='h-4 w-4' />
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <form.Field name={`education[${index}].institution`}>
          {(subField) => (
            <div className='space-y-2'>
              <Label htmlFor={subField.name}>{t('form.institution')}</Label>
              <Input
                id={subField.name}
                name={subField.name}
                value={subField.state.value}
                onBlur={subField.handleBlur}
                onChange={(e) => subField.handleChange(e.target.value)}
                placeholder={t('placeholders.institution')}
                className='focus:ring-purple-500'
              />
            </div>
          )}
        </form.Field>

        <form.Field name={`education[${index}].degree`}>
          {(subField) => (
            <div className='space-y-2'>
              <Label htmlFor={subField.name}>{t('form.degree')}</Label>
              <Input
                id={subField.name}
                name={subField.name}
                value={subField.state.value}
                onBlur={subField.handleBlur}
                onChange={(e) => subField.handleChange(e.target.value)}
                placeholder={t('placeholders.degree')}
                className='focus:ring-purple-500'
              />
            </div>
          )}
        </form.Field>

        <form.Field name={`education[${index}].field`}>
          {(subField) => (
            <div className='space-y-2'>
              <Label htmlFor={subField.name}>{t('form.field')}</Label>
              <Input
                id={subField.name}
                name={subField.name}
                value={subField.state.value}
                onBlur={subField.handleBlur}
                onChange={(e) => subField.handleChange(e.target.value)}
                placeholder={t('placeholders.field')}
                className='focus:ring-purple-500'
              />
            </div>
          )}
        </form.Field>

        <div className='grid grid-cols-2 gap-2'>
          <form.Field name={`education[${index}].startDate`}>
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
                  yearOnly
                  placeholder='Select year'
                />
              </div>
            )}
          </form.Field>

          <form.Field name={`education[${index}].endDate`}>
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
                  yearOnly
                  placeholder='Select year'
                />
              </div>
            )}
          </form.Field>
        </div>
      </div>

      <form.Field name={`education[${index}].description`}>
        {(subField) => (
          <div className='space-y-2'>
            <Label htmlFor={subField.name}>{t('form.description')}</Label>
            <Textarea
              id={subField.name}
              name={subField.name}
              value={subField.state.value}
              onBlur={subField.handleBlur}
              onChange={(e) => subField.handleChange(e.target.value)}
              placeholder='GPA, relevant coursework, achievements...'
              className='focus:ring-purple-500 min-h-[100px] resize-none'
            />
          </div>
        )}
      </form.Field>
    </div>
  );
};

export const EducationSection = ({ form, addEducation, removeEducation, reorderEducation }: EducationSectionProps) => {
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
      const education = form.getFieldValue('education') as EducationProps[];
      const oldIndex = education.findIndex((_, i) => `education-${i}` === active.id);
      const newIndex = education.findIndex((_, i) => `education-${i}` === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        reorderEducation(oldIndex, newIndex);
      }
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 dark:bg-gray-800 dark:shadow-gray-900/50">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <CardTitle className="text-xl dark:text-gray-100">{t('sections.education.title')}</CardTitle>
            </div>
            <CardDescription className="mt-1 dark:text-gray-400">{t('sections.education.description')}</CardDescription>
          </div>
          <Button
            type='button'
            onClick={addEducation}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t('sections.education.add')}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form.Field name='education'>
          {(field) => (
            <div className='space-y-6'>
              {field.state.value.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                  <p>{t('sections.education.empty')}</p>
                  <p className="text-sm mt-1">{t('sections.education.emptyHint')}</p>
                </div>
              )}
              {field.state.value.length > 0 && (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={field.state.value.map((_: EducationProps, index: number) => `education-${index}`)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className='space-y-6'>
                      {field.state.value.map((_: EducationProps, index: number) => (
                        <SortableEducationItem
                          key={`education-${index}`}
                          id={`education-${index}`}
                          index={index}
                          form={form}
                          removeEducation={removeEducation}
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
