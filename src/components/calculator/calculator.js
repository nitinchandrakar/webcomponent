import calculatorTemplate from "../../templates/calculator-temp.js";
import calculatorCSS from "../../styles/calculator-css.js";
import CustomElement from "../CustomElement.js";
import { broadcastEvent } from "../../utils/general.js";

const metadata = {
    tag: "wc-calculator",
};

/**
 * @class
 * <h3>Overview</h3>
 * The <code>calculator</code> component is used to display progress bar on the screen.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "import CustomElement from "../CustomElement";</code>
 *
 * @constructor
 * @extends CustomElement
 * @tagname calculator
 * @public
 */

class Calculator extends CustomElement {
    static get metadata() {
        return metadata;
    }

    constructor() {
        super();
        this.render(calculatorTemplate, calculatorCSS);
        this._initializeState();
    }

    connectedCallback() {
        setTimeout(() => {
            
        }, 0);
    }

    /**
     * getter setter method to set label of web component
     * @public
     * yes value can be passed in set label if we want to display label on progress bar
     */

    set label(value) {
        
    }
    get label() {

    }

    /** Web component private Method to destroy listeners and unused properties & Objects.
     * @private
     */
    disconnectedCallback() {
        this.destroy();
    }

    _initializeState() {
        
    }

}

customElements.define(metadata.tag, Calculator);
