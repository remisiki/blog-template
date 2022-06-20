import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

export const languages = ['ja', 'en', 'zh'];

i18n
	.use(LanguageDetector)
	.use(resourcesToBackend((language, namespace, callback) => {
		if (languages.includes(language)) {
			import(`./${language}.json`)
				.then((resources) => {
					callback(null, resources);
				})
				.catch((error) => {
					callback(error, null);
				})
		}
		else if (language === "dev") {
			callback(null, null);
		}
		else {
			console.log(`${language} not supported, use en instead.`);
			import(`./en.json`)
				.then((resources) => {
					callback(null, resources);
				})
				.catch((error) => {
					console.log(error);
					callback(error, null);
				})
		}
	}))
	.use(initReactI18next)
	.init({
		// resources,　// ../constants/translationsを設定する

		// lng: 'ja',
		// fallbackLng: 'en',
		debug: false,

		keySeparator: false,

		interpolation: {
			escapeValue: false
		},
		react: {
			useSuspense: false
		}
	});

export default i18n;