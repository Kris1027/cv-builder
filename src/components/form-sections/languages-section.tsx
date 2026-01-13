import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getLanguageLevels } from '@/lib/language-levels';
import type { LanguageProps, LanguageLevelProps } from '@/types/form-types';
import { Trash2, Plus, Globe, GripVertical } from 'lucide-react';
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

interface LanguagesSectionProps {
  form: FormApi;
  addLanguage: () => void;
  removeLanguage: (index: number) => void;
  reorderLanguages: (oldIndex: number, newIndex: number) => void;
}

interface SortableLanguageItemProps {
  id: string;
  index: number;
  form: FormApi;
  removeLanguage: (index: number) => void;
}

const SortableLanguageItem = ({ id, index, form, removeLanguage }: SortableLanguageItemProps) => {
  const { t } = useTranslation();
  const languageLevels = getLanguageLevels(t);
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
      className={`bg-gradient-to-r from-cyan-50/50 to-white dark:from-cyan-900/10 dark:to-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-900/50 transition-shadow ${isDragging ? 'shadow-lg opacity-90' : ''}`}
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
            {t('sections.languages.item', { number: index + 1 })}
          </h4>
        </div>
        <Button
          type='button'
          variant='ghost'
          size='sm'
          onClick={() => removeLanguage(index)}
          className='text-red-500 hover:text-red-700 hover:bg-red-50'
        >
          <Trash2 className='h-4 w-4' />
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <form.Field name={`languages[${index}].language`}>
          {(subField) => (
            <div className='space-y-2'>
              <Label htmlFor={subField.name}>{t('form.language')}</Label>
              <Input
                id={subField.name}
                name={subField.name}
                value={subField.state.value}
                onBlur={subField.handleBlur}
                onChange={(e) => subField.handleChange(e.target.value)}
                placeholder={t('placeholders.language')}
                className='focus:ring-cyan-500'
              />
            </div>
          )}
        </form.Field>

        <form.Field name={`languages[${index}].proficiency`}>
          {(subField) => (
            <div className='space-y-2'>
              <Label htmlFor={subField.name}>{t('form.proficiency')}</Label>
              <Select
                value={subField.state.value}
                onValueChange={(value) =>
                  subField.handleChange(value as LanguageLevelProps)
                }
              >
                <SelectTrigger className='focus:ring-cyan-500'>
                  <SelectValue placeholder={t('placeholders.selectProficiency')} />
                </SelectTrigger>
                <SelectContent>
                  {languageLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </form.Field>
      </div>
    </div>
  );
};

export const LanguagesSection = ({ form, addLanguage, removeLanguage, reorderLanguages }: LanguagesSectionProps) => {
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
      const languages = form.getFieldValue('languages') as LanguageProps[];
      const oldIndex = languages.findIndex((_, i) => `language-${i}` === active.id);
      const newIndex = languages.findIndex((_, i) => `language-${i}` === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        reorderLanguages(oldIndex, newIndex);
      }
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 dark:bg-gray-800 dark:shadow-gray-900/50">
      <CardHeader className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <CardTitle className="text-xl dark:text-gray-100">{t('sections.languages.title')}</CardTitle>
            </div>
            <CardDescription className="mt-1 dark:text-gray-400">{t('sections.languages.description')}</CardDescription>
          </div>
          <Button
            type='button'
            onClick={addLanguage}
            className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t('sections.languages.add')}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form.Field name='languages'>
          {(field) => (
            <div className='space-y-4'>
              {field.state.value.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Globe className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                  <p>{t('sections.languages.empty')}</p>
                  <p className="text-sm mt-1">{t('sections.languages.emptyHint')}</p>
                </div>
              )}
              {field.state.value.length > 0 && (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={field.state.value.map((_: LanguageProps, index: number) => `language-${index}`)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className='space-y-4'>
                      {field.state.value.map((_: LanguageProps, index: number) => (
                        <SortableLanguageItem
                          key={`language-${index}`}
                          id={`language-${index}`}
                          index={index}
                          form={form}
                          removeLanguage={removeLanguage}
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
