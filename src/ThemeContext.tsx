import { createContext, useContext, useState } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<[Theme, (theme: Theme) => void] | undefined>(undefined);

export function ThemeProvider(props: { value: 'light' | 'dark'; children: React.ReactNode }) {
	const [theme, setTheme] = useState(props.value);
	return <ThemeContext.Provider value={[theme, setTheme]}>{props.children}</ThemeContext.Provider>;
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) throw new Error('can not use useTheme() hook outside of ThemeProvider');
	return context;
}
