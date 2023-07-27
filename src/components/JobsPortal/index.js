import Loader from 'react-loader-spinner'
import './index.css'

const JobsPortal = props => {
  const {pageStatus, jobsData, retry} = props
  const displayLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )
  const displayStatus = {
    loading: 'LOADING',
    success: 'SUCCESS',
    failure: 'FAILURE',
    empty: 'EMPTY',
  }
  const tryMeth = () => {
    retry()
  }
  const displaySuccess = () => <p>Hey I am called</p>

  const displayFailure = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1>Oops! Something went wrong</h1>
      <p>We cannot seem to find the page ypu are looking for.</p>
      <button type="button" className="logoutButton" onClick={tryMeth}>
        Retry
      </button>
    </div>
  )

  const displayEmptyPage = () => <p>Empty page</p>

  switch (pageStatus) {
    case displayStatus.loading:
      return displayLoader()
    case displayStatus.success:
      return displaySuccess()
    case displayStatus.failure:
      return displayFailure()
    case displayStatus.empty:
      return displayEmptyPage()
    default:
      return null
  }
}

export default JobsPortal
