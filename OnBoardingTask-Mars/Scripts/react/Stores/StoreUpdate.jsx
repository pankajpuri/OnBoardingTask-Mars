import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Modal, Button, Form} from 'semantic-ui-react';

export default class StoreUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <React.Fragment>
                <Modal open={this.props.showUpdateteModal} onClose={this.props.onClose} size='small'>
                    <Modal.Header>Edit store</Modal.Header>

                    <Modal.Content>
                        <Form size="small">
                            <Form.Group>
                                <Form.Input label='NAME' width={16} onChange={this.props.onChange} name="Name" defaultValue={this.props.name} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Input label='ADDRESS' width={16} onChange={this.props.onChange} name="Address" defaultValue={this.props.address} />
                            </Form.Group>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Modal.Actions>
                            <Button onClick={this.props.onClose} secondary >cancel</Button>
                            <Button onClick={this.props.onUpdateSubmit} className="ui green button">edit<i className="check icon"></i></Button>
                        </Modal.Actions>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}