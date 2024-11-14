import React from 'react'
import { useState, useContext,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import { updateProjectApi } from '../../services/allApis';
import { responseContext } from '../../contextapi/ContextProvider';
import base_url from '../../services/base_url';
import { toast } from 'react-toastify';

function Edit({project}) {

  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    title: "", description: "", languages: "", github: "", demo: "", image: ""
  })

  const [preview, setPreview] = useState("")
  const { setResponse } = useContext(responseContext)

  useEffect(() => {
    setData({ ...project })
  }, [])

  useEffect(() => {
    if (data.image.type) {
      setPreview(URL.createObjectURL(data.image))
    }
    else {
      setPreview("")
    }
  }, [data.image])


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = async () => {
    console.log(data)
    const { title, description, languages, github, demo, image } = data
    if (!title || !description || !languages || !github || !demo || !image) {
      toast.warning("Invalid Inputs!!")
    }
    else {
      if (data.image.type) {
        const fd = new FormData()
        fd.append("title", data.title)
        fd.append("description", data.description)
        fd.append("languages", data.languages)
        fd.append("github", data.github)
        fd.append("demo", data.demo)
        fd.append("image", data.image)

        const header = {
          'Content-Type': "multipart/form-data",
          'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res = await updateProjectApi(project._id, header, fd)
        console.log(res)
        if (res.status == 200) {
          toast.success("Project Details Updated!!")
          handleClose()
          setResponse(res)
        }
        else {
          toast.error("Something Went Wrong...Updation Failed!!")
        }
      }
      else {
        const header = {
          'Content-Type': "application/json",
          'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res = await updateProjectApi(project._id, header, data)
        console.log(res)
        if (res.status == 200) {
          toast.success("Project Details Updated!!")
          handleClose()
          setResponse(res)
        }
        else {
          toast.error("Something Went Wrong...Updation Failed!!")
        }
      }
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <i className="fa-regular fa-pen-to-square" style={{ color: "#000000", }} />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <label>
                <input type="file" style={{ display: 'none' }} onChange={(e) => { setData({ ...data, image: e.target.files[0] }) }} />
                <img src={preview ? preview : `${base_url}/uploads/${data.image}`}
                  className='img-fluid' alt="" />
              </label>
            </Col>
            <Col>
              <input type="text" placeholder='Title' defaultValue={data.title} onChange={(e) => { setData({ ...data, title: e.target.value }) }} className='form-control mb-1' />
              <input type="text" placeholder='Description' defaultValue={data.description} onChange={(e) => { setData({ ...data, description: e.target.value }) }} className='form-control mb-1' />
              <input type="text" placeholder='Languages Used' defaultValue={data.languages} onChange={(e) => { setData({ ...data, languages: e.target.value }) }} className='form-control mb-1' />
              <input type="text" placeholder='Git Repository' defaultValue={data.github} onChange={(e) => { setData({ ...data, github: e.target.value }) }} className='form-control mb-1' />
              <input type="text" placeholder='Demo Link' defaultValue={data.demo} onChange={(e) => { setData({ ...data, demo: e.target.value }) }} className='form-control mb-1' />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleEdit}>Update & Upload</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit
