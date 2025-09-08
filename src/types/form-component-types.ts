/* eslint-disable @typescript-eslint/no-explicit-any */
// Shared types for form section components
// These types provide typing for TanStack Form API usage in components
// The 'any' types here are intentional - they represent the generic form API that handles various field types

export interface FormField {
  name: string;
  state: { value: any };
  handleBlur: () => void;
  handleChange: (value: any) => void;
}

export interface FormApi {
  Field: React.FC<{ 
    name: string; 
    children: (field: FormField) => React.ReactNode 
  }>;
  getFieldValue: (name: string) => any;
  setFieldValue: (name: string, value: any) => void;
  state: {
    values: any;
  };
}