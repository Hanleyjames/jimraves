import React from 'react';
import axios from 'axios';

export class Event extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        axios.get('https://ravesent-apiv1.herokuapp.com/artists')
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}