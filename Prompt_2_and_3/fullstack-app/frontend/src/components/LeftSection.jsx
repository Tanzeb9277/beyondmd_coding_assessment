import docIcon from '../assets/icons8-document-375.png'
import beyondMDLogo from '../assets/beyondMD.cc3e2659ac0b245af71b.png'



function LeftSection() {

    return(
        <div className="fixed">
          <div className='sticky'>
            <div className="logo">
              <img src={beyondMDLogo} alt=""  />
            </div>
            <div className="header">
              <h1>Hi! 👋</h1>
              <h4>Welcome to BeyondMD Coding assessment 2023</h4>
            </div>
            <div className="section-selector">
              <h3>Let's start using The Cat App</h3>
              <div className="nav-menu">
              <div className="nav-item">
                <div className="nav-icon hello">
                  <img src='https://img.icons8.com/?size=200&id=dlN23b953qvQ&format=png' alt=""  />
                </div>
                <a href="/"><button>Hello BeyondMD</button></a>
              </div>
              <div className="nav-item">
                <div className="nav-icon resume">
                  <img src={docIcon} alt=""  />
                </div>
                <a href="/resume"><button>Resume</button></a>
              </div>
              <div className="nav-item">
                <div className="nav-icon app">
                  <img src="https://img.icons8.com/?size=200&id=GEAs8ke5mB3W&format=png" alt=""  />
                </div>
                <a href="/catApp"><button>Name a Cat</button></a>
              </div>
              </div>
            </div>
          </div>
          </div>
    )

}

export default LeftSection