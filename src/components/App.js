import React from 'react';
import PropTypes from 'prop-types';
import Header from '../common/Header';


class App extends React.Component {              //Det er denne som tegner hele siden
    render() {
        return (
            <div className="container-fluid">                   {/*Dette betyr at denne divisionen fyller hele siden??*/}
                <Header/>
                {this.props.children}                           {/*Used to display whatever you include between opening and closing tags when invoking a component.*/}
            </div>
        );
    }
}

//Expected props
App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;