import React from 'react'

// Components
import IfOwner from '../hoc/IfOwner'
import ProfileInfo from '../blocks/ProfileInfo'
import PostCreator from '../blocks/PostCreator'
import Feed from '../blocks/Feed'

// Styles
import './User.css'

const User = props => {
    const id = props.match.params.id

    return (
        <div className="User" key={id}>
            <div className="profile-main">
                <ProfileInfo/>
            </div>
            <div className="profile-feed" display="column" child-width="full" child-spacing="16px">
                <IfOwner user={id}>
                    <PostCreator/>
                </IfOwner>
                <Feed user={id}/>
            </div>
        </div>
    )
}

export default User
