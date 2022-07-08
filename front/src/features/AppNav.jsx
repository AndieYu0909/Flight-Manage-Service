//This is the file that handles disply of the navigation bar
import { Nav, NavItem, NavLink, NavSection } from '../components/Nav';


export const AppNav = () => {
 


    return (
        <Nav>
            <NavSection jc="flex-start">
                <NavItem>
                    <NavLink to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/Addflightinfos" transitionColor="#0000FF">Add Flight</NavLink>
                </NavItem>
                {/* <NavItem>
                    <NavLink to="/UpdateFlight">Update Flight</NavLink>
                </NavItem> */}
                {/* <NavItem>
                    <NavLink to="*">Error Page</NavLink>
                </NavItem> */}

            </NavSection>
        </Nav>
    );
}