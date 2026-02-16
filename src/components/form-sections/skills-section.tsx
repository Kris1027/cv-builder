import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { SkillProps } from '@/types/form-types';
import { Plus, Code, X, GripVertical } from 'lucide-react';
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

interface SkillsSectionProps {
  form: FormApi;
  addSkill: () => void;
  removeSkill: (index: number) => void;
  reorderSkills: (oldIndex: number, newIndex: number) => void;
}

interface SortableSkillItemProps {
  id: string;
  index: number;
  skill: SkillProps;
  removeSkill: (index: number) => void;
}

const SortableSkillItem = ({ id, index, skill, removeSkill }: SortableSkillItemProps) => {
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
      className={`group flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/20 dark:to-yellow-900/20 border border-orange-200 dark:border-orange-800 rounded-full hover:shadow-md dark:hover:shadow-gray-900/50 transition-all ${isDragging ? 'shadow-lg opacity-90' : ''}`}
    >
      <button
        type='button'
        className='cursor-grab active:cursor-grabbing p-0.5 hover:bg-orange-200 dark:hover:bg-orange-800/50 rounded transition-colors touch-none'
        {...attributes}
        {...listeners}
      >
        <GripVertical className='h-3 w-3 text-gray-400' />
      </button>
      <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>{skill.name}</span>
      <button
        type='button'
        onClick={() => removeSkill(index)}
        className='opacity-0 group-hover:opacity-100 transition-opacity'
      >
        <X className='h-3 w-3 text-red-500 hover:text-red-700' />
      </button>
    </div>
  );
};

export const SkillsSection = ({ form, removeSkill, reorderSkills }: SkillsSectionProps) => {
  const { t } = useTranslation();
  const [skillInput, setSkillInput] = useState('');

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

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      form.setFieldValue('skills', [...(form.getFieldValue('skills') as SkillProps[]), { name: skillInput.trim() }]);
      setSkillInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const skills = form.getFieldValue('skills') as SkillProps[];
      const oldIndex = skills.findIndex((_, i) => `skill-${i}` === active.id);
      const newIndex = skills.findIndex((_, i) => `skill-${i}` === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        reorderSkills(oldIndex, newIndex);
      }
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 dark:bg-gray-800 dark:shadow-gray-900/50">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <CardTitle className="text-xl dark:text-gray-100">{t('sections.skills.title')}</CardTitle>
            </div>
            <CardDescription className="mt-1 dark:text-gray-400">{t('sections.skills.description')}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder={t('placeholders.skill')}
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="focus:ring-orange-500"
            />
            <Button
              type="button"
              onClick={handleAddSkill}
              disabled={!skillInput.trim()}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t('sections.skills.add')}
            </Button>
          </div>

          <form.Field name='skills'>
            {(field) => {
              const skillItems = field.state.value as SkillProps[];
              return (
                <div>
                  {skillItems.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <Code className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                      <p>{t('sections.skills.empty')}</p>
                      <p className="text-sm mt-1">{t('sections.skills.emptyHint')}</p>
                    </div>
                  ) : (
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={skillItems.map((_: SkillProps, index: number) => `skill-${index}`)}
                        strategy={horizontalListSortingStrategy}
                      >
                        <div className='flex flex-wrap gap-2'>
                          {skillItems.map((skill: SkillProps, index: number) => (
                            <SortableSkillItem
                              key={`skill-${index}`}
                              id={`skill-${index}`}
                              index={index}
                              skill={skill}
                              removeSkill={removeSkill}
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
