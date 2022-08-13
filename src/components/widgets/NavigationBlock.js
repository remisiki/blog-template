import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createSettingBar, hideSideBar } from './SettingBar';

export function NavigationBlock({setTheme, languages, defaultLang}) {
	const { t, i18n } = useTranslation();
	return (
		<div className="wrapper nav-block">
			<div className="left-container">
			</div>
			<div className="guide-container">
				<h1 id="title">
					{t("tt")}
				</h1>
			</div>
			<div className="right-action-container">
				<div className="title-right" onClick={() => createSettingBar(setTheme, t, i18n, languages, defaultLang)} id="title-right-setting">
				</div>
			</div>
		</div>
	);
}
