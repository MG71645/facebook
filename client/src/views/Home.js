import React, {Component} from 'react'

// Components
import IfAuthorized from '../hoc/IfAuthorized'
import Feed from '../blocks/Feed'
import PostCreator from '../blocks/PostCreator'

// Styles
import './Home.css'

class Home extends Component {
    render() {
        return (
            <div className="Home" display="column" child-width="full" child-spacing="16px">
                <IfAuthorized>
                    <PostCreator/>
                </IfAuthorized>
                <Feed/>
            </div>
        )
    }
}

export default Home
