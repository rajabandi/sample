import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { setData } from '../reducers/actions';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';

const ViewDetails = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [details, setDetails] = useState(props.data)

  useEffect(() => {
    setDetails(props.data.filter(x => x._id == searchParams.get('id')))
  }, [props.data, searchParams])

  return (
    <div key={props.data._id}>
      {details.map(x =>
        <ListGroup >
         <ListGroup.Item>Product Name:  {x.title}</ListGroup.Item>
          <ListGroup.Item>Price:  {x.price}</ListGroup.Item>
          <ListGroup.Item>Product Name:  {x.description}</ListGroup.Item>
          <ListGroup.Item>Rating:  {x.rating}</ListGroup.Item>
          <ListGroup.Item>Category:  {x.category}</ListGroup.Item>
          <ListGroup.Item>Old Price:  {x.oldPrice}</ListGroup.Item>
        </ListGroup>
      )}

      <ListGroup>
        <ListGroup.Item><Link to={'/'}>Back to Products</Link></ListGroup.Item>
      </ListGroup>

    </div>
  )
}

const mapStateToProps = state => {
  return ({
    data: state.data,
  })

}

export default connect(mapStateToProps, { setData })(ViewDetails);