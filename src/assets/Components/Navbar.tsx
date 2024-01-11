import { Navbar, Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

function NavbarComponent() {
  const navigate = useNavigate();

  const logoutHandle = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="ToDo">
        <img src="https://static-00.iconduck.com/assets.00/todo-icon-2048x2048-pij2pwiy.png" className="mr-3 h-6 sm:h-9" alt="ToDo Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">ToDo</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button>
          <button className="btn btn-info" onClick={logoutHandle}>Log Out</button>
        </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
