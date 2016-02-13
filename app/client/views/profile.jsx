const publicKey = 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC4pYwlS6TvkXAsyyYL9uzHtk1cwDtVQwrUU5GxFv7xT9eWoURaSIztq153UUTdAy7wkUxJI2XxFImBuQLx+3OSyF7OAGcPkmXoZnEjPEFdayCOelt7gcA/AeL1qXWullELLQuQxRKivr/0W16PXkcCrZ+M20aP3JkVOokFn7AkgFAnneCfHIWvikb/+n4ZCQJ6jGBxpwqXAWECYZdvKslqbX4WB2MGETM3TP0hcBWxocoMlot1PydbvgjbrSaxwznDophPwDynFsyO9HpFoCrCroKstwU+miUiWLQNWmso9QWGd/4WLMh+k2nZqGo7nwwUpmmFyAZm5e5bMScXaief xcv58@xcv58.home'

const NoProfileComponent = () => (
  <div className="alert alert-danger">
  No profile information found!
  Please refresh the page or contact the course staff.
  </div>
)

const CodeComponent = ({content}) => <pre><code>{content}</code></pre>

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
        <div className="col-md-12">
        Your token:
          <CodeComponent content={token}/>
        </div>
        <div className="col-md-12">
        Public key:
          <CodeComponent content={publicKey}/>
        </div>
      </div>
    );
  }
});
