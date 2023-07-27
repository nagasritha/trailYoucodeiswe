import Header from '../Header'
import './index.css'

const Home = props => {
  const nav = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <div>
      <Header />
      <div className="home-container">
        <div className="text-container">
          <h1 className="heading-home">Find The Job That Fits Your Life</h1>
          <p className="para-home">
            Millions of peoples are searching for jobs, salary information,
            company reviews. Find the jobs that fits your abilities and
            potential.
          </p>
          <button type="button" className="viewJobs" onClick={nav}>
            Find Jobs
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
