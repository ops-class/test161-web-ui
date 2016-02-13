const publicKey = 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC4pYwlS6TvkXAsyyYL9uzHtk1cwDtVQwrUU5GxFv7xT9eWoURaSIztq153UUTdAy7wkUxJI2XxFImBuQLx+3OSyF7OAGcPkmXoZnEjPEFdayCOelt7gcA/AeL1qXWullELLQuQxRKivr/0W16PXkcCrZ+M20aP3JkVOokFn7AkgFAnneCfHIWvikb/+n4ZCQJ6jGBxpwqXAWECYZdvKslqbX4WB2MGETM3TP0hcBWxocoMlot1PydbvgjbrSaxwznDophPwDynFsyO9HpFoCrCroKstwU+miUiWLQNWmso9QWGd/4WLMh+k2nZqGo7nwwUpmmFyAZm5e5bMScXaief xcv58@xcv58.home'

const NoProfileComponent = () => (
  <div className="alert alert-danger">
  No profile information found!
  Please refresh the page or contact the course staff.
  </div>
)

const CodeComponent = ({content}) => <pre><code>{content}</code></pre>

const ConfirmComponent = React.createClass({
  getInitialState() {
    return {};
  },
  handleChange(event) {
    this.setState({input: event.target.value});
  },
  modalDismiss() {
    $('#tokenModal').modal('hide');
    $('#tokenInput').val('');
  },
  regenerate() {
    const {email, token} = this.props;
    if (this.state.input !== email) {
      console.log('Good catch!');
      this.modalDismiss();
      return;
    }
    Meteor.call('regenerateToken', {email, token}, (err, res) => {
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
    const {email, token} = this.props;
    const {input, err} = this.state;
    let errMessage = null;
    if (err) {
      console.log(err);
      const errContent = err.reason || err.message || err.error || 'Internal error';
      errMessage = (
        <div className="col-xs-12 alert alert-danger">
          {errContent}
        </div>
      );
    }
    return (
      <div className="modal fade"
        id="tokenModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="tokenModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">
              Are you ABSOLUTELY sure?
              </h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-xs-12 alert alert-warning">
                  This action <b>CANNOT</b> be undone.
                  This will permanently change your token.
                  Please type in your email to confirm.
                </div>
                <div className="col-xs-12">
                  <input type="text"
                    id="tokenInput"
                    className="form-control"
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
                disabled={input !== email}
                className="btn btn-danger">
                Regenerate token
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
      <div className="col-md-12">
        <p>Your submit token:</p>
        <div className="col-md-12">
          <div className="input-group">
            <input type="text" className="form-control"
              value={token}
              onChange={() => {}}
              onClick={this.onMouseEnter}
              placeholder="Your Token"/>
            <span className="input-group-btn">
              <button className="btn btn-danger"
                data-toggle="modal"
                data-target="#tokenModal"
                type="button">Regenerate</button>
            </span>
          </div>
          <ConfirmComponent {...student}/>
        </div>
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
      <div className="row">
        <TokenComponent {...this.props} />
        <div className="col-md-12">
        Public key:
          <CodeComponent content={publicKey}/>
        </div>
      </div>
    );
  }
});
