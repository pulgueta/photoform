import type { FC, HTMLInputTypeAttribute, PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

import type { StoreApi } from "zustand";
import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

export interface BuilderFormField {
  id: string;
  type: HTMLInputTypeAttribute;
  name: string;
  label: string;
  placeholder?: string;
  acceptedFileTypes?: string;
  maxFileSizeMB?: number;
  required?: boolean;
  options?: string[];
  isMultiSelect?: boolean;
}

interface BuilderActions {
  addField: (field: BuilderFormField) => void;
  updateField: (field: BuilderFormField) => void;
  removeField: (field: BuilderFormField) => void;
  removeAllFields: () => void;
  selectField: (field: BuilderFormField | null) => void;
}

interface Builder {
  fields: BuilderFormField[];
  selectedField: BuilderFormField | null;
  actions: BuilderActions;
}

const FormBuilderContext = createContext<StoreApi<Builder> | undefined>(
  undefined,
);

interface FormBuilderProviderProps extends PropsWithChildren {}

export const FormBuilderProvider: FC<FormBuilderProviderProps> = ({
  children,
}) => {
  const [store] = useState<StoreApi<Builder>>(() =>
    createStore<Builder>()((set) => ({
      fields: [],
      selectedField: null,
      actions: {
        addField: (field) =>
          set((state) => ({
            fields: [...state.fields, field],
          })),
        updateField: (field) =>
          set((state) => ({
            fields: state.fields.map((f) => (f.id === field.id ? field : f)),
          })),
        removeField: (field) =>
          set((state) => ({
            fields: state.fields.filter((f) => f.id !== field.id),
          })),
        removeAllFields: () => set({ fields: [] }),
        selectField: (field) =>
          set(() => ({
            selectedField: field,
          })),
      },
    })),
  );

  return (
    <FormBuilderContext.Provider value={store}>
      {children}
    </FormBuilderContext.Provider>
  );
};

function useFormBuilderStore<T>(selector: (state: Builder) => T) {
  const ctx = useContext(FormBuilderContext);

  if (!ctx) {
    throw new Error("useFormBuilder must be used within a FormBuilderContext");
  }

  const store = useStore(ctx, selector);

  return store;
}

export function useFormBuilder() {
  return useFormBuilderStore((state) => state);
}

export function useFormBuilderFields() {
  return useFormBuilderStore((state) => state.fields);
}

export function useFormBuilderActions() {
  return useFormBuilderStore((state) => state.actions);
}

export function useFormBuilderField() {
  return useFormBuilderStore((state) => ({
    selectedField: state.selectedField,
    selectField: state.actions.selectField,
  }));
}
