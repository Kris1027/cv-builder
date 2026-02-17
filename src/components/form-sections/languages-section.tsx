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
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id,
    });

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
            className={`rounded-xl border border-gray-200 bg-gradient-to-r from-cyan-50/50 to-white p-6 transition-shadow hover:shadow-md dark:border-gray-700 dark:from-cyan-900/10 dark:to-gray-800/50 dark:hover:shadow-gray-900/50 ${isDragging ? 'opacity-90 shadow-lg' : ''}`}
        >
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="cursor-grab touch-none rounded p-1 transition-colors hover:bg-gray-200 active:cursor-grabbing dark:hover:bg-gray-600"
                        {...attributes}
                        {...listeners}
                    >
                        <GripVertical className="h-5 w-5 text-gray-400" />
                    </button>
                    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        {t('sections.languages.item', { number: index + 1 })}
                    </h4>
                </div>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLanguage(index)}
                    className="text-red-500 hover:bg-red-50 hover:text-red-700"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <form.Field name={`languages[${index}].language`}>
                    {(subField) => (
                        <div className="space-y-2">
                            <Label htmlFor={subField.name}>{t('form.language')}</Label>
                            <Input
                                id={subField.name}
                                name={subField.name}
                                value={subField.state.value as string}
                                onBlur={subField.handleBlur}
                                onChange={(e) => subField.handleChange(e.target.value)}
                                placeholder={t('placeholders.language')}
                                className="focus:ring-cyan-500"
                            />
                        </div>
                    )}
                </form.Field>

                <form.Field name={`languages[${index}].proficiency`}>
                    {(subField) => (
                        <div className="space-y-2">
                            <Label htmlFor={subField.name}>{t('form.proficiency')}</Label>
                            <Select
                                value={subField.state.value as string}
                                onValueChange={(value) =>
                                    subField.handleChange(value as LanguageLevelProps)
                                }
                            >
                                <SelectTrigger className="focus:ring-cyan-500">
                                    <SelectValue
                                        placeholder={t('placeholders.selectProficiency')}
                                    />
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

export const LanguagesSection = ({
    form,
    addLanguage,
    removeLanguage,
    reorderLanguages,
}: LanguagesSectionProps) => {
    const { t } = useTranslation();
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
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
        <Card className="border-0 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800 dark:shadow-gray-900/50">
            <CardHeader className="rounded-t-lg bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                            <CardTitle className="text-xl dark:text-gray-100">
                                {t('sections.languages.title')}
                            </CardTitle>
                        </div>
                        <CardDescription className="mt-1 dark:text-gray-400">
                            {t('sections.languages.description')}
                        </CardDescription>
                    </div>
                    <Button
                        type="button"
                        onClick={addLanguage}
                        className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-md transition-all hover:from-cyan-600 hover:to-teal-600 hover:shadow-lg"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        {t('sections.languages.add')}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <form.Field name="languages">
                    {(field) => {
                        const languageItems = field.state.value as LanguageProps[];
                        return (
                            <div className="space-y-4">
                                {languageItems.length === 0 && (
                                    <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                                        <Globe className="mx-auto mb-3 h-12 w-12 text-gray-300 dark:text-gray-600" />
                                        <p>{t('sections.languages.empty')}</p>
                                        <p className="mt-1 text-sm">
                                            {t('sections.languages.emptyHint')}
                                        </p>
                                    </div>
                                )}
                                {languageItems.length > 0 && (
                                    <DndContext
                                        sensors={sensors}
                                        collisionDetection={closestCenter}
                                        onDragEnd={handleDragEnd}
                                    >
                                        <SortableContext
                                            items={languageItems.map(
                                                (_: LanguageProps, index: number) =>
                                                    `language-${index}`,
                                            )}
                                            strategy={verticalListSortingStrategy}
                                        >
                                            <div className="space-y-4">
                                                {languageItems.map(
                                                    (_: LanguageProps, index: number) => (
                                                        <SortableLanguageItem
                                                            key={`language-${index}`}
                                                            id={`language-${index}`}
                                                            index={index}
                                                            form={form}
                                                            removeLanguage={removeLanguage}
                                                        />
                                                    ),
                                                )}
                                            </div>
                                        </SortableContext>
                                    </DndContext>
                                )}
                            </div>
                        );
                    }}
                </form.Field>
            </CardContent>
        </Card>
    );
};
