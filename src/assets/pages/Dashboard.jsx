import React, { useState, useEffect, useContext } from 'react'
import Header from '../components/Header'
import { Row, Col } from 'react-bootstrap'
import Add from '../components/Add'
import Edit from '../components/Edit'
import Profile from '../components/Profile'
import { getProjectApi, deleteProjectApi } from '../../services/allApis'
import { responseContext } from '../../contextapi/ContextProvider'
import { toast } from 'react-toastify'

function Dashboard() {

  const [uname, setUname] = useState("")
  const [projects, setProjects] = useState([])
  const { response } = useContext(responseContext)

  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      setUname(sessionStorage.getItem('user'))
    }
    getData()
  }, [response])

  const getData = async () => {
    const header = {
      "Content-Type": "application/json",
      "Authorization": `Token ${sessionStorage.getItem('token')}`
    }
    const res = await getProjectApi(header)
    console.log(res)
    if (res.status = 200) {
      setProjects(res.data)
    }
  }

  const handleDelete = async (id) => {
    const header = {
      "Content-Type": "application/json",
      "Authorization": `Token ${sessionStorage.getItem('token')}`
    }
    const res = await deleteProjectApi(id, header)
    if (res.status = 200) {
      toast.error("Deleted!!")
      getData()
    }
    else {
      toast.warning("Deletion Failed!!")
    }
  }

  return (
    <>
      <Header />
      <div className="container-fluid p-3">
        <h1 className="text-center my-3">Welcome, <span className='text-info'>{uname}</span></h1>
        <h3>User Projects</h3>
        <Row>
          <Col md={7} sm={12}>
            <div className='border border-3 border-dark shadow p-2'>
              <Add />
              <div className="my-2">
                {
                  projects?.length > 0 ?
                    projects?.map((item) => (
                      <div className="border p-2 border-2 border-info shadow mb-3 d-flex justify-content-between">
                        <h5>{item.title}</h5>
                        <div>
                          <a href={item.github} className='btn me-2'><i className='fa-brands fa-github fa-xl' style={{ color: '00040a' }}></i></a>
                          <Edit project={item} />
                          <button className="btn">
                            <i className='fa-solid fa-trash' onClick={() => handleDelete(item._id)} style={{ color: '#e6363d' }} />
                          </button>
                        </div>
                      </div>
                    ))
                    :
                    <h3 className='text-center text-danger'>No Projects Added Yet!!</h3>
                }
              </div>
            </div>
          </Col>
          <Col md={5} sm={12}>
            <Profile />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Dashboard