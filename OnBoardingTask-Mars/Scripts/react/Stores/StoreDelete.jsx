import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Modal, Button } from 'semantic-ui-react';

export default class StoreDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <React.Fragment>
                <Modal open={this.props.showDeleteModal} onClose={this.props.onClose} size='small'>
                    <Modal.Header>Delete store</Modal.Header>

                    <Modal.Content>
                        <h2> Are you sure?</h2>
                    </Modal.Content>
                    <Modal.Actions>
                        <Modal.Actions>
                            <Button onClick={this.props.onClose} secondary >cancel</Button>
                            <Button onClick={() => this.props.onDeleteSubmit(this.props.delete)} className="ui red button">
                                delete <i className="x icon"></i></Button>
                        </Modal.Actions>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}