import React from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import VisibilityIcon from "@material-ui/icons/Visibility";
import "./../style/sticky.css"

function Sticky() {
    return (
        <div>
            <div className="view-intro">
                <img src="/assets/intro/logo.png" className="logo-intro" alt="logo" />
                {/*<ThumbUpIcon />*/}
                <i class="fas fa-heart"></i>
                <p className="count-view">0</p>
                {/*<ThumbDownIcon />*/}
                <i class="fas fa-heart down-sticky"></i>
                <VisibilityIcon />
            </div>
        </div>
    )
}

export default Sticky
