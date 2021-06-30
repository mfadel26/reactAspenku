import React from 'react';
import { Modal, Button, Row, Col, Image } from 'antd';
export default function Dialog(props) {
  const { open, onModalClose, data } = props;
  return (
    <div>
      <Modal
        title='Detail Produk'
        centered
        visible={open}
        onOk={() => onModalClose(false)}
        onCancel={() => onModalClose(false)}
        width={1000}>
        <Row>
          <Col span={12}>
            <div className='bookmodal'>
              <Image src='https://i.imgur.com/2DsA49b.jpg' />
            </div>
          </Col>
          <Col span={12}>
            <h6 className='mob-text'>
              Nama : &nbsp;<span> {data.name} </span>
            </h6>
            <h6 className='mob-text'>
              Harga: &nbsp;
              <span>
                {' '}
                {data.currency}&nbsp;{data.sell_price}{' '}
              </span>
            </h6>
            <h6 className='mob-text'>
              Min Order: &nbsp;<span> {data.min_qty_order} </span>
            </h6>
            <h6 className='mob-text'>
              Store: &nbsp;<span>{data?.SpreeStore?.store_name} </span>
            </h6>
            <h6
              className='mob-text'
              dangerouslySetInnerHTML={{ __html: data.description }}></h6>
            <div />
            <Button type='primary' shape='round'>
              <a href='https://www.instagram.com/fadelpratama26/'>Share</a>
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}
