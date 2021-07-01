import React, { useEffect, useState } from 'react';
import './App.css';
import { Button, Image, Input,Skeleton } from 'antd';
import Dialog from './Component/Dialog';
const axios = require('axios');
const { Search } = Input;

function App() {
  const [Data, setData] = useState([]);
  const [openModalAction, setOpenModalAction] = useState(false);
  const [isSkeleton, setSkeleton] = useState(true);
  const [dataModal, setDataModal] = useState({});

  useEffect(() => {
    getData()
  }, []);

const getData = (e) =>{
  setSkeleton(true)
  try {
    axios
      .get(`https://apis-dev.aspenku.com/api/v1/product`, {
        params: { limit: 10, price: { min: 1, max: 1000 }, skip: 0 },
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          authorization: 'Basic QXNwZW5rdTpBc3Blbmt1',
        },
      })
      .then((res) => {
        if (res) {
          let prod = [];
          let promises = [];
          const dt = res.data.data.rows;
          for (var i = 0; i < dt.length; i++) {
            promises.push(
              axios({
                method: 'get',
                url:
                  `https://apis-dev.aspenku.com/api/v3/product/` +
                  dt[i].permalink,
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  authorization: 'Basic QXNwZW5rdTpBc3Blbmt1',
                },
              }).then((response) => {
                prod.push(response.data.data);
              })
            );
          }
          Promise.all(promises).then(() => 
          setData(prod),
          setSkeleton(false)
         )
          .catch(()=>{
            if(e === 'search'){
              setTimeout(() => {   
                setData(prod)
                setSkeleton(false)
              }, 4000) 
            }else{
            setTimeout(() => {
              
              setData(prod)
              setSkeleton(false)
            }, 6000)
          }
          })
        } else {
          console.log('errs');
        }
      })
      .catch(() => {
        console.log('error');
      });
  } catch (error) {
    console.log(error);
  }
}

  const getview = (e) => {
    setOpenModalAction(true);
    setDataModal(e);
  };
  const onModalClose = () => {
    setOpenModalAction(false);
    setDataModal({});
  };

  const onSearch = (v) => {
    if(v !== "" ){
      try {
        axios
        .get(`https://apis-dev.aspenku.com/api/v1/product`, {
          params: { search:v},
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin': '*',
            authorization: 'Basic QXNwZW5rdTpBc3Blbmt1',
          },
        })
          .then((res) => {
            if (res) {
              let prod = [];
              let promises = [];
              const dt = res.data.data.rows;
              for (var i = 0; i < dt.length; i++) {
                promises.push(
                  axios({
                    method: 'get',
                    url:
                      `https://apis-dev.aspenku.com/api/v3/product/` +
                      dt[i].permalink,
                    headers: {
                      'Access-Control-Allow-Origin': '*',
                      authorization: 'Basic QXNwZW5rdTpBc3Blbmt1',
                    },
                  }).then((response) => {
                    prod.push(response.data.data);
                  })
                );
              }
              Promise.all(promises).then(() => 
              setData(prod)
             )
              .catch(()=>{
                setTimeout(() => {
                  setData(prod)
                  setSkeleton(false)
                }, 6000)
              })
            } else {
              console.log('errs');
            }
          })
          .catch(() => {
            console.log('error');
          });
      } catch (error) {
        console.log(error);
      }
    }else{
      getData('search')
    }
  }
 
  return (
   
    <div>
      
      <Dialog
        open={openModalAction}
        onModalClose={onModalClose}
        data={dataModal}
      />
       { isSkeleton === false ?
       
      <div className='container px-4 py-5 mx-auto'>
      <Search placeholder="Search" onSearch={(e)=>onSearch(e)} enterButton />
        <div className='row d-flex justify-content-center'>
          <div className='col-5'>
            <h6 className='mt-1'>Format</h6>
          </div>
          <div className='col-7'>
            <div className='row text-center'>
              <div className='col-4'>
                <h6 className='mt-1'>Product Name</h6>
              </div>
              <div className='col-4'>
                <h6 className='mt-2'>Weight</h6>
              </div>
              <div className='col-4'>
                <h6 className='mt-2'>Price</h6>
              </div>
            </div>
          </div>
        </div>
        {Data.map((e) => {
          return (
            <div className='row d-flex justify-content-center border-top'>
              <div className='col-5'>
                <div className='row d-flex'>
                  <div className='book'>
                    <Image src='https://i.imgur.com/2DsA49b.jpg' />
                  </div>
                  <div className='my-auto flex-column d-flex pad-left'>
                    <Button
                      type='primary'
                      shape='round'
                      onClick={() =>getview(e)}>
                      View
                    </Button>
                  </div>
                </div>
              </div>
              <div className='my-auto col-7'>
                <div className='row text-center'>
                  <div className='col-4'>
                    <h6 className='mob-text'>{e.name}</h6>
                  </div>
                  <div className='col-4'>
                    <h6 className='mob-text'>{e.weight}</h6>
                  </div>
                  <div className='col-4'>
                    <h6 className='mob-text'>${e.sell_price}</h6>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* <div className='row justify-content-center'>
        <div className='col-lg-12'>
          <div className='card'>
            <div className='row'>
              <div className='col-lg-3 radio-group'>
                <div className='row d-flex px-3 radio'>
                  {' '}
                  <img className='pay' src='https://i.imgur.com/WIAP9Ku.jpg' />
                  <p className='my-auto'>Credit Card</p>
                </div>
                <div className='row d-flex px-3 radio gray'>
                  {' '}
                  <img className='pay' src='https://i.imgur.com/OdxcctP.jpg' />
                  <p className='my-auto'>Debit Card</p>
                </div>
                <div className='row d-flex px-3 radio gray mb-3'>
                  {' '}
                  <img className='pay' src='https://i.imgur.com/cMk1MtK.jpg' />
                  <p className='my-auto'>PayPal</p>
                </div>
              </div>
              <div className='col-lg-5'>
                <div className='row px-2'>
                  <div className='form-group col-md-6'>
                    {' '}
                    <label className='form-control-label'>
                      Name on Card
                    </label>{' '}
                    <input
                      type='text'
                      id='cname'
                      name='cname'
                      placeholder='Johnny Doe'
                    />{' '}
                  </div>
                  <div className='form-group col-md-6'>
                    {' '}
                    <label className='form-control-label'>
                      Card Number
                    </label>{' '}
                    <input
                      type='text'
                      id='cnum'
                      name='cnum'
                      placeholder='1111 2222 3333 4444'
                    />{' '}
                  </div>
                </div>
                <div className='row px-2'>
                  <div className='form-group col-md-6'>
                    {' '}
                    <label className='form-control-label'>
                      Expiration Date
                    </label>{' '}
                    <input
                      type='text'
                      id='exp'
                      name='exp'
                      placeholder='MM/YYYY'
                    />{' '}
                  </div>
                  <div className='form-group col-md-6'>
                    {' '}
                    <label className='form-control-label'>CVV</label>{' '}
                    <input type='text' id='cvv' name='cvv' placeholder='***' />{' '}
                  </div>
                </div>
              </div>
              <div className='col-lg-4 mt-2'>
                <div className='row d-flex justify-content-between px-4'>
                  <p className='mb-1 text-left'>Subtotal</p>
                  <h6 className='mb-1 text-right'>$23.49</h6>
                </div>
                <div className='row d-flex justify-content-between px-4'>
                  <p className='mb-1 text-left'>Shipping</p>
                  <h6 className='mb-1 text-right'>$2.99</h6>
                </div>
                <div
                  className='row d-flex justify-content-between px-4'
                  id='tax'>
                  <p className='mb-1 text-left'>Total (tax included)</p>
                  <h6 className='mb-1 text-right'>$26.48</h6>
                </div>{' '}
                <button className='btn-block btn-blue'>
                  {' '}
                  <span>
                    {' '}
                    <span id='checkout'>Checkout</span>{' '}
                    <span id='check-amt'>$26.48</span>{' '}
                  </span>{' '}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      </div>
      :<Skeleton active avatar paragraph={{ rows:12 }} /> }
    </div>
  );
}

export default App;
