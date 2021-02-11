import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/ProductRating';
import products from '../products2';

const ProductScreen = ({ match }) => {
  const product = products.find((p)=> p._id === match.params.id);
  console.log(product)
  return (
    <>
      <Row>
        <Col md={6}>
          <Image src={product.images[0].source} fluid/>
        </Col>
        <Col md={6}>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur quod molestias quidem sed velit dolores voluptatibus qui, vitae inventore quaerat facilis ex ad fugit? Corrupti voluptatibus consequatur accusamus dicta rem, pariatur consequuntur iure dolorem debitis nesciunt nemo delectus sed voluptates ipsa quae quaerat dolorum neque sapiente, corporis ad optio iste quod asperiores illum. Vero ipsa doloribus repellat consectetur fugit? Hic nisi, mollitia impedit aliquid sunt, ratione deserunt distinctio vitae fugit laudantium doloribus optio veritatis quod quam ipsum sequi reiciendis. Commodi vel quas natus. Et perspiciatis asperiores nam exercitationem ex aperiam nostrum voluptatibus excepturi molestias rem sunt aliquid omnis nesciunt animi veniam accusantium obcaecati, modi enim similique laboriosam repudiandae quis. Perspiciatis sed atque eligendi ipsam, officia quasi asperiores. Error veniam inventore ipsum itaque ad eligendi reiciendis nam aut! Quis maxime odio voluptas consequatur ducimus consectetur, eos incidunt, soluta, sint mollitia inventore quo. Recusandae, est non? Atque sit ex doloremque ea sed dolor quam illum, at doloribus accusamus dolorum facere dolore, mollitia, delectus voluptates provident rem quidem vitae. Voluptatem doloremque fugiat atque cum delectus obcaecati? Quidem exercitationem, corrupti deserunt repudiandae nulla facilis sint repellendus soluta maxime neque fuga? Consectetur, quaerat eius rerum tenetur rem modi vitae perferendis sed mollitia ipsum fugit aspernatur.</p>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen;
