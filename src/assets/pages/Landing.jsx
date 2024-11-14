import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { useEffect, useState } from 'react'
import { getAllProjectsApi } from '../../services/allApis'

function Landing() {

  const [logStatus, setlogStatus] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setlogStatus(true)
    }
    else {
      setlogStatus(false)
    }
    getData()
  }, [])

  const getData = async () => {
    const res = await getAllProjectsApi()
    if (res.status == 200) {
      setData(res.data)
    }
  }
  console.log(data)

  return (
    <>
      <div className='container-fluid d-flex justify-content-center align-items-center' style={{ height: '90vh', backgroundColor: 'pearwhite' }}>
        <Row>
          <Col className='d-flex flex-column justify-content-center'>
            <h2 className='text-warning'>Project-Fair</h2>
            <p style={{ textAlign: 'justify' }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis beatae quidem minima quaerat quae minus! Magni voluptas consectetur explicabo saepe, deleniti, voluptatem consequatur veritatis sit, magnam quos mollitia facere maiores?</p>
            <div className='d-grid'>
              {
                logStatus ?
                  <Link className="btn btn-warning" to={'/dash'}>Go to Dashboard</Link>
                  :
                  <Link className='btn btn-primary mt-3' to={'/auth'}>Start to Explore</Link>
              }
            </div>
          </Col>
          <Col>
            <img src="https://raw.githubusercontent.com/majdimokhtar/github-images/main/rightimagemajdigithub.gif?token=GHSAT0AAAAAABUZ7SAQ6CWAJ3EWM7P3WSBUY3GNLNQ"
              alt="" className='img-fluid' />
          </Col>
        </Row>
      </div>
      <h2 className='text-center'>Sample Projects</h2>
      {
        data.length > 0 ?
          <div className='d-flex justify-content-around my-5'>
            {
              data.slice(0, 3).map(item => (
                <ProjectCard project={item} />
              ))
            }
          </div>
          :
          <h3 className='my-3 text-center text-danger'>No Projects Available!!</h3>
      }

      <div className='text-center text-info my-3'>
        <Link to={'/projects'}>View More</Link>
      </div>
    </>
  )
}

export default Landing
