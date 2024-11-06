// context/CustomizationContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type CustomizationState = {
    templateType: string;
    colorTheme: string;
    sections: { [key: string]: boolean };
};

const initialState: CustomizationState = {
    templateType: 'Template1',
    colorTheme: '#000000',
    sections: { skills: true, experience: true, education: true, achievements: true },
};

type CustomizationAction =
    | { type: 'SET_TEMPLATE'; payload: string }
    | { type: 'SET_COLOR'; payload: string }
    | { type: 'TOGGLE_SECTION'; payload: string };

const customizationReducer = (state: CustomizationState, action: CustomizationAction): CustomizationState => {
    switch (action.type) {
        case 'SET_TEMPLATE':
            return { ...state, templateType: action.payload };
        case 'SET_COLOR':
            return { ...state, colorTheme: action.payload };
        case 'TOGGLE_SECTION':
            return {
                ...state,
                sections: { ...state.sections, [action.payload]: !state.sections[action.payload] },
            };
        default:
            return state;
    }
};

const CustomizationContext = createContext<{
    state: CustomizationState;
    dispatch: React.Dispatch<CustomizationAction>;
} | null>(null);

export const CustomizationProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(customizationReducer, initialState);
    return (
        <CustomizationContext.Provider value={{ state, dispatch }}>
            {children}
        </CustomizationContext.Provider>
    );
};

export const useCustomization = () => {
    const context = useContext(CustomizationContext);
    if (!context) throw new Error('useCustomization must be used within a CustomizationProvider');
    return context;
};
