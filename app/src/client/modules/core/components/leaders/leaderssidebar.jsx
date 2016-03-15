import {Component} from 'react';
import {fixedTopHeight} from '../style';

class LeadersSidebarComponent extends Component {
  componentDidMount() {
    $(function () {
      $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') &&
        location.hostname === this.hostname) {
          let target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top - fixedTopHeight
            }, 512, () => {
              location.hash = this.hash;
            });
            return false;
          }
        }
      });
    });
  }

  render() {
    const {targets} = this.props;
    const hash = location.hash;
    const list = targets.map((target) => {
      const { _id, print_name } = target;
      let className = 'h5';
      const href = `#${_id}`;
      if (href === hash) {
        className += ' active';
      }
      return (
        <li key={_id}
          className={className}>
          <a href={href}>
            {print_name}
          </a>
        </li>
      );
    });
    const sideStyle = {
      paddingTop: '20px',
      paddingRight: '10px'
    };
    return (
      <div id="scrollspy" className="col-md-2 spelling_exception">
        <ul id="side"
          className="nav hidden-xs hidden-sm affix"
          data-spy="affix"
          style={sideStyle}>
          {list}
        </ul>
      </div>
    );
  }
}

export default {LeadersSidebarComponent};
