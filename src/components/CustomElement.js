//import  * as globalCSS from "../scss/bootstrap.scss";

// import   "../scss/custom-bootstrap.scss";
import { isIE,
	isEdge,
	isChrome,
	isFF,
	isSafari,
	isMobile,
	isDesktop,
	isTablet,
	isPhone,
	isAndroid,
	getOS,
	getSystem,
	getBrowser,
	supportTouch } from "../utils/device";

import {findScriptURL} from "../utils/general";

const selfURL = findScriptURL('customcomponents');
const baseURL = selfURL.substring(0,selfURL.lastIndexOf("/"));

/**
 * Base class for all Custom Web Components
 *
 * @class
 * @constructor
 * @extends HTMLElement
 * @public
 * 
 */

class CustomElement extends HTMLElement {

	constructor() {
	
		super();
		console.log(document.querySelectorAll("script"));
		this._metadata;
		this.baseURL = baseURL;
		const globalStyleURL = baseURL+"/custom-style.css";
		this.globalStyle = `<link href = "${globalStyleURL}" rel="stylesheet">`;
		
		this._draggableElement = null;
		this._themes = ['primary','secondary','success','danger','warning','info','light','dark','link'];
		this._defaultTheme = 'primary';
		this._slotCallbackFnc = null;
		this._slotEventHandler = this._slotChangeListener.bind(this);
		
	}

	
	/**
	 * Use this method in order to get a reference to element in the shadow root of a web component
	 * @public
	 * @param template - HTML Template of a Component DOM Structure
	 * @param css - Template Specfic CSS for HOST & Slot Elements
	 * 
	 */
	render(template,css) {
		console.log(css);
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `
		${this.globalStyle}
        <style>
          ${css}
        </style>
		${template}
		`;
	}
		
	/**
	 * Registers a Custom Web Component in the browser window object
	 * @public
	 
	static define() {	
		const tag = this.getMetadata().tag;
		customElements.define(tag, this);	
	}

	 * Returns an instance of Metadat representing this Custom Web Component's full metadata 
	 * @public
	 * @returns {CustomElementMetadata}
	 
	static getMetadata() {
		this._metadata = this.metadata;
		return this._metadata;
	}
	*/

	/**
	 * Use this method to access device Info
	 * @public
	 * @returns {Object} 
	 */
	getDeviceInfo(){

		return{
			isIE:isIE(),
			isEdge:isEdge(),
			isChrome:isChrome(),
			isFF:isFF(),
			isSafari:isSafari(),
			isMobile:isMobile(),
			isDesktop:isDesktop(),
			isTablet:isTablet(),
			isPhone:isPhone(),
			isAndroid:isAndroid(),
			getOS:getOS(),
			getSystem:getSystem(),
			getBrowser:getBrowser(),
			supportTouch:supportTouch()
		};
	}
	/**
	 * Use this method to enable Dragging Feature on Child Element
	 * @public
	 * @param element - Dragging element which will be used for dragging purpose
	 * 
	 */
	enableDragAndDrop(element){
		this._draggableElement = element;
		this.draggable = true;
		this._onEnterDOM();
		window.addEventListener("mousedown", this._dragMouseDownHandler);		
	}
  
	_onEnterDOM() {
   
		this._dragMouseMoveHandler = this._onDragMouseMove.bind(this);
		this._dragMouseUpHandler = this._onDragMouseUp.bind(this);
		this._dragMouseDownHandler = this._onDragMouseDown.bind(this);
	}

	_onExitDOM() {
		this._dragMouseMoveHandler = null;
		this._dragMouseUpHandler = null;
		this._dragMouseDownHandler = null;	
  	}
  
  	/**
	 * Event handlers
	 */
	_onDragMouseDown(event) {
    
		/*if (!(this.draggable && this._deviceInfo.isDesktop)) {
			return;
		}

	
		 only allow dragging on the header's whitespace
		if (!event.target.classList.contains("modal-header")
			&& event.target.getAttribute("slot") !== "header")) {
			return;
		}*/
 
		event.preventDefault();

		const {
			top,
			left,
		} = this._draggableElement.getBoundingClientRect();
		const {
			width,
			height,
		} = window.getComputedStyle(this);

		Object.assign(this._draggableElement.style, {
			transform: "none",
			top: `${top}px`,
			left: `${left}px`,
			width: `${Math.round(Number(width) * 100) / 100}px`,
			height: `${Math.round(Number(height) * 100) / 100}px`,
		});

		this._x = event.clientX;
		this._y = event.clientY;

    	this._attachDragHandlers();
		
    
	}

	_onDragMouseMove(event) {
		event.preventDefault();

		const calcX = this._x - event.clientX;
		const calcY = this._y - event.clientY;
		const {
			left,
			top,
		} = this._draggableElement.getBoundingClientRect();


		Object.assign(this._draggableElement.style, {
			left: `${Math.floor(left - calcX)}px`,
			top: `${Math.floor(top - calcY)}px`,
		});

		this._x = event.clientX;
    	this._y = event.clientY;

	}

	_onDragMouseUp() {
		this._x = null;
		this._y = null;

		this._detachDragHandlers();
		
	}

	_attachDragHandlers() {
    
		window.addEventListener("mousemove", this._dragMouseMoveHandler);
		window.addEventListener("mouseup", this._dragMouseUpHandler);
	}

	_detachDragHandlers() {
		window.removeEventListener("mousemove", this._dragMouseMoveHandler);
		window.removeEventListener("mouseup", this._dragMouseUpHandler);
		
	}

	destroy(){
		if(this.draggable){
			window.addEventListener("mousedown", this._dragMouseDownHandler);
			this._onExitDOM();
		}
		this._enableDisableSlotEvents('removeEventListener');
		console.log("Removtted");	
	}

	_recenter() {
		
		Object.assign(this._draggableElement.style, {
			top: "",
			left: "",
			transform: "",
		});
	}

	getSelectedTheme(){
		return this._defaultTheme;
	}
	getThemeList(){
		return this._themes;
	}

	enableSlotEvents(slotCallbackFnc){
		this._slotCallbackFnc = slotCallbackFnc;
		this._enableDisableSlotEvents('addEventListener');
	}

	_slotChangeListener(event){
		const nodes = event.target.assignedNodes();
		const name = event.target.name;
		const text = nodes[0].textContent;
		this._slotCallbackFnc(name,text);
	
	}

	_enableDisableSlotEvents(listner){

		//this.shadowRoot.addEventListener('slotchange', event => console.log(event));
		//console.log(this._slotCallbackFnc);
		if(this._slotCallbackFnc){
			const slots = this.shadowRoot.querySelectorAll('slot');
			const totalSlots = slots.length;
			for(let i=0;i<totalSlots;i++){
				slots[i][listner]('slotchange', this._slotEventHandler);
			}
		}

	}

	
	
}

export default CustomElement;


