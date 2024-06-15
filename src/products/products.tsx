import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { setData, editData } from '../reducers/actions';
import { connect } from 'react-redux';
import { Container, InputGroup, Table, Form, Modal, Button, Col, Row } from 'react-bootstrap';

const Products = (props: any) => {

  const [editDetails, setEditDetails] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [rowID, setRowId] = useState<any>();
  const [title, setTitle] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<any>(props.data);
  // const [currentPage,setCurrentPage]=useState(1);
  // const [productsPerPage,setProductsPerPage]=useState(2);
  const baseUrl = 'https://fakestoreapiserver.reactbd.com';

  useEffect(() => {
    axios.get(`${baseUrl}/products`).then((response: any) => {
      props.setData(response.data)
    });
  }, []);

  useEffect(() => {
    setFilteredProducts(props.data.filter((item: any) => {
      return search.toLowerCase().trim() === '' ? item : item.title.toLowerCase().includes(search.toLowerCase().trim()) || item.category.toLowerCase().includes(search.toLowerCase().trim())
    }))
  }, [props.data, search])

  const searching = (e: any) => {
    setSearch(e.target.value)
  }

  const editProduct = (e: any) => {
    setEditDetails(true);
    setRowId(e);
  }

  const onChange = (e: any) => {
    setTitle(e.target.value);
  }

  const fromSubmit = (e: any) => {
    let obj = {
      title: props.editData(title)
    }
    // if id present do edit/update else add
    axios.post(`${baseUrl}/products`, obj).then((response: any) => {
      console.log(response.data);
      setEditDetails(false);
    }).catch((err: any) => {
      alert(err.response.status);
      setEditDetails(false)
    });
  }

  return (
    <div>
      <Container>
        <h1 className='text-center mt-4'>Products</h1>
        <Form className='my-4'>
          <InputGroup>
            <Form.Control placeholder='Search Products' onChange={(e: any) => searching(e)}></Form.Control></InputGroup></Form>
        {/* <button onClick={() => { }}>Add Product</button> */}
        <br />
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product: { _id: React.Key | null | undefined; title: string; price: number; description: string; category: string }) => {
                return (
                  <tr key={product._id}>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>{product.category}</td>
                    <td>
                      <Link to={`/view?id=${product._id}`}>View Details</Link>
                    </td>
                    <td>
                      <button onClick={() => {
                        editProduct(product)
                      }}>Edit</button>
                    </td>
                  </tr>
                )
              })}</tbody>
          </Table>
        </div>

        {editDetails &&
          <>
            <Modal
              show={editDetails}
              onHide={() => setEditDetails(false)}
              dialogClassName="modal-90w"
              aria-labelledby="example-custom-modal-styling-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                  Edit Product
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form noValidate onSubmit={(e: any) => fromSubmit(e)}>
                 
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                        defaultValue={(rowID?.title) as any}
                        onChange={(e: any) => {
                          onChange(e)
                        }}
                      />
                    </Form.Group>
                 

                </Form>
              </Modal.Body>
              <Modal.Footer> <Button onClick={fromSubmit}>Submit form</Button></Modal.Footer>
            </Modal>
          </>}
      </Container>
    </div>

  )
}

const mapStateToProps = (state: any) => {
  return ({
    data: state.data,
  })

}


export default connect(mapStateToProps, { setData, editData })(Products);
