import { createContext } from "react";
import { UseFormReturn } from "react-hook-form";
import { CafeType } from "../../utils/types";

interface ContextType {
  showModal: (cafeId: string) => void;
  isOpen: boolean;
  onClose: () => void;
  cafeId: string | undefined;
  method: UseFormReturn<CafeType>;
}

const initialValues = {
  showModal: () => {},
  isOpen: false,
  onClose: () => {},
  cafeId: undefined,
  method: {} as UseFormReturn<CafeType>,
};

export const CafesContext = createContext<ContextType>(initialValues);
