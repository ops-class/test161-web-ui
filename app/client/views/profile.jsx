const publicKey = 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDHwkIK3GtIJ+i0aPDiMtGNT+5H3RGWU1K/ykYtT4Ox/z6gGQ5WxsDPV47N4k7ViXi+d8m0HPIer22iocaykLHogRZBlFlo/bxtHUuh8vBVwdrvoUgu6niswuAnVUy/Xsk85p59gJv2BM3RPgKMOd9Nj4MoLE6+ii/dnQ5XcXPk/S/jlAJVV1h0Yl3UTezLLgMEcnU64xumLnK0jHscb8Kjlj4fr8NZPd8moCtKYY+miVT1nw3i1tDycaB3ExEuJhMaRZDNBmXxoiGa5qgBheiIyG9RelGGRPqy4nbhfiWJ49eDtv1/IzcsC+oOhRdATCCeJNDs9t2lxRlDYBQ7hwcX test161';

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
    $('#tokenInput').val('');
    $('#close-modal').click();
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
              <button type="button" className="close" id="close-modal" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
              data-target="#tokenModal"
              type="button">Regenerate</button>
          </span>
        </div>
        <ConfirmComponent {...student}/>
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
