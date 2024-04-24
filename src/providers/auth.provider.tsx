  
import React, { createContext } from "react";

interface IProductUpdateAllContext {
  setIsCheck?: React.Dispatch<React.SetStateAction<boolean>>;
  isCheck: boolean;
  setSelectedPage?: React.Dispatch<React.SetStateAction<number>>;
  selectedPage: number;
}

const initialValue: IProductUpdateAllContext = {
  isCheck: false,
  selectedPage: 0,
};

export const ProductUpdateAllContext =
  createContext<IProductUpdateAllContext>(initialValue);

interface IProvider extends IChildren {
  contextValue: IProductUpdateAllContext;
}

export const ProductUpdateAllProvider: React.FC<IProvider> = ({
  children,
  contextValue,
}) => {
  return (
    <ProductUpdateAllContext.Provider value={contextValue}>
      {children}
    </ProductUpdateAllContext.Provider>
  );
};
