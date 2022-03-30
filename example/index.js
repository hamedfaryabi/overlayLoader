import { OVLoader } from "@hamedfaryabi/overlay-loader";

new OVLoader('body', {
	show: true,
	backgroundBlur: false,
	animationTime: 4,
	onHide: () => 2,
	test: 'hi',
}).testFunc();