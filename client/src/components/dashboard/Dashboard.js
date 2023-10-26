import React from 'react'
import  Chart from './Chart';

function Dashboard() {
  return (
    <div className='main'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4 mt-5 g-3'>
            <div className="card" >
              <div className="card-body ">
                <div className='d-flex justify-content-around'>
                  <div style={{width:"200px"}}>
                    <h5 className="">Total No. of Leads</h5>
                    <h2 className='p-1'>45</h2>
                  </div>
                  <div>
                    <select >
                      <option>Daily</option>
                      <option>Hello</option>
                      <option>Hello</option>
                    </select>
                  </div>
                  <h3>img</h3>
                </div>
                <div className='mt-3'>
                  <div className='d-flex justify-content-between'>
                    <p>Today target</p> <p>10/12</p>
                  </div>
                  <div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar bg-warning" style={{ width: "25%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-4 mt-5 g-3'>
            <div className="card" >
              <div className="card-body ">
                <div className='d-flex justify-content-around'>
                  <div style={{width:"200px"}}> 
                    <h5 className="">Deals Closed</h5>
                    <h2 className='p-1'>45</h2>
                  </div>
                  <div>
                    <select >
                      <option>This Month</option>
                      <option>Hello</option>
                      <option>Hello</option>
                    </select>
                  </div>
                  <h3>img</h3>
                </div>
                <div className='mt-3'>
                  <div className='d-flex justify-content-between'>
                    <p>Today target</p> <p>10/12</p>
                  </div>
                  <div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar bg-warning" style={{ width: "50%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-4 mt-5 g-3'>
            <div className="card" >
              <div className="card-body ">
                <div className='d-flex justify-content-around'>
                  <div style={{width:"200px"}}>
                    <h5 className="">Revenue</h5>
                    <h2 className='p-1'>45</h2>
                  </div>
                  <div>
                    <select >
                      <option>This Month</option>
                      <option>Hello</option>
                      <option>Hello</option>
                    </select>
                  </div>
                  <h3>img</h3>
                </div>
                <div className='mt-3'>
                  <div className='d-flex justify-content-between'>
                    <p>Today target</p> <p>10/12</p>
                  </div>
                  <div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar bg-warning" style={{ width: "75%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container mt-3'>
        <div className='row'>
          <div className='col-md-8 bgwhite p-2 card'>
            <div >
              <h5>Projects Overview</h5>
              <Chart/>

              <div className="d-flex justify-content-around ">
                <h5 className='text-center'>
                  Total No, of Projects <br /> 58
                </h5>
                <h5 className='text-center'>
                  Active Projects <br /> 6
                </h5>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='d-flex justify-content-between'>
              <h5>My To-Do</h5>
              <h5>+ Add To DO</h5>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
