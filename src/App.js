import React, { useState, useEffect } from 'react';
import { languages } from './components/translation/i18n';
import { NavigationBlock } from './components/widgets/NavigationBlock';
import { ScrollHandler } from './components/control/scroll';
import { Title } from './components/control/Title';
import { checkThemeMode, getTheme } from './components/control/dark';
import { BlogScreen } from './components/Blog';

function App() {
	const [theme, setTheme] = useState(getTheme());
	useEffect(() => {
		checkThemeMode();
	}, [theme]);
	return (
		<>
			<Title />
			<header>
				<NavigationBlock setTheme={setTheme} languages={languages}/>
			</header>
			<BlogScreen />
			<img id="totop" alt="go to page top" onClick={() => {window.scrollTo(0, 0);}} />{/**/}
		</>
	);
}

export default App;