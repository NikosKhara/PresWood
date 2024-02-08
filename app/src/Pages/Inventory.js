import '../Css/Inventory/Inventory-backgrounds.css';
import '../Css/nav.css';
import '../Css/Inventory/Inventory.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Vova from '../images/VOVA.png'
import Admin from '../images/4216248-200-1.png'
import NavImg from '../images/navbar-img.png'
import React, { useState, useEffect } from 'react';

function Inventory() {

        window.addEventListener('resize', () => {
            let w = window.innerWidth;
            let i = document.getElementById('i');

            if(w < 1500){
                i.classList.add('auto');
            }
        })

        function handleClick(){
            const nav = document.getElementById('Nav');

            nav.classList.toggle('show');
        }

        function adminClick(){
            const Admin = document.getElementById('Admin-cont');
            Admin.classList.toggle('show');

            const upload = document.getElementById('upload-files');
            upload.classList.remove('show');

            const inv = document.getElementById('inv');
            inv.classList.toggle('show')
        }

        const [adminAccess, setAdminAccess] = useState(false);

        function handleSubmit(e){
            e.preventDefault();
            let username = document.getElementById('username').value;
            let password = document.getElementById('password').value;

            
            fetch('http://localhost:3500/authenticate', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Admin Access Granted');
                    setAdminAccess(true)

                    username = ' ';
                    password = ' ';
                    const Admin = document.getElementById('Admin-cont');
                    Admin.classList.toggle('show');

                    const upload = document.getElementById('upload-files');
                    upload.classList.toggle('show');

                } else {
                    alert('Admin Access Not Granted');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }

        useEffect(() => {
            console.log(adminAccess);
            // Any other actions you want to perform after adminAccess has been updated
          }, [adminAccess]);

        const [items, setItems] = useState([]);
        const [soldItems, setSoldItems] = useState([]);

        const handleButtonClick = (item) => {
            
          };

          useEffect(() => {
            // Fetch uploaded items from the server
            fetch('http://localhost:5000/soldUploadedItems')
                .then(response => response.json())
                .then(data => setSoldItems(data))
                .catch(error => console.error('Error fetching uploaded items:', error));
          }, []);

          const renderSoldItems = (soldItem) => {

            return(
                <div className='col-xl-4 col-md-6 col-12 mx-auto let'>
                    <div key={soldItem.fileName}>
                        <div style={{width:'fit-content'}} className='mx-auto let' >
                            <img src={`/uploads/${soldItem.fileName}`} alt={soldItem.fileName} className='img-inventory' />
                        </div>
                        <p className='text-white mx-auto inv-text inv-first-t let' style={{width:'fit-content'}}>{soldItem.namePrice}</p>
                        <p className='text-white mx-auto inv-text let' style={{width:'fit-content'}}>Quantity: {soldItem.quantity}</p>   
                    </div>
                </div>      
            )} 
          

          useEffect(() => {
            // Fetch uploaded items from the server
            fetch('http://localhost:5500/uploadedItems')
                .then(response => response.json())
                .then(data => setItems(data))
                .catch(error => console.error('Error fetching uploaded items:', error));
          }, []);

        const renderListDining = (item) => {

            if (item.typeOfFile === 'Dining Table'){
                return(
                    <div className='col-xl-4 col-md-6 col-12 mx-auto'>
                        <form onSubmit={handleButtonClick} encType="multipart/form-data">
                            <div key={item.fileName}>
                                <div style={{width:'fit-content'}} className='mx-auto let' >
                                    <img src={`/uploads/${item.fileName}`} alt={item.fileName} name='myFile' className='img-inventory' />
                                </div>
                                <p className='text-white mx-auto inv-text inv-first-t let' style={{width:'fit-content'}} name='namePrice'>{item.namePrice}</p>
                                <p className='text-white mx-auto inv-text let' style={{width:'fit-content'}} name='quantity'>Quantity: {item.quantity}</p>   
                                {/* Conditionally render the button based on adminAccess */}
                                {adminAccess && (
                                    <div style={{width:'fit-content'}} className='mx-auto let' >
                                        <button className='btn-sold mx-auto' type='submit'>Move To Sold</button>
                                    </div>  
                                )}
                            </div>
                        </form>
                    </div>      
                )
            }
            
        }

        const renderListCoffee = (item) => {

            if (item.typeOfFile === 'Coffee Table'){
                return(
                    <div className='col-xl-4 col-md-6 col-12 mx-auto let'>
                        <div key={item.fileName}>
                            <div style={{width:'fit-content'}} className='mx-auto let' >
                                <img src={`/uploads/${item.fileName}`} alt={item.fileName} className='img-inventory' />
                            </div>
                            <p className='text-white mx-auto inv-text inv-first-t let' style={{width:'fit-content'}}>{item.namePrice}</p>
                            <p className='text-white mx-auto inv-text let' style={{width:'fit-content'}}>Quantity: {item.quantity}</p>   
                            {/* Conditionally render the button based on adminAccess */}
                            {adminAccess && (
                                <div style={{width:'fit-content'}} className='mx-auto let' >
                                    <button className='btn-sold mx-auto' onClick={() => handleButtonClick(item)} >Move To Sold</button>
                                </div>  
                            )}
                        </div>
                    </div>      
                )
            }
            
        } 


        const renderListCutting = (item) => {

            if (item.typeOfFile === 'Cutting Board'){
                return(
                    <div className='col-xl-4 col-md-6 col-12 mx-auto let'>
                        <div key={item.fileName}>
                            <div style={{width:'fit-content'}} className='mx-auto let' >
                                <img src={`/uploads/${item.fileName}`} alt={item.fileName} className='img-inventory' />
                            </div>
                            <p className='text-white mx-auto inv-text inv-first-t let' style={{width:'fit-content'}}>{item.namePrice}</p>
                            <p className='text-white mx-auto inv-text let' style={{width:'fit-content'}}>Quantity: {item.quantity}</p>   
                            {/* Conditionally render the button based on adminAccess */}
                            {adminAccess && (
                                <div style={{width:'fit-content'}} className='mx-auto let' >
                                    <button className='btn-sold mx-auto' onClick={() => handleButtonClick(item)} >Move To Sold</button>
                                </div>  
                            )}
                        </div>
                    </div>      
                )
            }
            
        } 


        const renderListSlab = (item) => {

            if (item.typeOfFile === 'Slab'){
                return(
                    <div className='col-xl-4 col-md-6 col-12 mx-auto let'>
                        <div key={item.fileName}>
                            <div style={{width:'fit-content'}} className='mx-auto let' >
                                <img src={`/uploads/${item.fileName}`} alt={item.fileName} className='img-inventory' />
                            </div>
                            <p className='text-white mx-auto inv-text inv-first-t let' style={{width:'fit-content'}}>{item.namePrice}</p>
                            <p className='text-white mx-auto inv-text let' style={{width:'fit-content'}}>Quantity: {item.quantity}</p>   
                            {/* Conditionally render the button based on adminAccess */}
                            {adminAccess && (
                                <div style={{width:'fit-content'}} className='mx-auto let' >
                                    <button className='btn-sold mx-auto' onClick={() => handleButtonClick(item)} >Move To Sold</button>
                                </div>  
                            )}
                        </div>
                    </div>      
                )
            }
            
        } 

  return (
    <div className="App container-fluid">
        <div className='container-fluid header-body i' id='i'>
            <div className='container-fluid header-bg'>
                <header className="App-header">
                    <div className='row'>
                        <div className="container nav">              
                            <div className="logo-nav">     
                                <a href="./Home" className="logo1">
                                    <img className="logo" src={Vova} alt='logo' />
                                </a>   
                            </div> 
                            <img src={NavImg} alt='nav-img' className='navbar-tog' id='navbar-tog' onClick={handleClick} />  
                            <nav className='Nav' id='Nav'>              
                                    <div className='col-xxl-1.5'>
                                        <li className="nav-item">
                                            <a className="nav-link active text-white" href="./About">ABOUT</a>
                                        </li>
                                    </div>
                                    <div className='col-xxl-1.5'>
                                        <li className="nav-item">
                                            <a className="nav-link text-white" href="./Inventory">INVENTORY</a>
                                        </li>
                                    </div>
                                    <div className='col-xxl-1.5'>
                                        <li className="nav-item">
                                            <a className="nav-link text-white" href="./Contact">CONTACT</a>
                                        </li>
                                    </div>
                                    <div className='col-xxl-1.5'>
                                        <li className="nav-item">
                                            <img src={Admin} alt='Admin' className='Admin' onClick={adminClick} />
                                        </li>
                                    </div>
                            </nav>
                        </div>
                    </div>
                </header>
            </div>
            <div className='container-fluid main-head'>
                <div className='Admin-cont mx-auto' id='Admin-cont'>
                        <div className='col-12 mx-auto'>
                                <form className='form-Admin mx-auto'>
                                    <div className='col-md-7 col-11 mx-auto'>
                                        <div className='row'>
                                            <div className='mx-auto admin-ac'>
                                                <h1 className='text-white Admin-acc'>ADMIN ACCESS</h1>
                                            </div>
                                            <div className='col-100'>
                                                <input
                                                    name="Username"
                                                    type="text"
                                                    id="username"
                                                    autoComplete="off"
                                                    placeholder="Username"
                                                    className="contact-form-input"
                                                    style={{display:'inline-flex', flexWrap:'nowrap'}}
                                                />
                                            </div>
                                            <div className='col-100'>
                                                <input
                                                    name="Password"
                                                    type="text"
                                                    id="password"
                                                    autoComplete="off"
                                                    placeholder="Password"
                                                    className="contact-form-input"
                                                    style={{display:'inline-flex', flexWrap:'nowrap'}}
                                                />
                                            </div>
                                            <div className='col-100'>
                                                <input type="submit" className="form-submit-btn" id="btn" value="Access" onClick={handleSubmit}></input>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                
                            </div>
                        </div>
                    <div className='upload-files mx-auto' id='upload-files'>
                        <div className='col-12 mx-auto'>
                            <form action="http://localhost:5500/upload" method="post" encType="multipart/form-data" id='uploadItem' >
                                <div className='col-md-7 col-11 mx-auto'>
                                    <div className='row'>
                                        <div className='col-100'>
                                            <input type='number' placeholder='Quantity' name='quantity' className='Quantity text-white'  />
                                        </div>
                                        <div className='col-100'>
                                            <input type='text' placeholder='Ex: Oak Table - $60' name='namePrice' className='name-price text-white'  />
                                        </div>
                                        <div className='col-100'>
                                            <input type="file" name="myFile" className='file text-white' id='file' />
                                            <label htmlFor='file' className='file-label text-white'>Select Image</label>
                                        </div>
                                        <div className='col-100'>
                                            <select name='typeOfItem' id='typeOfItem' className='Quantity text-white' form='uploadItem' required>
                                                <option value={'Dining Table'} className='text-black'>Dining Table</option>
                                                <option value={'Coffee Table'} className='text-black'>Coffee Table</option>
                                                <option value={'Cutting Board'} className='text-black'>Cutting Board</option>
                                                <option value={'Slab'} className='text-black'>Slab</option>
                                            </select>
                                        </div>
                                        <div className='col-100'>
                                            <button type="submit" className='file-upload' >Upload</button> 
                                        </div>
                                    </div>
                                </div>
                            </form>
                            
                        </div>
                    </div>                
                <div className='row' id='inv'>     
                    <div className='col-xxl-12'>
                        <p className='text-white main-h mx-auto'>Inventory</p>
                    </div>
                </div>               
            </div> 
        </div>
        <div className='i-body container-fluid'>
            <div className='inventory'>
                <div className='row'>
                    <div className='col-12'>
                        <h1 className='text-white mx-auto' style={{width:'fit-content', paddingBottom:2 + '%'}}>Available Items</h1>
                    </div>
                </div>
                
                
                <div className='row mx-auto'>  
                    <div className='row'>
                        <h4 className='mx-auto text-white' style={{width:'fit-content'}}>Dining Tables</h4>
                    </div>
                    {items.map(renderListDining)}
                </div>
                <div className='row mx-auto' style={{marginTop:2 + '%'}}>  
                    <div className='row'>
                        <h4 className='mx-auto text-white' style={{width:'fit-content'}}>Coffee Tables</h4>
                    </div>
                    {items.map(renderListCoffee)}
                </div>
                <div className='row mx-auto' style={{marginTop:2 + '%'}}>  
                    <div className='row'>
                        <h4 className='mx-auto text-white' style={{width:'fit-content'}}>Cutting Boards</h4>
                    </div>
                    {items.map(renderListCutting)}
                </div>
                <div className='row mx-auto' style={{marginTop:2 + '%'}}>  
                    <div className='row'>
                        <h4 className='mx-auto text-white' style={{width:'fit-content'}}>Slabs</h4>
                    </div>
                    {items.map(renderListSlab)}
                </div>
            </div>
            <div className='Sold'>
                <div className='row mx-auto'>
                    <div className='col-12'>
                        <h1 className='text-white mx-auto' style={{width:'fit-content'}}>Sold items</h1>
                    </div>
                </div>  
                {soldItems.map(renderSoldItems)}
            </div>
            
        </div>
    </div>
  );

}

export default Inventory;