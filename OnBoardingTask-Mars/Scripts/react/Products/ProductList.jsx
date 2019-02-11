
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react';
import ProductCreate from './ProductCreate.jsx';
import ProductUpdate from './ProductUpdate.jsx';
import ProductDelete from './ProductDelete.jsx';

export default class ListingTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ProductList: [],
            Success: { Data: '' },
            showCreateModel: false,

            Name: '',
            Price: '',
            Id: 0,

            showUpdateModal: false,
            showUpdateId: 0,

            showDeleteModal: false,
            deleteId: 0,

            errors: {},
            nameError: '',
            priceError: '',
            Sucess: [],
            errors: {}

        };
        this.loadData = this.loadData.bind(this);

        this.showCreateModel = this.showCreateModel.bind(this);
        this.closeCreateModel = this.closeCreateModel.bind(this);
        this.onCreateSubmit = this.onCreateSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        this.handleUpdate = this.handleUpdate.bind(this);
        this.closeUpdateModal = this.closeUpdateModal.bind(this);
        this.onUpdateSubmit = this.onUpdateSubmit.bind(this);

        this.handleDelete = this.handleDelete.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.onDeleteSubmit = this.onDeleteSubmit.bind(this);


    }


    componentDidMount() {
        this.loadData();
    }
    //Create
    showCreateModel() {
        this.setState({ showCreateModel: true });
    }

    closeCreateModel() {
        this.setState({ showCreateModel: false });
        window.location.reload()
    }
    handleCreate() {
        this.setState({ showCreateModal: true });
    }
    onChange(e) {

        this.setState({ [e.target.name]: e.target.value });
    }


    closeDeleteModal() {
        this.setState({ showDeleteModal: false });
    }

    onUpdateSubmit() {
        let data = {
            'Name': this.state.Name, 'Price': this.state.Price, 'Id': this.state.Id
        };
        console.log('data1', data);
        $.ajax({
            url: '/Products/UpdateProduct',
            type: "POST",
            data: data,
            success: function (data) {
                if (data != 'Success') {
                    let modelErrors = [];
                    modelErrors = [...data];
                    let errors = {};
                    modelErrors.forEach(function (error, index) {
                        if (error.includes('Name')) {
                            errors['Name'] = error;
                        }
                        if (error.includes('Price')) {
                            errors['Price'] = error;
                        }
                    });
                    errors['count'] = 1;
                    this.setState({
                        errors: errors
                    });
                }
                else {
                    window.location.reload()
                }
            }.bind(this)

        });

    }
    loadData() {
        //ajax call logic
        $.ajax({
            url: "/Products/GetProducts",
            type: "GET",
            success: function (data) {
                this.setState({ ProductList: data })
            }.bind(this)
        });
    }

    onCreateSubmit() {
        let data = { 'Name': this.state.Name, 'Price': this.state.Price };
        $.ajax({
            url: "/Products/CreateProducts",
            type: "POST",
            data: data,
            success: function (data) {
                if (data !== 'Sucess') {
                    let modelErrors = [];
                    modelErrors = [...data];
                    let errors = {};
                    modelErrors.forEach(function (error, index) {
                        if (error.includes('Name')) {
                            errors['Name'] = error;
                        }
                        if (error.includes('Price')) {
                            errors['Price'] = error;
                        }
                    });
                    errors['count'] = 1;
                    this.setState({
                        errors: errors
                    });
                }
                else {
                    window.location.reload()
                }
            }.bind(this)
        });
    }
    handleUpdate(id) {

        this.setState({ showUpdateteModal: true });
        this.setState({ updateId: id });
        console.log("exit", this.state.updateId);
        $.ajax({
            url: "/Products/GetProduct",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                this.setState({ Id: data.Id, Name: data.Name, Price: data.Price });
            }.bind(this)
        });
    }

    closeUpdateModal() {
        this.setState({ showUpdateModal: false });
        window.location.reload()
    }

    onDeleteSubmit(id) {
        $.ajax({
            url: "/Products/DeleteProduct",
            type: "POST",
            data: { 'id': id }
        });
        window.location.reload()
    }
    handleDelete(id) {
        this.setState({ showDeleteModal: true });
        this.setState({ deleteId: id });
    }
    render() {

        let list = this.state.ProductList;

        let tableData = null;
        if (list != "") {
            tableData = list.map(Product =>
                <tr key={Product.id}>
                    <td className="four wide">{Product.Name}</td>
                    <td className="four wide">{Product.Price}</td>
                    <td className="four wide">
                        <Button className="ui yellow button" onClick={this.handleUpdate.bind(this, Product.Id)} name={this.state.Name}><i className="edit icon"></i>Edit</Button>
                    </td>
                    <td className="four wide">
                        <Button className="ui red button" onClick={this.handleDelete.bind(this, Product.Id)} ><i className="trash icon"></i>Delete</Button>
                    </td>
                </tr>
            )
        }
        return (
            <React.Fragment>
                <div className="ui one column grid">
                    <div className="row"></div>
                    <div className="row"></div>
                    <div className="row">
                        <div><Button primary onClick={this.showCreateModel}>New Product</Button></div>
                        <ProductCreate onChange={this.onChange} onClose={this.closeCreateModel} onCreateSubmit={this.onCreateSubmit} showCreateModel={this.state.showCreateModel} />
                    </div>
                    <div className="column">
                        <ProductDelete delete={this.state.deleteId} onClose={this.closeDeleteModal} onDeleteSubmit={this.onDeleteSubmit} showDeleteModal={this.state.showDeleteModal} />
                        <ProductUpdate showUpdateteModal={this.state.showUpdateteModal} updateId={this.state.updateId} onClose={this.closeUpdateModal} name={this.state.Name} price={this.state.Price} onChange={this.onChange} onUpdateSubmit={this.onUpdateSubmit} errors={this.state.errors} />
                        <table className="ui celled table ui striped table">
                            <thead>
                                <tr>
                                    <th className="four wide">Name</th>
                                    <th className="four wide">Price</th>
                                    <th className="four wide">Action(Edit)</th>
                                    <th className="four wide">Action(Delete)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
