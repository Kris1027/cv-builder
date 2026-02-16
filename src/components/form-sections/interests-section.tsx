import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { InterestProps } from '@/types/form-types';
import { Plus, Heart, X, GripVertical } from 'lucide-react';
import { useState } from 'react';
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
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface InterestsSectionProps {
  form: FormApi;
  addInterest: () => void;
  removeInterest: (index: number) => void;
  reorderInterests: (oldIndex: number, newIndex: number) => void;
}

interface SortableInterestItemProps {
  id: string;
  index: number;
  interest: InterestProps;
  removeInterest: (index: number) => void;
}

const SortableInterestItem = ({ id, index, interest, removeInterest }: SortableInterestItemProps) => {
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
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 border border-rose-200 dark:border-rose-800 rounded-full hover:shadow-md dark:hover:shadow-gray-900/50 transition-all ${isDragging ? 'shadow-lg opacity-90' : ''}`}
    >
      <button
        type='button'
        className='cursor-grab active:cursor-grabbing p-0.5 hover:bg-rose-200 dark:hover:bg-rose-800/50 rounded transition-colors touch-none'
        {...attributes}
        {...listeners}
      >
        <GripVertical className='h-3 w-3 text-gray-400' />
      </button>
      <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>{interest.name}</span>
      <button
        type='button'
        onClick={() => removeInterest(index)}
        className='opacity-0 group-hover:opacity-100 transition-opacity'
      >
        <X className='h-3 w-3 text-red-500 hover:text-red-700' />
      </button>
    </div>
  );
};

export const InterestsSection = ({ form, removeInterest, reorderInterests }: InterestsSectionProps) => {
  const { t } = useTranslation();
  const [interestInput, setInterestInput] = useState('');

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

  const handleAddInterest = () => {
    if (interestInput.trim()) {
      form.setFieldValue('interests', [...(form.getFieldValue('interests') as InterestProps[]), { name: interestInput.trim() }]);
      setInterestInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddInterest();
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const interests = form.getFieldValue('interests') as InterestProps[];
      const oldIndex = interests.findIndex((_, i) => `interest-${i}` === active.id);
      const newIndex = interests.findIndex((_, i) => `interest-${i}` === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        reorderInterests(oldIndex, newIndex);
      }
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 dark:bg-gray-800 dark:shadow-gray-900/50">
      <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <CardTitle className="text-xl dark:text-gray-100">{t('sections.interests.title')}</CardTitle>
            </div>
            <CardDescription className="mt-1 dark:text-gray-400">{t('sections.interests.description')}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder={t('placeholders.interest')}
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="focus:ring-rose-500"
            />
            <Button
              type="button"
              onClick={handleAddInterest}
              disabled={!interestInput.trim()}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t('sections.interests.add')}
            </Button>
          </div>

          <form.Field name='interests'>
            {(field) => {
              const interestItems = field.state.value as InterestProps[];
              return (
                <div>
                  {interestItems.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <Heart className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                      <p>{t('sections.interests.empty')}</p>
                      <p className="text-sm mt-1">{t('sections.interests.emptyHint')}</p>
                    </div>
                  ) : (
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={interestItems.map((_: InterestProps, index: number) => `interest-${index}`)}
                        strategy={horizontalListSortingStrategy}
                      >
                        <div className='flex flex-wrap gap-2'>
                          {interestItems.map((interest: InterestProps, index: number) => (
                            <SortableInterestItem
                              key={`interest-${index}`}
                              id={`interest-${index}`}
                              index={index}
                              interest={interest}
                              removeInterest={removeInterest}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  )}
                </div>
              );
            }}
          </form.Field>
        </div>
      </CardContent>
    </Card>
  );
};
