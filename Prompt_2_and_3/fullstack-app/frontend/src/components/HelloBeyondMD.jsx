import logo from '../assets/beyondMD-logo.png'
import './HelloBeyondMD.css'


function HelloBeyondMD() {

    return(
        <div className='hello-container'>
            <h1>Hello</h1>
            <div class="hello-logo">
                <img id="hello-logo" src={logo} alt=""/>
                <h1><span class="dark">BEYOND</span><span class="light">MD</span></h1>
            </div>

        </div>
    )

}

export default HelloBeyondMD