class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) throw new Error;
        this.config = config;
       // this.initialState = config.initial;
         this.state = config.initial;
        // this.states = config.states;  // Object.keys()
         this.statesArray = [this.state];
         this.redoState = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (Object.keys(this.config.states).includes(state)){
            this.state = state;
            this.statesArray.push(this.state);
        } else throw new Error;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (Object.keys(this.config.states[this.state].transitions).includes(event)) {
            this.state = this.config.states[this.state].transitions[event];
            this.statesArray.push(this.state);
        } else throw new Error;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
      //  this.statesArray = [];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let result = [];
        if (!event) {
            return Object.keys(this.config.states);
        } else {

            for (let stateName in this.config.states) {
                for (let transName in this.config.states[stateName].transitions) {
                    if (transName === event) {
                        result.push(stateName);
                    }
                }
            }
        }

        return result; 
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.statesArray.length > 1) {
            this.redoState.push( this.statesArray.pop() );
            this.state = this.statesArray[this.statesArray.length-1];
            return true;
        } else return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.redoState) {}
    }

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
