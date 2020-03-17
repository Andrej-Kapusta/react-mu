import React from "react"
import InlineSVG from "svg-inline-react"
import Action from "tailor/cms/action"

import facebookLogo from "./icons/facebook.svg"
import instagramLogo from "./icons/instagram.svg"
import emailIcon from "./icons/email.svg"
import "./style.sass"

export default (props) => (
	[
		<Footer key="footer" urlContext={props.urlContext} />,
		<Cookies key="cookies" />
	]
)

const Cookies = () => (
	<footer className="dark row cookies">
		<div className="container">
			<div className="row">
				&copy; {(new Date()).getFullYear()} Pre slabšie strany <span className="space" /> Tieto stránky používajú <a href="/stazovatel/generix/stazovatel/sk/app/privacy#cookies">cookies</a>.
			</div>
		</div>
	</footer>
)

const Footer = ({ urlContext }) => (
	<footer className="dark row">
		<div className="container">
			<div className="row">
				<div className="col-xs-5 col-xs-offset-1 col-md-3 col-md-offset-2">
					<h3>Prevádzkuje</h3>
					<p>
						OZ Pre slabšie strany<br />
						Fazuľová 7<br />
						811 07 Bratislava
					</p>
				</div>
				<div className="col-xs-5 col-xs-offset-1 col-md-3 col-md-offset-0">
					<h3>Sťažovateľ</h3>
					<p>
						{/* <Action urlContext={urlContext} action={["blog"]}>Blog</Action><br /> */}
						<a href="https://stazovatel.sk/blog">Blog</a><br />
						<Action urlContext={urlContext} action={["o-nas"]}>O nás</Action><br />
						<Action urlContext={urlContext} action={["o-projekte"]}>O projekte</Action><br />
						<Action urlContext={urlContext} action={["caste-otazky"]}>Časté otázky</Action><br />
						<Action urlContext={urlContext} action={["sukromie"]}>Podmienky ochrany súkromia</Action><br />
						<Action urlContext={urlContext} action={["podmienky"]}>Podmienky používania</Action>
					</p>
				</div>
				<div className="col-xs-5 col-xs-offset-1 col-md-3 col-md-offset-0 kontakt">
					<h3>Kontakt</h3>
					<p>
						<a href="http://facebook.com/Stazovatel" target="_blank"><InlineSVG src={facebookLogo} /></a>
						<a href="https://www.instagram.com/stazovatel/" target="_blank"><InlineSVG src={instagramLogo} /></a>
						<a href="mailto:info@stazovatel.sk"><InlineSVG src={emailIcon} /></a>
						<a href="https://www.linkedin.com/showcase/stazovatel/" target="_blank" class="hideLink"></a>
						<a href="https://twitter.com/stazovatel" target="_blank" class="hideLink"></a>
					</p>
				</div>
			</div>
		</div>
	</footer>
)