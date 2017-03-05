var Page = React.createClass({
	getInitialState: function () {
		return {
			data: [
				{id: 1, name: 'Maria', email: 'maria@gmail.com', subject: 'react', message: 'me messenger test...'},
				{id: 2, name: 'Pedro', email: 'pedro@gmail.com', subject: 'angular', message: 'me messenger test...'}
			]
		};
	},
	handleContactSubmit: function (contact) {

		contact.id = (this.state.data.length + 1);

		var newContactList = this.state.data.concat([contact]);
		this.setState({data: newContactList});

	},
	render: function () {
		return (
			<div>
				<Nav title="React" />
				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-md-12 col-sm-12">
							<Form onContactSubmit={ this.handleContactSubmit }>
								<Button textActive="Loading...">Send</Button>
							</Form>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12 col-md-12 col-sm-12">
							<List data={ this.state.data }/>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

ReactDOM.render(
		<Page />,
		document.getElementById('app')
	);