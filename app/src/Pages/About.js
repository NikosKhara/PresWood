import '../Css/About/about-backgrounds.css';
import '../Css/nav.css';
import '../Css/About/about.css';
import '../Css/Admin/Admin.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Admin from '../images/4216248-200-1.png'
import NavImg from '../images/navbar-img.png'
import meetTheOwner from '../images/356392192_1032486871131406_1303385691663870325_n-1.png'

function About() {

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
    <div className="App container-fluid">
        <div className='container-fluid header-body c'>
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
                        <p className='text-white main-h mx-auto'>ABOUT</p>
                    </div>
                </div>
            </div> 
        </div>
        <div className='about-body container-fluid'>
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
            <div className='row about mx-auto'>
                <div className='col-xl-4 col-lg-0'>
                    <p className='about-p-1 text-white'>
                    Slabmen Design, located in Northeast Georgia is an idea that became a desire. A desire that  slowly became a reality.
                    The idea stemmed from an ability to not only work with your hands but enjoying the aspect of grabbing rough lumber and 
                    creating conversation starters in humble abodes.. The desire is rooted in wanting a home-based business that will finically 
                    meet obligations to support an ever growing family.. The reality is the products listed for your viewing and purchasing pleasure.
                    </p>
                </div>
                <div className='col-xl-1 col-xxl-1 col-lg-12 mx-auto'>
                    <p className='about-p-hidden text-white mx-sm-auto'>
                    Slabmen Design, located in Northeast Georgia is an idea that became a desire. A desire that  slowly became a reality.
                    The idea stemmed from an ability to not only work with your hands but enjoying the aspect of grabbing rough lumber and 
                    creating conversation starters in humble abodes.. The desire is rooted in wanting a home-based business that will finically 
                    meet obligations to support an ever growing family.. The reality is the products listed for your viewing and purchasing pleasure.
                    Since 2022, I have been chainsaw milling my own lumber. This process even though time consuming and difficult has yielded another s
                    atisfaction on seeing a downed tree at the end of its life span be resurrected for generations more.
                    Thank you again for joining us on this family endeavor and contributing to the success of locally owned and handmade.
                    </p>
                </div>
                <div className='col-xl-6 col-lg-0'>
                    <p className='about-p-2 text-white'>
                    Since 2022, I have been chainsaw milling my own lumber. This process even though time consuming and difficult has 
                    yielded another satisfaction on seeing a downed tree at the end of its life span be resurrected for generations more.
                    Thank you again for joining us on this family endeavor and contributing to the success of locally owned and handmade.
                    </p>
                </div>
            </div>
            <div className='row meet-the-owner-h'>
                <div className='col-xl-12'>
                    <p className='meet-the-owner-head text-white mx-auto'>
                        MEET THE OWNER
                    </p>
                </div>
            </div>
            <div className='row meet-the-owner'>
                <div className='col-xl-4 col-lg-12'>
                    <p className='meet-the-owner-p text-white mx-lg-auto'>
                        My name is Vlad, it is an honor to have you along for this journey. In 2019 this endeavor began with my beautiful 
                        wife Agnessa asking for us to purchase or if I can build a coffee table to supplement our new couch. With some basic 
                        hand tools and a lot of emotional support a simple coffee table was built that drew attention from family and visitors. 
                        An attached garage became filled with sawdust more and more as requests by the better half for a kitchen island, barn door 
                        entertainment center, dining table, cutting boards and end pieces started filing in. The learning experience along with 
                        imagination started bubbling even more as toddler sons would want to spend hours in the garage with dad.
                        With Covid upon us and lumber prices rising another opportunity was presented for limited weekend time. Since 2022, I have 
                        been chainsaw milling my own lumber. This process even though time consuming and difficult has yielded another satisfaction 
                        on seeing a downed tree at the end of its life span be resurrected for generations more.
                        Thank you again for joining us on this family endeavor and contributing to the success of locally owned and handmade.
                    </p>
                </div>
                <div className='col-xl-4 col-xxl-2 col-lg-0'></div>
                <div className='col-xl-4 col-lg-6 col-md-7 col-10 mx-xl-0 mx-auto'>
                    <img src={meetTheOwner} alt='Meet The Owner' className='meet-the-owner-img mx-auto' />
                </div>
            </div>
            <div className='row'>
                <div className='col-xl-12'>
                    <p className='text-white copyright mx-auto'>LLC © Vova Woodworking 2024</p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default About;