export type QuestionType = 'single' | 'multiple' | 'scale' | 'text' | 'long-text' | 'priority' | 'consumption';

export interface Option {
  id: string;
  label: string;
  hasInput?: boolean;
  inputPlaceholder?: string;
  image?: string;
}

export interface Question {
  id: string;
  section: string;
  text: string;
  type: QuestionType;
  options?: Option[];
  placeholder?: string;
  required?: boolean;
  layout?: 'grid' | 'stack';
}

export interface Answers {
  [key: string]: {
    value: string | string[];
    otherText?: string;
  };
}