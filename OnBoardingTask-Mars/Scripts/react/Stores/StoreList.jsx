
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react';
import StoreCreate from './StoreCreate.jsx';
import StoreUpdate from './StoreUpdate.jsx';
import StoreDelete from './StoreDelete.jsx';

export default class ListingTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StoreList: [],
            Success: { Data: '' },
            showCreateModel: false,

            Name: '',
            Address: '',
            Id: 0,

            showUpdateModal: false,
            showUpdateId: 0,

            showDeleteModal: false,
            deleteId: 0,

            errors: {},
            nameError: '',
            addressError: '',
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
            'Name': this.state.Name, 'Address': this.state.Address, 'Id': this.state.Id
        };
        console.log('data1', data);
        $.ajax({
            url: '/Store/UpdateStore',
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
                        if (error.includes('Address')) {
                            errors['Address'] = error;
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
            url: "/Stores/GetStores",
            type: "GET",
            success: function (data) {
                this.setState({ StoreList: data })
            }.bind(this)
        });
    }

    onCreateSubmit() {
        let data = { 'Name': this.state.Name, 'Address': this.state.Address };
        $.ajax({
            url: "/Stores/CreateStores",
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
                        if (error.includes('Address')) {
                            errors['Address'] = error;
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
            url: "/Stores/GetStore",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                this.setState({ Id: data.Id, Name: data.Name, Address: data.Address });
            }.bind(this)
        });
    }

    closeUpdateModal() {
        this.setState({ showUpdateModal: false });
        window.location.reload()
    }

    onDeleteSubmit(id) {
        $.ajax({
            url: "/Stores/DeleteStore",
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

        let list = this.state.StoreList;

        let tableData = null;
        if (list != "") {
            tableData = list.map(Store =>
                <tr key={Store.id}>
                    <td className="four wide">{Store.Name}</td>
                    <td className="four wide">{Store.Address}</td>
                    <td className="four wide">
                        <Button className="ui yellow button" onClick={this.handleUpdate.bind(this, Store.Id)} name={this.state.Name}><i className="edit icon"></i>Edit</Button>
                    </td>
                    <td className="four wide">
                        <Button className="ui red button" onClick={this.handleDelete.bind(this, Store.Id)} ><i className="trash icon"></i>Delete</Button>
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
                        <div><Button primary onClick={this.showCreateModel}>New Store</Button></div>
                        <StoreCreate onChange={this.onChange} onClose={this.closeCreateModel} onCreateSubmit={this.onCreateSubmit} showCreateModel={this.state.showCreateModel} />
                    </div>
                    <div className="column">
                        <StoreDelete delete={this.state.deleteId} onClose={this.closeDeleteModal} onDeleteSubmit={this.onDeleteSubmit} showDeleteModal={this.state.showDeleteModal} />
                        <StoreUpdate showUpdateteModal={this.state.showUpdateteModal} updateId={this.state.updateId} onClose={this.closeUpdateModal} name={this.state.Name} address={this.state.Address} onChange={this.onChange} onUpdateSubmit={this.onUpdateSubmit} errors={this.state.errors} />
                        <table className="ui celled table ui striped table">
                            <thead>
                                <tr>
                                    <th className="four wide">Name</th>
                                    <th className="four wide">Address</th>
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
