import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { searchProjectsApi } from '../../services/allApis';

function AllProjects() {

  const [data, setData] = useState([])
  const [search,setSearch]=useState('')

  useEffect(() => {
    getData()
  }, [search])

  const getData = async () => {
    const res = await searchProjectsApi(search)
    if (res.status == 200) {
      setData(res.data)
    }
  }

  console.log(data)

  return (
    <>
      <Header />
      <div className="container-fluid p-3">
        <div className="d-flex justify-content-between">
          <h3>All Projects</h3>
          <input type="text" placeholder='Search with languages' className='form-control w-25 mb-3' onChange={(e)=>setSearch(e.target.value)} />
        </div>
        <div className="d-flex flex-wrap gap-3 justify-content-around">
          {data.length > 0 ? (
            data.map((item) => (
              <ProjectCard project={item} />
            ))
          ) : (
            <h4 className="text-center text-danger">No Projects Available</h4>
          )}
        </div>
      </div>
    </>
  )
}

export default AllProjects
