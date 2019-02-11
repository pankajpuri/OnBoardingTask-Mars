import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Modal, Button, Form } from 'semantic-ui-react';

export default class ProductCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Success: { Data: '' },
           Name: '',
           Price: '',

            Sucess: [],
            errors: {}
        };

        this.onCreateSubmit = this.onCreateSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    validateForm() {

        let errors = {}

        let formIsValid = true
        if (!this.state.Name) {
            formIsValid = false;
            errors['Name'] = '*Please enter the Product Name.';
        }

        if (typeof this.state.Name !== "undefined") {
            if (!this.state.Name.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["Name"] = "*Please enter alphabet characters only.";
            }
        }

        if (!this.state.ProductPrice) {
            formIsValid = false;
            errors['Price'] = '*Please enter the Product Price'
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }

    onCreateSubmit(e) {
        e.preventDefault();
        if (this.validateForm()) {
            let data = { 'Name': this.state.Name, 'Price': this.state.Price };

            $.ajax({
                url: "/Products/CreateProducts",
                type: "POST",
                data: data,
                success: function (data) {
                    this.setState({ Success: data })

                    window.location.reload()
                }.bind(this)
            });
        }
    }

    onClose() {
        this.setState({ showDeleteModal: false });
        window.location.reload()
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <React.Fragment>
                <Modal open={this.props.showCreateModel} onClose={this.props.onClose} size='small'>
                    <Modal.Header> Create Product </Modal.Header>
                    <Modal.Content>
                        <Form className="ui form segment">
                            <Form.Field>
                                <label>Name</label>
                                <input type="text" name="Name" placeholder='Name' onChange={this.onChange} />
                                <div style={{ color: 'red' }}>
                                    {this.state.errors.Name}
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>Price</label>
                                <input type="text" name="Price" placeholder='Price' onChange={this.onChange} />
                                <div style={{ color: 'red' }}>
                                    {this.state.errors.Price}
                                </div>
                            </Form.Field>
                        </Form>

                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} secondary >Cancel
                        </Button>
                        <Button onClick={this.onCreateSubmit} className="ui green button">Create
                        <i className="check icon"></i>
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}