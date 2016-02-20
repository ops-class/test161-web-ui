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
      console.log('Good catch!');
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
                Are you ABSOLUTELY sure?
              </h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-xs-12 alert alert-warning">
                  This action <b>CANNOT</b> be undone. {warning} Please type in your email to confirm.
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
    const modalId = "tokenModal";
    return (
      <div className="col-md-12">
        <div className="input-group">
          <span className="input-group-addon">Your submit token</span>
          <input type="text" className="form-control"
            value={token}
            onChange={() => {}}
            onClick={this.onMouseEnter}
            placeholder="Your Token"/>
          <span className="input-group-btn">
            <button className="btn btn-danger"
              data-toggle="modal"
              data-target={`#${modalId}`}
              type="button">Regenerate</button>
          </span>
        </div>
        <ConfirmComponent {...student}
          warning={'This will permanently change your token.'}
          method={'regenerateToken'}
          modalId={modalId}
          target={'Token'}
        />
      </div>
    );
  }
});

const PublicKeyComponent = React.createClass({
  render() {
    const {student, user} = this.props;
    let {key, token, email} = student;
    const modalId = "publickKeyModal";
    if (!key) {
      key = 'Please generate your public key manually!'
    }
    return (
        <div className="col-md-12">
          <p>Your public key:</p>
          <pre>
            <code>
              {key}
            </code>
          </pre>
          <button className="btn btn-danger"
            data-toggle="modal"
            data-target={`#${modalId}`}
            type="button">Regenerate Public Key</button>
          <ConfirmComponent {...student}
            warning={'This will permanently change your public key. You have to add new public key to your repo.'}
            method={'regeneratePublicKey'}
            modalId={modalId}
            target={'Public Key'}
          />
        </div>
    );
  }
});

ProfileComponent = React.createClass({
  render() {
    const {student, user} = this.props;
    // console.log(student, user);
    if (!student) {
      return <NoProfileComponent />
    }

    const {token, email} = student;
    return (
      <div className={mainContentClass}>
        <TokenComponent {...this.props} />
        <PublicKeyComponent {...this.props} />
      </div>
    );
  }
});
