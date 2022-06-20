import { getThemeMode, setThemeMode, getTheme } from '../control/dark';

function createSideOption(content, name, onClick, icon = true) {
	const option_container = document.createElement('div');
	const before_option = document.createElement('div');
	const option = document.createElement('div');

	option_container.classList.add('option-container');
	before_option.classList.add('before-option');
	before_option.id = `before-option-${name}`;

	option.innerText = content;
	option.classList.add('option');

	option_container.id = `side-option-${name}`;
	if (icon) {
		option_container.appendChild(before_option);
	}
	option_container.appendChild(option);
	option_container.addEventListener('click', onClick);

	return option_container;
}

export function createSettingBar(setTheme, t, i18n, languages) {
	const sidebar_exist = document.getElementById('setting-bar');
	if (sidebar_exist) {
		sidebar_exist.classList.remove('slide-in');
		setTimeout(() => {
			sidebar_exist.remove();
		}, 100);
		return;
	}
	const sidebar = document.createElement('div');
	const close_btn = document.createElement('img');
	
	close_btn.classList.add('action-btn');
	close_btn.id = 'action-btn-close';
	close_btn.addEventListener('click', () => {
		hideSideBar();
	});

	sidebar.id = 'setting-bar';

	sidebar.appendChild(close_btn);
	sidebar.appendChild(createLanguageSetting(t, i18n, languages));
	sidebar.appendChild(createDarkSetting(t, setTheme));
	sidebar.appendChild(createSettingInfo());
	document.body.appendChild(sidebar);
	setTimeout(() => {
		sidebar.classList.add('slide-in');
	}, 100);
}

function selectOption(e) {
	e.currentTarget.parentNode.getElementsByClassName('option-selected').item(0)?.classList.remove('option-selected');
	e.currentTarget.classList.add('option-selected');
}

function createDarkSetting(t, setTheme) {
	const mode = getThemeMode();
	const wrapper = document.createElement('div');
	const caption = document.createElement('h1');
	caption.innerText = t('theme');
	wrapper.appendChild(caption);

	const options = [
		createSideOption(t('light'), 'light', (e) => {
			selectOption(e);
			setThemeMode(0);
			setTheme('light');
		}),
		createSideOption(t('dark'), 'dark', (e) => {
			selectOption(e);
			setThemeMode(1);
			setTheme('dark');
		}),
		createSideOption(t('auto'), 'auto', (e) => {
			selectOption(e);
			setThemeMode(2);
			setTheme(getTheme());
		}),
	];

	options[mode].classList.add('option-selected');
	for (const option of options) {
		wrapper.appendChild(option);
	}

	return wrapper;
}

function createLanguageSetting(t, i18n, languages = ['en', 'ja', 'zh']) {
	const lang_map = {
		'en': 0,
		'zh': 1,
		'ja': 2
	};
	const lang_mode = lang_map[i18n.language];
	const wrapper = document.createElement('div');
	const caption = document.createElement('h1');
	caption.innerText = t('language');
	wrapper.appendChild(caption);

	let options = [];
	if (languages.includes('en')) {
		options.push(createSideOption('English', 'en', (e) => {
			selectOption(e);
			i18n.changeLanguage('en');
			hideSideBar();
		}));
	}
	if (languages.includes('zh')) {
		options.push(createSideOption('中文', 'zh', (e) => {
			selectOption(e);
			i18n.changeLanguage('zh');
			hideSideBar();
		}));
	}
	if (languages.includes('ja')) {
		options.push(createSideOption('日本語', 'ja', (e) => {
			selectOption(e);
			i18n.changeLanguage('ja');
			hideSideBar();
		}));
	}

	options[lang_mode].classList.add('option-selected');
	for (const option of options) {
		wrapper.appendChild(option);
	}

	return wrapper;
}

function createSettingInfo() {
	const wrapper = document.createElement('div');
	const caption = document.createElement('h1');
	const paragraph = document.createElement('p');

	caption.innerText = 'About';

	paragraph.innerText = 'Version: 1.0\n© 2022 Remisiki';

	const options = [
		createSideOption('Github', 'github', (e) => {
			window.open('https://github.com/remisiki/blog-template', '_blank').focus();
		}),
	];

	wrapper.appendChild(caption);
	wrapper.appendChild(paragraph);
	for (const option of options) {
		wrapper.appendChild(option);
	}

	return wrapper;
}

export function hideSideBar() {
	const sidebar = document.getElementById('setting-bar');
	if (sidebar) {
		sidebar.classList.remove('slide-in');
		setTimeout(() => {
			sidebar.remove();
		}, 100);
	}
}