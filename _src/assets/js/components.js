var Nav = React.createClass({
	render: function () {
		return (
			<nav className="navbar navbar-toggleable-md navbar-light bg-faded">
			  <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>
			  <a className="navbar-brand" href="#">{ this.props.title }</a>

			  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			    <ul className="navbar-nav mr-auto">
			      <li className="nav-item active">
			        <a className="nav-link" href="#">React <span className="sr-only">(current)</span></a>
			      </li>
			      <li className="nav-item">
			        <a className="nav-link" href="#">É Muito</a>
			      </li>
			      <li className="nav-item">
			        <a className="nav-link disabled" href="#">Bom</a>
			      </li>
			    </ul>
			  </div>
			</nav>
		);
	}
});

var Button = React.createClass({
	
	getInitialState : function () {
		return {
			click: false
		};
	},

	toggleClick: function () {
		this.setState({
			click: !this.state.click 
		});
	},

	render : function () {
		var btnClass = this.state.click ? 'btn btn-primary' : 'btn btn-warning';

		return (
			<button onClick={ this.toggleClick } className={ btnClass }>{ this.state.click ? this.props.textActive : this.props.children  }</button>
			);
	}
});

var Form = React.createClass({
	getInitialState: function () {
		return { name: '', email: '', subject: 'react', message: '', id: this.props.idNumber };	
	},
	handleNameChange: function (e) {

		var stateChange = {};
		stateChange[e.target.name] = e.target.value;  
		this.setState(stateChange);

	},
	handleSubmit: function (e) {
		e.preventDefault();

		this.props.onContactSubmit(this.state);

	},
	render: function () {
		return (
			<form onSubmit={ this.handleSubmit }>
				<div className="form-group">
					<label htmlFor="name" >Name</label>
					<input type="text" id="name" name="name" placeholder="Name" onChange={ this.handleNameChange } className="form-control" />
				</div>
				<div className="form-group">
					<label htmlFor="email" >Email</label>
					<input type="email" id="email" name="email" placeholder="example@gmail.com" onChange={ this.handleNameChange } className="form-control" />
				</div>
				<div className="form-group">
					<label htmlFor="subject" >Subject</label>
					<select defaultValue={ this.state.subject } className="form-control" onChange={ this.handleNameChange } id="subject" name="subject">
						<option value="angular">Angular</option>
						<option value="jquery">Jquery</option>
						<option value="react">React</option>
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="message" >Messenger</label>
					<textarea id="message" name="message" rows="5" onChange={ this.handleNameChange } className="form-control"></textarea>
				</div>
				{ this.props.children }
			</form>
		);
	}
});

var Contact = React.createClass({
	render: function() {
		return (
			<tr>
				<th scope="row">{ this.props.idNumber }</th>
				<td>{ this.props.name }</td>
				<td>{ this.props.email }</td>
				<td>{ this.props.subject }</td>
				<td>{ this.props.message }</td>
			</tr>
		);
	}
})

var List = React.createClass({
	render: function () {

		var contactNodes = this.props.data.map(function (contact){
			return (
				
				<Contact 
				idNumber={ contact.id } 
				name={ contact.name } 
				email={ contact.email } 
				subject={ contact.subject } 
				message={ contact.message } />

				);
		});

		return (
			<table className="table">
				<thead>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Email</th>
						<th>Subject</th>
						<th>Messenger</th>
					</tr>
				</thead>
				<tbody>
					{ contactNodes }
				</tbody>
			</table>
			);
	}
})