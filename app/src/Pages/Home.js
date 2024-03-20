import '../Css/Home/background.css';
import '../Css/nav.css';
import '../Css/Admin/Admin.css';
import '../Css/Home/home-body.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Admin from '../images/4216248-200-1.png'
import NavImg from '../images/navbar-img.png'
import { React } from 'react'



// Import the functions you need from the SDKs you need

//for creating a new collection with a random gen name
/*const orderscollection = collection(firestore, 'orders');
async function addNew(){
    const newDoc = await addDoc(orderscollection, {
        customer: 'Arther',
        drink: 'Latte',
        total_cost: (100 + Math.floor(Math.random() * 400)) / 100
    })
}
addNew()*/

//For fetching
/*async function read() {
    const mySnapshot = await getDoc(itemOfUse);
    if(mySnapshot.exists()){
        const docData = mySnapshot.data();
        console.log(`My data is ${JSON.stringify(docData)}`)
    }
}
read()*/

//For fetching multiple items

/*async function queryForDocuments() {
    const customerOrdersQuery = query(
        collection(firestore, 'dailySpecial')
    )

    const querySnap = await getDocs(customerOrdersQuery);
    const allDocs = querySnap.forEach((snap) => {
        console.log(`doc ${snap.id} contains ${JSON.stringify(snap.data())}`)
    });
}
queryForDocuments()*/





function Home() {
    



        function handleClick(){
            const nav = document.getElementById('Nav');

            nav.classList.toggle('show');
        }

        function adminClick(){
            const Admin = document.getElementById('Admin-cont');

            Admin.classList.toggle('show');
        }

        function handleSubmit(e){
            e.preventDefault();
            let username = document.getElementById('username').value;
            let password = document.getElementById('password').value;
            let adminAccess = false

            
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
                    adminAccess = true;
                    console.log(adminAccess);

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

  return (
    <div className="App">
        <header className="App-header container-fluid">
            <div className='row'>
                <div className="container nav">              
                    <div className="logo-nav">     
                        <a href="./Home" className="logo1">
                            <h4 className='text-white'>Slabmen</h4>
                        </a>   
                    </div> 
                    <img src={NavImg} alt='nav-img' className='navbar-tog' id='navbar-tog' onClick={handleClick} />  
                    <nav className='Nav' id='Nav'>              
                            <div className='col-1.5'>
                                <li className="nav-item">
                                    <a className="nav-link active text-white" href="./About">ABOUT</a>
                                </li>
                            </div>
                            <div className='col-1.5'>
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="./Inventory">INVENTORY</a>
                                </li>
                            </div>
                            <div className='col-1.5'>
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="./Contact">CONTACT</a>
                                </li>
                            </div>
                            <div className='col-1.5'>
                                <li className="nav-item">
                                    <img src={Admin} alt='Admin' className='Admin' onClick={adminClick} />
                                </li>
                            </div>
                    </nav>
                </div>
            </div>
        </header>
        <div className='body container-fluid'>
            <div className='row front-h'>
                <div className='col-xxl-7 col-xl-6 col-lg-6 col-sm-12 col-12'>
                    <div className='front-p-cont'>
                        <p className='front-p'>Slabmen Design</p>
                    </div>
                </div>
                
                <div className='col-xxl-5 col-xl-5 col-lg-4 col-sm-2 col-2'>
                    <div className='side-p-cont'>
                        <p className='side-p'>Do it Once, Do it Right, Make it Last</p>
                    </div>
                </div>
            </div>
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
        </div>

    </div>
  );
}

export default Home;
