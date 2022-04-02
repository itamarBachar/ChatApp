import React, { Component } from "react";
//you can write rce and it gives you a className template!
//create a constructor using the keyword rconst.
class Contact extends Component {

    constructor(props) {
        super(props)
        this.changeState = this.changeState.bind(this)
    }
    //only make it active in this function. the others' functions should make this unselected.
    changeState() {
        this.props.applyChat(this.props.name);
    }

    render() {
        if (this.props.news === 0) {
            return (
                <li className={this.props.styles} onClick={this.changeState}>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">
                            {this.props.name}
                        </div>
                        {this.props.message}
                    </div>
                </li> //do that the onclick will set this to true. it is essential to use () => because the function should know what is the component, "this".
            )
        } else {
            return (
                <li className={this.props.styles} onClick={this.changeState}>
                    <div className="ms-2 me-auto">
                        <span className="badge bg-primary rounded-pill to-right">{this.props.news}</span>
                        <div className="fw-bold">
                            {this.props.name}
                        </div>
                        {this.props.message}
                    </div>
                </li> //do that the onclick will set this to true. it is essential to use () => because the function should know what is the component, "this".
            )
        }
    }
}
export default Contact;