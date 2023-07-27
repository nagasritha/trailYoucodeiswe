import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = () => {
  const event = () => {
    Cookies.remove('jwt_token')
  }
  return (
    <nav className="navItem">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="logo"
      />
      <div className="row-lg">
        <Link className="link" to="/">
          <p className="tab">Home</p>
        </Link>
        <Link className="link" to="/jobs">
          <p className="tab">Jobs</p>
        </Link>
      </div>
      <div className="row-sm">
        <Link className="link" to="/">
          <AiFillHome className="color tab" />
        </Link>
        <Link className="link" to="/jobs">
          <BsFillBriefcaseFill className="color tab" />
        </Link>
        <button type="button" className="logo-button" onClick={event}>
          <FiLogOut className="color tab" />
        </button>
      </div>
      <button onClick={event} className="logoutButton-lg" type="button">
        Logout
      </button>
    </nav>
  )
}

export default Header
