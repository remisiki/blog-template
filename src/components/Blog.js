import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
	SideBar,
	Footer
} from './widgets';
import { getTheme } from './control/dark';
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import { CopyBlock, dracula } from 'react-code-blocks';

export function BlogScreen() {
	const sections = Array.from({length: 4}, (v, k) => `s${k}`);
	const { t, i18n } = useTranslation();
	useEffect(() => {
		const external_links = document.querySelectorAll('a[href^=http]');
		for (const link of external_links) {
			link.setAttribute('target', '_blank');
		}
	}, []);
	return (
		<div>
			<div id="content" className="wrapper doc">
				<article id={sections[0]} className="float">
					{/*<img src={avatar} alt="Furan" id="avatar" />*/}
					<h1>{t("s0t")}</h1>
					<p>{t("s0p0")}</p>
					<span className="yellow-marker-thin">{t("s0p0")}</span>
					<p className="red-text">{t("s0p0")}</p>
				</article>
				<article id={sections[1]} className="float">
					<h1>{t("s1t")}</h1>
				</article>
				<article id={sections[2]} className="float">
					<h1>{t("s2t")}</h1>
					<p>{t("s2p0")}</p>
					<MathJaxContext><MathJax>{'$$cos(\\omega t)=\\frac{1}{2}(e^{j\\omega t}+e^{-j\\omega t})$$'}</MathJax></MathJaxContext>
				</article>
				<article id={sections[3]} className="float">
					<h1>{t("s3t")}</h1>
					<p>{t("s3p0")}</p>
					<CopyBlock
						text={'class Hoge {\n	public static void main(String[] args) {\n		System.out.print("Hello World!");\n		/* return */\n	}\n}'}
						language={'java'}
						showLineNumbers={true}
						startingLineNumber={1}
						theme={dracula}
					/>
				</article>
				<SideBar sections={sections} />
				<div className="gap"></div>
			</div>
			<Footer />
		</div>
	);
}
