import React, { useEffect, useContext } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addProjectApi } from '../../services/allApis';
import { responseContext } from '../../contextapi/ContextProvider';

function Add() {

  const [show, setShow] = useState(false);
  const [project, setProject] = useState({
    title: "", description: "", languages: "", github: "", demo: "", image: ""
  })

  const [preview, setPreview] = useState("")
  const { setResponse } = useContext(responseContext)

  const handleProjectAdd = async () => {
    console.log(project)
    const { title, description, languages, github, demo, image } = project
    if (!title || !description || !languages || !github || !demo || !image) {
      toast.warning("Enter Valid Inputs!!")
    }
    else {
      const fd = new FormData()
      fd.append("title", title)
      fd.append("description", description)
      fd.append("languages", languages)
      fd.append("github", github)
      fd.append("demo", demo)
      fd.append("image", image)

      const header = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Token ${sessionStorage.getItem("token")}`
      }
      const res = await addProjectApi(fd, header)
      console.log(res)
      if (res.status == 200) {
        toast.success("Project Added!!")
        handleClose()
        setResponse(res)
      }
    }
  }

  useEffect(() => {
    if (project.image) {
      setPreview(URL.createObjectURL(project.image))
    }
    else {
      setPreview("")
    }
  }, [project.image])

  const handleClose = () => {
    setShow(false);
    setProject({ image: "", title: "", description: "", languages: "", github: "", demo: "" })
  }
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Project
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <label>
                <input type="file" onChange={(e) => setProject({ ...project, image: e.target.files[0] })} style={{ display: 'none' }} />
                <img src={preview ? preview : "https://cdn.dribbble.com/users/419257/screenshots/1724076/scanningwoohoo.gif"}
                  className='img-fluid' alt="" />
              </label>
            </Col>
            <Col>
              <input type="text" placeholder='Title' onChange={(e) => setProject({ ...project, title: e.target.value })} className='form-control mb-1' />
              <input type="text" placeholder='Description' onChange={(e) => setProject({ ...project, description: e.target.value })} className='form-control mb-1' />
              <input type="text" placeholder='Languages Used' onChange={(e) => setProject({ ...project, languages: e.target.value })} className='form-control mb-1' />
              <input type="text" placeholder='Git Repository' onChange={(e) => setProject({ ...project, github: e.target.value })} className='form-control mb-1' />
              <input type="text" placeholder='Demo Link' onChange={(e) => setProject({ ...project, demo: e.target.value })} className='form-control mb-1' />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleProjectAdd}>Save & Upload</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add
