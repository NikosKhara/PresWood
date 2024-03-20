import '../Css/Contact/Contact-backgrounds.css';
import '../Css/nav.css';
import '../Css/Contact/Contact.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Admin from '../images/4216248-200-1.png'
import NavImg from '../images/navbar-img.png'

function Contact() {

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

        function addHR(){
            return (<hr></hr>)
        }

  return (
    <div className="App container-fluid">
        <div className='container-fluid header-body d'>
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
            <div className='container-fluid main-header'>
                <div className='row'>
                    <div className='col-xxl-12'>
                        <p className='text-white main-h-contact mx-auto' style={{fontFamily:'Futura PT'}}>CONTACT</p>
                    </div>
                </div>
            </div> 
        </div>
        <div className='contact-body container-fluid'>
            <div className='Admin-cont mx-auto for-contact' id='Admin-cont'>
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
                        {addHR()}
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
                        {addHR()}
                    </div> 
                <div className="form-wrapper">
                    <form className="contact-form" id="contact-form" action="https://api.web3forms.com/submit" method="POST" style={{paddingBottom:3 + '%', paddingTop:2 + '%'}} >
                        <input type="hidden" name="access_key" value="b5a41486-2b32-4e9b-95c4-b0a0e6be0c3a" />
                        <div className='row'>
                            <div className='col-xxl-2 col-xl-1 col-lg-1 col-0'></div>
                            <div className='col-xxl-3 col-lg-4 col-12 mx-auto'>
                                <div className='row mx-auto'>
                                    <div className='col-12'>
                                        <input
                                            name="Subject"
                                            type="text"
                                            id="subject"
                                            autoComplete="off"
                                            placeholder="Subject"
                                            className="contact-form-input"
                                            style={{display:'inline-flex', flexWrap:'nowrap'}}
                                        />
                                    </div>
                                    <div className='col-12'>
                                        <textarea
                                            name="message"
                                            id="message"
                                            className="contact-form-input message"
                                            placeholder="Message"
                                            style={{height:130 + 'px'}}>
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-2 col-lg-1 col-0'></div>
                            <div className='col-xxl-3 col-lg-4 col-12 mx-auto'>
                                <div className='row mx-auto'>
                                    <div className='col-lg-12 col-sm-6 col-12'>
                                        <input
                                            name="firstName"
                                            type="text"
                                            id="first_name"
                                            autoComplete="off"
                                            placeholder="First Name"
                                            className="contact-form-input"
                                            style={{display:'inline-flex', flexWrap:'wrap'}}
                                        />
                                    </div>
                                    <div className='col-lg-12 col-sm-6 col-12'>
                                        <input
                                            name="lastName"
                                            type="text"
                                            id="last_name"
                                            autoComplete="off"
                                            placeholder="Last Name"
                                            className="contact-form-input"
                                            style={{display:'inline-flex', flexWrap:'wrap'}}
                                        />
                                    </div>
                                
                                    <div className='col-12'>
                                        <input
                                            name="Email"
                                            type="text"
                                            id="email"
                                            autoComplete="off"
                                            placeholder="Email"
                                            className="contact-form-input"
                                            style={{display:'inline-flex', flexWrap:'wrap'}}
                                        />
                                    </div>
                                </div>
                                <div className='col-12 mx-auto'>
                                    <div className='row mx-auto'>
                                        <div className='col-sm-4 col-12'>
                                            <input type="submit" className="form-submit-btn" id="btn" value="Send"></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=' col-xl-2 col-lg-1 col-0'></div>
                        </div>              
                    </form>
                    <div className='row'>
                        <div className='col-lg-8 col-0 mx-auto hidden-c'>
                            <p className='text-white hidden-contact mx-auto'>For inquiries about custom items and how we can work with you on your next project, 
                            please fill in the form above or email at: vladimir.kharabora@gmail.com</p>
                        </div>   
                    </div>
                    <div className='row'>
                        <div className='col-xl-12'>
                            <p className='text-white copyright mx-auto'>LLC © Vova Woodworking 2024</p>
                            
                        </div>
                    </div>
            </div>
            
        </div>
    </div>   
  );
}

export default Contact;