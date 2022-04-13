import React, { Component } from "react";
import Message from "./Message";
import contactList from "./contactList";
import './MessageList.css';
import AddVideoOrImagePopUp from "./AddVideoOrImagePopUp";
import { Modal } from 'react-bootstrap';
import AddRecord from "./AddRecord";
import AddVideoFromScreen from "./AddVIdeoFromScreen";
import AddPicFromScreen from "./AddPicFromScreen";

//you can write rce and it gives you a className template!
//create a constructor using the keyword rconst.

class MessageList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            onMouseOver: false,
            show: false,
            popUpRecord: false,
            popUpVideoOrImage: false,
            PopUpRecordFromScreen: false,
            popUpImgfromScreen: false
        }
        this.handleClickRecord = this.handleClickRecord.bind(this)
        this.handleClickImgFromScreen = this.handleClickImgFromScreen.bind(this)
        this.onHoverDisplay = this.onHoverDisplay.bind(this)
        this.handlePopData = this.handlePopData.bind(this)
        this.handleClickImage = this.handleClickImage.bind(this)
        this.handleRecordFromScreen = this.handleRecordFromScreen.bind(this)
        this.render = this.render.bind(this)
        this.closeButton = this.closeButton.bind(this)
        this.sendBox = React.createRef();
    }

    closeButton() {
        this.setState({
            show: false,
            popUpRecord: false,
            popUpVideoOrImage: false,
            PopUpRecordFromScreen: false,
            popUpImgfromScreen: false
        })
    }
    keyDownEvent = (e) => {
        if (e.code === "Enter" && !e.shiftKey) {
            this.sendMessage();
        } else if (e.code === "Enter" && e.shiftKey) {
            this.sendBox.current.value += "\n";
        }
        // this.sendBox.style.height = "auto";
        // let scHeight = e.target.scrollHeight;
        // this.sendBox.style.height = `${scHeight}px`;
    }
    sendMessage = () => {
        if (this.sendBox.current.value === '' || this.sendBox.current.value === '\n') {
            this.sendBox.current.value = '';
            return;
        }
        const contact = contactList.filter((contact) => contact.name.includes(this.props.name))[0];
        contact.messages.push([this.sendBox.current.value, "text", "snd"]);
        this.sendBox.current.value = '';
        this.props.addMessage();
    }
    onHoverDisplay() {
        this.setState({
            onMouseOver: true
        });
    }
    handleRecordFromScreen() {
        this.setState({
            show: !this.state.show,
            PopUpRecordFromScreen: true
        });
    }
    handleClickImage() {
        this.setState({
            show: !this.state.show,
            popUpVideoOrImage: true
        });
    }
    handleClickRecord() {
        this.setState({
            show: !this.state.show,
            popUpRecord: true
        });
    }
    handleClickImgFromScreen() {
        this.setState({
            show: !this.state.show,
            popUpImgfromScreen: true
        });
    }
    handlePopData(x, y) {
        this.setState({
            show: false,
            popUpRecord: false,
            popUpVideoOrImage: false,
            PopUpRecordFromScreen: false,
            popUpImgfromScreen: false
        })
        const contact = contactList.filter((contact) => contact.name.includes(this.props.name))[0];
        contact.messages.push([x, y]);
        this.sendBox.current.value = '';
        this.props.addMessage();
    }


    render() {
        if (this.props.name === '') {
            return (
                <div className="conversation2 bg-successive" />
            )
        } else {
            const contact = contactList.filter((contact) => contact.name.includes(this.props.name))[0]
            return (
                <div className="">
                    <div className="conversation bg-successive your-div container">
                        <div className="card-body msg_card_body row">
                            {contact.messages.map((message, key) => {
                                return <Message content={message} source={contact.source} key={key} />
                            })}
                            <Modal show={this.state.show} onHide={this.closeButton} >
                                <Modal.Header closeButton></Modal.Header>
                                <Modal.Body>
                                    {this.state.PopUpRecordFromScreen && (<AddVideoFromScreen parentCallback={this.handlePopData}></AddVideoFromScreen>)}
                                    {this.state.popUpRecord && (<AddRecord parentCallback={this.handlePopData} ></AddRecord>)}
                                    {this.state.popUpVideoOrImage && (<AddVideoOrImagePopUp parentCallback={this.handlePopData} ></AddVideoOrImagePopUp>)}
                                    {this.state.popUpImgfromScreen && (<AddPicFromScreen parentCallback={this.handlePopData} ></AddPicFromScreen>)}
                                </Modal.Body>
                                <Modal.Footer></Modal.Footer>
                            </Modal>
                            <span id="ch"></span>
                        </div>
                    </div>
                    <span className="input-group mb-2 down rounded-pill box bottom-0 ">
                        <div className="dropup droppy">
                            <button className="input-group-text dropbtn rounded-pill" id="basic-addon1" onMouseOver={this.onHoverDisplay}>
                                <i className="bi bi-paperclip bi-size"></i>
                                {this.state.onMouseOver && (
                                    <div className="dropup-content" >
                                        <button className="bi bi-camera-reels btn btn-outline-light" onClick={this.handleRecordFromScreen}></button>
                                        <button className="bi bi-card-image btn btn-outline-light" onClick={this.handleClickImage}></button>
                                        <button className="bi bi-mic-fill btn btn-outline-light" onClick={this.handleClickRecord}></button>
                                        <button className="bi bi-camera-video btn btn-outline-light" onClick={this.handleClickImgFromScreen}></button>
                                    </div>)}
                            </button>
                        </div>
                        <textarea className="form-control rounded-pill droppy resizedTextbox" placeholder="Type your message..." ref={this.sendBox} onKeyDown={this.keyDownEvent} />
                        <span className="input-group-text rounded-pill droppy" id="basic-addon1" onClick={this.sendMessage}>
                            <i className="bi bi-arrow-right-short bi-size-xlarge"></i>
                        </span>
                    </span>
                </div>
            )
        }
    }
}

export default MessageList;