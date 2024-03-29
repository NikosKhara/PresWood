import '../Css/Inventory/Inventory-backgrounds.css';
import '../Css/nav.css';
import '../Css/Inventory/Inventory.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Admin from '../images/4216248-200-1.png'
import NavImg from '../images/navbar-img.png'
import React, { useState, useEffect } from 'react';




import { initializeApp } from "firebase/app";
import { query, collection, getFirestore, getDocs, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: 'vovawood-9676c',
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)




function Inventory() {

        window.addEventListener('resize', () => {
            const ad = document.getElementById('Admin-cont');
            let w = window.innerWidth;
            if(w < 1500 && ad.classList.contains('show')){  
                let i = document.getElementById('i');
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
        useEffect( () => {

            async function getallItems() {
                const getItems = query(
                    collection(db, 'items')
                )
            
                const querySnap = await getDocs(getItems);
                const allDocs = querySnap.docs;
                
                setItems(allDocs)
                console.log(allDocs)
            }

            getallItems()

        }, [])

        const handleButtonClick = async (item) => {
            
            const itemOfUse = doc(db, `items/${item.id}`);
            const docData = {
                isSold: true,
            };

            await setDoc(itemOfUse, docData, { merge: true });

            


            const updateditems = items.map((e) => {
                if (e.id === item.id){
                    e.isSold = true;
                }
                return e;
            })
            setItems(updateditems)
          };



          const renderSoldItems = (item) => {

            if(item.get('isSold') === true){
                return(
                    <div className='col-xl-4 col-md-6 col-12 mx-auto let'>
                        <div key={item.get('file')}>
                            <div style={{width:'fit-content'}} className='mx-auto let' >
                                <img src={item.get('file')} alt={item.get('namePrice')} className='img-inventory' />
                            </div>
                            <p className='text-white mx-auto inv-text inv-first-t let' style={{width:'fit-content'}}>{item.get('namePrice')}</p>
                            <p className='text-white mx-auto inv-text let' style={{width:'fit-content'}}>Quantity: <b style={{color:'black'}}>SOLD</b></p>   
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

        const renderListDining = (item) => {
            if (item.get('typeOfItem') === 'Dining Table' && item.get('isSold') === false){
                return(
                    <div className='col-xl-4 col-md-6 col-sm-8 col-12 mx-auto let'>
                        <div key={item.get('file')}>
                            <div style={{width:'fit-content'}} className='mx-auto let' >
                                <img src={item.get('file')} alt={item.get('namePrice')} className='img-inventory' />
                            </div>
                            <p className='text-white mx-auto inv-text inv-first-t let' style={{width:'fit-content'}}>{item.get('namePrice')}</p>
                            <p className='text-white mx-auto inv-text let' style={{width:'fit-content'}}>Quantity: {item.get('quantity')}</p>   
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

        const renderListCoffee = (item) => {
            if (item.get('typeOfItem') === 'Coffee Table' && item.get('isSold') === false){
                return(
                    <div className='col-xl-4 col-md-6 col-12 mx-auto let'>
                        <div key={item.get('file')}>
                            <div style={{width:'fit-content'}} className='mx-auto let' >
                                <img src={item.get('file')} alt={item.get('namePrice')} className='img-inventory' />
                            </div>
                            <p className='text-white mx-auto inv-text inv-first-t let' style={{width:'fit-content'}}>{item.get('namePrice')}</p>
                            <p className='text-white mx-auto inv-text let' style={{width:'fit-content'}}>Quantity: {item.get('quantity')}</p>   
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

            if (item.get('typeOfItem') === 'Cutting Board' && item.get('isSold') === false){
                return(
                    <div className='col-xl-4 col-md-6 col-12 mx-auto let'>
                        <div key={item.get('file')}>
                            <div style={{width:'fit-content'}} className='mx-auto let' >
                                <img src={item.get('file')} alt={item.get('fileName')} className='img-inventory' />
                            </div>
                            <p className='text-white mx-auto inv-text inv-first-t let' style={{width:'fit-content'}}>{item.get('namePrice')}</p>
                            <p className='text-white mx-auto inv-text let' style={{width:'fit-content'}}>Quantity: {item.get('quantity')}</p>   
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

            if (item.get('typeOfItem') === 'Slab' && item.get('isSold') === false){
                return(
                    <div className='col-xl-4 col-md-6 col-12 mx-auto let'>
                        <div key={item.get('file')}>
                            <div style={{width:'fit-content'}} className='mx-auto let' >
                                <img src={item.get('file')} alt={item.get('namePrice')} className='img-inventory' />
                            </div>
                            <p className='text-white mx-auto inv-text inv-first-t let' style={{width:'fit-content'}}>{item.get('namePrice')}</p>
                            <p className='text-white mx-auto inv-text let' style={{width:'fit-content'}}>Quantity: {item.get('quantity')}</p>   
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
                                    <h4 className='text-white'>Slabmen</h4>
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
                            <form action="http://localhost:5500/upload" method="post" encType="multipart/form-data" id='uploadItem'>
                                <div className='col-md-7 col-11 mx-auto'>
                                    <div className='row'>
                                        <div className='col-100'>
                                            <input type='text' placeholder='Quantity' name='quantity' className='Quantity text-white' id='quantity'  />
                                        </div>
                                        <div className='col-100'>
                                            <input type='text' placeholder='Ex: Oak Table - $60' name='namePrice' className='name-price text-white' id='namePrice'  />
                                        </div>
                                        <div className='col-100'>
                                            <input type="file" className="input file text-white" name='myFile' id='file' />
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
                                            <button type="submit" className='file-upload' value={"Upload File"}>Upload</button> 
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
                        <h4 className='mx-auto' style={{width:'fit-content', color:'#dcc28b'}}>Dining Tables</h4>
                    </div>
                    {items.map(renderListDining)}
                </div>
                <div className='row mx-auto' style={{marginTop:2 + '%'}}>  
                    <div className='row'>
                        <h4 className='mx-auto' style={{width:'fit-content', color:'#dcc28b'}}>Coffee Tables</h4>
                    </div>
                    {items.map(renderListCoffee)}
                </div>
                <div className='row mx-auto' style={{marginTop:2 + '%'}}>  
                    <div className='row'>
                        <h4 className='mx-auto' style={{width:'fit-content', color:'#dcc28b'}}>Cutting Boards</h4>
                    </div>
                    {items.map(renderListCutting)}
                </div>
                <div className='row mx-auto' style={{marginTop:2 + '%'}}>  
                    <div className='row'>
                        <h4 className='mx-auto' style={{width:'fit-content', color:'#dcc28b'}}>Slabs</h4>
                    </div>
                    {items.map(renderListSlab)}
            </div>
            </div>
            <div className='Sold'>
                <div className='row mx-auto'>
                    <div className='row'>
                        <div className='col-12'>
                            <h1 className='mx-auto text-white' style={{width:'fit-content'}}>Sold items</h1>
                        </div>
                    </div>
                    {items.map(renderSoldItems)}
                </div>  
                
        </div>
            
        </div>
    </div>
  );

}

export default Inventory;