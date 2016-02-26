const NoProfileComponent = () => (
  <div className="alert alert-danger">
    No profile information found!
    Please refresh the page or contact the course staff.
  </div>
)

const CodeComponent = ({content}) => <pre><code>{content}</code></pre>

const ConfirmComponent = React.createClass({
  getInitialState() {
    return {processing: false};
  },
  handleChange(event) {
    this.setState({input: event.target.value});
  },
  modalDismiss() {
    this.setState({err: null});
    $('.tokenInput').val('');
    $('.close-modal').click();
  },
  regenerate() {
    this.setState({processing: true});
    const {email, token} = this.props;
    if (this.state.input !== email) {
      this.modalDismiss();
      this.setState({processing: false});
      return;
    }
    const {method} = this.props;
    Meteor.call(method, {email, token}, (err, res) => {
      this.setState({processing: false});
      if (err) {
        this.state.err = err;
        this.setState(this.state);
      } else {
        this.modalDismiss();
      }
    });
    return;
  },
  render() {
    const {email, token, warning, modalId, target} = this.props;
    const {input, err, processing} = this.state;
    let errMessage = null;
    if (err) {
      const errContent = err.reason || err.message || err.error || 'Internal error';
      errMessage = (
        <div className="col-xs-12 alert alert-danger">
          {errContent}
        </div>
      );
    }
    return (
      <div className="modal fade"
        id={modalId}
        tabIndex="-1"
        role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close close-modal" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">
                Are you sure?
              </h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-xs-12 alert alert-warning">
                  This action <b>CANNOT</b> be undone. {warning} Please enter your email to confirm.
                </div>
                <div className="col-xs-12">
                  <input type="text"
                    className="form-control tokenInput"
                    onChange={this.handleChange}
                    placeholder="Your email address"/>
                </div>
                {errMessage}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button"
                className="btn btn-default"
                data-dismiss="modal">Cancel</button>
              <button type="button"
                onClick={this.regenerate}
                disabled={input !== email || processing}
                className="btn btn-danger">
                Regenerate {target}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

const TokenComponent = React.createClass({
  onMouseEnter(event) {
    const target = event.target;
    target.setSelectionRange(0, target.value.length)
  },
  render() {
    const {student, user} = this.props;
    const {token, email} = student;
    return (
			<div>
        <h3>Security Token</h3>
        <p>Your security token allows you to submit assignments using the {" "}
          <a href="/test161"><code>test161</code></a> submission tool.
          Please add it to your <code>.test161.conf</code> file as described in
          the <a href="/test161#_preparing_for_submission">instructions on preparing for submission</a>.</p>

        <p><strong>Please keep your token secure and only share it with your partner, if you have one.</strong>
          {" "}If you are worried that your token has been compromised, you can generate a new one below.</p>

        <div className="input-group">
          <span className="input-group-addon">Current security token:</span>
          <input type="text" className="form-control"
            value={token}
            onChange={() => {}}
            onClick={this.onMouseEnter}
            placeholder="Your Token"/>
          <span className="input-group-btn">
            <button className="btn btn-danger"
              data-toggle="modal"
              data-target="#tokenModal"
              type="button">
							Regenerate
						</button>
          </span>

				<ConfirmComponent {...student}
          warning={'This will permanently change your token.'}
          method={'regenerateToken'}
          modalId={'tokenModal'}
          target={'Token'}
        />
      </div>
		</div>
    );
  }
});

const KeyContentComponent = React.createClass({
  getInitialState() {
    return { processing : false };
  },
  generatePublicKey() {
    const {student} = this.props;
    const {email, token} = student || {};
    this.setState({processing: true});
    Meteor.call('regeneratePublicKey', {email, token}, (err, res) => {
      this.setState({processing: false});
      if (err) {
        this.setState({err});
      }
    });
  },
	render() {
    const {student} = this.props;
    const {key} = student || {};
    if (!key) {
      const {err, processing} = this.state;
      let errMessage = null;
      if (err) {
        const errContent = err.reason || err.message || err.error || 'Internal error';
        errMessage = (
          <div className="col-xs-12 alert alert-danger">
            {errContent}
          </div>
        );
      }
			return (
				<div>
          {errMessage}
          <button className="btn btn-success"
            disabled={processing}
            onClick={this.generatePublicKey}
            type="button">
            {processing ?
              <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
              :
            null} Generate Initial Public Key
          </button>
        </div>
			);
		} else {
			return (
				<div>
          <p>Current public key:</p>
          <pre>
            <code>
              {key}
            </code>
          </pre>
          <button className="btn btn-danger"
            data-toggle="modal"
            data-target="#publicKeyModel"
            type="button">
            Generate New Public Key
          </button>
        </div>
			);
		}
	}
});

const PublicKeyComponent = React.createClass({
  render() {
    return (
			<div>
        <h3>Deployment Public Key</h3>

        <p><a href="/test161"><code>test161</code></a> needs a way to access your
        Git repository during remote testing. To enable this, please generate a
          public key below and add it to your OS/161 repository as a <em>deployment
          key</em>, following <a
               href="/test161#_preparing_for_submission">these instructions</a>.
          {" "}<strong>Do not provide this key with push access or add it to repositories
          other than your OS/161 repository.</strong></p>

        <KeyContentComponent {...this.props} />

        <ConfirmComponent {...this.props.student}
          warning={'This will permanently change your public key. You have to add new public key to your repo.'}
          method={'regeneratePublicKey'}
          modalId={'publicKeyModel'}
          target={'Public Key'}
        />
      </div>
    );
  }
});

const CompeteComponent = React.createClass({
  toggle(event) {
    const {email, token, hide, anonymous} = this.props.student || {};
    const {value, checked} = event.target;
    if (value === 'hide') {
      Meteor.call('toggleHide', {email, token});
    } else if (value === 'anonymous') {
      Meteor.call('toggleAnonymous', {email, token});
    } else {
      console.log('Error!', value, ' unknown!');
    }
  },
  render() {
    const {email, token, hide, anonymous} = this.props.student || {};
    return (
      <div>
        <h3>Leader Board Settings</h3>

        <div className="switch">
          <input className=""
            onClick={this.toggle}
            value="hide"
            type="checkbox"
            checked={hide}
          /> Hide
        </div>

        <div className="switch">
          <input className=""
            onClick={this.toggle}
            value="anonymous"
            type="checkbox"
            disabled={hide}
            checked={anonymous}
          /> Anonymous
        </div>
      </div>
    );
  }
})

ProfileComponent = React.createClass({
  render() {
    if (!this.props.student) {
      return <NoProfileComponent />
    }
    return (
      <div className={mainContentClass}>
        <div className="row">
          <div className="col-md-12">
            <h2>Account Settings</h2>
            <TokenComponent {...this.props} />
            <PublicKeyComponent {...this.props} />
            {isStaff(this.props.user) ?
              <CompeteComponent {...this.props} /> : null }
          </div>
				</div>
      </div>
    );
  }
});
