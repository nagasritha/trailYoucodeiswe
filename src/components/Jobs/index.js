import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobsPortal from '../JobsPortal'
import ProfileDetails from '../ProfileDetails'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
console.log(employmentTypesList, salaryRangesList)

const displayStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  empty: 'EMPTY',
}

class Jobs extends Component {
  state = {
    items: [],
    amount: '',
    searchItem: '',
    jobsData: [],
    pageStatus: 'INITIAL',
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  getJobsDetails = async () => {
    this.setState({pageStatus: displayStatus.loading})
    const {items, amount, searchItem} = this.state
    console.log(items.join(','))
    const joinCom = items.join(',')
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${joinCom}&minimum_package=${amount}&search=${searchItem}`
    console.log(url)
    const options = {
      headers: {Authorization: `Bearer ${token}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = data.jobs.map(item => ({
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        jobDescription: item.job_description,
        location: item.location,
        packagePerAnnum: item.package_per_annum,
        title: item.title,
        rating: item.rating,
      }))
      if (updatedData.length === 0) {
        this.setState({pageStatus: displayStatus.empty, jobsData: updatedData})
      } else {
        this.setState({
          pageStatus: displayStatus.success,
          jobsData: updatedData,
        })
      }
    } else {
      this.setState({pageStatus: displayStatus.failure})
    }
  }

  updateText = event => {
    this.setState({searchItem: event.target.value})
  }

  updatePackage = event => {
    this.setState({amount: event.target.id}, this.getJobsDetails)
  }

  updateItems = event => {
    if (event.target.checked) {
      const {items} = this.state
      const list = [...items, event.target.id]
      this.setState({items: list}, this.getJobsDetails)
    } else {
      const {items} = this.state
      const list = items.filter(item => item !== event.target.id)
      this.setState({items: list}, this.getJobsDetails)
    }
  }

  search = () => {
    this.getJobsDetails()
  }

  render() {
    const {searchItem, jobsData, pageStatus} = this.state
    console.log(jobsData)
    return (
      <div>
        <Header />
        <div className="jobsContainer">
          <div>
            <div className="row-1">
              <input
                type="search"
                onChange={this.updateText}
                value={searchItem}
                className="search-bar"
                placeholder="Search"
              />
              <button
                type="button"
                onClick={this.search}
                className="search-icon-div"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ProfileDetails />
            <hr className="line" />
            <p>Types of Employment</p>
            <div>
              {employmentTypesList.map(item => (
                <div className="row" key={item.employmentTypeId}>
                  <input
                    id={item.employmentTypeId}
                    onClick={this.updateItems}
                    type="checkbox"
                  />
                  <label htmlFor={item.employmentTypeId}>{item.label}</label>
                </div>
              ))}
            </div>
            <hr className="line" />
            <p>Salary Range</p>
            <div>
              {salaryRangesList.map(item => (
                <button className="row packageDetails" key={item.salaryRangeId}>
                  <input
                    name="radio"
                    id={item.salaryRangeId}
                    onClick={this.updatePackage}
                    type="radio"
                  />
                  <label htmlFor={item.salaryRangeId}>{item.label}</label>
                </button>
              ))}
            </div>
          </div>
          <div className="container-2">
            <div className="row-2">
              <input
                type="search"
                onChange={this.updateText}
                value={searchItem}
                className="search-bar"
                placeholder="Search"
              />
              <button
                type="button"
                onClick={this.search}
                className="search-icon-div"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <JobsPortal
              pageStatus={pageStatus}
              jobsData={jobsData}
              retry={this.getJobsDetails}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
