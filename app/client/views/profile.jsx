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
        this.setState({err});
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
				<div>
					<h2>Security Token</h2>
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
			<hr />
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
            <hr />
					</div>
        </div>
			);
		} else {
			return (
				<div>
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
					<hr />
        </div>
			);
		}
	}
});

const PublicKeyComponent = React.createClass({
  render() {
    return (
			<div>
        <h2>Deployment Public Key</h2>

        <p><a href="/test161"><code>test161</code></a> needs a way to access your
          Git repository during remote testing. To enable this, please generate a
          public key below and add it to your OS/161 repository as a
					{" "}<em>deployment key</em>, following
					{" "}<a href="/test161#_preparing_for_submission">these instructions</a>.
					Note that this key is exchanged with the <code>test161</code> client (over HTTPS)
					during assignment submission.
          {" "}<strong>So do not provide this key with push access or add it to repositories
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

const SelectComponent = React.createClass({
  getInitialState() {
    return {processing: false};
  },
  onClick(value) {
    if (value === this.props.choice) {
      return;
    }
    this.setState({processing: true});
    Meteor.call('updatePrivacy', this.props, value, (err, res) => {
      if (err) {
        console.log(err);
      }
      this.setState({processing: false});
    })
  },
  render() {
    const {choice, type} = this.props;
    const {processing} = this.state;
    let text = null;
    if (type === 'asst') {
      text = 'Assignments';
    } else {
      text = 'Performance targets';
    }
    return (
      <div className="col-md-6">
        <span className="target-type">
          {text}:
        </span>
        <button type="button"
          className="btn btn-default dropdown-toggle target-btn"
          data-toggle="dropdown"
          aria-haspopup="true"
          disabled={processing}
          aria-expanded="false">
          {processing ? <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
          : null} {choice} <span className="caret"></span>
        </button>
        <ul className="dropdown-menu dropdown-menu-right">
          <li><a onClick={this.onClick.bind(this, HIDE)}>{HIDE}</a></li>
          <li><a onClick={this.onClick.bind(this, ANONYMOUS)}>{ANONYMOUS}</a></li>
          <li role="separator" className="divider"></li>
          <li><a onClick={this.onClick.bind(this, SHOW)}>{SHOW}</a></li>
        </ul>
      </div>
    );
  }
})

const PrivacyComponent = React.createClass({
  render() {
    let {email, token, privacy} = this.props.student || {};
    if (!privacy) {
      privacy = [
        { type: 'asst', choice: HIDE },
        { type: 'perf', choice: ANONYMOUS }
      ];
    }
    const settings = privacy.map(setting =>
      (<SelectComponent key={setting.type} {...setting} email={email} token={token} />)
    )
    return (
      <div>
        <h2>Leaderboard Privacy Settings</h2>
        <p>
					Leaderboards enable friendly competition between students and allow you
					to brag publicly about how well you did on the <code>ops-class.org</code>
					{" "}assignments&mdash;maybe to potential employers!
					{" "}<strong>However, participation in the leaderboards is optional.</strong>
					{" "}There are three different available blanket privacy settings:
				</p>
        <ul>
          <li>
            <strong>Show:</strong> leaderboards will display your email address and best score.
          </li>
          <li>
            <strong>Anonymous:</strong> leaderboards will show your best score but conceal your
						email address.
          </li>
          <li>
            <strong>Hide:</strong> you <em>and your partner</em> will have your scores
						omitted from the leaderboards.
          </li>
        </ul>
        <p>
					We have separate privacy settings for assignment and performance targets.
					This is because assignment submissions are mandatory, while submitting to
					performance targets is optional. The default setting for assignment
					targets is <em>hidden</em>, while the default for performance targets
					is <em>anonymous</em>. <strong>Note that you can always adjust the privacy settings
					for individual submissions on the leaderboard page.</strong>
				</p>

        <div className="row target-container">
          {settings}
        </div>
      </div>
    );
  }
});

const EmailIcon = (<i className="glyphicon glyphicon-envelope"></i>);
const NameIcon = (<i className="glyphicon glyphicon-user"></i>);
const LinkIcon = (<i className="glyphicon glyphicon-link"></i>);

const InformationComponent = React.createClass({
  getInitialState() {
    return {processing: false, invalidLink: false, edit: false};
  },
  onMouseEnter(event) {
    const target = event.target;
    target.setSelectionRange(0, target.value.length)
  },
  cleanup() {
    this.setState({err: null, processing: false, invalidLink: false, edit: false});
  },
  onChange(event) {
    const link = event.target.value
    if (link) {
      const invalidLink = !link.match(SimpleSchema.RegEx.Url);
      this.setState({invalidLink});
    } else {
      this.setState({invalidLink: false});
    }
  },
  update(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    const name = this.refs.name.value;
    const link = this.refs.link.value;
    if (name === this.props.student.name && link === this.props.student.link) {
      this.cleanup();
      return;
    }
    const {student: {email, token}} = this.props;
    this.setState({processing: true});
    Meteor.call('updateProfile', {email, token, name, link}, (err, res) => {
      if (err) {
        this.setState({err});
        console.log(err);
      } else {
        this.cleanup();
      }
      this.setState({processing: false});
    })
  },
  toggleEdit() {
    this.setState({edit: !this.state.edit});
  },
  render() {
    const {student: {token, email, name, link}} = this.props;
    const {processing, err, invalidLink, edit} = this.state;
    let errMessage = null;
    if (err) {
      const errContent = err.reason || err.message || err.error || 'Internal error';
      errMessage = (
        <div className="col-xs-12 alert alert-danger">
          {errContent}
        </div>
      );
    }
    let content = null;
    if (edit) {
      content = (
        <form onSubmit={this.update}>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon">
                {NameIcon}
              </span>
              <input type="text"
                ref="name"
                className="form-control"
                onClick={this.onMouseEnter}
                disabled={processing}
                defaultValue={name}
                placeholder="Your name"/>
            </div>
          </div>
          <div className={invalidLink ? "form-group has-error" : "form-group"}>
            <div className="input-group">
              <span className="input-group-addon">
                {LinkIcon}
              </span>
              <input type="url"
                ref="link"
                className="form-control"
                onClick={this.onMouseEnter}
                disabled={processing}
                defaultValue={link}
                onChange={this.onChange}
                placeholder="Your link, leave empty to remove it"/>
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon">
                {EmailIcon}
              </span>
              <input type="text"
                ref="email"
                className="form-control"
                onClick={this.onMouseEnter}
                disabled
                defaultValue={email}
                placeholder="Your email address"/>
            </div>
          </div>
          {errMessage}
          <div className="btn-group" role="group">
            <button type="button"
              onClick={this.cleanup}
              className="btn btn-default">
              Cancel
            </button>
            <button type="submit"
              disabled={processing || invalidLink}
              className="btn btn-danger">
              {processing ?
                <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
              : null} Update Profile
            </button>
          </div>
        </form>
      );
    } else {
      content = (
        <div>
          <p>
            {NameIcon} {name ? name : 'Unknown'}
          </p>
          {link ?
            <p>{LinkIcon} <a href={link} target="_blank">{link}</a> </p>
            : null
          }
          <p>
            {EmailIcon} <a className="email"
              href={`mailto:${email}`}>
              {email}
            </a>
          </p>
          <div className="btn btn-success"
            onClick={this.toggleEdit} >
            Edit Profile
          </div>
        </div>
      );
    }
    return (
      <div>
        <h2>Personal Information</h2>
        {content}
        <hr />
      </div>
    );
  }
});

ProfileComponent = React.createClass({
  render() {
    if (!this.props.student) {
      return <NoProfileComponent />
    }
    return (
      <div className={mainContentClass}>
        <div className="row">
          <div className="col-md-12">
            <h1>Account Settings</h1>
            <InformationComponent {...this.props} />
            <TokenComponent {...this.props} />
            <PublicKeyComponent {...this.props} />
            {isStaff(this.props.user) ?
              <PrivacyComponent {...this.props} /> : null }
          </div>
				</div>
      </div>
    );
  }
});
