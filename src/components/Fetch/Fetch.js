import React, {Component} from 'react';
import FetchDisplay from './FetchDisplay';

// *** Fetch.js is an example of a class component

/* Differences Between Functional & Class Components
************

    - SYNTAX
        - the most obvious difference between functional components and class components is the syntax
        - a CLASS COMPONENT requires you to extend from 'React.Component' and create a render function which returns the React element. This requires more code but also unlocks the use of some other features

    - STATE
        - because FUNCTIONAL COMPONENTS are just plain JS functions, you can't use setState() in them. That's why functional components are also known as 'stateless components'. Whenever you see a functional (or stateless) component, you can be sure that it does NOT have it's own state
        - if you need a state in your component you will either need to create a CLASS COMPONENT, or make sure your parent component is a class component so you can pass down the state via props

    - LIFECYCLE HOOKS
        - Lifecycle Hooks are another feature you cannot use with functional components, and can ONLY use with CLASS COMPONENTS, just like with state. Both state and lifecycle hooks come from the React.Component you extend from in class components

    - WHY USE FUNCTIONAL COMPONENTS AT ALL?
        - functional components are easier to read & test because they are plain JS functions without state or lifecycle hooks
        - less code
        - they help you implement best practices. It will get easier to separate container and presentational components because you need to think more about your components state if you don't have access to setState() or lifecycle methods in your component

*/

/*  - React components have what's known as a 'lifecycle'. The different points during the lifecycle of our React component are accessible via 'lifecycle methods'.
        - The basic lifecycle of a React component is:
            - creation
            - mounted
            - unmounted
            - destroyed
        - each of these phases of a components lifecycle have methods that are called automatically at each point in the lifecycle, that give you control over what happens at the point each of those methods are invoked

        NOTE: lifecycle methods are intended to be a last resort. They are to be used in special cases, when other fallbacks like rearranging your components or moving your state around won't work.
            - there are edge cases here. Let's take the fetch call below API for example. You can't guarantee that your fetch will resolve before the component finishes mounting. If it did, that would mean you'd be trying to setState on an unmounted component, which will throw you errors. Making your fetch calls in the 'componentDidMount' lifecycle method will guarantee that there is a component to update or set the state of. */


            //Notice where and when the console.logs below are taking place.

export default class Fetch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            img: ''
        }
    }

    // ADD
    componentWillMount() {
        console.log('I am about to say hello');
    }

    // ADD
    componentDidMount() {
        console.log('component mounted')
        fetch('https://random.dog/woof.json')
            .then(response => response.json())
            .then(json => {
                console.log(json)
                this.setState({
                    img: json.url
                })
                console.log(this.state.img)
            }
        )
    }

    render() {
        return(
            <div>
                <h1>Display Random Image</h1>
                {/* Below we are passing the state property to the FetchDisplay component */}
                <FetchDisplay url={this.state.img} />
            </div>
        )
    }
}


