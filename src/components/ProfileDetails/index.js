import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

class ProfileDetails extends Component {
  state = {
    loaderStatus: true,
    dataObj: {},
    status: '',
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({loader: true})
    const url = 'https://apis.ccbp.in/profile'
    const token = Cookies.get('jwt_token')
    const options = {method: 'GET', headers: {Authorization: `Bearer ${token}`}}
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        name: data.profile_details.name,
        shortBio: data.profile_details.short_bio,
        imageUrl: data.profile_details.profile_image_url,
      }
      this.setState({
        loaderStatus: false,
        dataObj: updatedData,
        status: 'success',
      })
    } else {
      this.setState({loaderStatus: false, status: 'failure'})
    }
  }

  loaderPage = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  success = () => {
    const {dataObj} = this.state
    const {imageUrl, name, shortBio} = dataObj
    return (
      <div className="success">
        <img src={imageUrl} alt="profile" className="profile" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  render() {
    const {loaderStatus} = this.state
    return (
      <div className="profileContainer">
        {loaderStatus ? this.loaderPage() : this.success()}
      </div>
    )
  }
}

export default ProfileDetails
